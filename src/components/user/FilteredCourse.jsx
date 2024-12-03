import React, { useEffect, useState } from "react";
import { userApi } from "../../services/api";
import CourseCard from "./CourseCard";
import { useParams } from "react-router-dom";

const filteredCourse = () => {
  const [courseData, setCourseData] = useState([]);

  const { id, name } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await userApi.get(`course/category?id=${id}`);
        if (res) {
          setCourseData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, []);
console.log(courseData.length);

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-600 leading-tight mb-16 border-b-2 border-gray-300 pb-2">
          {!courseData.length
            ? `No ${name} Courses Available`
            : `${name} Courses.`}
        </h1>
      </div>
      <CourseCard courseData={courseData} />
    </div>
  );
};

export default filteredCourse;
