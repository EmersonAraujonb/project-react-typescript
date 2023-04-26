const br = '../../../brasil.png';
const fr = '../../../franca.png';
const us = '../../../estados-unidos-da-america.png';

import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,

} from '@mui/material';
import { useTranslation } from 'react-i18next';
const languagesOptions = [
  {
    name: 'Portuguese',
    value: 'pt',
    flag: br,
  },
  {
    name: 'English',
    value: 'us',
    flag: us,
  },
  {
    name: 'French',
    value: 'fr',
    flag: fr,
  },
];
export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            {t('selecioneUmaLinguagem')}
          </ListSubheader>
        }
      >
        {languagesOptions.map((languageOption) => (
          <List component='div' disablePadding key={languageOption.value}>
            <ListItemButton
              sx={{ pl: '10%' }}
              onClick={() => {
                i18n.changeLanguage(languageOption.value);
                sessionStorage.setItem('language', languageOption.value);
                sessionStorage.setItem('flag', languageOption.flag);
                document.location.reload();
              }}
            >
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar src={languageOption.flag} />
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText primary={languageOption.name} />
            </ListItemButton>
          </List>
        ))}
      </List>
    </Box>
  );
};
