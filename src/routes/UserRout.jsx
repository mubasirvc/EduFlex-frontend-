import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/userScreens/HomeScreen";
import LoginScreen from "../screens/userScreens/LoginScreen";
import RegisterScreen from "../screens/userScreens/RegisterScreen";
import OtpScreen from "../screens/userScreens/OtpScreen";
import ForgetPasswordScreen from "../screens/userScreens/ForgetPasswordScreen";
import ResetPasswordScreen from "../screens/userScreens/ResetPasswordScreen";
import ProfileScreen from "../screens/userScreens/ProfileScreen";
import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/user/Header";
import Footer from "../components/Footer";
import CourseView from "../components/user/CourseView";
import CheckoutScreen from "../components/user/CheckoutScreen";
import PaymentScreen from "../components/user/PaymentScreen";
import CourseScreen from "../screens/userScreens/CourseScreen";
import SuccessPage from "../components/user/SuccessPage"; 
import MyCoursesScreen from "../screens/userScreens/MyCoursesScreen";
import LessonPlayScreen from "../screens/userScreens/LessonPlayScreen";
import theme from "../components/ThemeProvider";
import { ThemeProvider } from "@emotion/react";
import FilteredCourse from '../components/user/FilteredCourse'
import CourseTutor from "../components/user/Course_tutor";
import Chat from '../screens/chat'
import Profile from '../components/tutor/Profile'
import Page404 from '../screens/Page404'
import Navbar from "../components/user/Navbar";

const UserRoutes = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/forget_password" element={<ForgetPasswordScreen />} />
        <Route path="/reset_password" element={<ResetPasswordScreen />} />
        <Route path="/course" element={<CourseScreen />} />
        <Route path="/my_courses" element={<MyCoursesScreen />} />
        <Route path="/course_view/:id" element={<CourseView />} />
        <Route path="/filtered/:id/:name" element={<FilteredCourse />} />
        <Route path="/filter_tutor/:id" element={<CourseTutor />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/watch/:courseId" element={<LessonPlayScreen/>}/>
          <Route path="/success" element={<SuccessPage />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
      </ThemeProvider>
    </>
  );
};

export default UserRoutes;
