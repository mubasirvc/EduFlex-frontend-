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
import { React, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Loading from "./Loader";
import { flexbox } from "@mui/system";
import { ButtonGroup } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8291",
    },
  },
});

const LoginForm = ({ onSubmitHandler, isLoading, title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeButton, setActiveButton] = useState('student');

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{mb: 10}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
            <ButtonGroup>
              <Button
                component={RouterLink}
                to="/tutor/login"
                type="button"
                variant={activeButton === "tutor" ? "contained" : "outlined"}
                onClick={() => setActiveButton("tutor")}
                sx={{ p: 1.5 }}
              >
                Tutor Login
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                type="button"
                variant={activeButton === "student" ? "contained" : "outlined"}
                onClick={() => setActiveButton("student")}
                sx={{ p: 1.5 }}
              >
                Student Login
              </Button>
            </ButtonGroup>
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "#5B8291" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title} Sign in
          </Typography>

          {isLoading && <Loading />}
          <Box
            component="form"
            onSubmit={(e) => {
              onSubmitHandler(e, email, password);
            }}
            noValidate
            sx={{ mt: 1 }}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1.5 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to="/forget_password"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
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

export default LoginForm;
