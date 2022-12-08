import  React from "react";
import { ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme} from '../../shared/themes'
import { Box } from "@mui/system";

interface IThemeContextData {
    children?: React.ReactNode; 
    themeName?: 'Light' | 'Dark';
    toggleTheme?: () => void;

}

const ThemeContext = React.createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
    return React.useContext(ThemeContext);
}
export const AppThemeProvider: React.FC<IThemeContextData> = ({children}: { children?: React.ReactNode })  => {
    

    const [themeName, setThemeName] = React.useState<'Light' | 'Dark'>('Light')
    const toggleTheme = React.useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'Light'? 'Dark' : 'Light')
    },[]) 

    const theme = React.useMemo(() => {
         if( themeName === 'Light') return LightTheme;
         return DarkTheme;
    },[themeName])

    return (
            <ThemeContext.Provider value={{themeName, toggleTheme}} >
                <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                {children}
                </Box>
                </ThemeProvider>
            </ThemeContext.Provider>
        );
}   