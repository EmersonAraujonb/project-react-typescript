import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';
import { AuthGoogleContext } from '../../contexts/AuthGoogle';
import { LanguageSwitcher } from '../languageSwitcher';

interface IChildren {
  children?: React.ReactNode;
}
interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick?: () => void | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <List component='nav'>
      <ListItemButton  selected={!!match} onClick={handleClick}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </List>
  );
};

export const MenuLateral: React.FC<IChildren> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const dados: any = sessionStorage.getItem('User');
  const { signOut }: any = useContext(AuthGoogleContext);
  const {t} = useTranslation();
  const image = '../../../logo.png';

  return (
    <>
      {dados && (
        <Drawer
          open={isDrawerOpen}
          variant={smDown ? 'temporary' : 'permanent'}
          onClose={toggleDrawerOpen}
        >
          <Box
            width={theme.spacing(28)}
            height='100%'
            display='flex'
            flexDirection='column'
          >
            <Box
              width='100%'
              display='flex'
              alignItems='center'
              justifyContent={'center'}
            >
              <Avatar
                sx={
                  { height: theme.spacing(12), width: theme.spacing(12), marginTop: theme.spacing(1)}
                }
                src={image}
              />
              <Typography variant='overline' fontSize={14} fontWeight={900}>Web Cadastro</Typography>
            </Box>
            <Divider sx={{marginTop:1}} />
            <Box flex={1}>
              <List component='nav'>
                {drawerOptions?.map((drawerOption) => (
                  <ListItemLink
                    key={drawerOption.path}
                    icon={drawerOption.icon}
                    label={drawerOption.label}
                    to={drawerOption.path}
                    onClick={smDown ? toggleDrawerOpen : undefined}
                  />
                ))}
              </List>
            </Box>
            <Divider />
            <Box>
              <List component='nav'>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  align='center'
                  lineHeight='2rem'
                >
                  {' Copyright '}
                  {' © '}
                  {new Date().getFullYear()}
                  {' Web Cadastro'}
                </Typography>
              </List>
            </Box>
          </Box>
        </Drawer>
      )}
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
