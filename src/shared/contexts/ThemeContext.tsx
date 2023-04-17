import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from '../../shared/themes';
import { useContext, useState } from 'react';

interface IThemeContextData {
  children?: React.ReactNode;
  isDarkTheme?: string;  
  setIsDarkTheme?: any;
}

const ThemeContext = React.createContext({} as IThemeContextData);

export const ThemeContextProvider: React.FC<IThemeContextData>  = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      return 'dark';
    } else {
      return 'light';
    }
    
  });
  const themes = React.useMemo(() => {
    if (isDarkTheme === 'dark') return DarkTheme;
    return LightTheme;
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
			
      <ThemeProvider theme={isDarkTheme === 'dark' ? DarkTheme : LightTheme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={themes.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {

  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  function changeTheme() {
    if (isDarkTheme === 'dark') {
      setIsDarkTheme('light');
      localStorage.setItem('theme', 'light');

    }
    if (isDarkTheme === 'light') {
      setIsDarkTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  return {
    changeTheme
  };
};

