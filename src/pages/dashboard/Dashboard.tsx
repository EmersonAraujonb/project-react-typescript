import { FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={<FerramentasDeDetalhes mostrarBotaoSalvarEFechar mostrarBotaoNovo/>} 
    >
      testando...
    </LayoutBaseDePagina>
  );
};
