import React, { useEffect, useState } from "react";
import CourseCard from "../../components/user/CourseCard";
import { admin, userApi } from "../../services/api";

const CourseScreen = () => {
  const [courseData, setCourseData] = useState([]);
  const [catData, setCatData] = useState([]);

  const fetchCourseData = async () => {
    try {
      const res = await admin.get("course");
      if (res) {
        setCourseData(res.data.courseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const res = await admin.get("category");
        if (res) {
          console.log(res);
          setCatData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCatData();
    fetchCourseData();
  }, []);

  const filterCourseByCat = async (id) => {
    try {
      const res = await userApi.get(`/course/category?id=${id}`);
      if (res) {
        setCourseData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterBySerach = async (query) => {
    if (!query.trim()) return;

    try {
      const res = await userApi.get(`search_course?query=${query}`);
      if (res) {
        setCourseData(res.data);
      }
    } catch (error) {}
  };

  return (
    <>
      <main className="">
        <div className="bg-gradient-to-b from-blue-600 via-blue-300 to-blue-100 pb-10 pt-20">
          <div className="flex flex-wrap items-start justify-center p-5 py-10 ">
            <button
              className="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-blue-600 text-gray-900 bg-gray-200"
              onClick={() => {
                fetchCourseData();
              }}
            >
              <span className="text-sm">All courses</span>
            </button>
            {catData.map((cat) => (
              <button
                key={cat._id}
                className="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-blue-600 text-gray-900 bg-gray-200"
                onClick={() => {
                  filterCourseByCat(cat._id);
                }}
              >
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
          <label
            className="mx-auto mb-10  relative bg-white min-w-sm max-w-7xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="Search courses"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              onChange={(e) => {
                filterBySerach(e.target.value);
              }}
            />
          </label>
        </div>
        {/* <SearchBar onSearchHandler={filterBySerach} /> */}

        {!courseData.length ? (
          <p>No courses found...</p>
        ) : (
          <CourseCard courseData={courseData} />
        )}
      </main>
    </>
  );
};

export default CourseScreen;
