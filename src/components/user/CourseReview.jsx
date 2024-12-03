import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { userApi, userApiToken } from "../../services/api";
import { useSelector } from "react-redux";
import AddReview from "./AddReview";
import { toast } from "react-toastify";

const CourseReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState(false)
  const [reviewdelete, setReviewDelete] = useState(false)

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  useEffect(() => {

    const getReviews = async () => {
      try {
        const res = await userApi.get(`course_review?id=${id}`);
        if (res) {
          setReviews(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, [id, reviewUpdate, reviewdelete]);


  const upadateHandler =async ( rating, review, id,) => {
    try {
      const res = await userApiToken.put(`review?id=${id}`, {review, rating})
      if(res){
        setReviewUpdate(true)
        toast.success(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const deleteReview = async(id) => {
    try {
      const res = await userApiToken.delete(`review?id=${id}`)
      if(res){
        setReviewDelete(true)
        toast.success('Review deleted.')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {reviews.length === 0 ? (
        <Typography mt={2} variant="h5" component={"h2"}>
          No reviews yet.
        </Typography>
      ) : (
        <>
          <Typography ml={3} mt={2} textAlign={'left'}>
            Total {reviews.length} People reviewed this course
          </Typography>

          {reviews.map((review) => (
            <Box p={2} key={review._id} textAlign={'left'}>
              <Box display={"flex"} m={1}>
                <Avatar sx={{ width: "28px", height: "28px" }}>
                  <Typography sx={{ fontSize: "16px" }}>
                    {review.user.fName[0]}
                  </Typography>
                </Avatar>
                <Typography
                  sx={{ textDecoration: "underline" }}
                  variant="subtitle1"
                  component={"h1"}
                  ml={1}
                >
                  {review.user.fName}
                </Typography>
              </Box>
              <Box ml={5}>
                <Box mt={2}>
                  <Rating readOnly size="small" value={review.rating}></Rating>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle">{review.review}</Typography>
                  {review.user._id === userId ? (
                    <AddReview
                      edit={true}
                      reviewVal={review.review}
                      ratingVal={review.rating}
                      reviewId={review._id}
                      upadateHandler={upadateHandler}
                      deleteHandler={deleteReview}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default CourseReview;
