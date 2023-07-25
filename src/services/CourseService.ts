import type { Course } from '../types/Course';
import type { CourseWithSite } from '../types/CourseWithSite';
import { Site } from '../types/Site';
import { LogError } from './ErrorService';

export const ListCourses = async (accessToken: string): Promise<Course[]> => {
  const response = await fetch(`/api/course`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result: Course[] = await response.json();

  return result;
};

export const ListCoursesWithSites = async (
  accessToken: string
): Promise<CourseWithSite[] | null> => {
  const response = await fetch(`/api/course/site`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    LogError({
      status: response.status,
      message: response.statusText,
    });

    return null;
  }

  const result: CourseWithSite[] = await response.json();

  return result;
};

export const DeleteCourseWithSite = async (
  course: CourseWithSite,
  accessToken: string
): Promise<boolean> => {
  if (course.site) {
    await deleteSite(course.site, accessToken);
  }

  const deleteUrl = `/api/course/${course.id}`;
  const response = await fetch(deleteUrl, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(true);
  }

  return Promise.reject(response.statusText);
};

const deleteSite = async (site: Site, accessToken: string) => {
  const deleteUrl = `/api/site/${site.id}`;
  const response = await fetch(deleteUrl, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(true);
  }

  return Promise.reject(response.statusText);
};
