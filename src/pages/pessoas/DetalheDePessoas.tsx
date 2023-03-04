import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhes } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
  email: string;
  city: string;
  fullName: string;
}
const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().required().email(),
  city: yup.string().required(),
});

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(id).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          console.log(result);
          navigate('/pessoas');
        } else {
          setNome(result.fullName);
          formRef.current?.setData(result);
          console.log(result);
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
              alert(result.message);
              console.log(dados);
            } else {
              if (isSaveAndClose()) {
                navigate('/pessoas');
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(id, { id: id, ...dadosValidados }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
                console.log(dados);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                }
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
  const handleDelete = (id: string) => {
    if (confirm(`Realmente deseja apagar o usuário(a) ${nome}`)) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };
  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Novo Usuário' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmApagar={() => handleDelete(id)}
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

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome Completo'
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
                  label='E-mail'
                  name='email'
                  disabled={isLoading}
                  color='secondary'
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Cidade'
                  name='city'
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
