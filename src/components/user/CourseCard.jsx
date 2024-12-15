import React from "react";
import { Link } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";

const CourseCard = ({ courseData }) => {
  return (
    <main className="py-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {courseData?.length === 0 ? (
            <Loader />
          ) : (
            courseData?.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[350px]"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full object-cover"
                />
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h2 className="text-md font-semibold text-gray-800 mb-2 font-manrope">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-700 leading-tight mb-4 max-h-9 overflow-hidden font-manrope text-center">
                    {course.description || "No description available"}
                  </p>
                  <div className="flex-col items-end">
                    <div className="flex gap-2 items-center mt-3 justify-center">
                      <p className="text-base">Price:</p>
                      <div className="flex">
                        <p className="text-base mt-1">
                          <LiaRupeeSignSolid />
                        </p>
                        <p className="text-lg">{course.price}</p>
                      </div>
                      <s className="text-lg text-gray-500">2999</s>
                    </div>
                    <Link
                      to={`/course_view/${course._id}`}
                      className="text-blue-600 hover:underline border-2 px-3 py-1 mt-4 rounded-md inline-block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default CourseCard;
