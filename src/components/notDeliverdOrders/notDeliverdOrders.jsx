import MainLayout from "../mainlayout/mainlayout";
import Title from "../title/title";
import Loading from "../lodaing/loading";
import { useEffect, useState } from "react";
import axios from "axios";
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

const NotDeliverdOrder = () => {
  const [loading, setLoading] = useState(false);
  const [notDeliverdOrders, setNotDeliverdOrders] = useState([]);
  const [forceRender, setForceRender] = useState(true);

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
        axios.get("http://localhost:9000/orders").then((res) => {
          setNotDeliverdOrders(
            res.data.filter((ele) => {
              return ele.deliverd == false;
            })
          );
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [forceRender]);
  return (
    <MainLayout>
      <Title title="سفارش های در حال انتظار" />
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>نام کاربر</StyledTableCell>
                  <StyledTableCell>مجموع مبلغ</StyledTableCell>
                  <StyledTableCell>زمان ثبت سفارش</StyledTableCell>

                  <StyledTableCell align="center">گزینه ها</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notDeliverdOrders.map((ele) => (
                  <StyledTableRow  key={ele.id}>
                    <StyledTableCell >
                      {`${ele.firstName} ${ele.lastName}`}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    >
                      {ele.prices}
                    </StyledTableCell>
                    <StyledTableCell  >
                      {ele.date}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                    >
                      <Button variant="contained" color="warning">بررسی سفارش</Button>
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

export default NotDeliverdOrder;
