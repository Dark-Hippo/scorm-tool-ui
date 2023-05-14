import { Course } from './Course';
import { Site } from './Site';

interface CourseWithSite extends Course {
  site?: Site;
}

export type { CourseWithSite };
