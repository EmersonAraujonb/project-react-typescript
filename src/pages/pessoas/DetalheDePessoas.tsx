import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, Paper, Snackbar, SnackbarOrigin, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhes } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

interface IFormData {
  email: string;
  fullName: string;
  city: string;
}
const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().required().email(),
  city: yup.string().required(),
});
export interface StateDetalhePessoa extends SnackbarOrigin {
  open: boolean;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [openError, setOpenError] = useState(false);
  const [openErrorConexao, setOpenErrorConexao] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdateError, setOpenUpdateError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { t} = useTranslation();
  const [state, setState] = useState<StateDetalhePessoa>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(id).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          setOpenErrorConexao(true);
          navigate('/pessoas');
        } else {
          setNome(result.fullName);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        fullName: '',
        email: '',
        city: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === 'nova') {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              setOpenErrorConexao(true);
            } else {
              if (isSaveAndClose()) {
                setOpenCreate(true);
                setTimeout(() => {
                  navigate('/pessoas');
                }, 6000); 
              } else {
                setOpenCreate(true);
                navigate(`/pessoas/detalhe/${result}`);
                setTimeout(() => {
                  setOpenCreate(false);
                }, 6000); 
              }
            }
          });
        } else {
          PessoasService.updateById(id, { id: id, ...dadosValidados }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                setOpenErrorConexao(true);
                setOpenUpdateError(true);
                setTimeout(() => {
                  setOpenUpdateError(false);
                }, 6000);
              } else {
                if (isSaveAndClose()) {
                  setOpenUpdate(true);
                  
                  setTimeout(() => {
                    navigate('/pessoas');
                  }, 6000); 
                }
                setOpenUpdate(true);
                setTimeout(() => {
                  setOpenUpdate(false);
                }, 6000);
              }
            }
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };
  const handleDelete = (id: string, newState: SnackbarOrigin) => {
    setOpenDialog(true);
    PessoasService.deleteById(id).then((result) => {
      if (result instanceof Error) {
        setOpenError(true);
        setOpenDialog(false);
      } else {
        setState({ open: true, ...newState });
        setOpenDialog(false);
        setTimeout(() => {
          navigate('/pessoas');
        },6000);
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
  
  const handleCloseUpdate = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

  const handleCloseCreate = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };
  const handleCloseUpdateError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };
  
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ?  t('novoUsuario') : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo={t('textoBotaoNovo')}
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmApagar={handleClickOpen}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmNovo={() => {
            navigate('/pessoas/detalhe/nova');
          }}
          aoClicarEmVoltar={() => {
            navigate('/pessoas');
          }}
        />
      }
    >
      <Snackbar  key={vertical + horizontal}  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }} variant='filled'>
          {t('usuarioDeletadoComSucesso')}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }} variant='filled'>
          {t('erroAoApagarUsuario')}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorConexao} autoHideDuration={6000} onClose={handleCloseErrorConexao} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseErrorConexao} severity="error" sx={{ width: '100%' }} variant='filled'>
          {t('erroDeConexao')}
        </Alert>
      </Snackbar>
      <Snackbar open={openUpdate} autoHideDuration={6000} onClose={handleCloseUpdate} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseUpdate} severity="success" sx={{ width: '100%' }} variant='filled'>
          {t('usuarioAtualizadoComSucesso')}
        </Alert>
      </Snackbar>
      <Snackbar open={openUpdateError} autoHideDuration={6000} onClose={handleCloseUpdateError} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseUpdateError} severity="error" sx={{ width: '100%' }} variant='filled'>
          {t('erroAoAtualizarUsuario')}
        </Alert>
      </Snackbar>
      <Snackbar open={openCreate} autoHideDuration={6000} onClose={handleCloseCreate} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseCreate} severity="success" sx={{ width: '100%' }} variant='filled'>
          {t('usuarioCriadoComSucesso')}
        </Alert>
      </Snackbar>
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress color='secondary' variant='indeterminate' />
              </Grid>
            )}
            <Grid item>
              <Typography variant='h6'>{t('geralDetalhe')}</Typography>
            </Grid>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {t('desejaApagarEsteUsuario')}
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
                <Button color='success' onClick={() => handleDelete(id, {vertical: 'top',horizontal: 'right',})} autoFocus>
                  {t('botaoApagar')}
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label={t('nomeCompleto')}
                  name='fullName'
                  disabled={isLoading}
                  color='secondary'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label={t('email')}
                  name='email'
                  disabled={isLoading}
                  color='secondary'
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
