'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { StitchCounter } from './stitch-counter';
import { Plus, ImagePlus } from 'lucide-react';
import { Project } from '../lib/types';

export function ProjectDetails({ project }: { project?: Project }) {
  const [type, setType] = useState<string>(project?.type || 'crochet');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-semibold">Socks</h1>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Project Type</Label>
            <RadioGroup
              defaultValue={type}
              onValueChange={setType}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="crochet" id="crochet" />
                <Label htmlFor="crochet" className="text-sm">
                  Crochet
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="knit" id="knit" />
                <Label htmlFor="knit" className="text-sm">
                  Knit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="text-sm">
                  Both
                </Label>
              </div>
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
              placeholder="Enter hook sizes (e.g., 4mm, 5mm)"
              defaultValue={project?.hooks}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yarn" className="text-sm font-medium">
              Yarn
            </Label>
            <Input
              id="yarn"
              placeholder="Enter yarn details"
              defaultValue={project?.yarn}
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
              placeholder="Add your project notes here..."
              className="min-h-[150px]"
              defaultValue={project?.notes}
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
          >
            <Plus className="w-3 h-3 mr-1" />
            <span className="text-xs">Add Counter</span>
          </Button>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            <StitchCounter label="Toes" initialCount={12} />
            <StitchCounter label="Sole" />
          </div>
        </div>
      </div>
    </div>
  );
}
