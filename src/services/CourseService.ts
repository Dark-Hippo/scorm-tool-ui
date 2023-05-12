import { SERVER } from '../config';

import type { Course } from '../types/Course';

export const ListCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${SERVER}/course`, {
    method: 'GET',
    mode: 'cors',
  });

  const result: Course[] = await response.json();

  return result;
};
