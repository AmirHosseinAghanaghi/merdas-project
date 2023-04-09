import './App.css'
import Navbar from "./components/navbar/Navbar";
import CategoryIcon from './components/categoryIcon/categoryIcon';
import SubcategoryIcon from './components/subcategoryIcon/subcategoryIcon';
import axios from 'axios';
import { useEffect , useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Loading from './components/lodaing/loading';
import 'react-multi-carousel/lib/styles.css';
import MainLayout from './components/mainlayout/mainlayout'
import Footer from './components/footer/footer';
import Title from './components/title/title';


function App() {

  const [maincategory , setMaincategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
          setLoading(true)
            const {data: categoryData} = await axios.get("http://localhost:9000/category")
            const { data: subcategoryData } = await axios.get("http://localhost:9000/subcategory")
            setMaincategory(categoryData)
            setSubcategory(subcategoryData)
            setLoading(false)
        }
        catch (err){
            console.log(err.message);
        }
    }
    fetchdata()
    console.log(maincategory);
    console.log(subcategory);
},[])


  
  return (
      <MainLayout>
        <Title title="فروشگاه اینترنتی مرداس"></Title>
        <div className="App">
          {loading ? (<Loading />) : (
            <>
            <Navbar></Navbar>
            <div className='seperatot'></div>

              <div className='maincategory container'>
                <Typography sx={{fontWeight:'700'}}>
                  دسته بندی اصلی
                </Typography>
                <Grid container className='category'>
                  {maincategory.map((ele) => (
                    <CategoryIcon categoryAvatar={ele.icon} categoryText={ele.name} categoryDiscription={ele.discription}></CategoryIcon>
                ))}
                </Grid>
              </div>
              {maincategory.map((ele) => {
                return (
                  <div className='mainsubcategory'>
                    <Typography sx={{fontWeight:'700'}}>
                      {ele.name}
                    </Typography>
                    <div>
                      {subcategory.map((element) => {
                        if (ele.id === element.category) {
                          return(<SubcategoryIcon subcategoryIcon={element.icon} subcategoryName={element.name} outlet = {`/${element.category}/${element.subcategory}`}></SubcategoryIcon>)
                        }
                      })}
                    </div>
                  </div>
                  
                )
              })}
              <Footer></Footer>
            </>
            
          )}

          
        </div>
      </MainLayout>
    
  );
}

export default App;
