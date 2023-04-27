import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dashboard,
  DetalheDePessoas,
  ListagemDePessoas,
  DetalheDeCidades,
  ListagemDeCidades,
} from '../pages';
import Contato from '../pages/contato/Contato';
import { Cadastro } from '../pages/login/cadastro';
import { Login } from '../pages/login/login';
import Obrigado from '../pages/obrigado/Obrigado';
import Sobre from '../pages/sobre/Sobre';
import { useDrawerContext } from '../shared/contexts';
import { PrivateRoutes, PrivateRoutesRegister } from './privateRoutes';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const {t} = useTranslation();


  useEffect(() => {
    setDrawerOptions([
      {
        label: t('menuLateralInicio'),
        icon: 'home',
        path: '/pagina-inicial',
        
      },
      {
        label: t('menuLateralPessoas'),
        icon: 'people',
        path: '/pessoas',
      },
      {
        label: t('menuLateralCidades'),
        icon: 'location_city',
        path: '/cidades',
      },
      {
        label: t('menuLateralContato'),
        icon: 'contact_support',
        path: '/contato',
      },
      {
        label: t('menuLateralSobre'),
        icon: 'info_icon',
        path: '/sobre',
      },    
    ]);
  }, [t]);
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/cadastro' element={<PrivateRoutesRegister />}>
        <Route path='/cadastro' element={<Cadastro />} />
      </Route>
      <Route path='/pagina-inicial' element={<PrivateRoutes />}>
        <Route path='/pagina-inicial' element={ <Dashboard />} />
      </Route>
      <Route path='/pessoas/detalhe/:id' element={<PrivateRoutes />}>
        <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />
      </Route>
      <Route path='/pessoas' element={<PrivateRoutes />}>
        <Route path='/pessoas' element={<ListagemDePessoas />} />
      </Route>
      <Route path='/cidades' element={<PrivateRoutes />}>
        <Route path='/cidades' element={<ListagemDeCidades />} />
      </Route>
      <Route path='/cidades/detalhe/:id' element={<PrivateRoutes />}>
        <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades />} />
      </Route>
      <Route path='/contato' element={<PrivateRoutes />}>
        <Route path='/contato' element={<Contato />} />
      </Route>
      <Route path='/sobre' element={<PrivateRoutes />}>
        <Route path='/sobre' element={<Sobre />} />
      </Route>
      <Route path='/contato/sucesso' element={<PrivateRoutes />}>
        <Route path='/contato/sucesso' element={<Obrigado />} />
      </Route>
      <Route path='*' element={<PrivateRoutes/>}>
        <Route path='*' element={<Navigate to='/pagina-inicial' />} />
      </Route>
    </Routes>
  );
};
