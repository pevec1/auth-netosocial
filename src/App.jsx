import { useState, useEffect } from "react";
import "./App.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
function App() {
  const [data, setData] = useState({ name: "", password: "" });
  const [flag, setFlag] = useState(false);

  const onChange = (event) => {
    const { target } = event;
    console.log(target);
    const { value } = target;
    setData(value);
    console.log("value:", value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const { target } = event;
    const formData = new FormData(target);

    const data2 = Object.fromEntries(formData);
    setData(data2);
    loaddata();
    console.log(data2, flag);
    if (
      data2.login === data.login &&
      data2.password === data.password) {
      setFlag(true);
      console.log(data2, flag);
    } else if (data2.message === "user not found") {
      setFlag(false);
      console.log(data2, flag);
    }
  };
  const loaddata = () => {
    console.log(data);
    fetch("https://backend-auth-0xh2.onrender.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data, flag);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    loaddata();
  }, [flag]);

  if (flag === true) {
    return (
      <>
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <AppBar
            position="static"
            display="flex"
            sx={{
              width: "100%",
              height: 100,
              bgcolor: "lightgrey",
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <Typography variant="h6" component="div">
                Neto Social
              </Typography>
              <Button sx={{ bgcolor: "blue", color: "white" }} type="submit">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            padding: "20px",
            width: "100%",
            height: 300,
            bgcolor: "lightgrey",
            fontSize: "30px",
          }}
        >
          {flag}
          <h1>Neto Social</h1>
          <p>Facebook and VK killer...</p>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <AppBar
            position="static"
            display="flex"
            sx={{
              width: "100%",
              height: 100,
              bgcolor: "lightgrey",
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <Typography variant="h6" component="div">
                Neto Social
              </Typography>
              <TextField
                required
                id="outlined-required"
                name="name"
                // defaultValue="User Name"
                value={data.name}
                sx={{ bgcolor: "white" }}
                onChange={onChange}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                value={data.password}
                sx={{ bgcolor: "white" }}
                autoComplete="current-password"
                onChange={onChange}
              />
              <Button sx={{ bgcolor: "blue", color: "white" }} type="submit">
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            padding: "20px",
            width: "100%",
            height: 300,
            bgcolor: "lightgrey",
            fontSize: "30px",
          }}
        >
          {flag}
          <h1>Neto Social</h1>
          <p>Facebook and VK killer...</p>
        </Box>
      </>
    );
  }
}

export default App;
