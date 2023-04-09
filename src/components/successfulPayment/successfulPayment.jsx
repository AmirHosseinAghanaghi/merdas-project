import { Button, Typography, Box } from "@mui/material";
import MainLayout from "../mainlayout/mainlayout";
import Title from "../title/title";
import { AiFillCheckCircle, AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SuccessfulPayment = () => {
  const homeNavigate = useNavigate();
  return (
    <MainLayout>
      <Title title="پرداخت موفق" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginBlockStart: "30vh",
        }}
      >
        <AiFillCheckCircle size={100} color="#2e7d32" />
        <Typography variant="h2">پرداخت موفقیت آمیز بود</Typography>
        <Button
          startIcon={<AiFillHome />}
          onClick={() => homeNavigate("/")}
          variant="contained"
          color="success"
          size="large"
        >
          بازگشت به صفحه ی اصلی
        </Button>
      </Box>
    </MainLayout>
  );
};

export default SuccessfulPayment;
