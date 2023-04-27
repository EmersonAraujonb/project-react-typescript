import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const token = sessionStorage.getItem('AccessToken');
  return token ?  <Outlet/> : <Navigate to='/'/>;
};

export const PrivateRoutesRegister = () => {
  const token = sessionStorage.getItem('AccessToken');
  return !token ? <Outlet/> : <Navigate to='/'/>;
};
