import React, { useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";

const StyledReactPlayer = styled(ReactPlayer)(({ theme }) => ({
  maxHeight: {
    xs: "200px",
    sm: "300px",
    md: "400px",
    lg: "500px",
  },
  overflowY: "auto",
  border: "3px solid black",
  marginTop: "30px",
  backgroundColor: "black",
  marginLeft: "50px",
}));

const VideoPlayer = ({ url, lessonId, onComplete }) => {
  return (
    <>
      <StyledReactPlayer
        onEnded={() => onComplete(lessonId)}
        url={url}
        controls
        style={{marginLeft: 25, borderRadius: 12}}
        width="68%"
        height="auto"
        playing={false}
      />
    </>
  );
};

export default VideoPlayer;
