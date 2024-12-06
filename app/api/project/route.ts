import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const CreateProjectInput = z.object({
  repoUrl: z.string(),
  projectName: z.string(),
  githubToken: z.string().optional(),
});

const prisma = new PrismaClient();
export const POST = async (request: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();

    const validatedData = CreateProjectInput.parse(body);
    const project = await prisma.project.create({
      data: {
        projectName: validatedData.projectName,
        repoUrl: validatedData.repoUrl,
        githubToken: validatedData.githubToken,
        userToProjects: {
          create: {
            userId: userId,
          },
        },
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `
        Failed to link repository: ${error}
        `,
      },
      { status: 500 }
    );
  }
};

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId,
          },
        },
      },
      include: {
        userToProjects: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
