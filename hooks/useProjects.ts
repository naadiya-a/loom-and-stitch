"use client";

import { useState, useEffect, useCallback } from "react";
import { Project } from "@/lib/types";
import { getAllProjects, updateProject, createProject } from "@/data/db";

let projectsCache: Project[] | null = null;

export function useProjects(currentId: string | null) {
  const [projects, setProjects] = useState<Project[]>(projectsCache || []);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(!projectsCache);

  const fetchProjects = useCallback(
    async (force = false) => {
      setLoading(true);
      // Skip fetching if we have cached data and aren't forcing a refresh
      if (projectsCache && !force) {
        setProjects(projectsCache);
        if (currentId === "new") {
          setCurrentProject(null);
        } else if (currentId) {
          setCurrentProject(
            projectsCache.find((p) => p.id === currentId) || null,
          );
        }
        setLoading(false);
        return;
      }

      const allProjects = await getAllProjects();
      projectsCache = allProjects;
      setProjects(allProjects);

      if (currentId === "new") {
        setCurrentProject(null);
      } else if (currentId) {
        setCurrentProject(allProjects.find((p) => p.id === currentId) || null);
      }
      setLoading(false);
    },
    [currentId],
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, currentId]);

  const saveProject = async (project: Omit<Project, "id">) => {
    const id = currentProject
      ? await updateProject({ ...project, id: currentProject.id })
      : await createProject(project);
    projectsCache = null;
    await fetchProjects(true);
    return id;
  };

  const invalidateCache = () => {
    projectsCache = null;
    fetchProjects(true);
  };

  return {
    projects,
    currentProject,
    loading,
    saveProject,
    invalidateCache,
  };
}
