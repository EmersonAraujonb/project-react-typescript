import { Logout, PersonAdd } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Divider,
  FormControlLabel,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Switch,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useThemeContext, useDrawerContext } from '../contexts';
import { AuthGoogleContext } from '../contexts/AuthGoogle';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -2,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '2px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(3)',
      opacity: 0,
    },
  },
}));
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

interface ILayoutBaseDePagina {
  children?: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePagina> = ({
  children,
  titulo,
  barraDeFerramentas,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const { signOut }: any = useContext(AuthGoogleContext);
  const { changeTheme } = useThemeContext();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const dados: any = sessionStorage.getItem('User');
  const userLogado = JSON.parse(dados);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const active = localStorage.getItem('theme');

  const { toggleDrawerOpen } = useDrawerContext();

  useEffect(() => {
    if (dados) {
      setUser(userLogado.displayName);
      setEmail(userLogado.email);
      setImage(userLogado.photoURL);
    }
  }, [userLogado, dados]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function toggleButton() : boolean | undefined {
    if(active === 'dark') return true;
    return false;
  }

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box
        padding={1}
        display='flex'
        alignItems='center'
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        justifyContent='space-between'
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          variant={smDown ? 'h6' : mdDown ? 'h4' : 'h3'}
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {titulo}
        </Typography>
        <Box display='flex'>
          <FormControlLabel
            checked={toggleButton()}
            onClick={changeTheme}
            sx={{ display: 'flex', margin: -3}}
            control={<MaterialUISwitch sx={{ m: 1 }} />}
            label=''
          />
          <Tooltip title='Configuracoẽs'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <StyledBadge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
              >
                <Avatar
                  sx={
                    smDown
                      ? {
                        height: theme.spacing(4),
                        width: theme.spacing(4),
                      }
                      : mdDown
                        ? {
                          height: theme.spacing(6),
                          width: theme.spacing(6),
                        }
                        : {
                          height: theme.spacing(8),
                          width: theme.spacing(8),
                        }
                  }
                  src={image}
                />
              </StyledBadge>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 42,
              height: 42,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={image} /> <strong>{user ? user : email}</strong>
        </MenuItem>
        <MenuItem>{user ? email : undefined}</MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Adicionar nova conta
        </MenuItem>
        <Divider />
        <MenuItem style={{ backgroundColor: '#ff3232' }} onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize='small' style={{ color: 'White' }} />
          </ListItemIcon>
          <ListItemText style={{ color: 'white' }} primary='Sair' />
        </MenuItem>
      </Menu>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};
