import "./DrawerList.css";
import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { AiOutlineDown, AiOutlineUp, AiOutlineClose } from "react-icons/ai";
import {
  Accordion,
  IconButton,
  Typography,
  AccordionSummary,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const DrawerList = (props) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data: categoryData } = await axios.get(
          "http://localhost:9000/category"
        );
        const { data: subcategoryData } = await axios.get(
          "http://localhost:9000/subcategory"
        );
        setCategory(categoryData);
        setSubcategory(subcategoryData);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(category);
    console.log(subcategory);
    fetchdata();
  }, []);

  return (
    <List
      sx={{ width: "100%", maxWidth: "360%", bgcolor: "background.paper" }}
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "260px",
          }}
        >
          همه ی دسته بندی ها
          <Tooltip title="بستن">
            <IconButton sx={{ color: "black" }} onClick={props.onClick}>
              <AiOutlineClose></AiOutlineClose>
            </IconButton>
          </Tooltip>
        </ListSubheader>
      }
    >
      {category.map((ele) => {
        return (
          <>
            <Accordion
              sx={{ boxShadow: "none" }}
              onClick={handleClick}
              id={ele.id}
            >
              <AccordionSummary
                expandIcon={<AiOutlineDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{ele.name}</Typography>
              </AccordionSummary>
              <List component="div" disablePadding>
                {subcategory.map((element) => {
                  if (element.category === ele.id)
                    return (
                      <NavLink
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) => [
                          props.className,
                          isActive ? "btn btn-dark" : "",
                        ]}
                        to={`/${element.category}/${element.subcategory}`}
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={element.name} />
                        </ListItemButton>
                      </NavLink>
                    );
                })}
              </List>
            </Accordion>
          </>
        );
      })}

      <Link
        to={"/"}
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          gap: "20px",
          marginInlineStart: "10px",
          marginBlockStart: "40px",
        }}
      >
        <AiFillHome style={{ marginBlockStart: "2px" }} />
        <Typography>صفحه ی اصلی</Typography>
      </Link>
    </List>
  );
};
export default DrawerList;
