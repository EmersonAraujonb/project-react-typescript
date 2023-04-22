import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import _ from 'lodash';

export interface SState extends SnackbarOrigin {
  open: boolean;
}
export const data = [
  ['Estado', 'Municípios', 'Regiões Administrativas'],
  ['Acre', 22, 0],
  ['Alagoas', 102, 0],
  ['Amazonas', 62, 0],
  ['Amapá', 16, 0],
  ['Bahia', 417, 0],
  ['Ceará', 184, 0],
  ['Distrito Federal', 0, 33],
  ['Espírito Santo', 78, 0],
  ['Goiás', 246, 0],
  ['Maranhão', 217, 0],
  ['Minas Gerais', 853, 0],
  ['Mato Grosso do Sul', 79, 0],
  ['Mato Grosso', 141, 0],
  ['Pará', 144, 0],
  ['Paraíba', 223, 0],
  ['Pernambuco', 185, 0],
  ['Piauí', 224, 0],
  ['Paraná', 399, 0],
  ['Rio de Janeiro', 92, 0],
  ['Rio Grande do Norte', 167, 0],
  ['Rondônia', 52, 0],
  ['Roraima', 15, 0],
  ['Rio Grande do Sul', 497, 0],
  ['Santa Catarina', 295, 0],
  ['Sergipe', 75, 0],
  ['São Paulo', 645, 0],
  ['Tocantins', 139, 0],
];

export const options = {
  vAxis: { title: 'Estados' },
  hAxis: { title: 'Municípios / Regiões Administrativas ' },
  series: { 5: { type: 'bar' } },
  legend: { position: 'top' }
};
export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);
  const [peoples, setPeoples] = useState<any>();
  const [cities, setCities] = useState<any>();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openErrorConexao, setOpenErrorConexao] = useState(false);
  const [state, setState] = useState<SState>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoadingPessoas(true);
    setIsLoadingCidades(true);
    PessoasService.getAll(1).then((result) => {
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
  useEffect(() => {
    const fetchData = async () => {
      const resolvedResponse = await fetch(
        'https://register-typescript-api.onrender.com/peoples'
      );
      const json = await resolvedResponse.json();
      const data = json.map((data: any, index: number) => (
        <Typography variant='overline' key={index}>
          {data.fullName}
        </Typography>
      ));
      return setPeoples(data.reverse().slice(0, 5));
   
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataCity = async () => {
      const resolvedResponse = await fetch(
        'https://register-typescript-api.onrender.com/cities'
      );
      const json = await resolvedResponse.json();
      const data = json.map((data: any, index: number) => (
        <Typography variant='overline' key={index}>
          {data.city}
        </Typography>
      ));
      return setCities(data.reverse().slice(0, 5));
    };
    fetchDataCity();
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
        <FerramentasDaListagem
          mostrarBotaoNovo={false}
          icone={<HomeIcon color='secondary' />}
          titulo='/ Estatísticas'
        />
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
               
                sx={{
                  height:345,
                  borderRadius: '20px',
                  boxShadow:
                    'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                  background: 'linear-gradient(to right, #f02fc2, #6094ea);',
                }}
              >
                <CardContent>
                  <GroupsIcon sx={{ marginLeft: '45%', fontSize: 40 }} />
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
                    {isLoadingPessoas && <CircularProgress color='inherit' />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card
                sx={{
                  height:345,
                  borderRadius: '20px',
                  boxShadow:
                    'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                  background: 'linear-gradient(to right,#196a92,#19d866)',
                }}
               
              >
                <CardContent>
                  <LocationCityIcon sx={{ marginLeft: '45%', fontSize: 40 }} />

                  <Typography variant='h5' align='center' fontWeight='900'>
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
                    {isLoadingCidades && <CircularProgress color='inherit' />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card
                sx={{
                  borderRadius: '20px',
                  boxShadow:
                    'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
              >
                <CardContent>
                  <TableContainer component={Paper} variant='elevation'>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center' colSpan={3}>
                            Ultimas pessoas cadastradas
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              flexDirection='column'
                            >
                              {peoples}
                              <br />
                              {!isLoadingPessoas &&  <Button  onClick={() => navigate('/pessoas')}>Ver mais...</Button>}
                             
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        {isLoadingPessoas && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <LinearProgress
                                variant='indeterminate'
                                color='success'
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card
                sx={{
                  borderRadius: '20px',
                  boxShadow:
                    'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
              >
                <CardContent>
                  <TableContainer component={Paper} variant='elevation' >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center' colSpan={3}>
                            Ultimas cidades cadastradas
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              flexDirection='column'
                            >
                              {cities}
                              <br />
                              {!isLoadingCidades &&  <Button  onClick={() => navigate('/cidades')}>Ver mais...</Button>}
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        {isLoadingCidades && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <LinearProgress
                                variant='indeterminate'
                                color='success'
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
              <Card
                sx={
                  !mdDown
                    ? {
                      minWidth: 600,
                      borderRadius: '20px',
                      boxShadow:
                        'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                    }
                    : {
                      borderRadius: '20px',
                      boxShadow:
                        'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                    }
                }
              >
                <Chart
                  chartType='BarChart'
                  options={options}
                  data={data}
                  width='100%'
                  height={500}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
