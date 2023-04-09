import { Avatar, Typography } from "@mui/material"
import { Box, } from "@mui/system"
import { Link } from "react-router-dom"
import "./prouductcard.css"

const ProuductCard = (props) => { 
    return (
        <Link to={props.outlet}
            style={{
                textDecoration: "none",
                color:"black"
            }}
        >
            <Box sx={{
            width: "280px",
            height: "120px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            background: "rgb(247,247,247)",
            background: "radial-gradient(circle, rgb(247,247,247) 0%, rgba(255,255,255,1) 100%);",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap:"10px",
            '&:hover': {
            backgroundColor: 'white',
            opacity: [0.9, 0.8, 0.7],
            cursor:"pointer"
            },
        }}
            component="div"
            className="container"
        >
                <Avatar src={props.img}
                    sx={{ width: "30%", height:"75px" }}
                    variant="rounded"
                >
                </Avatar>
                <div className="text">
                    <Typography variant="h6"
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: "800",
                            textAlign: "center",
                            
                        }}
                    >{props.name }</Typography>
                    {props.quantity ?
                        (
                            <Typography
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                        }}
                            >{`${props.price} تومان`}</Typography>
                        ) : (
                            <Typography
                            sx={{
                                width: "100%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                            }}
                            >ناموجود</Typography>
                        )}
                </div>

        </Box>
        </Link>
    )
}

export default ProuductCard