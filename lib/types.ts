export type Project = {
  id: string;
  name: string;
  type: ProjectType;
  hooks?: string;
  yarn?: string;
  notes?: string;
  counters: Counter[];
  imageUrl?: string;
};

export type Counter = {
  id: string;
  name: string;
  value: number;
};

export enum ProjectType {
  Crochet = 'crochet',
  Knit = 'knit',
  Both = 'both',
  Undefined = 'undefined',
}
