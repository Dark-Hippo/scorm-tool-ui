import { useEffect, useState } from 'react';
import { ListCourses } from '../services/CourseService';
import { CourseList } from '../components/CourseList';

import { useAuth0 } from '@auth0/auth0-react';
import type { Course } from '../types/Course';

export const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  if (loading) return <h1>Loading.</h1>;

  useEffect(() => {
    const getCourses = async () => {
      const accessToken = await getAccessTokenSilently();
      const courses = await ListCourses(accessToken);
      if (courses) {
        setCourses(courses);
      }
    };

    getCourses();
  }, [getAccessTokenSilently]);

  return <CourseList data={courses} />;
};
