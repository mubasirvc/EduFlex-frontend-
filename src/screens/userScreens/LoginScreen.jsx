import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/userSlices/usersApiSlice";
import { setCredentials } from "../../slices/userSlices/authSlice";
import { toast } from "react-toastify";
import LoginForm from "../../components/LoginForm";
import { userApi } from "../../services/api";
import { Button } from "@mui/material";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     if (userInfo.isAdmin){
  //       navigate("/admin/dashboard")
  //     } else {
  //       navigate("/");
  //     }
  //   }
  // }, [navigate, userInfo]);

  const handleSubmit = async (event, email, password) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      // const res = await userApi.post('auth', { email, password } )
      dispatch(setCredentials({ ...res }));
      if (res.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <LoginForm
      onSubmitHandler={handleSubmit}
      isLoading={isLoading}
      title={"Student"}
    />
  );
};

export default LoginScreen;
