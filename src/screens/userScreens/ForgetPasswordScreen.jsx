import React, { useState } from "react";
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

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USERS_URL } from "../../constants/usersConstants";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post(USERS_URL + "forget_password", { email });

    if (res.status === 201) {
      console.log(res.data);
      const data = res.data;
      navigate("/reset_password", { state: data });
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5B8291",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#5B8291" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, minWidth: "350px", mb: "130px" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1.5 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={"/login"} variant="body2">
                  Login?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"/register"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgetPasswordScreen;
