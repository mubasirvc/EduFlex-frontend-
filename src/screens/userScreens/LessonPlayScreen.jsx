import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/videoPlayer";
import Lessons from "../../components/user/lessons";
import { useParams } from "react-router-dom";
// import Questions from "../../components/user/questions";
import { userApi, userApiToken } from "../../services/api";
import { formatDistanceToNow } from "date-fns";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlertDialog from "../../components/AlertDialog";
import ChatPopUp from "../../components/user/chatPopup";
import CoursePlayerLessons from "../../components/user/CoursePlayerLessons";

const LessonPlayScreen = () => {
  const [lesson, setLesson] = useState({});
  const [question, setQuestion] = useState("");
  const [questionsData, setQuestionsData] = useState([]);
  const [open, setOpen] = useState(new Array(questionsData.length).fill(false));
  const [replyOpen, setReplyOpen] = useState(
    new Array(questionsData.length).fill(false)
  );
  const [reply, setReply] = useState(
    new Array(questionsData.length).fill(false)
  );
  const [replyUpdated, setReplayUpdated] = useState(false);
  const [questionUpdated, setquestionUpdated] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [lessonStatus, setLessonStatus] = useState({});
  const [tutor, setTutor] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  // const [completedIndex, setCompletedIndex] = useState(-1);

  const { courseId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const handleReplies = (i) => {
    const newOpen = [...open];
    newOpen[i] = !newOpen[i];
    setOpen(newOpen);
  };

  const handleRplyOpen = (index) => {
    const newReplyOpen = [...replyOpen];
    newReplyOpen[index] = !newReplyOpen[index];
    setReplyOpen(newReplyOpen);
  };

  const handleRply = (e, index) => {
    const newReply = [...reply];
    newReply[index] = newReply[index] = e.target.value;
    setReply(newReply);
  };

  // const [replyOpen, setReplyOpen] = useState({});
  const [openReplies, setOpenReplies] = useState({});

  const toggleReply = (index) => {
    setReplyOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleReplies = (index) => {
    setOpenReplies((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const playHandler = (lesson) => {
    setLesson(lesson);
  };

  const setLessoncount = (count) => {
    console.log(count);
  };

  /// load all questions api call

  useEffect(() => {
    const getQuestiotns = async () => {
      try {
        const res = await userApi.get(`questions?id=${courseId}`);
        if (res) {
          setQuestionsData(res.data);
        }
        setTutor(res.data[0].course.tutor);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestiotns();
  }, [replyUpdated, questionUpdated]);

  /// Submit new question handler function ///

  const submitHandler = async () => {
    const text = question;
    const lessonId = lesson._id;

    if (!text) return;
    try {
      const res = await userApiToken.post("question", {
        userId,
        courseId,
        lessonId,
        text,
      });
      if (res) {
        setquestionUpdated(!questionUpdated);
        toast.success(res.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /// Submit new reply handler function ///

  const replySubmitHandler = async (questionId, index) => {
    const text = reply[index];

    if (!text) return;
    try {
      const res = await userApiToken.post("reply", {
        userId,
        questionId,
        text,
      });
      if (res) {
        setReplayUpdated(!replyUpdated);
        toast.success(res.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /// Question edit api call it takes question id as querey and text in body

  const qstEditHandler = (id, text) => {
    try {
      const res = userApiToken.put(`questions?id=${id}`, { text });
      if (res) {
        toast.success(res.data);
        setquestionUpdated(!questionUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /// Question delete api call it takes question id as querey

  const qstDeleteHandler = async (id) => {
    try {
      const res = await userApiToken.delete(`questions?id=${id}`);
      if (res) {
        toast.success(res.data);
        setquestionUpdated(!questionUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /// Reply edit api call it takes question id as querey and text in body

  const replyEditHandler = (id, text) => {
    console.log(id, text);
    try {
      const res = userApiToken.put(`reply?id=${id}`, { text });
      if (res) {
        toast.success(res.data);
        setReplayUpdated(!replyUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /// Reply delete api call it takes question id as querey

  const replyDeleteHandler = async (id) => {
    try {
      const res = await userApiToken.delete(`reply?id=${id}`);
      if (res) {
        toast.success(res.data);
        setReplayUpdated(!replyUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchCompletedCourse = async () => {
      const res = await userApi.get(
        `progress?userId=${userId}&courseId=${courseId}`
      );

      const completed = [];
      res.data.completedLessons.map((lesson, i) => {
        // completed.push(lesson._id)
        completed[i] = lesson._id;
      });
      setCompletedLessons(completed);
    };
    fetchCompletedCourse();
  }, []);

  const onComplete = async (lessonId) => {
    if (completedLessons.includes(lessonId)) return;

    const res = await userApi.post("progress", { userId, courseId, lessonId });
    setCompletedLessons(res.data.userProgress.completedLessons);
  };

  return (
    <>
      <Box display={"flex"} sx={{ pt: 8 }}>
        <VideoPlayer
          url={lesson.videoUrl}
          lessonId={lesson._id}
          onComplete={onComplete}
        />
        <Box
          style={{ width: "30%" }}
          ml={2}
          mt={4}
          mr={2}
          sx={{
            maxHeight: {
              xs: "200px",
              sm: "300px",
              md: "400px",
              lg: "550px",
            },
            overflowY: "auto",
          }}
        >
          <CoursePlayerLessons
            status={false}
            width={"100px"}
            courseId={courseId}
            height={"auto"}
            des={"p"}
            onPlayHandler={playHandler}
            completed={completedLessons}
          />
        </Box>
      </Box>
      <p className="text-xl m-8">
        Status: {lessonStatus.completed ? "Completed" : "Not completed"}
      </p>
      <Divider width={"69%"} />

      {lesson && (
        <Box
          height={80}
          width={"69%"}
          sx={{ backgroundColor: "#f5f5f5" }}
          p={3}
          pl={5}
        >
          <Typography variant="subtitle1">
            Lesson No: {lesson.lessonNumber}
          </Typography>
          <Typography variant="h6">Title: {lesson.title}</Typography>
          <Typography variant="p">Description: {lesson.description}</Typography>
        </Box>
      )}

      <Box
        p={4}
        width={"69%"}
        height={"auto"}
        color={"#244D61"}
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        {lesson && (
          <div className="relative max-w-7xl bg-white rounded-lg border pt-4 mx-auto mt-2">
            <div className="absolute px-2 top-0 -left-[0.5] bg-indigo-200 rounded-tl-lg rounded-br-lg">
              <h2 className="text-md font-semibold text-gray-800">
                Discussion
              </h2>
            </div>
            <form onSubmit={submitHandler}>
              <div className="w-full px-3 mb-2 mt-6">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal w-full h-28 p-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Your comment"
                  required=""
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="w-full flex justify-end px-3 my-3">
                <button
                  className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                  type="submit"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        )}
        {/* <Typography mt={3} variant="h6" component={"h3"}>
          Recently asked questions
        </Typography> */}

          <div className="w-full bg-white rounded-lg border p-4 md:p-6 mx-auto mt-5">
            <h3 className="font-semibold p-2">Recently asked questions</h3>
            <div className="flex flex-col gap-1">
              {questionsData.map((qst, index) => {
                return (
                  <>
                    <Box display={"flex"} m={1}>
                      <Avatar
                        sx={{
                          backgroundColor: "#244D61",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <Typography sx={{ fontSize: "16px" }}>
                          {qst.user.fName[0]}
                        </Typography>
                      </Avatar>
                      <Typography
                        sx={{ textDecoration: "underline" }}
                        variant="subtitle1"
                        component={"h3"}
                        fontSize={16}
                        ml={1}
                      >
                        {qst.user.fName}
                      </Typography>
                      <Typography
                        fontSize={14}
                        ml={2}
                        variant="caption"
                        color="textSecondary"
                      >
                        {formatDistanceToNow(new Date(qst.createdAt), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </Box>
                    <Box ml={7} mb={1}>
                      <Typography variant="subtitle">{qst.text}</Typography>
                    </Box>
                    <Box display={"flex"} ml={2} color="#7B94A0">
                      <Button
                        mr={1}
                        sx={{ ml: 5 }}
                        onClick={() => {
                          handleRplyOpen(index);
                        }}
                        style={{ fontSize: 13, textTransform: "capitalize" }}
                      >
                        Reply
                      </Button>
                      {qst.user._id === userId ? (
                        <>
                          <AlertDialog
                            item={"question"}
                            qstDeleteHandler={qstDeleteHandler}
                            id={qst._id}
                          />
                          <AlertDialog
                            item={"qstnEdit"}
                            value={qst.text}
                            qstEditHandler={qstEditHandler}
                            id={qst._id}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Collapse sx={{ mb: 1 }} in={replyOpen[index]}>
                      <TextField
                        sx={{ ml: 7, width: "70%" }}
                        variant="standard"
                        placeholder="Add a reply"
                        onChange={(e) => {
                          handleRply(e, index);
                        }}
                        value={reply[index]}
                      ></TextField>
                      <Button
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                          replySubmitHandler(qst._id, index);
                        }}
                      >
                        Reply
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => {
                          handleRplyOpen(index);
                        }}
                        style={{ textTransform: "capitalize" }}
                      >
                        Cancel
                      </Button>
                    </Collapse>

                    <Box
                      width={120}
                      onClick={() => handleReplies(index)}
                      ml={6}
                    >
                      {open[index] ? <ExpandLess /> : <ExpandMore />}
                      <Button
                        style={{ textTransform: "capitalize" }}
                        sx={{ fontSize: 14, pb: 2 }}
                      >
                        {qst.replies.length} Replies
                      </Button>
                    </Box>

                    {qst.replies.map((rply) => {
                      return (
                        <Box ml={6} mb={3}>
                          <Collapse in={open[index]}>
                            <Box ml={2}>
                              <Box display={"flex"} m={1}>
                                <Avatar
                                  sx={{
                                    width: "24px",
                                    height: "24px",
                                    backgroundColor: "#244D61",
                                  }}
                                >
                                  <Typography sx={{ fontSize: "16px" }}>
                                    {rply.user.fName[0]}
                                  </Typography>
                                </Avatar>
                                <Typography
                                  sx={{ textDecoration: "underline" }}
                                  fontSize={14}
                                  component={"h1"}
                                  ml={1}
                                >
                                  {rply.user.fName}
                                </Typography>
                                <Typography
                                  fontSize={13}
                                  ml={1}
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  {formatDistanceToNow(
                                    new Date(rply.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </Typography>
                              </Box>
                              <Typography variant="subtitle" ml={5}>
                                {rply.text}
                              </Typography>
                              <Box display={"flex"} ml={5} color="#7B94A0">
                                {rply.user._id === userId ? (
                                  <>
                                    <AlertDialog
                                      item={"reply"}
                                      replyDeleteHandler={replyDeleteHandler}
                                      id={rply._id}
                                    />
                                    <AlertDialog
                                      item={"replyEdt"}
                                      value={rply.text}
                                      replyEditHandler={replyEditHandler}
                                      id={rply._id}
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Box>
                          </Collapse>
                        </Box>
                      );
                    })}
                  </>

                  // <div className="w-full bg-white rounded-lg border p-4 md:p-6 mx-auto">
                  //   <h3 className="font-semibold p-2">Discussion</h3>
                  //   <div className="flex flex-col gap-5">
                  //     {questionsData.map((qst, index) => (
                  //       <div key={qst._id} className="border rounded-md p-3">
                  //         <div className="flex justify-between">
                  //           <div>
                  //             <div className="flex gap-3 items-center">
                  //               <img
                  //                 src={`https://ui-avatars.com/api/?name=${qst.user.fName}`}
                  //                 alt="Avatar"
                  //                 className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-md"
                  //               />
                  //               <h3 className="font-bold">
                  //                 {qst.user.fName}
                  //                 <br />
                  //                 <span className="text-sm text-gray-400 font-normal">
                  //                   {formatDistanceToNow(new Date(qst.createdAt), {
                  //                     addSuffix: true,
                  //                   })}
                  //                 </span>
                  //               </h3>
                  //             </div>
                  //             <p className="text-gray-600 mt-2">{qst.text}</p>
                  //             <button
                  //               className="text-blue-500 text-sm"
                  //               onClick={() => toggleReply(index)}
                  //             >
                  //               Reply
                  //             </button>
                  //             {replyOpen[index] && (
                  //               <div className="mt-2">
                  //                 <textarea
                  //                   className="w-full border rounded-md p-2"
                  //                   placeholder="Add a reply..."
                  //                   onChange={(e) => handleReply(e, index)}
                  //                 ></textarea>
                  //                 <button className="text-blue-500 mt-2 text-sm">
                  //                   Submit
                  //                 </button>
                  //               </div>
                  //             )}
                  //           </div>

                  //           <div className="flex flex-col gap-3">
                  //             {qst.user._id === userId && (
                  //               <>
                  //                 <button onClick={() => handleEdit(qst._id)}>
                  //                   <svg
                  //                     className="w-6 h-6 text-gray-600"
                  //                     fill="none"
                  //                     xmlns="http://www.w3.org/2000/svg"
                  //                     viewBox="0 0 24 24"
                  //                     stroke="currentColor"
                  //                   >
                  //                     <path
                  //                       strokeLinecap="round"
                  //                       strokeLinejoin="round"
                  //                       strokeWidth="2"
                  //                       d="M12 20h9m-9 0H3m9-9h7m-7 0H3"
                  //                     />
                  //                   </svg>
                  //                 </button>
                  //                 <button onClick={() => handleDelete(qst._id)}>
                  //                   <svg
                  //                     className="w-6 h-6 text-gray-600"
                  //                     fill="none"
                  //                     xmlns="http://www.w3.org/2000/svg"
                  //                     viewBox="0 0 24 24"
                  //                     stroke="currentColor"
                  //                   >
                  //                     <path
                  //                       strokeLinecap="round"
                  //                       strokeLinejoin="round"
                  //                       strokeWidth="2"
                  //                       d="M6 18L18 6M6 6l12 12"
                  //                     />
                  //                   </svg>
                  //                 </button>
                  //               </>
                  //             )}
                  //             <button onClick={() => toggleReplies(index)}>
                  //               <svg
                  //                 className="w-6 h-6 text-gray-600"
                  //                 xmlns="http://www.w3.org/2000/svg"
                  //                 fill="none"
                  //                 viewBox="0 0 24 24"
                  //                 strokeWidth="2"
                  //                 stroke="currentColor"
                  //               >
                  //                 <path
                  //                   strokeLinecap="round"
                  //                   strokeLinejoin="round"
                  //                   d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  //                 />
                  //               </svg>
                  //             </button>
                  //           </div>
                  //         </div>

                  //         {openReplies[index] && (
                  //           <div className="ml-5 mt-3">
                  //             {qst.replies.map((reply) => (
                  //               <div
                  //                 key={reply._id}
                  //                 className="flex justify-between border rounded-md p-3"
                  //               >
                  //                 <div>
                  //                   <div className="flex gap-3 items-center">
                  //                     <img
                  //                       src={`https://ui-avatars.com/api/?name=${reply.user.fName}`}
                  //                       alt="Avatar"
                  //                       className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-md"
                  //                     />
                  //                     <h3 className="font-bold">
                  //                       {reply.user.fName}
                  //                       <br />
                  //                       <span className="text-sm text-gray-400 font-normal">
                  //                         {formatDistanceToNow(
                  //                           new Date(reply.createdAt),
                  //                           { addSuffix: true }
                  //                         )}
                  //                       </span>
                  //                     </h3>
                  //                   </div>
                  //                   <p className="text-gray-600 mt-2">
                  //                     {reply.text}
                  //                   </p>
                  //                 </div>

                  //                 {reply.user._id === userId && (
                  //                   <div className="flex flex-col gap-2">
                  //                     <button onClick={() => handleEdit(reply._id)}>
                  //                       <svg
                  //                         className="w-5 h-5 text-gray-600"
                  //                         fill="none"
                  //                         xmlns="http://www.w3.org/2000/svg"
                  //                         viewBox="0 0 24 24"
                  //                         stroke="currentColor"
                  //                       >
                  //                         <path
                  //                           strokeLinecap="round"
                  //                           strokeLinejoin="round"
                  //                           strokeWidth="2"
                  //                           d="M12 20h9m-9 0H3m9-9h7m-7 0H3"
                  //                         />
                  //                       </svg>
                  //                     </button>
                  //                     <button
                  //                       onClick={() => handleDelete(reply._id)}
                  //                     >
                  //                       <svg
                  //                         className="w-5 h-5 text-gray-600"
                  //                         fill="none"
                  //                         xmlns="http://www.w3.org/2000/svg"
                  //                         viewBox="0 0 24 24"
                  //                         stroke="currentColor"
                  //                       >
                  //                         <path
                  //                           strokeLinecap="round"
                  //                           strokeLinejoin="round"
                  //                           strokeWidth="2"
                  //                           d="M6 18L18 6M6 6l12 12"
                  //                         />
                  //                       </svg>
                  //                     </button>
                  //                   </div>
                  //                 )}
                  //               </div>
                  //             ))}
                  //           </div>
                  //         )}
                  //       </div>
                  //     ))}
                  //   </div>
                  // </div>
                );
              })}
              <Divider />
            </div>
          </div>
      </Box>
      <div style={{ position: "fixed", bottom: 80, right: 20 }}>
        <ChatPopUp tutorId={tutor} />
      </div>
    </>
  );
};

export default LessonPlayScreen;
