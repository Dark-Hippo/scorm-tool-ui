import { useEffect, useState } from 'react';
import { ListCoursesWithSites } from '../services/CourseService';
import { CourseList } from '../components/CourseList';

import type { CourseWithSite } from '../types/CourseWithSite';
import { useAuth0 } from '@auth0/auth0-react';

export const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseWithSite[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  if (loading) return <h1>Loading.</h1>;

  useEffect(() => {
    const getCourses = async () => {
      const accessToken = await getAccessTokenSilently();
      const courses = await ListCoursesWithSites(accessToken);
      if (courses) {
        setCourses(courses);
      }
    };

    getCourses();
  }, [getAccessTokenSilently]);

  return <CourseList data={courses} />;
};
