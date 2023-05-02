import React from 'react';

import { Box, Button, Icon, Paper, TextField, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: any;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
  titulo?: any;
  icone?: any;
}

export const FerramentasDaListagem: React.FC<IBarraDeFerramentasProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo,
  titulo = '',
  icone
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          color='secondary'
          size="small"
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          placeholder={Environment.INPUT_DE_BUSCA || undefined}
        />
      )}
      <Typography
        variant={smDown ? 'h6' : mdDown ? 'h5' : 'h5'}
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
      >
        {icone} {titulo}
      </Typography>
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
