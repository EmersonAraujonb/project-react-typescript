import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Menu,
  Snackbar,
  SnackbarOrigin,
  styled,
  Switch,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../shared/contexts/AuthGoogle';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../shared/components/languageSwitcher';
import { useThemeContext } from '../../shared/contexts';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 2,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 28,
    height: 28,
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export interface StateCreateUser extends SnackbarOrigin {
  open: boolean;
}

export const Cadastro = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const {
    signedUser,
    email,
    password,
    setEmail,
    setPassword,
    openError,
    createUser,
  }: any = useContext(AuthGoogleContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [state, setState] = useState<StateCreateUser>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const flag = sessionStorage.getItem('flag');
  const us = '../../../estados-unidos-da-america.png';
  const { changeTheme } = useThemeContext();
  const active = sessionStorage.getItem('theme');


  function toggleButton(): boolean | undefined {
    if (active === 'dark') return true;
    return false;
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function handleSignOut(newState: SnackbarOrigin) {
    await signedUser(email, password);
    console.log(createUser);
    if (createUser !== '') {
      setErrors(false);
      setState({ open: true, ...newState });
      setTimeout(() => {
        navigate('/');
      }, 6000);
    } else {
      setErrors(true);
    }
  }
  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };
  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrors(false);
  };

  return (
    <>
      <Box>
        <AppBar position='fixed' color='default'>
          <Toolbar sx={{justifyContent: 'space-between'}}>
            <FormControlLabel
              checked={toggleButton()}
              onClick={changeTheme}
              sx={{ display: 'flex', margin: -3 }}
              control={<MaterialUISwitch sx={{ m: 1 }} />}
              title={t('tituloTrocaDeTema') || undefined}
              label=''
            />
            {auth && (
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  title={t('idioma')|| undefined}
                  src={flag || us}
                  onClick={handleMenu}
                  style={ smDown ? { width: 30, display:'flex', marginRight: 20, cursor: 'pointer' }: { width: 40, display:'flex', marginRight: 30, cursor: 'pointer' }}
                />
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <LanguageSwitcher />
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Snackbar
          open={errors}
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
            {openError}
          </Alert>
        </Snackbar>
        <Snackbar
          key={vertical + horizontal}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity='success'
            sx={{ width: '100%' }}
            variant='filled'
          >
            {t('usuarioCriadoComSucesso')}
          </Alert>
        </Snackbar>

        <Card
          sx={smDown ? { maxWidth: 300 } : { maxWidth: 645, marginLeft: -27 }}
        >
          <CardMedia
            component='img'
            height={smDown ? 105 : mdDown ? 130 : 170}
            image='../../../logo.png'
            alt='logo-web-cadastro'
          />
          <CardContent>
            <Box
              display='flex'
              flexDirection='column'
              gap={2}
              width={smDown ? 270 : mdDown ? 350 : 400}
            >
              <Typography variant='h6' textAlign='center'>
                {t('cadastre-se')}
              </Typography>
              <FormControl variant='outlined' color='secondary'>
                <InputLabel htmlFor='standard-adornment-email'>
                  {t('email')}
                </InputLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('digiteSeuEmail')||undefined}
                />
              </FormControl>
              <FormControl variant='outlined' color='secondary'>
                <InputLabel htmlFor='standard-adornment-password'>
                  {t('senha')}
                </InputLabel>
                <Input
                  id='standard-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='******'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </CardContent>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Button
                sx={
                  smDown
                    ? { fontSize: 10, padding: 1.3, borderRadius: 3 }
                    : { fontSize: 14, padding: 1.3, borderRadius: 3 }
                }
                variant='contained'
                color='success'
                onClick={() =>
                  handleSignOut({ vertical: 'top', horizontal: 'right' })
                }
              >
                {t('criarConta')}
              </Button>
            </Box>
          </CardActions>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Typography>
                {t('jaTemUmaConta')}
                <Link
                  color='error'
                  underline='hover'
                  href='/'
                  style={{ marginLeft: 5 }}
                >
                  {t('login')}
                </Link>
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
