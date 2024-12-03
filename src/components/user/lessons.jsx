import React, { useEffect, useState } from "react";
import { tutorApi } from "../../services/api";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";

const lessons = ({
  courseId,
  width,
  height,
  onPlayHandler,
  des,
  status,
  completed,
}) => {
  const [lessons, setLessons] = useState([]);
  const [completedIndex, setCompletedIndex] = useState();

  console.log(completed, "completeddddd");
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
    <>
      <Grid item xs={12} md={6}>
        {!status && (
          <Box
            border={1}
            p={2}
            mb={2}
            mr={1}
            style={{ display: "flex", alignItems: "center" }}
          >
            <CircularProgress
              variant="determinate"
              value={percentage}
              color={percentage === 100 ? "success" : "primary"}
              size={40}
              thickness={5}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
              ></Box>
            </CircularProgress>
            <Typography style={{ marginLeft: 25 }}>
              Completed: {completed?.length} of {lessons.length} (
              {formattedPercentage}%)
            </Typography>
          </Box>
        )}

        {lessons
          .sort((a, b) => a.lessonNumber - b.lessonNumber)
          .map((lesson, index) => {
            const isCompleted = completed?.includes(lesson._id);
            const isUnlocked = index <= completedIndex;
            console.log(isUnlocked, completedIndex, "unlockkkk");

            return (
              <Grid key={lesson._id} item xs={12} md={6}>
                <CardActionArea component="a">
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      height: { xs: "auto", md: height },
                      mb: 1,
                      maxHeight: height,
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="video"
                      sx={{
                        width: { xs: "100%", sm: width },
                        ml: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                        display: { xs: "block", sm: "block" },
                      }}
                      image={lesson.videoUrl}
                      alt="imageLabel"
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        textAlign: { xs: "center", sm: "left" },
                        overflowY: "auto",
                      }}
                    >
                      <Typography variant="p" paragraph m={0}>
                        Lesson no: <strong> {lesson.lessonNumber}</strong>
                      </Typography>
                      <Typography variant={des} color="text.secondary" m={0}>
                        {lesson.description}
                      </Typography>

                      {isUnlocked && (
                        <Button
                          disabled={status}
                          size="small"
                          variant="outlined"
                          onClick={() => onPlayHandler(lesson)}
                          sx={{ borderRadius: 0, mt: 1 }}
                        >
                          Play
                        </Button>
                      )}
                      {!isUnlocked && (
                        <Typography variant="body2" mt={1}>
                          <LockIcon style={{ fontSize: "16px" }} />
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default lessons;
