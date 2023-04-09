import { Typography, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Loading from "../lodaing/loading";
import MainLayout from "../mainlayout/mainlayout";
import Title from "../title/title";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cartFormSchema } from "../../validation/cartformValidation";
import Navbar from "../navbar/Navbar";
import "./cartform.css";
// import * as jalaliDatepicker from "@majidh1/jalalidatepicker"
import { useNavigate } from "react-router-dom";
import { DatePicker } from "react-advance-jalaali-datepicker";
import axios from "axios";

const CartForm = () => {
  const [loading, setLoading] = useState(false);
  const cartNavigate = useNavigate();
  const payNavigate = useNavigate();
  const datepickerRef = useRef();
  const DatePickerInput = (props) => {
    return (
      <Field
        name="date"
        type="text"
        className="form-control"
        placeholder="تاریخ تحویل"
        {...props}
      />
    );
  };

  useEffect(() => {});
  return (
    <MainLayout>
      <Title title="فرم نهایی کردن سبد خرید" />
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Navbar />
          <div style={{ width: "100%", height: "20vh" }}></div>
          <div className="container">
            <Typography sx={{ fontWeight: "900" }} variant="h4">
              نهایی کردن خرید
            </Typography>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                date: "",
              }}
              validationSchema={cartFormSchema}
              onSubmit={(value) => {
                value.date = datepickerRef.current.state.inputValue;
                localStorage.setItem("firstName",value.firstName)
                localStorage.setItem("lastName",value.lastName)
                localStorage.setItem("address",value.address)
                localStorage.setItem("phoneNumber",value.phoneNumber)
                localStorage.setItem("date",value.date)
                
                payNavigate("/pay");
              }}
            >
              <Form className="container">
                <div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                      marginBlock: "30px",
                    }}
                  >
                    <div style={{ width: "40%" }}>
                      <Field
                        name="firstName"
                        type="text"
                        className="form-control"
                        placeholder="نام"
                      />
                      <ErrorMessage
                        name="firstName"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div style={{ width: "40%" }}>
                      <Field
                        name="lastName"
                        type="text"
                        className="form-control"
                        placeholder="نام خانوادگی"
                      />
                      <ErrorMessage
                        name="lastName"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBlock: "30px",
                    }}
                  >
                    <div style={{ width: "40%" }}>
                      <Field
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="آدرس"
                        style={{ height: "100px" }}
                      />
                      <ErrorMessage
                        name="address"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div style={{ width: "40%" }}>
                      <Field
                        name="phoneNumber"
                        type="text"
                        className="form-control"
                        placeholder="شماره تلفن"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                  </div>

                  <div
                    style={{ width: "40%", position: "relative", right: "5%" }}
                  >
                    <DatePicker
                      inputComponent={DatePickerInput}
                      placeholder="انتخاب تاریخ"
                      format="jYYYY/jMM/jDD"
                      id="datePicker"
                      ref={datepickerRef}
                    />
                    <ErrorMessage
                      name="date"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                </div>
                <input
                  type={"submit"}
                  className="btn"
                  style={{
                    backgroundColor: "#2e7d32",
                    color: "white",
                    marginBlock: "80px",
                    marginInline: "15px",
                  }}
                  value="پرداخت"
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    axios.delete("http://localhost:9000/cart/1");
                    cartNavigate("/cart");
                  }}
                >
                  انصراف
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CartForm;
