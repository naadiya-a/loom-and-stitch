'use client';

import { ProjectList } from '@/components/project-list';
import { ProjectDetails } from '@/components/project-details';
import { ProjectDetailsSkeleton } from '@/components/project-details-skeleton';
import { useParams, useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { Project } from '@/lib/types';
import { useProjects } from '@/hooks/useProjects';
import LoadingSpinner from '@/components/loading-spinner';
import AuthContext from '@/context/authContext';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const {
    projects,
    currentProject,
    loading: projectsLoading,
    saveProject,
  } = useProjects(params.id as string);
  const { userId, loading: authLoading } = use(AuthContext);

  useEffect(() => {
    if (!authLoading && (!userId || userId === '')) {
      router.push('/login');
    }
  }, [userId, authLoading, router]);

  const handleNewProject = () => {
    router.push('/project/new');
  };

  const handleSaveProject = async (
    projectData: Omit<Project, 'id'>,
    imageFile?: File
  ) => {
    const id = await saveProject(projectData, imageFile);
    router.push(`/project/${id}`);
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="relative z-50 md:w-72 md:flex-shrink-0 md:border-r overflow-visible">
        <ProjectList
          projects={projects}
          currentProjectId={currentProject?.id || null}
          onNewProject={handleNewProject}
        />
      </div>
      <div className="flex-grow overflow-auto z-0 mt-4 md:mt-0">
        {projectsLoading ? (
          <ProjectDetailsSkeleton />
        ) : (
          <ProjectDetails project={currentProject} onSave={handleSaveProject} />
        )}
      </div>
    </div>
  );
}
