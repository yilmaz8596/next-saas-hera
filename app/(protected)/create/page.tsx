"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};
import { toast } from "sonner";

export default function CreatePage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    try {
      setLoading(true);
      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        toast.success("Repository linked successfully");
        setLoading(false);
      } else {
        toast.error("Failed to link repository");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to link repository", error!);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center gap-12 h-full">
      <Image src="/undraw_github.svg" alt="git" width={400} height={400} />
      <div>
        <div>
          <h1 className="font-semibold text-2xl">
            Link your <span className="text-[#E11D48]">Github</span> repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect your Github repository by providing the repository URL.
          </p>
        </div>
        <div className="h-4"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("projectName", {
              required: true,
            })}
            required
            placeholder="Project Name"
          />
          <div className="h-2"></div>
          <Input
            {...register("repoUrl", {
              required: true,
            })}
            required
            placeholder="Repository URL"
            type="url"
          />
          <div className="h-2"></div>
          <Input
            {...register("githubToken", {
              required: false,
            })}
            placeholder="Github Token (Optional)"
          />
          <div className="h-4"></div>
          <Button type="submit" disabled={loading}>
            {loading ? "Linking..." : "Link Repository"}
          </Button>
        </form>
      </div>
    </div>
  );
}
