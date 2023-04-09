import MainLayout from "../mainlayout/mainlayout";
import Loading from "../lodaing/loading";
import Title from "../title/title";
import { useEffect, useState } from "react";
import {
  Typography,
  tableCellClasses,
  styled,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  Button,
  Box,
  Modal,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { BsXLg, BsCheckLg } from "react-icons/bs";
import AllProuductsForm from "../allproductform/allprouductform";

const AllProuducts = () => {
  const [loading, setLoading] = useState(false);
  const [allProuducts, setAllProuducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [forceRender, setForceRender] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletItem, setDeletItem] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backdropOpen, setBackdropOPen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    brand: "",
    image: "",
    thumbnail: "030fee34c5b2e05e30fcaaf87aa73a62",
    price: "",
    quantity: "",
    createdAt: 1643373068134,
    id: "",
    category: "",
    subcategory: "",
    description: "",
  });
  const [prouductURL, setProuductURL] = useState("");

  const [prouduct, setProuduct] = useState({});

  const handleDeleteButton = (id) => {
    setDeletItem(id);
    setModalOpen(true);
  };

  const onSubmit = (values) => {
    if (prouductURL == "") {
      axios.post("http://localhost:9000/products", values);
    } else {
      axios.put(prouductURL, values);
    }
    setDialogOpen(false);
    setForceRender(!forceRender);
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:9000/products/${deletItem}`);
      setModalOpen(false);
      setForceRender(!forceRender);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        axios.get("http://localhost:9000/products").then((res) => {
          setAllProuducts(res.data);
        });

        axios.get("http://localhost:9000/category").then((res) => {
          setCategories(res.data);
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [forceRender]);

  const handleAddProuductButton = () => {
    setInitialValues({
      name: "",
      brand: "",
      image: "",
      thumbnail: "030fee34c5b2e05e30fcaaf87aa73a62",
      price: "",
      quantity: "",
      createdAt: 1643373068134,
      id: "",
      category: "",
      subcategory: "",
      description: "",
    });
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        axios.get(prouductURL).then((res) => {
          setInitialValues({ ...res.data });
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    // console.log(prouductURL)
  }, [prouductURL, forceRender]);

  const handleEditProuduct = (id) => {
    setBackdropOPen(true);
    setTimeout(() => {
      setBackdropOPen(false);
      setDialogOpen(true);
    }, 2000);
    setProuductURL(`http://localhost:9000/products/${id}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <MainLayout>
      <Title title="همه ی کالاها" />
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-4">
          <AllProuductsForm
            handleDialogClose={handleDialogClose}
            open={dialogOpen}
            loading={loading}
            initialValues={initialValues}
            onSubmit={onSubmit}
            title={prouductURL ? "ویرایش کالا" : "افزودن کالا"}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBlockEnd: "20px",
            }}
          >
            <Typography variant="h5" fontWeight={900}>
              مدیریت کالاها
            </Typography>
            <Button
              onClick={handleAddProuductButton}
              variant="contained"
              color="success"
            >
              افزودن کالا
            </Button>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: "100px" }}>عکس</StyledTableCell>
                  <StyledTableCell sx={{ width: "600px" }}>
                    نام کالا
                  </StyledTableCell>
                  <StyledTableCell>دسته بندی</StyledTableCell>

                  <StyledTableCell sx={{ width: "300px" }} align="center">
                    گزینه ها
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allProuducts.map((ele) => (
                  <StyledTableRow sx={{ height: "110px" }} key={ele.id}>
                    <StyledTableCell sx={{ width: "100px" }}>
                      <img width={50} src={ele.image} alt="" />
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ width: "600px" }}
                      component="th"
                      scope="row"
                    >
                      {ele.name}
                    </StyledTableCell>
                    {categories.map((Element) => {
                      if (ele.category === Element.id) {
                        return (
                          <StyledTableCell>{Element.name}</StyledTableCell>
                        );
                      }
                    })}
                    <StyledTableCell
                      sx={{
                        width: "300px",
                      }}
                      align="center"
                    >
                      <Button
                        sx={{ marginInlineEnd: "10px" }}
                        onClick={() => handleDeleteButton(ele.id)}
                        color="error"
                        startIcon={<MdOutlineDeleteOutline />}
                        variant="contained"
                      >
                        حذف
                      </Button>

                      <Button
                        onClick={() => handleEditProuduct(ele.id)}
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

          <Modal
            onClose={handleModalClose}
            open={modalOpen}
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
    </MainLayout>
  );
};

export default AllProuducts;
