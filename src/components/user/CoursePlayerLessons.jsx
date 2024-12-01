import React, { useEffect, useState } from "react";
import { tutorApi } from "../../services/api";
import LockIcon from "@mui/icons-material/Lock";

const CoursePlayerLessons = ({
  courseId,
  onPlayHandler,
  status,
  completed,
}) => {
  const [lessons, setLessons] = useState([]);
  const [completedIndex, setCompletedIndex] = useState();

  useEffect(() => {
    setCompletedIndex(completed?.length);
  }, [completedIndex, completed]);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const res = await tutorApi.get(`course/lesson?id=${courseId}`);
        if (res) {
          setLessons(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadLessons();
  }, [courseId]);

  const percentage = (completed?.length / lessons?.length) * 100;
  const formattedPercentage = percentage.toFixed(2);

  return (
    <div className="max-w-2xl mx-auto mr-1">
      {!status && (
        <div className="border border-gray-300 p-4 mb-4 rounded-xl flex items-center justify-center">
          <p className="ml-4 text-gray-700 text-xs sm:text-sm">
            Completed: {completed?.length} of {lessons.length}{" "}
            <span className="ml-2"></span>(
            <span className="text-blue-600 px-1">{formattedPercentage}%</span>)
          </p>
        </div>
      )}

      {lessons
        .sort((a, b) => a.lessonNumber - b.lessonNumber)
        .map((lesson, index) => {
          const isCompleted = completed?.includes(lesson._id);
          const isUnlocked = index <= completedIndex;

          return (
            <div
              key={lesson._id}
              className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start mb-4"
            >
              <div className="relative w-24 h-24 flex-shrink-0 ml-1 rounded-md hidden md:block">
                <video
                  className="absolute left-0 top-0 w-full h-full object-cover rounded-md"
                  loading="lazy"
                  src={lesson.videoUrl || "https://via.placeholder.com/150"}
                  alt={`Lesson ${lesson.lessonNumber}`}
                />
              </div>

              <div className="flex flex-col gap-2 py-2 pl-2">
                <p className="text-base font-bold hidden md:block">
                  Lesson no: {lesson.lessonNumber}
                </p>

                <p className="text-gray-500 text-sm">{lesson.description}</p>

                {isUnlocked ? (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 w-fit rounded-md hover:bg-blue-600 transition text-sm"
                    onClick={() => onPlayHandler(lesson)}
                    disabled={status}
                  >
                    Play
                  </button>
                ) : (
                  <div className="text-gray-500 flex items-center text-sm">
                    <LockIcon className="w-2 h-2 mr-1" />
                    <span>Locked</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CoursePlayerLessons;
