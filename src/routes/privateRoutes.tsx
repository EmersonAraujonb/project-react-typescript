import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthGoogleContext } from '../shared/contexts/AuthGoogle';

export const PrivateRoutes = () => {
  const { signed }:any = useContext(AuthGoogleContext);
  return signed ? <Outlet/> : <Navigate to='/'/>;
};

export const PrivateRoutesRegister = () => {
  const { signed }:any = useContext(AuthGoogleContext);
  return !signed ? <Outlet/> : <Navigate to='/'/>;
};
