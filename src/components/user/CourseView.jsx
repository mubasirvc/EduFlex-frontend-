import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Paper, Rating } from "@mui/material";
import { razorPay } from "../../services/razorPay";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Lessons from "../../components/user/lessons";
import { userApi, userApiToken } from "../../services/api";
import CourseReview from "./CourseReview";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  paddingBottom: theme.spacing(2),
  marginLeft: "auto",
  marginRight: "auto",
  paddingTop: theme.spacing(5),
  backgroundColor: "#e8ecec",
  alignItems: "center",
  textAlign: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
}));

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const [showLessons, setShowLessons] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const res = await userApi.get(`course/view?id=${id}`);
        if (res) {
          setCourse(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getCourseData();
  }, []);

  useEffect(() => {
    const fetchMyCourseData = async () => {
      try {
        const res = await userApiToken.get(`my_courses?id=${userId}`);
        if (res) {
          res.data.forEach((course) => {
            if (course._id === id) {
              setEnrolled(true);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourseData();
  }, []);

  const paymentHandler = async (amount) => {
    if (!userInfo) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }
    const res = await razorPay(amount);
    console.log(res, "am razorpay responseeee");
    if (res) {
      try {
        const res = await userApiToken.post("payment", {
          userId,
          courseId: id,
          paymentMode: "razorpay",
          amount,
        });
        if (res) {
          navigate("/success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <StyledPaper>
      <StyledBox>
        <div class="max-w-screen-xl mx-auto p-5 pb-0 sm:pb-0 md:pb-0 sm:p-10 md:p-16">
          <div className="rounded overflow-hidden flex flex-col max-w-4xl mx-auto">
            <img
              className="w-full"
              src={course.thumbnail}
              alt="Sunset in the mountains"
            />
            <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white border-2 border-gray-300 m-10">
              <a
                href="#"
                className="font-semibold text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
              >
                {course.title}
              </a>
              <p className="text-gray-500 text-sm">{course.description}</p>
              <p className="mt-5 text-gray-600 text-xs">
                By:
                <a
                  href={`/filter_tutor/${course?.tutor?._id}`}
                  className="text-xs text-indigo-600 transition duration-500 ease-in-out"
                >
                  {course?.tutor?.firstName}
                </a>{" "}
              </p>
              <div className="mt-1">
                <p className="text-sm mt-1">
                  Just for Rs:
                  <LiaRupeeSignSolid className="inline-block" />
                  <strong>{course.price}</strong> <s>2999</s>
                </p>
                <div className="mt-1">
                  <Rating
                    precision={0.5}
                    name="read-only"
                    value={course.rating}
                    readOnly
                  />
                </div>
                {enrolled ? (
                  <Link to={`/watch/${course._id}`}>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2 mb-2">
                      Watch now
                    </button>
                  </Link>
                ) : (
                  <button
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mt-2 mb-2"
                    onClick={() => paymentHandler(course.price)}
                  >
                    Buy now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 w-[85%] mx-auto p-3 bg-white">
          <div className="border-b py-4">
            <h2
              className="text-lg font-semibold cursor-pointer flex items-center justify-between"
              onClick={() => setShowLessons(!showLessons)}
            >
              View all lesson details
              <span
                className={`transition-transform ${
                  showLessons ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </h2>
            {showLessons && (
              <div className="mt-4">
                <Lessons
                  courseId={course._id}
                  width={160}
                  height={130}
                  status={true}
                />
              </div>
            )}
          </div>

          <div className="border-b py-4">
            <h2
              className="text-lg font-semibold cursor-pointer flex items-center justify-between"
              onClick={() => setShowReviews(!showReviews)}
            >
              See Reviews and Ratings
              <span
                className={`transition-transform ${
                  showReviews ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </h2>
            {showReviews && (
              <div className="mt-4">
                <CourseReview id={id} />
              </div>
            )}
          </div>
        </div>
      </StyledBox>
    </StyledPaper>
  );
};

export default CourseView;
