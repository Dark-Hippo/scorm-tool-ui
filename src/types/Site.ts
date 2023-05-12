interface Site {
  id: number;
  guid: string;
  title: string;
  courseId: number;
  lastAccessed?: Date;
  createdByUserId: number;
  createdDate: Date;
  updatedDate: Date;
}

export type { Site };
