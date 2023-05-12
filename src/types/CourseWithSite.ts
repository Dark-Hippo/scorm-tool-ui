interface CourseWithSite {
  courseId: number;
  siteId: number;
  name: string;
  guid: string;
  language: string;
  title: string;
  lastAccessed?: Date;
}

export type { CourseWithSite };
