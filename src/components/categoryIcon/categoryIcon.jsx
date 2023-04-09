import { Avatar, Grid, Typography, Modal, Box, IconButton } from "@mui/material"
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";

const CategoryIcon = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Grid xl={2} lg={2} md={3} sm={4} xs={12} component="div" onClick={()=>setOpen(true)}   className="btn btn-outline-light" sx={{ with: "250px", height: '190px', display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <Avatar variant="rounded" sx={{ width: '180px', height: '120px' , display:'block' , marginBlock:'5px'}} src={props.categoryAvatar} alt="" />
                <Typography variant="h5"  sx={{ fontWeight: '600', display: 'block', textAlign: 'center'  , width:'200px' , fontSize:"100%"}}>{ props.categoryText}</Typography>
            </Grid>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width:300,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <IconButton onClick={()=>setOpen(false)} sx={{position:'absolute', left:"250px" ,top:"8px"}}>
                        <GrFormClose></GrFormClose>
                    </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                { props.categoryText}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {props.categoryDiscription}
                </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default CategoryIcon