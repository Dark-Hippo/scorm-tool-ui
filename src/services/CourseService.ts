import { SERVER } from '../config';

import type { Course } from '../types/Course';
import type { CourseWithSite } from '../types/CourseWithSite';

export const ListCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${SERVER}/course`, {
    method: 'GET',
    mode: 'cors',
  });

  const result: Course[] = await response.json();

  return result;
};

export const ListCoursesWithSites = async (): Promise<CourseWithSite[]> => {
  const response = await fetch(`${SERVER}/course/site`, {
    method: 'GET',
    mode: 'cors',
  });

  const result: CourseWithSite[] = await response.json();

  return result;
};
