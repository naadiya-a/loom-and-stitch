export type Project = {
    id: string;
    name: string;
    type: 'crochet' | 'knit' | 'both';
    hooks: string;
    yarn: string;
    notes: string;
}