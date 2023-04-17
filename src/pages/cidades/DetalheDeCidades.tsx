import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, Paper, Snackbar, SnackbarOrigin, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhes } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';

interface IFormData {
  city: string;
  state: string;
}
const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  city: yup.string().required(),
  state: yup.string().required(),
});
export interface StateDetalheCidade extends SnackbarOrigin {
  open: boolean;
}

export const DetalheDeCidades: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [openError, setOpenError] = useState(false);
  const [openErrorConexao, setOpenErrorConexao] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdateError, setOpenUpdateError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = useState<StateDetalheCidade>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      CidadesService.getById(id).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          setOpenErrorConexao(true);
          navigate('/cidades');
        } else {
          setCity(result.city);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        city: ''
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === 'nova') {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              setOpenErrorConexao(true);
            } else {
              if (isSaveAndClose()) {
                setOpenCreate(true);
                setTimeout(() => {
                  navigate('/cidades');
                }, 6000); 
              } else {
                setOpenCreate(true);
                navigate(`/cidades/detalhe/${result}`);
                setTimeout(() => {
                  setOpenCreate(false);
                }, 6000); 
              }
            }
          });
        } else {
          CidadesService.updateById(id, { id: id, ...dadosValidados }).then(
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
                    navigate('/cidades');
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

        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };
  const handleDelete = (id: string, newState: SnackbarOrigin) => {
    setOpenDialog(true);
    CidadesService.deleteById(id).then((result) => {
      if (result instanceof Error) {
        setOpenError(true);
        setOpenDialog(false);
      } else {
        setState({ open: true, ...newState });
        setOpenDialog(false);
        setTimeout(() => {
          navigate('/cidades');
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
      titulo={id === 'nova' ? 'Nova Cidade' : city}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmApagar={handleClickOpen}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmNovo={() => {
            navigate('/cidades/detalhe/nova');
          }}
          aoClicarEmVoltar={() => {
            navigate('/cidades');
          }}
        />
      }
    >
      <Snackbar  key={vertical + horizontal}  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }} variant='filled'>
          Cidade excluida com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }} variant='filled'>
          Erro ao excluir cidade!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorConexao} autoHideDuration={6000} onClose={handleCloseErrorConexao} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseErrorConexao} severity="error" sx={{ width: '100%' }} variant='filled'>
          Erro de conexão!
        </Alert>
      </Snackbar>
      <Snackbar open={openUpdate} autoHideDuration={6000} onClose={handleCloseUpdate} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseUpdate} severity="success" sx={{ width: '100%' }} variant='filled'>
          Cidade atualizada com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openUpdateError} autoHideDuration={6000} onClose={handleCloseUpdateError} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseUpdateError} severity="error" sx={{ width: '100%' }} variant='filled'>
          Erro ao atualizar cidade!
        </Alert>
      </Snackbar>
      <Snackbar open={openCreate} autoHideDuration={6000} onClose={handleCloseCreate} anchorOrigin={{vertical, horizontal}}>
        <Alert onClose={handleCloseCreate} severity="success" sx={{ width: '100%' }} variant='filled'>
          Cidade criada com sucesso!
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
              <Typography variant='h6'>Geral</Typography>
            </Grid>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {'Deseja excluir esta cidade?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                Esta operação não poderá ser desfeita. Deseja continuar?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color='error' autoFocus onClick={handleClose}>
                  Cancelar
                </Button>
                <Button color='success' onClick={() => handleDelete(id, {vertical: 'top',horizontal: 'right'})} autoFocus>
                  Apagar
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Cidade'
                  name='city'
                  disabled={isLoading}
                  color='secondary'
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Estado'
                  name='state'
                  disabled={isLoading}
                  color='secondary'
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
