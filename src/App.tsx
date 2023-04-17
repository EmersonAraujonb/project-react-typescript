import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TraducoesYup';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { DrawerProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts';
import { AuthGoogleProvider } from './shared/contexts/AuthGoogle';
import Welcome from './shared/components/welcome/Welcome';

function App() {
  
  return (
    <AuthGoogleProvider>
      <AppThemeProvider >
        <DrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <Welcome/>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </AuthGoogleProvider>
  );
}

export default App;
