import * as React from "react";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { userApi } from "../../services/api";

const Hero = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await userApi.get("course/popular");
        if (res) {
          console.log(res);
          setCourseData(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
  }, []);

  return (
    <section className="px-2 pt-32 bg-white md:px-0">
      <div className="container items-center max-w-7xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          {/* Text Content */}
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">
                  {" "}
                  Comprehensive learning programs
                </span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  & classes for all students
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                Become lifelong learners with India's best teachers, engaging
                video lessons, and personalized learning journeys
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <a
                  href="/course"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                >
                  Explore Courses
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
            Popular
            <span className="text-orange-600 ml-2">Courses</span>
          </h1>
          <p className="max-w-2xl mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            Discover a variety of high-quality courses tailored to meet your
            learning needs. Whether you're looking to enhance your professional
            skills or explore a new hobby, we have something for everyone.
          </p>
          <CourseCard courseData={courseData?.slice(1)} />
        </div>
      </section>
    </section>
  );
};

export default Hero;
