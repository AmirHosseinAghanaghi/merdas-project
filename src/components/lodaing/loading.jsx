import { Typography } from "@mui/material"
import loading from '../../assets/1490.gif'

const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "column", width: "100vw", height: '100vh', gap:"15px"}}>
            <img src={loading} alt="" />
            <Typography>در حال بار گذاری...</Typography>
        </div>
    )
}
export default Loading