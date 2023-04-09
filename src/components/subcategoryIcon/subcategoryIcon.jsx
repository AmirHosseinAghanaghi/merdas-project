import { Typography , Avatar} from "@mui/material"
import './subcategoryIcon.css'
import { Link } from "react-router-dom"

const SubcategoryIcon = (props) => {
    return (
        <Link to={props.outlet} className="btn btn-outline-light">
            <Avatar variant="rounded" sx={{ width: '250px', height: '200px' , display:'block' , marginBlock:'5px'}} src={props.subcategoryIcon} alt="" />
            <Typography variant="h5" sx={{ fontWeight: '600', display: 'block', textAlign: 'center' }}>{ props.subcategoryName}</Typography>
        </Link>
    )
}

export default SubcategoryIcon