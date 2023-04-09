import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subcategory from "./components/subcategory/subcategory";
import ProuductInfo from "./components/prouductinfo/prouductinfo";
import Cart from "./components/cart/cart";
import CartForm from "./components/cartform/cartform";
import EditCart from "./components/edit/editcart";
import LoginPage from "./components/loginpage/loginpage";
import Admin from "./components/admin/admin";
import AllProuducts from "./components/allprouducts/allprouducts";
import InventoryAndPrice from "./components/InventoryAndPrice/InventoryAndPrice";
import Orders from "./components/orders/orders";
import PayMack from "./components/paymack/paymack";
import SuccessfulPayment from "./components/successfulPayment/successfulPayment";
import UnsuccessfulPayment from "./components/unsuccessfulPayment/unsuccessfulPayment";
import DeliverdOrder from "./components/deliverdOrders/deliverdOrders";
import NotDeliverdOrder from "./components/notDeliverdOrders/notDeliverdOrders";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route
          path="/:categoryNumber/:subcategoryNumber"
          element={<Subcategory></Subcategory>}
        ></Route>
        <Route
          path="/:categoryNumber/:subcategoryNumber/:idNumber"
          element={<ProuductInfo></ProuductInfo>}
        ></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/cart/editcart/:idNumber" element={<EditCart />}></Route>
        <Route path="/cart/cartform" element={<CartForm />}></Route>
        <Route path="/pay" element={<PayMack />} />
        <Route path="/pay/successfulPayment" element={<SuccessfulPayment />} />
        <Route
          path="/pay/unsuccessfulPayment"
          element={<UnsuccessfulPayment />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/allprouducts" element={<AllProuducts />} />
          <Route
            path="/admin/inventory and price"
            element={<InventoryAndPrice />}
          />
          <Route path="/admin/orders" element={<Orders />} >
            <Route path="/admin/orders/deliverdOrders" element={<DeliverdOrder/>} />
            <Route path="/admin/orders/notDeliverdOrders" element={<NotDeliverdOrder/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
