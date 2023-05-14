import { useEffect, useState } from 'react';
import { ListCoursesWithSites } from '../services/CourseService';
import { CourseWithSiteList } from '../components/CourseWithSiteList';

import type { CourseWithSite } from '../types/CourseWithSite';

export default function Courses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseWithSite[]>([]);

  if (loading) return <h1>Loading.</h1>;

  useEffect(() => {
    async function getCourses() {
      const courses = await ListCoursesWithSites();
      setCourses(courses);
    }

    getCourses();
  }, []);

  return <CourseWithSiteList data={courses} />;
}
