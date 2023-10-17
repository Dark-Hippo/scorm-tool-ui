import type { Course } from '../types/Course';

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

export const DeleteCourse = async (
  course: Course,
  accessToken: string
): Promise<boolean> => {
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
