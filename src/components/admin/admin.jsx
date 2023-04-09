import Navbar from "../navbar/Navbar";
import MainLayout from "../mainlayout/mainlayout";
import Title from "../title/title";
import { Paper, Typography, Box, Tab, Button, Tabs } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useState } from "react";

const Admin = () => {
  const [tabvalue, setTabvalue] = useState(0);
  const adminNavigate = useNavigate();
  //   const homeNavigate = useNavigate();

  const TabProps = (index) => {
    return {
      id: `navbar-tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const handleLogoutButton = () => {
    // homeNavigate("/");
    localStorage.setItem("token", "");
  };

  const urlArray = ["allprouducts", "inventory and price", "orders/notDeliverdOrders"];

  const handleTabChange = (event, newTabValue) => {
    setTabvalue(newTabValue);
    
    //   console.log(newTabValue)
    adminNavigate(`/admin/${urlArray[newTabValue]}`);
  };

  return (
    <MainLayout>
      <Title title="صفحه ی مدیریت کالاها" />
      <Paper
        elevation={2}
        sx={{
          padding: "25px",
          height: "16vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "900" }}>
          پنل مدیریت فروشگاه
        </Typography>
        <Tabs
          aria-label="nav tabs example"
          value={tabvalue}
          onChange={handleTabChange}
        >
          <Tab
            sx={{ width: "200px", fontSize: "22px", color: "black" }}
            label="کالاها"
            {...TabProps(0)}
          />
          <Tab
            sx={{ width: "230px", fontSize: "22px", color: "black" }}
            label="موجودی و قیمت ها"
            {...TabProps(1)}
          />
          <Tab
            sx={{ width: "200px", fontSize: "22px", color: "black" }}
            label="سفارش ها"
            {...TabProps(2)}
          />
        </Tabs>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            بازگشت به سایت
          </Link>
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            onClick={handleLogoutButton}
          >
            خروج از حساب
          </Link>
        </div>
      </Paper>
      <Outlet />
    </MainLayout>
  );
};

export default Admin;
