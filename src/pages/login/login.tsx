import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
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
import { Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../shared/contexts/AuthGoogle';
export interface StateCreateCountUser extends SnackbarOrigin {
  open: boolean;
}

export const Login = () => {
  const {
    signInGoogle,
    signed,
    sign,
    email,
    password,
    setEmail,
    setPassword,
    openError,
  }: any = useContext(AuthGoogleContext);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isLoading, setIsLoading] = useState(false);
  const [openErrors, setOpenErrors] = useState(false);
  const [state, setState] = useState<StateCreateCountUser>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function loginGooogle() {
    await signInGoogle();
  }
  
  async function signUser() {
    if(!signed){
      await sign(email, password);
      setOpenErrors(true);
      setIsLoading(true);      
    } 
    if (openErrors) {
      setOpenErrors(false);
      setIsLoading(false);
      console.log('error');
    }
    
  }
  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrors(false);
  };

  if (!signed) {
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
          open={openErrors}
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
                Acesse sua conta
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Faça login na sua conta e aproveite ao máximo todos os serviços
                disponíveis.
              </Typography>
              
              <FormControl variant='outlined' color='secondary' >
                <InputLabel htmlFor='standard-adornment-email'>
                  Email
                </InputLabel>
                <Input
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='exemplo@gmail.com'
                  disabled={isLoading && !openError}
                  required
                />
              </FormControl>
              <FormControl variant='outlined' color='secondary'>
                <InputLabel className='password'>
                  Senha
                </InputLabel>
                <Input
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='******'
                  disabled={isLoading && !openError}
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
                sx={smDown ? { fontSize: 12, padding: 1.3, borderRadius: 3 } : { fontSize: 14, padding: 1.3, borderRadius: 3}}
                variant='contained'
                color='info'
                onClick={() => 
                  signUser()
                }
                endIcon={isLoading && !openError ? <CircularProgress variant='indeterminate'size={20} color='inherit'/> : undefined}
              >
                Login
              </Button>
            </Box>
          </CardActions>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Button
                sx={smDown ? { fontSize: 12, padding: 1.3, borderRadius: 3 } : { fontSize: 14, padding: 1.3, borderRadius: 3}}
                variant='contained'
                color='error'
                onClick={() => loginGooogle()}
              >
                Entrar com Google
              </Button>
            </Box>
          </CardActions>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Typography>
                Náo tem uma conta?
                <Link
                  color='error'
                  underline='hover'
                  href='/cadastro'
                  style={{ marginLeft: 5 }}
                >
                  Criar conta
                </Link>
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Box>
    );
  } else {
    return <Navigate to='/pagina-inicial' />;
  }
};
