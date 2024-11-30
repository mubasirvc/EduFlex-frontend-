// import React from "react";
// import { Avatar, Typography, Button, Paper, Divider, } from "@mui/material";
// import { Link } from "react-router-dom";

// const UserProfile = ({ tutor, students, course, user, isTutor, }) => {
//   const paperStyle = {
//     maxWidth: "md",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//   };

//   const avatarStyle = {
//     width: "120px",
//     height: "120px",
//     marginBottom: "16px",
//   };

//   const usernameStyle = {
//     fontSize: "28px",
//     fontWeight: "bold",
//     marginBottom: "8px",
//   };

//   const subtitleStyle = {
//     fontSize: "18px",
//     color: "#666",
//     marginBottom: "8px",
//   };

//   const bioStyle = {
//     fontSize: "16px",
//     color: "#666",
//     marginBottom: "20px",
//     textAlign: "center",
//   };

//   const editButtonStyle = {
//     backgroundColor: "#2196F3",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "#1976D2",
//     },
//     marginTop: "16px",
//   };

//   return (
//     <Paper sx={{ width: "80%", mt: 12, ml: 'auto', mr: 'auto'}} elevation={3} style={paperStyle}>
//       <Avatar alt="User Avatar" style={avatarStyle}></Avatar>
//       <Typography variant="h4" style={usernameStyle}>
//         {tutor?.firstName}
//       </Typography>

//       {user && (
//         <>
//           {" "}
//           <Typography variant="subtitle1" style={subtitleStyle}>
//             Total Course: <strong>{course}</strong>
//           </Typography>
//           <Typography variant="subtitle1" style={subtitleStyle}>
//             Total Students: <strong>{students} </strong>
//           </Typography>
//         </>
//       )}

//       <Divider style={{ margin: "20px 0", width: "100%" }} />
//       <Typography variant="h6">About Me</Typography>
//       <Typography maxWidth={600} variant="body1" style={bioStyle}>
//         {tutor?.about}
//       </Typography>
//       <Divider style={{ margin: "20px 0", width: "100%" }} />
//       <Typography mb={2} variant="h6">{user ? 'Contact' : 'Details'}</Typography>
//       <Typography variant="body1" style={subtitleStyle}>
//         Email: {tutor?.email}
//       </Typography>
//       <Typography variant="body1" style={subtitleStyle}>
//         Location: {tutor?.city}
//       </Typography>
//       {isTutor && (
//         <>
//           <Typography variant="body1" style={subtitleStyle}>
//             Name: {tutor?.firstName} {tutor?.lastName}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             mobile: {tutor?.mobile}
//           </Typography>{" "}
//           <Typography variant="body1" style={subtitleStyle}>
//             Email: {tutor?.email}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             Location: {tutor?.city}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             Address1: {tutor?.addressline}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             Address2: {tutor?.addressline2}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             Mobile: {tutor?.mobile}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             Country: {tutor?.country}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             State: {tutor?.state}
//           </Typography>
//           <Typography variant="body1" style={subtitleStyle}>
//             Zip: {tutor?.zip}
//           </Typography>
//           <Link to={'/tutor/edit_profile'}>
//           <Button variant="contained" style={editButtonStyle}>
//             Edit Profile
//           </Button>
//           </Link>
//         </>
//       )}
//     </Paper>
//   );
// };

// export default UserProfile;

import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ tutor, students, course, user, isTutor }) => {
  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <div className="w-full mx-auto">
        {/* User Cover IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1707175834398-1fee671ce101?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Cover"
          className="w-full xl:h-[20rem] lg:h-[22rem] md:h-[16rem] sm:h-[13rem] xs:h-[9.5rem]"
        />

        {/* User Profile Image */}
        <div className="w-full mx-auto flex justify-center">
          <img
            src="https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM="
            alt="User Profile"
            className="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem]"
          />
        </div>

        <div className="xl:w-[80%] lg:w-[90%] md:w-[94%] sm:w-[96%] xs:w-[92%] mx-auto flex flex-col gap-4 justify-center items-center relative xl:-top-[6rem] lg:-top-[6rem] md:-top-[4rem] sm:-top-[3rem] xs:-top-[2.2rem]">
          {/* FullName */}
          <h1 className="text-center text-gray-800 dark:text-white text-4xl font-serif">
            {tutor?.firstName} {tutor?.lastName}
          </h1>

          {/* About */}
          <p className="w-full text-gray-700 dark:text-gray-400 text-md text-pretty sm:text-center xs:text-justify">
            {tutor?.about || "This user hasn't added a bio yet."}
          </p>

          {/* Social Links */}
          <div className="px-2 flex rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
            <a href="#">
              <div className="p-2 hover:text-primary hover:dark:text-primary">
                {/* LinkedIn Icon */}
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </div>
            </a>
            <a href="#">
              <div className="p-2 hover:text-primary hover:dark:text-primary">
                {/* X (Twitter) Icon */}
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.795 10.533L20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                </svg>
              </div>
            </a>
          </div>

          {/* Cards */}
          <div className="w-full flex gap-4 justify-center items-center mt-10">
            {/* Courses */}
            <div className="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
            Total Course: {course}
            </div>

            {/* Students */}
            <div className="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
            Total Students: {students}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Contact Info
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Email: {tutor?.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Location: {tutor?.city}
            </p>
          </div>

          {/* Edit Profile Button for Tutors */}
          {isTutor && (
            <Link to="/tutor/edit_profile">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 mt-4">
                Edit Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
