interface Course {
  id: number;
  filename: string;
  guid: string;
  title: string;
  language: string;
  lastAccessed: Date | null;
  createdByUserId: number;
  createdDate: string;
  updatedDate: string;
}

export type { Course };
