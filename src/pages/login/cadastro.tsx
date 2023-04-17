import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Snackbar,
  SnackbarOrigin,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../shared/contexts/AuthGoogle';
export interface StateCreateUser extends SnackbarOrigin {
  open: boolean;
}

export const Cadastro = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
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
          Usuário criado com sucesso!
        </Alert>
      </Snackbar>

      <Card
        sx={smDown ? { maxWidth: 300 } : { maxWidth: 645, marginLeft: -27 }}
      >
        <CardMedia
          component='img'
          height={smDown ? 105 : 130}
          image='../../../logo.png'
          width={smDown ? 100 : 200}
          alt='logo-web-cadastro'
        />
        <CardContent>
          <Box
            display='flex'
            flexDirection='column'
            gap={2}
            width={smDown ? 270 : 350}
          >
            <Typography variant='h6' textAlign='center'>
              Cadastre-se
            </Typography>
            <FormControl variant='outlined' color='secondary'>
              <InputLabel htmlFor='standard-adornment-email'>Email</InputLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder='exemplo@gmail.com'
              />
            </FormControl>
            <FormControl variant='outlined' color='secondary'>
              <InputLabel htmlFor='standard-adornment-password'>
                Senha
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
              Criar conta
            </Button>
          </Box>
        </CardActions>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Typography>
              Já tem uma conta?
              <Link
                color='error'
                underline='hover'
                href='/'
                style={{ marginLeft: 5 }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
