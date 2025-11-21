export interface Material {
  id: string;
  title: string;
  description: string;
  driveFileId: string;
  driveUrl: string;
  thumbnailUrl?: string;
  category: 'book' | 'study' | 'sermon' | 'other';
  uploadedAt: Date;
  order: number;
}
