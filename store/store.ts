import { create } from "zustand";
import type { Project } from "@/types";

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  project: Project | null;
  error: Error | null;
  projectId: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  project: null,
  loading: false,
  error: null,
  projectId: null,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/project");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      set({ projects: data, error: null });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
  fetchProject: async (projectId: string) => {
    set({ loading: true });
    try {
      set({ projectId });
      const response = await fetch(`/api/project/${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const data = await response.json();
      set({ project: data, error: null });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));
