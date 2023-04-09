import { useEffect, useState } from "react";
import MainLayout from "../mainlayout/mainlayout";
import Title from "../title/title";
import { Button, Paper, Typography, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const adminPageNavigate = useNavigate();
  const [usersInfo, setUsersInfo] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEnterButton = () => {
    
      usersInfo.map((ele) => {
        if (ele.username === userName && ele.password === password) {
          adminPageNavigate("/admin/allprouducts");
          localStorage.setItem("token", "token");
        }
      });
     
      return setSnackbarOpen(true);
    
  };

    const handleSnackbarClose = () => {
      setSnackbarOpen(false)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:9000/users").then((res) => {
          setUsersInfo(res.data);
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <Title title="فرم ورود به صفحه ی ادمین" />
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          gap: "25px",
          width: "600px",
          height: "60vh",
          marginInline: "auto",
          marginBlockStart: "20vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "900", marginBlockEnd: "35px" }}
        >
          ورود به پنل مدیریت فروشگاه مرداس
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            gap: "8px",
          }}
        >
          <label htmlFor="">نام کاربری : </label>
          <input type="text" onChange={handleUsername} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            gap: "8px",
          }}
        >
          <label htmlFor="">رمز عبور : </label>
          <input type="password" onChange={handlePassword} />
        </div>

        <Button
          onClick={handleEnterButton}
          sx={{ marginBlockStart: "40px" }}
          color="success"
          size="large"
          variant="contained"
        >
          ورود
        </Button>
        <Link style={{ textDecoration: "none" }} to={"/"}>
          بازگشت به سایت
        </Link>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          نام کاربری یا رمز عبور صحیح نمی باشد
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default LoginPage;
