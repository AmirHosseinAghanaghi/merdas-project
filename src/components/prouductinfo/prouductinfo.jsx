import { Button, IconButton, Typography, Snackbar, Alert } from "@mui/material"
import {  useEffect, useState } from "react"
import { useParams , useNavigate } from "react-router-dom"
import MainLayout from "../mainlayout/mainlayout"
import Loading from "../lodaing/loading"
import axios from "axios"
import Carousel from 'react-material-ui-carousel'
import {MdNavigateNext} from 'react-icons/md' 
import { MdNavigateBefore } from 'react-icons/md' 
import Navbar from "../navbar/Navbar"
import Footer from "../footer/footer"
import './prouductinfo.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Title from "../title/title"
import { IoMdArrowDropup, IoMdArrowDropdown, IoIosClose } from 'react-icons/io'



const ProuductInfo = () => {

    const [value, setValue] = useState(1)
    const [price, setPrice] = useState(0)
    const [prouductCart, setProuductCart] = useState({
        "name": "",
        "brand": "",
        "image": [],
        "thumbnail": "030fee34c5b2e05e30fcaaf87aa73a62",
        "price": "",
        "quantity": "",
        "createdAt": 1643373068134,
        "category": "",
        "subcategory": "",
        "description": "",
        id:""
    })
    const [productPrice, setProuductPrice] = useState(0)
    const [prouductinfo, setProuductinfo] = useState ({})
    const [prouductcategory, setProuductcategory] = useState({})
    const [subcategoryName, setSubcategoryName] = useState("")
    const [productQuantity, setProductQuantity] = useState(0)
    const [openAlert, setOpenAlert] = useState(false)
    const [imageURL, setImageURL] =useState([])
    const [loading , setLoading] = useState(false)
    const pageURL = useParams()
    const idNumber = pageURL.idNumber
    const categoryNumber = pageURL.categoryNumber
    const cartNavigate = useNavigate()

    const addToCart = () => {
        axios.post("http://localhost:9000/productscart", prouductCart)
        cartNavigate("/cart")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const prouductData = await (await axios.get(`http://localhost:9000/products/${idNumber}`)).data;
                const categoryData = await (await axios.get(`http://localhost:9000/category/${categoryNumber}`)).data;
                setSubcategoryName(prouductData.name.split(" ")[0])
                setProductQuantity(prouductData.quantity)
                setProuductinfo(prouductData)
                setProuductCart({ ...prouductData, ["quantity"]: value })
                setImageURL(prouductData.image)
                setProuductcategory(categoryData)
                setProuductPrice(prouductData.price)
                setPrice(prouductData.price)
                setLoading(false)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
        console.log(prouductinfo)
    },[])
    


    const increaseValue = () => {
        if(value >= productQuantity){setOpenAlert(true)}
        else if (value < 100) {setValue(value + 1);}
    }
    const decreaseValue = () => {
        if (value > 1) setValue(value - 1);
    }

    useEffect(() => {
        setPrice(productPrice * value);
    }, [value])
    

    useEffect(() => {
        setProuductCart ({ ...prouductCart, ["price"]: price, ["quantity"]: value })
    }, [price])



    
    
    
    
    return (
        <MainLayout>
            <Title title={ prouductinfo.name} />
            {loading ? (<Loading></Loading>) : (
                <div className="ProuductInfo">
                    <Snackbar onClose={()=> setOpenAlert(false)} anchorOrigin={{vertical:"top", horizontal:"right"}} open={openAlert} autoHideDuration={5000}>
                        <Alert onClose={()=> setOpenAlert(false)} color="error" severity="error" sx={{ width: '100%' }}>
                            {`به تعدادی که شما قصد انتخاب کردن دارید ${prouductinfo.name} در انبار موجود نمی باشد`}
                        </Alert>
                    </Snackbar>
                    <Navbar/>
                    <div style={{width:"100vw",height:"23vh"}}></div>
                    <div className="container info" style={{height:"80vh"}}>
                        <Carousel sx={{width:"500px",height:"max-content"}} stopAutoPlayOnHover index={2} animation="slide" PrevIcon={<MdNavigateNext/>} NextIcon={<MdNavigateBefore/>}>
                            {imageURL.map((ele) => (
                                <img width={500} loading="lazy" src={ele} alt="" />
                            ))}
                        </Carousel>
                        <div style={{display:"flex",flexDirection:"column",gap:"320px"}}>
                            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                                <Typography variant="h5">{prouductinfo.name }</Typography>
                                <div style={{display:"flex",justifyContent:"flex-start",gap:"20px"}}>
                                    <Typography>{ [prouductcategory.name]}</Typography>
                                    <Typography>{ subcategoryName}</Typography>
                                </div>
                            </div>
                            {productQuantity ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
                                <Typography variant="h4">{ `${price} تومان`}</Typography>
                                <div style={{display:"flex",flexDirection:"row",gap:"20px"}}>
                                    <div style={{display:"flex"}}>
                                        <input style={ {width:"70px"}} readOnly value={value} type="number"/>
                                        <div style={{display:"flex", flexDirection:"column", position:"relative", left:"30px"}}>
                                            <IconButton onClick={increaseValue} size="small"><IoMdArrowDropup/></IconButton>
                                            <IconButton onClick={decreaseValue} size="small"><IoMdArrowDropdown/></IconButton>
                                        </div>
                                    </div>
                                    <Button onClick={addToCart} color="success" variant="contained" endIcon={<AiOutlinePlusCircle/>}>
                                        افزودن به سبد خرید
                                    </Button>
                                </div>
                                </div>) : (<Typography variant="h4">ناموجود</Typography>)}
                        </div>
                    </div>
                    <Typography className="container">{ prouductinfo.description}</Typography>
                    <Footer/>

                </div>
            )}
        </MainLayout>
    )
}

export default ProuductInfo