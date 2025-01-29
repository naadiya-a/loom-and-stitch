'use client';

import { FormEvent, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { StitchCounter } from './stitch-counter';
import { Plus } from 'lucide-react';
import { Project, ProjectType } from '../lib/types';
import { TitleInput } from './ui/title-input';
import ImageUpload from './image-upload';

interface ProjectDetailsProps {
  project: Project | null;
  onSave: (project: Omit<Project, 'id'>, imageFile?: File) => void;
}

const initialProjectState: Omit<Project, 'id'> = {
  name: '',
  type: ProjectType.Crochet,
  hooks: '',
  yarn: '',
  notes: '',
  counters: [],
  imageUrl: '',
};

export function ProjectDetails({ project, onSave }: ProjectDetailsProps) {
  const [formData, setFormData] =
    useState<Omit<Project, 'id'>>(initialProjectState);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (project) {
      setFormData({ ...formData, ...project });
    }
  }, [project]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value as ProjectType });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData, imageFile);
  };

  const addCounter = () => {
    const counterName = prompt('Enter counter name:');
    if (counterName) {
      setFormData((prev) => ({
        ...prev,
        counters: [
          ...(prev.counters || []),
          {
            id: crypto.randomUUID(),
            name: counterName,
            value: 0,
          },
        ],
      }));
    }
  };

  const updateCounter = (id: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      counters:
        prev.counters?.map((counter) =>
          counter.id === id ? { ...counter, value } : counter
        ) || [],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="flex-1 space-y-4">
            <TitleInput
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter project title"
              required
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Project Type</Label>
              <RadioGroup
                value={formData.type || ProjectType.Crochet}
                onValueChange={handleTypeChange}
                className="flex flex-wrap gap-4"
              >
                {['crochet', 'knit'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="text-sm capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <ImageUpload
            existingImageUrl={project?.imageUrl}
            onImageUpload={setImageFile}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hooks" className="text-sm font-medium">
                {formData.type == ProjectType.Crochet ? 'Hooks' : 'Needles'}
              </Label>
              <Input
                id="hooks"
                value={formData.hooks}
                onChange={handleInputChange}
                placeholder="Enter hook sizes (e.g., 4mm)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yarn" className="text-sm font-medium">
                Yarn
              </Label>
              <Input
                id="yarn"
                value={formData.yarn}
                onChange={handleInputChange}
                placeholder="Enter yarn details"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add your project notes here..."
                className="min-h-[150px]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Counters</Label>
            <Button
              variant="secondary"
              size="sm"
              className="bg-pink-100 hover:bg-pink-200"
              onClick={addCounter}
            >
              <Plus className="w-3 h-3 mr-1" />
              <span className="text-xs">Add Counter</span>
            </Button>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {formData.counters?.map((counter) => (
                <StitchCounter
                  key={counter.id}
                  label={counter.name}
                  initialCount={counter.value}
                  onCountChange={(value) => updateCounter(counter.id, value)}
                />
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save
        </Button>
      </div>
    </form>
  );
}
