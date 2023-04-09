import {
  Typography,
  Alert,
  Snackbar,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Paper,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainlayout/mainlayout";

import Title from "../title/title";

const PayMack = () => {
  const [status, setStatus] = useState(0);
  const successfulPaymentNavigate = useNavigate();
  const unsuccessfulPaymentNavigate = useNavigate();
  const cartFormNavigate = useNavigate();
  const [cart, setCart] = useState({});
//   const [whoami, setWhoami] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const pay = async () => {
    try {
      if (status === 1) {
        await axios.post("http://localhost:9000/orders", {
            ...cart,
            firstName:localStorage.firstName,
            lastName:localStorage.lastName,
            address:localStorage.address,
            phoneNumber:localStorage.phoneNumber,
            date: localStorage.date,
            deliverd:false
        });
        successfulPaymentNavigate("/pay/successfulPayment");

        await axios.delete(`http://localhost:9000/cart/${1}`);
        // await axios.delete(`http://localhost:9000/whoami/${1}`);
        await axios.get("http://localhost:9000/productscart").then((res) => {
          res.data.map((ele) => {
            axios.delete(`http://localhost:9000/productscart/${ele.id}`);
          });
        });
      } else if (status === 2) {
        unsuccessfulPaymentNavigate("/pay/unsuccessfulPayment");
        // axios.delete(`http://localhost:9000/whoami/${1}`);
      } else {
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const cancel = () => {
    cartFormNavigate("/cart/cartform");
    // axios.delete(`http://localhost:9000/whoami/${1}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:9000/cart/1").then((res) => {
          setCart({
            prouducts: res.data.prouducts,
            prices: res.data.prices,
          });
        });
        // axios.get("http://localhost:9000/whoami/1").then((res) => {
        //   setWhoami({
        //     firstName: res.data.firstName,
        //     lastName: res.data.lastName,
        //     address: res.data.address,
        //     phoneNumber: res.data.phoneNumber,
        //     date: res.data.date,
        //   });
        // });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

//   console.log(whoami);

  return (
    <MainLayout>
      <Title title="درگاه پرداخت اینترنتی" />
      <div
        style={{ marginInline: "auto", marginBlockStart: "20px", width: "50%" }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">وضعیت پرداخت</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Age"
              onChange={(event) => setStatus(event.target.value)}
            >
              <MenuItem value={1}>موفق</MenuItem>
              <MenuItem value={2}>ناموفق</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div style={{ display: "flex", gap: "15px", marginBlockStart: "50px" }}>
          <Button onClick={pay} variant="contained" color="success">
            پرداخت
          </Button>
          <Button onClick={cancel} variant="contained" color="error">
            لغو
          </Button>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="warning"
          color="warning"
          sx={{ width: "100%" }}
        >
          لطفا وضعیت پرداخت را انتخاب نمایید
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default PayMack;
