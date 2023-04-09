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
} from "@mui/material";
import axios from "axios";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";

const AllProuducts = () => {
  const [loading, setLoading] = useState(false);
  const [allProuducts, setAllProuducts] = useState([]);
  const [forceRender, setForceRender] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        axios.get("http://localhost:9000/products").then((res) => {
          setAllProuducts(res.data);
        });

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [forceRender]);

  //   console.log(allProuducts);

  return (
    <MainLayout>
      <Title title="موجودی و قیمت ها" />
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBlockEnd: "20px",
            }}
          >
            <Typography variant="h5" fontWeight={900}>
              مدیریت موجودی و قیمت ها
            </Typography>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: "100px" }}>عکس</StyledTableCell>
                  <StyledTableCell>نام کالا</StyledTableCell>
                  <StyledTableCell sx={{ width: "300px" }}>
                    قیمت
                  </StyledTableCell>

                  <StyledTableCell sx={{ width: "300px" }}>
                    موجودی
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
                    <StyledTableCell sx={{ width: "300px" }}>{ele.price}</StyledTableCell>
                    <StyledTableCell
                      sx={{
                        width: "300px",
                      }}
                    >
                      {ele.quantity}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </MainLayout>
  );
};

export default AllProuducts;
