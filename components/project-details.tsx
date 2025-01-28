'use client';

import { FormEvent, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { StitchCounter } from './stitch-counter';
import { Plus, ImagePlus } from 'lucide-react';
import { Project, ProjectType } from '../lib/types';
import { TitleInput } from './ui/title-input';

interface ProjectDetailsProps {
  project: Project | null;
  onSave: (project: Omit<Project, 'id'>) => void;
}

const initialProjectState: Omit<Project, 'id'> = {
  name: '',
  type: ProjectType.Crochet,
  hooks: '',
  yarn: '',
  notes: '',
  counters: [],
};

export function ProjectDetails({ project, onSave }: ProjectDetailsProps) {
  const [formData, setFormData] =
    useState<Omit<Project, 'id'>>(initialProjectState);

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
    onSave(formData);
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
                {['crochet', 'knit', 'both'].map((type) => (
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
          <Button variant="outline" className="w-32 h-32 sm:w-36 sm:h-36 p-1">
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg">
              <ImagePlus className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-2" />
              <span className="text-xs sm:text-sm text-gray-500 text-center">
                Add an image
              </span>
            </div>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hooks" className="text-sm font-medium">
                Hooks
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
