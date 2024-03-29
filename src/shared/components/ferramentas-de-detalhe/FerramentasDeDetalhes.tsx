import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: any;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;
  mostrarBotaoNovo?: boolean;

  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const {t} = useTranslation();

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
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          size={smDown? 'small' :'medium'}
          variant="contained"
          color="secondary"
          disableElevation
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={smDown ? 8 : mdDown ? 12 : 14}

          >
            {t('salvar')}
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}
      {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (
        <Button
          size={smDown? 'small' :'medium'}
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={aoClicarEmSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={smDown ? 8 : mdDown ? 12 : 14}

          >
            {t('salvarEFechar')}
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}
      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          size={smDown? 'small' :'medium'}
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={smDown ? 8 : mdDown ? 12 : 14}

          >
            {t('botaoApagar')}
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}
      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && !mdDown && (
        <Button
          size={smDown? 'small' :'medium'}          
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={smDown ? 8 : mdDown ? 12 : 14}

          >
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}
      {mostrarBotaoNovoCarregando && !smDown && !mdDown && (
        <Skeleton width={110} height={60} />
      )}
      {mostrarBotaoVoltar && (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar) && (
        <Divider variant="middle" orientation="vertical" />
      )}
      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          size={smDown? 'small' :'medium'}
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={smDown ? 8 : mdDown ? 12 : 14}
          >
            {t('voltar')}
          </Typography>
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  );
};
