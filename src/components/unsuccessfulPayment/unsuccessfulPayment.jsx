import { Box, Typography, Button } from "@mui/material";
import MainLayout from "../mainlayout/mainlayout";
import Title from "../title/title";
import { AiFillCloseCircle, AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh } from 'react-icons/io'

const UnsuccessfulPayment = () => {
  const homeNavigate = useNavigate();
  const cartFormNavigate = useNavigate();
  return (
    <MainLayout>
      <Title title="پرداخت ناموفق" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginBlockStart: "30vh",
        }}
      >
        <AiFillCloseCircle size={100} color="#d32f2f" />
        <Typography variant="h2">پرداخت موفقیت آمیز نبود</Typography>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            startIcon={<AiFillHome />}
            onClick={() => homeNavigate("/")}
            variant="contained"
            color="success"
            size="large"
          >
            بازگشت به صفحه ی اصلی
          </Button>
          <Button
            startIcon={<IoMdRefresh />}
            onClick={() => cartFormNavigate("/cart/cartform")}
            variant="contained"
            color="warning"
            size="large"
          >
            تلاش مجدد
          </Button>
        </div>
      </Box>
    </MainLayout>
  );
};

export default UnsuccessfulPayment;
