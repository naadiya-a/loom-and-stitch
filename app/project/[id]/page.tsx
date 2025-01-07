import { ProjectList } from '@/components/project-list';
import { ProjectDetails } from '@/components/project-details';

export default function ProjectPage() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="md:w-64 lg:w-80 md:flex-shrink-0 md:border-r overflow-auto">
        <ProjectList />
      </div>
      <div className="flex-grow overflow-auto">
        <ProjectDetails />
      </div>
    </div>
  );
}
