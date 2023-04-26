import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TraducoesYup';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { DrawerProvider } from './shared/contexts';
import { ThemeContextProvider } from './shared/contexts';
import { AuthGoogleProvider } from './shared/contexts/AuthGoogle';
import Welcome from './shared/components/welcome/Welcome';

function App() {
  
  
  return (
    <AuthGoogleProvider>
      <ThemeContextProvider >
        <DrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <Welcome/>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </DrawerProvider>
      </ThemeContextProvider>
    </AuthGoogleProvider>
  );
}

export default App;
