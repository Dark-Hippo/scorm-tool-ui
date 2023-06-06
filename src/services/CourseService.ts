import { SERVER } from '../config';

import type { Course } from '../types/Course';
import type { CourseWithSite } from '../types/CourseWithSite';
import { Site } from '../types/Site';

export const ListCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${SERVER}/course`, {
    method: 'GET',
    mode: 'cors',
  });

  const result: Course[] = await response.json();

  return result;
};

export const ListCoursesWithSites = async (): Promise<CourseWithSite[]> => {
  const response = await fetch(`/api/course/site`, {
    method: 'GET',
    mode: 'cors',
  });

  const result: CourseWithSite[] = await response.json();

  return result;
};

export const DeleteCourseWithSite = async (
  course: CourseWithSite
): Promise<boolean> => {
  if (course.site) {
    await deleteSite(course.site);
  }

  const deleteUrl = `${SERVER}/course/${course.id}`;
  const response = await fetch(deleteUrl, {
    method: 'DELETE',
    mode: 'cors',
  });

  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(true);
  }

  return Promise.reject(response.statusText);
};

const deleteSite = async (site: Site) => {
  const deleteUrl = `${SERVER}/site/${site.id}`;
  const response = await fetch(deleteUrl, {
    method: 'DELETE',
    mode: 'cors',
  });

  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(true);
  }

  return Promise.reject(response.statusText);
};
