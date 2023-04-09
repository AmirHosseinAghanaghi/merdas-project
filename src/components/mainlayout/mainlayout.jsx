import { createTheme , ThemeProvider} from '@mui/material/styles';
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const MainLayout = ({children}) => {
    
    //NOTE create cistom theme
  const theme = createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: 'Vazir',
      fontWeight:"700"
    }
  });


  //NOTE create RTL cache
  const cathRTL = createCache({
    key: "muirtl",
    stylisPlugins:[prefixer , stylisRTLPlugin]
  })
    
    return (
        <CacheProvider value={cathRTL}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </CacheProvider>
            
    )
}

export default MainLayout