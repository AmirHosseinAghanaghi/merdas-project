import MainLayout from "../mainlayout/mainlayout";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  //   Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { allProuductsFormSchema } from "../../validation/allProuductsFormValidation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const AllProuductsForm = (props) => {
  const categoryRef = useRef();
  const [subcategory, setSubcategory] = useState([]);

  useEffect(() => {
    console.log(categoryRef);
    // const fetchData = async () => {
    //   try {
    //     axios.get("http://localhost:9000/subcategory").then((res) => {
    //       setSubcategory(
    //         res.data.filter((ele) => {
    //           return ele.category == categoryRef.current.state.inputValue;
    //         })
    //       );
    //     });
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };

    // fetchData();
  }, [categoryRef]);

  return (
    <MainLayout>
      <Dialog
        onClose={props.handleDialogClose}
        open={props.open}
        maxWidth="lg"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        {props.loading ? (
          <CircularProgress />
        ) : (
          <DialogContent>
            <Formik
              initialValues={props.initialValues}
              validationSchema={allProuductsFormSchema}
              onSubmit={props.onSubmit}
            >
              <Form className="container">
                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <label htmlFor="">نام </label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    // placeholder="نام"
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <label htmlFor="">برند </label>
                  <Field
                    name="brand"
                    type="text"
                    className="form-control"
                    // placeholder="نام"
                  />
                  <ErrorMessage
                    name="brand"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <label htmlFor="">آدرس تصویر</label>
                  <Field
                    name="image"
                    type="text"
                    className="form-control"
                    // placeholder="نام"
                  />
                  <ErrorMessage
                    name="image"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <label htmlFor="">آدرس تصویر اصلی</label>
                  <Field
                    name="thumbnail"
                    type="text"
                    className="form-control"
                    // placeholder="نام"
                  />
                  <ErrorMessage
                    name="thumbnail"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>

                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="">تعداد</label>
                    <Field
                      name="quantity"
                      className="form-control"
                      type="number"
                    />
                    <ErrorMessage
                      name="quantity"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="">قیمت (تومان)</label>
                    <Field name="price" className="form-control" type="text" />
                    <ErrorMessage
                      name="price"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                </div>

                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="">مجموعه</label>
                    <Field className="form-control" name="category" as="select">
                      <option value="1">کالا های اساسی و خوار و بار</option>
                      <option value="2">حبوبات</option>
                      <option value="3">لبنیات</option>
                      <option value="4">نوشیدنی</option>
                      <option value="5">تنقلات</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="">زیر مجموعه</label>
                    <Field type="text" className="form-control" name="subcategory" />

                    <ErrorMessage
                      name="subcategory"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                </div>

                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBlockEnd: "10px",
                  }}
                >
                  <label htmlFor="">توضیحات </label>
                  <Field
                    name="description"
                    component="textarea"
                    className="form-control"
                    // placeholder="نام"
                  />
                  <ErrorMessage
                    name="description"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <button type="submit" className="btn btn-success">
                    ذخیره
                  </button>
                  <button
                    onClick={props.handleDialogClose}
                    className="btn btn-danger"
                  >
                    لغو
                  </button>
                </div>
              </Form>
            </Formik>
          </DialogContent>
        )}
      </Dialog>
    </MainLayout>
  );
};

export default AllProuductsForm;
