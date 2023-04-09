import {
  Typography,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableContainer,
  tableCellClasses,
  Paper,
  TableRow,
  styled,
  Button,
  Modal,
  Box,
} from "@mui/material";
import MainLayout from "../mainlayout/mainlayout";
import Loading from "../lodaing/loading";
import { useEffect, useState } from "react";
import Title from "../title/title";
import Navbar from "../navbar/Navbar";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import axios from "axios";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const CartFormNavigate = useNavigate();
  const handleEditNavigate = useNavigate();
  const [openModal, setOpenModal] = useState();
  const [prouductsCartInfo, setProuductsCartInfo] = useState([]);
  const [deletItem, setDeleteItem] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [forceRender, setForceRender] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDeleteButton = (id) => {
    setOpenModal(true);
    setDeleteItem(id);
  };

  const handleLastStepCart = () => {
    if (prouductsCartInfo.length !== 0) {
      CartFormNavigate("/cart/cartform");
      axios.post("http://localhost:9000/cart", {
        prouducts: prouductsCartInfo,
        prices: totalPrice,
      });
    }
  };

  const handleDeleteItem = async (deletItem) => {
    try {
      await axios.delete(`http://localhost:9000/productscart/${deletItem}`);
      setOpenModal(false);
      setForceRender(!forceRender);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        axios.get("http://localhost:9000/productscart").then((res) => {
          setProuductsCartInfo(res.data);
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [forceRender]);

  useEffect(() => {
    const totalPriceSet = async () => {
      try {
        await setTotalPrice(0);
        prouductsCartInfo.map(async (ele) => {
          await setTotalPrice(totalPrice + ele.price);
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    totalPriceSet();
  }, [prouductsCartInfo]);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);

  const modalStyle = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleEdit = (id) => {
    handleEditNavigate(`/cart/editcart/${id}`);
  };

  return (
    <MainLayout>
      <Title title="سبد خرید" />
      {loading ? (
        <Loading />
      ) : (
        <div className="cart">
          <Navbar />
          <div style={{ width: "100vw", height: "20vh" }}></div>
          <div
            className="container"
            style={{ display: "flex", flexDirection: "column", gap: "60px" }}
          >
            <Typography variant="h4" sx={{ width: "fit-content" }}>
              سبد خرید
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "800px" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ width: "100px" }}>
                      عکس
                    </StyledTableCell>
                    <StyledTableCell>کالا</StyledTableCell>
                    <StyledTableCell sx={{ width: "150px" }} align="center">
                      قیمت (تومان)
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "150px" }} align="center">
                      تعداد
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "300px" }} align="center">
                      گزینه ها
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prouductsCartInfo.map((ele) => (
                    <StyledTableRow>
                      <StyledTableCell sx={{ width: "100px" }}>
                        <img width={50} src={ele.image[0]} alt="" />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {ele.name}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "150px" }} align="center">
                        {ele.price}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "150px" }} align="center">
                        {ele.quantity}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          width: "300px",
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                        align="center"
                      >
                        <Button
                          onClick={() => handleDeleteButton(ele.id)}
                          color="error"
                          startIcon={<MdOutlineDeleteOutline />}
                          variant="contained"
                        >
                          حذف
                        </Button>

                        <Button
                          onClick={() => handleEdit(ele.id)}
                          color="warning"
                          startIcon={<MdModeEdit />}
                          variant="contained"
                        >
                          ویرایش
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div
              className="container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5">{`جمع : ${totalPrice} تومان`}</Typography>
              <Button
                onClick={handleLastStepCart}
                size="large"
                variant="contained"
                color="success"
              >
                نهایی کردن سبد خرید
              </Button>
            </div>
          </div>
          <Modal
            onClose={handleModalClose}
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                آیا مطمئنید که میخواهید حذف کنید؟
              </Typography>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={() => handleDeleteItem(deletItem)}
                  variant="contained"
                  color="success"
                  endIcon={<BsCheckLg />}
                >
                  بله
                </Button>
                <Button
                  onClick={handleModalClose}
                  variant="contained"
                  color="error"
                  endIcon={<BsXLg />}
                >
                  نه
                </Button>
              </div>
            </Box>
          </Modal>
          <Footer />
        </div>
      )}
    </MainLayout>
  );
};

export default Cart;
