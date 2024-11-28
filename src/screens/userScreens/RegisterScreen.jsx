import { React, useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/userSlices/usersApiSlice"; 
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validateForm from "../../validattion/formValidation.js";
import FormHelperText from "@mui/material/FormHelperText";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8291",
    },
  },
});

const RegisterScreen = () => {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    if(userInfo){
      if(userInfo.isAdmin){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
    }
   }, [navigate, userInfo])

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const [register, { isLoading }] = useRegisterMutation();


  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { fName, lName, email, password } = formData;
        const res = await register({ fName, lName, email, password }).unwrap();
        navigate("/otp", { state: res });
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#5B8291" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {isLoading && <Loader />}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fName"
                  required
                  fullWidth
                  id="fName"
                  label="First Name"
                  autoFocus
                  value={formData.fName}
                  onChange={inputChangeHandler}
                />
                {errors.fName && (
                  <FormHelperText error={true}>{errors.fName}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lName"
                  label="Last Name"
                  name="lName"
                  autoComplete="family-name"
                  value={formData.lName}
                  onChange={inputChangeHandler}
                />
                {errors.lName && (
                  <FormHelperText error={true}>{errors.lName}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={inputChangeHandler}
                />
                {errors.email && (
                  <FormHelperText error={true}>{errors.email}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={inputChangeHandler}
                />
                {errors.password && (
                  <FormHelperText error={true}>
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={inputChangeHandler}
                />
                {errors.confirmPassword && (
                  <FormHelperText error={true}>
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1.5 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterScreen;
