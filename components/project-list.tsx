'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllProjects } from '@/data/db';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Socks',
      type: 'crochet',
      hooks: '4mm',
      yarn: 'cacade black wool',
      notes: 'mens size 10',
    },
    {
      id: '2',
      name: 'Sweater',
      type: 'knit',
      hooks: '',
      yarn: '',
      notes: '',
    },
    { id: '3', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '4', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '5', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '6', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '7', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '8', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '9', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '10', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '11', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '12', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '13', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
    // { id: '14', name: 'Hat', type: 'both', hooks: '', yarn: '', notes: '' },
  ]);

  const handleNewProject = () => {
    const newProject: Project = {
      id: '4',
      name: 'New project',
      type: 'crochet',
      hooks: '',
      yarn: '',
      notes: '',
    };
    setProjects([...projects, newProject]);
  };

  // const [projects, setProjects] = useState<Project[]>([]);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const fetchedProjects = await getAllProjects();
  //       setProjects(fetchedProjects);
  //     } catch (err) {
  //       setError((err as Error).message || 'Failed to fetch projects');
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="p-4 space-y-4">
      <Button
        onClick={handleNewProject}
        className="w-full flex items-center justify-center gap-2 p-4 text-gray-600 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors bg-white"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">New project</span>
      </Button>
      <div className="md:hidden">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <Link href={`/project/${project.name}`} className="block py-2">
                  {project.name}
                </Link>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden md:block space-y-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.name}`}
            className="block w-full p-4 text-left text-lg font-semibold rounded-lg transition-colors bg-[#FFE4C4] hover:bg-[#FFD5B4]"
          >
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
