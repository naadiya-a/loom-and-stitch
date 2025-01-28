'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

interface ProjectListProps {
  projects: Project[];
  currentProjectId: string | null;
  onNewProject: () => void;
}

export function ProjectList({
  projects,
  currentProjectId,
  onNewProject,
}: ProjectListProps) {
  const sortedProjects = [...projects].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );
  const router = useRouter();

  return (
    <div className="p-4 space-y-4 relative z-50">
      <Button
        onClick={onNewProject}
        className="w-full flex items-center justify-center gap-2 p-4 text-gray-600 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors bg-muted"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">New project</span>
      </Button>
      <div className="md:hidden">
        <Select onValueChange={(value) => router.push(`/project/${value}`)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {sortedProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden md:block space-y-2">
        {sortedProjects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className={`block w-full p-4 text-left text-lg font-semibold rounded-lg transition-colors ${
              currentProjectId === project.id
                ? 'bg-[#FFD5B4]'
                : 'bg-[#FFE4C4] hover:bg-[#FFD5B4]'
            }`}
          >
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
