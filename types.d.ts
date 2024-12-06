export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  credits: number;
  userToProjects: UserToProjects[];
}

export interface UserToProjects {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  projectId: string;
  user: User[];
  project: Project[];
}

export interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectName: string;
  repoUrl: string;
  githubToken?: string;
  deletedAt?: Date;
  userToProjects: UserToProjects[];
}
