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
import { useTranslation } from 'react-i18next';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

const Sobre = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const {t} = useTranslation();

  return (
    <LayoutBaseDePagina
      titulo={t('tituloSobre')}
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} icone={<Info color='secondary'/>} titulo={t('tituloBarraDeFerramentasSobre')}/>}
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
                {t('umObjetivoSimples')}
              </Typography>
              <Grid item margin={4}>
                <Typography
                  variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                  align='justify'
                  fontWeight={'100'}
                >
                  {t('texto1')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
                  <CardContent>
                    <ImageListItem>
                      <img src='../../../registration.jpg' alt='' />
                    </ImageListItem>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={16}>
                <Typography
                  variant={smDown ? 'h6' : mdDown ? 'h4' : 'h4'}
                  align='center'
                  fontWeight={'400'}
                  marginTop={4}
                >
                  {t('missao')}
                </Typography>
                <Grid item margin={4}>
                  <Typography
                    variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                    align='center'
                    fontWeight={'100'}
                  >
                    {t('texto2')}
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
                  marginTop={4}

                >
                  {t('crieSemMedo')}
                </Typography>
                <Grid item margin={4}>
                  <Typography
                    variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                    align='center'
                    fontWeight={'100'}
                  >
                    {t('texto3')}
                  </Typography>
                  <Typography
                    variant={smDown ? 'body2' : mdDown ? 'body1' : 'h6'}
                    align='center'
                    fontWeight={'100'}
                  >
                    {t('texto4')}
                  </Typography>
                </Grid>
                <Card>
                  <CardContent>
                    <ImageListItem>
                      <img src='../../../registration2.jpg' />
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
