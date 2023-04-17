import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import { Navigate } from 'react-router-dom';

export interface SState extends SnackbarOrigin {
  open: boolean;
}

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);
  const [openErrorConexao, setOpenErrorConexao] = useState(false);
  const [state, setState] = useState<SState>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;

  useEffect(() => {
    setIsLoadingPessoas(true);
    setIsLoadingCidades(true);
    PessoasService.getAll(1).then((result: any) => {
      setIsLoadingPessoas(false);
      if (result instanceof Error) {
        setOpenErrorConexao(true);
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });
    CidadesService.getAll(1).then((result) => {
      setIsLoadingCidades(false);
      if (result instanceof Error) {
        setOpenErrorConexao(true);
      } else {
        setTotalCountCidades(result.totalCount);
      }
    });
  }, []);

  const handleCloseErrorConexao = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorConexao(false);
  };

  return (
    <LayoutBaseDePagina
      titulo='Página Inicial'
      barraDeFerramentas={
        <FerramentasDaListagem mostrarBotaoNovo={false} icone={<HomeIcon color='secondary'/>} titulo='/ Estatísticas' />
      }
      
    >
      <Snackbar
        open={openErrorConexao}
        autoHideDuration={6000}
        onClose={handleCloseErrorConexao}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleCloseErrorConexao}
          severity='error'
          sx={{ width: '100%' }}
          variant='filled'
        >
          Erro de conexão!
        </Alert>
      </Snackbar>
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card
                onClick={() => <Navigate to='/pessoas' />}
                sx={{
                  borderRadius: '20px',
                  boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                  background: 'linear-gradient(to right, #298afa, #88bdf8);'
                }}
              >
                <CardContent>
                  <GroupsIcon sx={{marginLeft: '45%', fontSize: 40 }} />
                  <Typography variant='h5' align='center' fontWeight='900'>
                    Total de pessoas
                  </Typography>

                  <Box
                    padding={6}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {!isLoadingPessoas && (
                      <Typography
                        sx={{
                          fontSize: '2.725rem',
                          fontWeight: 900,
                          mr: 1,
                          mt: 1.75,
                          mb: 0.75,
                        }}
                      >
                        {totalCountPessoas}
                      </Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant='h6'>Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card sx={{ borderRadius: '20px',  boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px', background:'linear-gradient(to right,#00ffcc,#b4e6dc)' }}>
                <CardContent>
                  <LocationCityIcon sx={{marginLeft: '45%', fontSize: 40 }} />

                  <Typography variant='h5' align='center'  fontWeight='900'>
                    Total de Cidades
                  </Typography>
                  <Box
                    padding={6}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {!isLoadingCidades && (
                      <Typography
                        sx={{
                          fontSize: '2.725rem',
                          fontWeight: 900,
                          mr: 1,
                          mt: 1.75,
                          mb: 0.75,
                        }}
                      >
                        {totalCountCidades}
                      </Typography>
                    )}
                    {isLoadingCidades && (
                      <Typography variant='h6'>Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
