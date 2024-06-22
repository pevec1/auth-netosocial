import { useState, useEffect } from "react";
import "./App.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
function App() {
  const [data, setData] = useState({ login: "", password: "" });
  const [datasubmit, setDataSubmit] = useState({ login: "", password: "" });
  const [token, setToken] = useState(null);
  const [userResult, setUserResult] = useState(null);
  const [news, setNews] = useState(null);
  const [flag, setFlag] = useState(false);

  const onChange = (event) => {
    const { target } = event;
    console.log(target);
    const { value } = target;
    setData({ ...data, [target.name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const { target } = event;
    const formData = new FormData(target);
    setDataSubmit(Object.fromEntries(formData));
  };
  const loaddata = () => {
    console.log(datasubmit);
    setTimeout(() => {
      fetch("https://authback.axareact.ru/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datasubmit),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message !== "user not found") {
            setData(result.message);
            setToken(result.token);
            setFlag(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 1000);
  };

  useEffect(() => {
    loaddata();
    // handleClickLogout();
  }, [datasubmit]);

  const funcGetToken = () => {
    if (token) {
      fetch("https://authback.axareact.ru/private/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserResult(result);
          setFlag(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  console.log(userResult);
  useEffect(() => {
    funcGetToken();
  }, [token]);

  const funcGetNews = () => {
    fetch("https://authback.axareact.ru/private/news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setNews(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

  useEffect(() => {
    funcGetNews();
  }, [token]);
  const handleClickLogout = () => {
    setDataSubmit({ login: "", password: "" });
    setData({ login: "", password: "" });
    setToken(null);
    setUserResult(null);
    setFlag(false);
  };

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
              bgcolor: "lightbeige",
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ MarginOutlined: "50px" }}
              >
                Neto Social
              </Typography>
              {userResult.avatar === "" ? null : (
                <Typography variant="h6" component="div">
                  {userResult.name}
                </Typography>
              )}
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={userResult.name} src={userResult.avatar} />
              </IconButton>

              <Button
                sx={{ bgcolor: "blue", color: "white" }}
                onClick={handleClickLogout}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            margin: "auto",
            marginTop: "50px",
            padding: "20px",
            width: "80%",
            height: "170vh",
            bgcolor: "lightbeige",
            fontSize: "30px",
          }}
        >
          <h1>Neto Social</h1>
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              fontSize: "15px",
              width: "80%",
              height: "100%",
            }}
          >
            {news?.map((item) => (
              <li
                style={{
                  margin: "10px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "40%",
                }}
                key={item.id}
              >
                <h6>{item.title}</h6>
                <p>
                  <img src={item.image} alt={item.title} />
                </p>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
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
              bgcolor: "lightbeige",
              justifyContent: "center",
              alignItems: "space-between",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6" component="div">
                Neto Social
              </Typography>
              <TextField
                required
                id="outlined-required"
                name="login"
                // defaultValue="User Name"
                value={data?.login || ""}
                sx={{ bgcolor: "white" }}
                onChange={onChange}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                value={data?.password || ""}
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
            bgcolor: "lightbeige",
            fontSize: "30px",
          }}
        >
          <h1>Neto Social</h1>
          <p>Facebook and VK killer...</p>
        </Box>
      </>
    );
  }
}

export default App;
