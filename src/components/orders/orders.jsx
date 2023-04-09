import MainLayout from "../mainlayout/mainlayout";
import Loading from "../lodaing/loading";
import Title from "../title/title";
import { useState } from "react";
import {
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const ordersNavigate = useNavigate();

  const navigate = (event) => {
    ordersNavigate(`/admin/orders/${event.target.value}`);
  };

  return (
    <MainLayout>
      <Title title="سفارش ها" />
      {loading ? (
        <Loading />
      ) : (
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="notDeliverdOrders"
            name="radio-buttons-group"
            sx={{ display: "flex", justifyContent: "flex-end" }}
            onChange={navigate}
          >
            <FormControlLabel
              value="notDeliverdOrders"
              control={<Radio />}
              label="سفارش های در انتظار"
            />
            <FormControlLabel
              value="deliverdOrders"
              control={<Radio />}
              label="سفارش های تحویل داده شده"
            />
          </RadioGroup>
        </FormControl>
      )}
      <Outlet />
    </MainLayout>
  );
};

export default Orders;
