'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { Project } from '@/lib/types';
import { getAllProjects, updateProject, createProject } from '@/data/db';
import AuthContext from '@/context/authContext';

let projectsCache: Project[] | null = null;

export function useProjects(currentId: string | null) {
  const [projects, setProjects] = useState<Project[]>(projectsCache || []);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(!projectsCache);
  const { userId, loading: authLoading } = use(AuthContext);

  const fetchProjects = useCallback(
    async (force = false) => {
      if (!userId || userId === '') {
        setLoading(authLoading);
        return;
      }

      if (!projectsCache || force) {
        const allProjects = await getAllProjects(userId);
        projectsCache = allProjects;
      }

      setProjects(projectsCache);
      if (currentId === 'new') {
        setCurrentProject(null);
      } else if (currentId) {
        const project = projectsCache.find((p) => p.id === currentId);
        setCurrentProject(project || null);
      }

      setLoading(false);
    },
    [currentId, userId, authLoading]
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const invalidateCache = () => {
    projectsCache = null;
    fetchProjects(true);
  };

  const saveProject = async (project: Omit<Project, 'id'>) => {
    const id = currentProject
      ? await updateProject(userId, { ...project, id: currentProject.id })
      : await createProject(userId, project);
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
