import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
  SnackbarOrigin,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from '@mui/material/Link';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useTranslation } from 'react-i18next';

export interface StateMessageContact extends SnackbarOrigin {
  open: boolean;
}

const Contato = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openError, setOpenError] = useState(false);
  const {t} = useTranslation();
  const [state, setState] = useState<StateMessageContact>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });


  const handleChange = (e: any) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const templateParams = {
      from_name: contact.name,
      message: contact.message,
      email: contact.email
    };

    emailjs.send('service_u9ge9cf',
      'template_vf3wfdp',
      templateParams,
      'BMjX_mPPnRCKu8Ik6').
      then((response) => {
        navigate('/contato/sucesso');
      }, (err) => {
        setResponse({
          type: 'error',
          message: t('mensagemFormulario'),
        });
        setOpenError(true);
      });
  };
  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };
  
  return (
    <LayoutBaseDePagina
      titulo={t('tituloContato')}
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} icone={<ContactSupportIcon color='secondary'/>} titulo={t('tituloFerramentaDaListagemContato')}/>}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={3} textAlign='center'>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography
                variant={smDown ? 'body1' : mdDown ? 'h5' : 'h4'}
                align='center'
                fontWeight={'400'}
              >
                {t('nosEstamosAquiParaAjudar')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={16}>
              <Typography
                variant={smDown ? 'body2' : mdDown ? 'h6' : 'h6'}
                align='center'
                fontWeight={'100'}
              >
                {t('nosEnvieUmEmail')}
              </Typography>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={16} boxShadow=' rgb(38, 57, 77) 0px 20px 30px -10px;'>
                <form
                  method='post'
                  onSubmit={handleSubmit}
                  style={
                    smDown
                      ? {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '10%',
                      }
                      : mdDown
                        ? {
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginRight: '10%',
                          marginLeft: '10%',
                        }
                        : {
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginRight: '25%',
                          marginLeft: '25%',
                        }
                  }
                >
                  <Typography variant='h6' textAlign='center' margin={2} >
                    {t('tituloContato')}
                  </Typography>

                  <FormControl variant='outlined' color='secondary'>
                    <InputLabel className='name'>{t('nomeCompleto')}</InputLabel>

                    <Input
                      className='input'
                      type='text'
                      placeholder={t('digiteSeuNome') || undefined}
                      name='name'
                      onChange={handleChange}
                      required
                      sx={{ marginBottom: 3 }}
                      inputProps={{ minLength: 3,  pattern: '^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÒÖÚÇÑ ]+$'}}
                    />
                  </FormControl>

                  <FormControl variant='outlined' color='secondary'>
                    <InputLabel className='email'>{t('email')}</InputLabel>

                    <Input
                      className='input'
                      type='email'
                      placeholder={t('digiteSeuEmail') || undefined}
                      name='email'
                      onChange={handleChange}
                      required
                      sx={{ marginBottom: 3 }}
                    />
                  </FormControl>

                  <FormControl variant='outlined' color='secondary'>
                    <TextField
                      required
                      type='text'
                      placeholder={t('digiteSuaMensagem')|| undefined}
                      className='message'
                      id='outlined-multiline-static'
                      label={t('mensagem')}
                      multiline
                      rows={5}
                      name='message'
                      color='secondary'
                      onChange={handleChange}
                      sx={{ marginBottom: 3 }}
                    />
                  </FormControl>
                  <Grid item margin={4}>
                    <Button
                      className='button is-primary'
                      type='submit'
                      color='success'
                      variant='contained'
                      sx={
                        smDown
                          ? { fontSize: 'small' }
                          : mdDown
                            ? { fontSize: 'medium' }
                            : { fontSize: 'large' }
                      }
                      endIcon={<SendIcon />}
                    >
                      {t('enviar')}
                    </Button>
                    <Snackbar
                      open={openError}
                      autoHideDuration={6000}
                      onClose={handleCloseError}
                      anchorOrigin={{ vertical, horizontal }}
                    >
                      <Alert
                        onClose={handleCloseError}
                        severity='error'
                        sx={{ width: '100%' }}
                        variant='filled'
                      >
                        {response.message}
                      </Alert>
                    </Snackbar>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={16}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow:'rgba(46, 240, 198, 0.4) 0px 5px, rgba(46, 217, 240, 0.3) 0px 10px, rgba(46, 217, 240, 0.2) 0px 15px, rgba(46, 227, 240, 0.1) 0px 20px, rgba(46, 240, 230, 0.05) 0px 25px;'
                }}
              >
                <Grid item sx={{ align: 'center', justifyContent: 'space-around' }} >
                  <Typography align='center' variant='body1'>
                    {t('sigaNos')}
                  </Typography>

                  <Link
                    href='https://github.com/EmersonAraujonb'
                    target='_blank'
                    title='Github'
                  >
                    <IconButton>
                      <GitHubIcon
                        fontSize={smDown ? 'small' : 'large'}
                        sx={{ color: '#000000' }}
                      />
                    </IconButton>
                  </Link>
                  <Link
                    href='https://www.linkedin.com/in/dev-emerson-araujo/'
                    target='_blank'
                    title='Linkedin'
                  >
                    <IconButton>
                      <LinkedInIcon
                        fontSize={smDown ? 'small' : 'large'}
                        sx={{ color: '#0059ff' }}
                      />
                    </IconButton>
                  </Link>
                  <Link
                    href='https://twitter.com/O_DEV_EMERSON'
                    target='_blank'
                    title='Twitter'
                  >
                    <IconButton>
                      <TwitterIcon
                        fontSize={smDown ? 'small' : 'large'}
                        sx={{ color: '#1da1f2' }}
                      />
                    </IconButton>
                  </Link>
                  <Link
                    href='https://instagram.com/the_developerfrontend'
                    target='_blank'
                    title='Twitter'
                  >
                    <IconButton>
                      <InstagramIcon
                        fontSize={smDown ? 'small' : 'large'}
                        sx={{ color: '#ff00ea' }}
                      />
                    </IconButton>
                  </Link>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};

export default Contato;
