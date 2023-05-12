import { useEffect, useState } from 'react';

import type { Course } from '../types/Course';
import { ListCourses } from '../services/CourseService';
import { CourseList } from '../components/CourseList';

export default function Courses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  if (loading) return <h1>Loading.</h1>;

  useEffect(() => {
    async function getCourses() {
      const courses = await ListCourses();
      setCourses(courses);
    }

    getCourses();
  }, []);

  return <CourseList data={courses} />;
}
