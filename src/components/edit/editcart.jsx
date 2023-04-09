import {
  Button,
  IconButton,
  Modal,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Component, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../mainlayout/mainlayout";
import Loading from "../lodaing/loading";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import "./editcart.css";
// import { AiOutlinePlusCircle } from 'react-icons/ai'
import Title from "../title/title";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const EditCart = () => {
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageURL, setImageURL] = useState([]);
  const [editCartProuduct, setEditCartProuduct] = useState({});
  const [prouductinfo, setProuductinfo] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [price, setPrice] = useState(0);
  const [prouductCart, setProuductCart] = useState({
    name: "",
    brand: "",
    image: [],
    thumbnail: "030fee34c5b2e05e30fcaaf87aa73a62",
    price: "",
    quantity: "",
    createdAt: 1643373068134,
    category: "",
    subcategory: "",
    description: "",
    id: "",
  });
  const editCartNavigate = useNavigate();
  const pageUrl = useParams();

  const handleEditCart = () => {
    editCartNavigate("/cart");
    axios.put(`http://localhost:9000/productscart/${idNumber}`, prouductCart);
  };

  const increaseValue = () => {
    if (value >= prouductinfo.quantity) {
      setOpenAlert(true);
    } else if (value < 100) {
      setValue(value + 1);
    }
  };
  const decreaseValue = () => {
    if (value > 1) setValue(value - 1);
  };

  const idNumber = pageUrl.idNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        axios
          .get(`http://localhost:9000/productscart/${idNumber}`)
          .then((res) => {
            setEditCartProuduct(res.data);
            setValue(res.data.quantity);
            setSubcategory(res.data.name.split(" ")[0]);
            setImageURL(res.data.image);
            setPrice(res.data.price);
          });

        axios
          .get(`http://localhost:9000/category/${editCartProuduct.category}`)
          .then((res) => {
            setCategoryName(res.data.name);
          });

        axios.get(`http://localhost:9000/products/${idNumber}`).then((res) => {
          setProuductinfo(res.data);
          setProuductCart({ ...res.data, ["quantity"]: value });
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPrice(prouductinfo.price * value);
  }, [value]);

  useEffect(() => {
    setProuductCart({ ...prouductCart, ["price"]: price, ["quantity"]: value });
  }, [price]);

  return (
    <MainLayout>
      <Title title={`ویرایش ${prouductinfo.name} در سبد خرید`} />
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="ProuductInfo">
          <Navbar />
          <div style={{ width: "100%", height: "20vh" }}></div>
          <div className="container info" style={{ height: "80vh" }}>
            <Carousel
              sx={{ width: "500px", height: "max-content" }}
              stopAutoPlayOnHover
              index={2}
              animation="slide"
              PrevIcon={<MdNavigateNext />}
              NextIcon={<MdNavigateBefore />}
            >
              {imageURL.map((ele) => (
                <img width={500} loading="lazy" src={ele} alt="" />
              ))}
            </Carousel>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "320px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography variant="h5">{prouductinfo.name}</Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "20px",
                  }}
                >
                  <Typography>{categoryName}</Typography>
                  <Typography>{subcategory}</Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "60px",
                }}
              >
                <Typography variant="h4">{`${price} تومان`}</Typography>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <div style={{ display: "flex" }}>
                    <input
                      style={{ width: "70px" }}
                      readOnly
                      value={value}
                      type="number"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        left: "30px",
                      }}
                    >
                      <IconButton onClick={increaseValue} size="small">
                        <IoMdArrowDropup />
                      </IconButton>
                      <IconButton onClick={decreaseValue} size="small">
                        <IoMdArrowDropdown />
                      </IconButton>
                    </div>
                  </div>
                  <Button
                    onClick={handleEditCart}
                    color="success"
                    variant="contained"
                  >
                    اعمال ویرایش سبد خرید
                  </Button>
                  <Button
                    onClick={() => editCartNavigate("/cart")}
                    variant="contained"
                    color="error"
                  >
                    لغو
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Typography className="container">
            {prouductinfo.description}
          </Typography>
          <Footer />

          <Snackbar
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openAlert}
            autoHideDuration={5000}
          >
            <Alert
              onClose={() => setOpenAlert(false)}
              color="error"
              severity="error"
              sx={{ width: "100%" }}
            >
              {`به تعدادی که شما قصد انتخاب کردن دارید ${prouductinfo.name} در انبار موجود نمی باشد`}
            </Alert>
          </Snackbar>
        </div>
      )}
    </MainLayout>
  );
};

export default EditCart;
