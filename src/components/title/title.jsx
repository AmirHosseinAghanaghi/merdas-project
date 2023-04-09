import { Helmet, HelmetProvider } from "react-helmet-async";
const Title = (props) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    {props.title}
                </title>
            </Helmet>
        </HelmetProvider>
    )
}

export default Title