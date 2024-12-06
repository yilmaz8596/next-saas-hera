import { useProjectStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const useProject = () => {
  const { user, isLoaded } = useUser();
  const store = useProjectStore();

  useEffect(() => {
    if (isLoaded && user) {
      store.fetchProjects();
    }
  }, [user, isLoaded]);

  return store;
};
