import axios from "axios";
import React, { useEffect, useState } from "react";
import { USERS_URL } from "../../constants/usersConstants";
import { useSelector } from "react-redux";
import { Box, Button, Container, CssBaseline, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { userApi, userApiToken } from "../../services/api";
import AddReview from "../../components/user/AddReview";
import { toast } from "react-toastify";
import { LiaRupeeSignSolid } from "react-icons/lia";

const MyCoursesScreen = () => {
  const [myCourse, setMyCourse] = useState([]);
  const [review, setReviews] = useState([]);
  const [updated, setUpdated] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const authToken = userInfo?.token;

  const submitHandler = (rating, review, courseId) => {
    try {
      const res = userApiToken.post("review", {
        rating,
        review,
        userId,
        courseId,
      });
      if (res) {
        setUpdated(true);
        toast.success("Review submited successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await userApiToken.get("review");
        if (res) {
          console.log(res);
          const review = [];
          res.data.forEach((rev) => {
            if (userId === rev.user) review.push(rev.course);
          });
          setReviews(review);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReview();
  }, [updated]);

  useEffect(() => {
    const fetchMyCourseData = async () => {
      try {
        const res = await userApiToken.get(`my_courses?id=${userId}`);
        if (res) {
          setMyCourse(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourseData();
  }, []);

  return (
    <div className="bg-[#e9ebf0] py-5">
      <CssBaseline />
      <Box px={10} height={120}>
        <h2 className="flex flex-row flex-nowrap items-center mt-24">
          <span className="flex-grow block border-t border-black"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
            My learning
          </span>
          <span className="flex-grow block border-t border-black"></span>
        </h2>
      </Box>

      <Container sx={{ py: 1 }} maxWidth="lg">
        <Grid container spacing={4} mt={2}>
          {myCourse.length === 0 ? (
            <h1>No Courses found!</h1>
          ) : (
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {myCourse.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[350px]"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full object-cover"
                    />

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-md font-semibold text-gray-800 mb-2 font-manrope">
                        {course.title}
                      </h2>

                      <p className="text-sm text-gray-700 leading-tight mb-4 max-h-9 overflow-hidden font-manrope">
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
                        </div>
                      </div>

                      <div className="flex mt-5 justify-center">
                        <Link to={`/watch/${course._id}`}>
                          <Button
                            sx={{ mb: 2, ml: 1 }}
                            variant="outlined"
                            size="small"
                          >
                            Play
                          </Button>
                        </Link>
                        {review.includes(course._id) ? (
                          ""
                        ) : (
                          <AddReview
                            ratingVal={""}
                            reviewVal={""}
                            edit={false}
                            courseId={course._id}
                            submitHandler={submitHandler}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default MyCoursesScreen;
