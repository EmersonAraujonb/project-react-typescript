import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  IListagemCidade,
  CidadesService,
} from '../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../shared/hooks';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { Environment } from '../../shared/environment';
import { useTranslation } from 'react-i18next';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openErrorConexao, setOpenErrorConexao] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [t] = useTranslation();
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          setOpenErrorConexao(true);
        } else {
          setRows(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: string, newState: SnackbarOrigin) => {
    setOpenDialog(true);
    CidadesService.deleteById(id).then((result) => {
      if (result instanceof Error) {
        setOpenError(true);
        setOpenDialog(false);
      } else {
        setRows((oldRows) => [
          ...oldRows.filter((oldRows) => oldRows.id !== id),
        ]);
        setState({ open: true, ...newState });
        setOpenDialog(false);
      }
    });
  };
  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const handleCloseErrorConexao = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorConexao(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <LayoutBaseDePagina
      titulo={t('tituloListagemDeCidades')}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo={t('textoBotaoNovo')}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
        />
      }
    >
      <Snackbar  key={vertical + horizontal}  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }} variant='filled'>
          {t('cidadeDeletadaComSucesso')}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }} variant='filled'>
          {t('erroAoApagarCidade')}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorConexao} autoHideDuration={6000} onClose={handleCloseErrorConexao} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseErrorConexao} severity="error" sx={{ width: '100%' }} variant='filled'>
          {t('erroDeConexao')}
        </Alert>
      </Snackbar>
      <TableContainer
        component={Paper}
        variant='outlined'
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >{t('cidade')}</TableCell>
              <TableCell >{t('estado')}</TableCell>
              <TableCell >{t('acoes')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                
                <TableCell >{row.city}</TableCell>
                <TableCell >{row.state}</TableCell>
                <TableCell>
                  <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {t('desejaApagarEstaCidade')}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {t('estaOperacaoNaoPoderaSerDesfeita')}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button color='error' autoFocus onClick={handleClose}>
                        {t('botaoCancelar')}
                      </Button>
                      <Button color='success' onClick={() => handleDelete(row.id, {vertical: 'top',horizontal: 'right',})} autoFocus>
                        {t('botaoApagar')}
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <IconButton
                    size='small'
                    color='inherit'
                    onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                  >
                    <Icon fontSize={smDown ? 'small' : 'medium'} color='primary'>edit</Icon>
                  </IconButton>
                  {smDown && smDown ? '' : <span>|</span>}
                  <IconButton onClick={handleClickOpen} size='small' >
                    <Icon color='error' fontSize={smDown ? 'small' : 'medium'}>delete_forever</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption> {Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' color='secondary' />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow >
                <TableCell colSpan={3} >
                  <Pagination
                    color="secondary"
                    variant="outlined"
                    size="small"
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString(),  },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
