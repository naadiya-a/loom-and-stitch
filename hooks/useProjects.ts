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

      if (!projectsCache || force) {
        const allProjects = await getAllProjects();
        projectsCache = allProjects;
      }

      setProjects(projectsCache);
      if (currentId === "new") {
        setCurrentProject(null);
      } else if (currentId) {
        const project = projectsCache.find((p) => p.id === currentId);
        setCurrentProject(project || null);
      }

      setLoading(false);
    },
    [currentId],
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const invalidateCache = () => {
    projectsCache = null;
    fetchProjects(true);
  };

  const saveProject = async (project: Omit<Project, "id">) => {
    const id = currentProject
      ? await updateProject({ ...project, id: currentProject.id })
      : await createProject(project);
    invalidateCache();
    return id;
  };

  return {
    projects,
    currentProject,
    loading,
    saveProject,
    invalidateCache,
  };
}
