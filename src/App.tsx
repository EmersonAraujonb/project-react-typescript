import { ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { LightTheme} from './shared/themes'
import { AppRoutes } from './routes';


function App() {
  return (
    <ThemeProvider theme={LightTheme}>
       <BrowserRouter>
      <div className="App">
      <AppRoutes/> 
      </div>
      </BrowserRouter>
    </ThemeProvider>
   
  );
}

export default App;
