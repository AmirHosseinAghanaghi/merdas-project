import './Navbar.css'
import { Badge, InputBase, IconButton, Grid , Drawer , Typography, MenuItem, Menu} from '@mui/material'
import {AiOutlineSearch} from 'react-icons/ai'
import {MdOutlineShoppingCart} from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { GrMenu } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import Typed from 'react-typed';
import logo from '../../assets/Logo2.gif'
import DrawerList from '../DerawerList/DrawerList'
import { Link } from 'react-router-dom'
import axios from 'axios'




function Navbar() {

    const [openDarawer, setOpenDrawer] = useState(false)
    const [searchword, setSearchword] = useState("")
    const [cartLength, setCartLenght] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchData = async () => {
          try {
            axios.get("http://localhost:9000/productscart").then((res) => {
              setCartLenght(res.data.length)
            });
          } catch (err) {
            console.log(err.message);
          }
        };
        fetchData();
      }, []);

    const handlesearch = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMenue = ()=>{
        setAnchorEl(null)
    }
    
    return (
        <>  <div className='whitespace'></div>
            <div className='containers'>
            
                <Grid container justifyContent='center' alignItems='center'>

                    <Grid item xl={1} lg={1} md={1} xs={1} sm={1} className='grids'>
                        <IconButton onClick={()=>setOpenDrawer(true)}>
                            <GrMenu></GrMenu>
                        </IconButton>
                    </Grid>
                    <Drawer anchor='left' open = {openDarawer} onClose={()=>setOpenDrawer(false)}>
                        <DrawerList onClick={()=>setOpenDrawer(false)}></DrawerList>
                    </Drawer>
                    





                    <Grid item xl={2} lg={2} md={3} xs={6} sm={6} className='grids'>
                        <div className='rightSide'>
                        <img src={logo} alt="" className='logo'/>
                        <div>
                                <Typography variant='h4' sx={{fontFamily:"B Esfehan",fontWeight:'700'}}>
                                
                                    <Typed strings={['مرداس']} typeSpeed={200} showCursor={false} />
                                </Typography>
                                <Typography sx={{fontWeight:'700'}}>
                                    <Typed
                                    strings={['فروشگاه اینترنتی']}
                                            typeSpeed={100}
                                            startDelay={2000}
                                            backSpeed={30}
                                            loop
                                />
                                </Typography>
                        </div>
                    </div>
                    </Grid>
                    

                    


                    <Grid item xl={5} lg={5} md={4} xs={0} sm={0} className='grids'>
                        <div className="search" aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                        <AiOutlineSearch style={{marginInlineStart:'10px', marginInlineEnd:'10px',marginBlockStart:'2px'}} className='tex text-muted'></AiOutlineSearch>
                        <InputBase onKeyDown={handlesearch} placeholder='جستجو کن'></InputBase>
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenue}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleCloseMenue}>Profile</MenuItem>
                            <MenuItem onClick={handleCloseMenue}>My account</MenuItem>
                            <MenuItem onClick={handleCloseMenue}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                    

                    

                    <Grid item xl={3} lg={3} md={3} xs={5} sm={5} className='grids'>
                        <div className='leftSide'>
                            <div>
                                <BsFillPersonFill style={{marginInlineEnd:'8px', fontSize:'16px'}}></BsFillPersonFill>
                                <Link to={localStorage.token ? "/admin/allprouducts":"/login"} style={{fontSize:'13px' , fontWeight:'700',display:'inline', color:"black", textDecoration:"none"}}>مدیریت</Link>
                            </div>

                            <Link to={"/cart"} style={{textDecoration:"none",color:"black"}}>
                                <Badge
                                    sx={{
                                        width: '90px',
                                    }}
                                    color='error'
                                    badgeContent={cartLength}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                >
                                    <MdOutlineShoppingCart style={{marginInlineEnd:'8px', marginBlockStart:'2px', fontSize:'16px'}}></MdOutlineShoppingCart>
                                    <Typography sx={{fontSize:'13px' , fontWeight:'700'}}>سبد خرید</Typography>
                                </Badge>
                                </Link>
                            
                            
                        </div>
                    </Grid>
                </Grid>    
                




            
            </div>
            <div style={{width:"100vw",height:"0vh"}}></div>
        </>
    )
}

export default Navbar