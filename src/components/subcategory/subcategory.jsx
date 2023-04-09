import Navbar from "../navbar/Navbar"
import MainLayout from "../mainlayout/mainlayout"
import "./subcategory.css"
import { useParams } from "react-router-dom"
import ProuductCard from "../prouductcard/prouductcard"
import Loading from "../lodaing/loading"
import { useEffect, useState } from "react"
import axios from "axios"
import { Typography } from "@mui/material"
import Footer from "../footer/footer"
import Title from "../title/title"


const Subcategory = () => {
    const [loading, setLoading] = useState(true)
    const [subcategory, setSubcategory] = useState([])
    const [prouducts, setProuducts] = useState([])
     
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: prouductsData} = await axios.get("http://localhost:9000/products")
                const { data: subcategoryData } = await axios.get("http://localhost:9000/subcategory")
                setSubcategory(subcategoryData)
                setProuducts(prouductsData)
                setLoading(false)
            }
            catch(err) {
                console.log(err.message)
            }
        }

        fetchData()
    },[])
    
    const pageURL = useParams()
    console.log(pageURL)
    const categoryNumber = parseInt(pageURL.categoryNumber)
    const subcategoryNumber = parseInt(pageURL.subcategoryNumber)

    const filterdProuducts = prouducts.filter((ele) => {
        return (ele.category === categoryNumber && ele.subcategory === subcategoryNumber)
    })
    const filterdSubcategory = subcategory.filter((ele) => {
        return (ele.category === categoryNumber && ele.subcategory === subcategoryNumber)
    })
    return (
        <MainLayout>
            
            {loading ? (<Loading></Loading>) : (
                <>
                    <Title title={`کالاهای دسته ی ${subcategory[subcategoryNumber-1].name}`}></Title>
                    
                    <div className="main">
                        <Navbar></Navbar>
                        <div className='seperator'></div>
                        <div>
                            <Typography variant="h4" sx={{marginBlock:"10px"}}>
                                {filterdSubcategory[0].name}
                            </Typography>

                            <div className="prouductscard container">
                            {filterdProuducts.map((ele) => (
                            <ProuductCard img={ele.image[0]} name={ele.name} price={ele.price} outlet={`/${ele.category}/${ele.subcategory}/${ele.id}`} quantity={ele.quantity}></ProuductCard>
                                )
            
                            )}
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </>
            )}
        </MainLayout>
    )
}
export default Subcategory