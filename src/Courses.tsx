import { useEffect, useState } from 'react';
import { SERVER } from './config';

export default function Courses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>();

  if (loading) return <h1>Loading.</h1>;

  useEffect(() => {
    async function getCourses() {
      const response = await fetch(`${SERVER}/course`, {
        method: 'GET',
        mode: 'cors',
      });
      const result: Course[] = await response.json();
      console.log(result);
      setCourses(result);
    }

    getCourses();
  }, []);

  // const SendToServer = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append('scorm', file);
  //   const response = await fetch(`${SERVER}/scorm`, {
  //     method: 'POST',
  //     body: formData,
  //     mode: 'cors',
  //   });
  //   const result = await response.json();

  //   return result;
  // };

  const courseList = courses?.map((course) => (
    <li>
      {course.id}.{course.name} ({course.language}) -{' '}
      <em>{new Date(course.updatedDate).toLocaleDateString()}</em>
    </li>
  ));

  return (
    <div>
      <ul>{courseList}</ul>
    </div>
  );
}
