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
  //const [data, setData] = useState({ login: "", password: "" });
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const [emailError, setEmailError] = useState(false);
      const [passwordError, setPasswordError] = useState(false);

  const [datasubmit, setDataSubmit] = useState(JSON.parse(localStorage.getItem("datasubmit")));
  const [token, setToken] = useState(null);
  const [userResult, setUserResult] = useState({name: "", avatar : ""});
  const [news, setNews] = useState([]);
  const [flag, setFlag] = useState(false);
  
     //  const formData = new FormData(target);
  const loaddata = () => {
//    console.log(datasubmit);
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
            setDataSubmit(result.message);
            setToken(result.token);
            //console.log(result.token);//localStorage.setItem("token", result.token);
            setFlag(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 1000);
  };

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
          //localStorage.setItem("flag", true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  //console.log(userResult);
  useEffect(() => {
    if (datasubmit) {
      loaddata();
    }
    if (token) {
    funcGetToken();
    }
    if (flag) {
    funcGetNews();
    }
  }, [datasubmit, token, flag]);

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
  };

     const onSubmit = (event) => {
       event.preventDefault();

       setEmailError(false);
       setPasswordError(false);

       if (email == "") {
         setEmailError(true);
       }
       if (password == "") {
         setPasswordError(true);
       }

       if (email !== "" && password !== "") {
         console.log(email, password);
         setDataSubmit({ login: email, password: password });
         localStorage.setItem(
           "datasubmit",
           JSON.stringify({ login: email, password: password })
         );
       }
     };

  const handleClickLogout = () => {
    setDataSubmit({ login: "", password: "" });
    localStorage.removeItem("datasubmit");
    setDataSubmit({ login: "", password: "" });
    setToken(null);
    setUserResult(null);
    setFlag(false);
    localStorage.removeItem("flag");
  };
  if (flag === true) {
    return (
      <>
        <Box component="form"  autoComplete="off" onSubmit={onSubmit}>
          <AppBar
            position="static"
            display="flex"
            sx={{
              width: "100%",
              height: 100,
              bgcolor: "lightbeige",
              margin: " 20px 20px 20px 0",
              padding: "20px 20px 20px 0 ",
              marginTop: "0px",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Toolbar
              position="static"
              display="flex"
              sx={{
                width: "100%",
                height: 100,
                bgcolor: "lightbeige",
                margin: " 20px 20px 20px 0",
                // padding: "20px 20px 20px 0 ",
                marginTop: "0px",
                justifyContent: "start",
                alignItems: "space-between",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                position="static"
                display="flex"
                sx={{
                  margin: "20px",
                  justifyContent: "space-between",
                  alignItems: "space-between",
                }}
              >
                Neto Social
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  margin: " 20px 20px 20px 0",
                }}
              >
                {userResult.name}
              </Typography>
              <IconButton
                sx={{
                  margin: " 20px 20px 20px 0",
                }}
              >
                <Avatar alt={userResult.name} src={userResult.avatar} />
              </IconButton>

              <Button
                sx={{
                  display: "block",
                  position: "absolute",
                  bgcolor: "blue",
                  color: "white",
                  right: "30px",
                  margin: " 20px 20px 20px 0",
                }}
                onClick={handleClickLogout}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            margin: "30px",
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
              width: "50%",
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
                  fontSize: "15px",
                }}
                key={item.id}
              >
                <h3>{item.title}</h3>
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
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <AppBar
            position="static"
            display="flex"
            sx={{
              width: "100%",
              height: 100,
              bgcolor: "lightbeige",
              fontSize: "30px",
              margin: "20px 20px 20px 20px",
              marginTop: "0px",
              justifyContent: "center",
              alignItems: "space-between",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  width: "100%",
                  margin: " 20px 0 20px 0",
                  fontSize: "30px",
                }}
              >
                Neto Social
              </Typography>
              <TextField
                id="outlined-required"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                color="secondary"
                type="email"
                sx={{ bgcolor: "white" }}
                fullWidth
                value={email}
                error={emailError}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                color="secondary"
                type="password"
                value={password}
                error={passwordError}
                fullWidth
                sx={{ bgcolor: "white" }}
              />
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                sx={{
                  bgcolor: "blue",
                  color: "white",
                  margin: " 20px 20px 20px 20px",
                }}
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </form>

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
