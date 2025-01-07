'use client';

import { ProjectList } from '@/components/project-list';
import { ProjectDetails } from '@/components/project-details';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import { createProject, getAllProjects, updateProject } from '@/data/db';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    getAllProjects().then((allProjects) => {
      setProjects(allProjects);
      if (params.id === 'new') {
        setCurrentProject(null);
      } else if (params.id) {
        const project = allProjects.find((p) => p.id === params.id);
        setCurrentProject(project || null);
      } else if (allProjects.length > 0) {
        router.push(`/project/${allProjects[0].id}`);
      }
    });
  }, [params, router]);

  const handleNewProject = () => {
    router.push('/project/new');
  };

  const handleSaveProject = async (project: Omit<Project, 'id'>) => {
    if (currentProject) {
      await updateProject({
        ...project,
        id: currentProject.id,
      });
      setProjects(
        projects.map((p) => (p.id === currentProject.id ? currentProject : p))
      );
      setCurrentProject(currentProject);
    } else {
      const id = await createProject(project);
      const newProject = { ...project, id };
      setProjects([...projects, newProject]);
      setCurrentProject(newProject);
      router.push(`/project/${id}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="md:w-72 md:flex-shrink-0 md:border-r overflow-auto">
        <ProjectList
          projects={projects}
          currentProjectId={currentProject?.id || null}
          onNewProject={handleNewProject}
        />
      </div>
      <div className="flex-grow overflow-auto">
        <ProjectDetails project={currentProject} onSave={handleSaveProject} />
      </div>
    </div>
  );
}
