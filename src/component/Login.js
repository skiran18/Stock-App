import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./stockapp.png"; // Import the image

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#293b94",
    },
  },
});

export default function CustomLogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { username, password } = formData;
  const [loginError, setLoginError] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://13.53.184.137:5000/login", {
        username,
        password,
      });
      alert("Login successful");
      localStorage.setItem("isLoggesIn", true);
      const designation = localStorage.setItem("designation", res.data.designation);
      if(designation !== "manager") {
        localStorage.setItem("storeCode", res.data.storeId);
        navigate("/app");  
      };
    } catch (err) {
      setLoginError(err.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[50]
                  : theme.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to the StockApp! Manage inventories smartly!
            </Typography>
            <br></br>
            <Avatar src={backgroundImage} alt="icon"></Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleFormSubmit}
              sx={{ mt: 1 }}
            >
              {loginError != "" && <p className="loginerrmsg">{loginError}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => onChange(e)}
                value={username}
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
                onChange={(e) => onChange(e)}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
