import { Info } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  ImageListItem,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

const Sobre = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <LayoutBaseDePagina
      titulo='Sobre Web Cadastro'
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} icone={<Info color='secondary'/>} titulo='/ Sobre'/>}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={3} textAlign='center'>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography
                variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}
                align='center'
                fontWeight={'500'}
              >
                Um objetivo simples; simplificar a criação de usuários e
                cidades.
              </Typography>
              <Grid item margin={4}>
                <Typography
                  variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                  align='justify'
                  fontWeight={'100'}
                >
                  Iniciamos a Web Cadastro para simplificar a experiência de
                  criação e capacitar os usuários a editar regularmente. Melhor
                  de todos? Fazemos isso sem problemas, o que significa sem spam
                  e definitivamente sem chamadas indesejadas, já que nem pedimos
                  seu número de telefone (ao contrário de outros web sites...).
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
                  <CardContent>
                    <ImageListItem>
                      <img src='../../../desks.jpg' alt='' />
                    </ImageListItem>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={16}>
                <Typography
                  variant={smDown ? 'h6' : mdDown ? 'h4' : 'h4'}
                  align='center'
                  fontWeight={'400'}
                >
                  Missão
                </Typography>
                <Grid item margin={4}>
                  <Typography
                    variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                    align='center'
                    fontWeight={'100'}
                  >
                    Crie usuários e cidades com facilidade e rapidez!
                  </Typography>
                </Grid>
                <Card>
                  <CardContent>
                    <ImageListItem>
                      <img src='../../../img-cadaster.jpeg' />
                    </ImageListItem>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={16}>
                <Typography
                  variant={smDown ? 'h6' : mdDown ? 'h4' : 'h4'}
                  align='center'
                  fontWeight={'400'}
                >
                  Crie sem medo
                </Typography>
                <Grid item margin={4}>
                  <Typography
                    variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                    align='center'
                    fontWeight={'100'}
                  >
                    Temos determinação. Não há trabalho pequeno demais ou
                    desafio impossível. Estamos juntos e vamos com tudo.
                    Pensamos no longo prazo e sempre otimizamos pensando no Web
                    Cadastro como um todo. Nunca dizemos essa não é a minha
                    função.
                  </Typography>
                  <Typography
                    variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                    align='center'
                    fontWeight={'100'}
                  >
                    Temos uma predisposição pela ação e valorizamos arriscar de
                    forma corajosa e calculada. Nos movemos com agilidade e não
                    deixamos o cliente esperando. Quando fracassamos, aprendemos
                    com isso e tentamos de novo.
                  </Typography>
                </Grid>
                <Card>
                  <CardContent>
                    <ImageListItem>
                      <img src='../../../city.webp' />
                    </ImageListItem>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};

export default Sobre;
