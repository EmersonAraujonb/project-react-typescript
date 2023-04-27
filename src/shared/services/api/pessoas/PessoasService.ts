import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemPessoa {
  id: string;
  fullName: string;
  email: string;
  // city: string;
}
export interface IDetalhePessoa {
  id: string;
  fullName: string;
  email: string;
  city: string;
}

type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const getAll = async (
  page= 1,
  search = ''
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const result = await Api.get('/peoples');
    const urlRelativa = `/peoples?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&search=${search}`;
    const { data } = await Api.get(urlRelativa);
    if (data) {
      return {
        data,
        totalCount: result.data.length,
      };
    }
    return new Error('Erro ao listar os registros!');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros!'
    );
  }
};

const getById = async (id: string): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.patch(`/peoples/${id}`);
    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro!');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o registro!'
    );
  }
};

const create = async (
  dados: Omit<IDetalhePessoa, 'id'>
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/peoples', dados);
    if (data) {
      console.log(data);
      return data.id;
    }
    return new Error('Erro ao criar o registro!');
  } catch (error) {
    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro!'
    );
  }
};

const updateById = async (
  id: string,
  dados: IDetalhePessoa
): Promise<void | Error> => {
  try {
    const { data } = await Api.patch(`/peoples/${id}`, dados);
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro!'
    );
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/peoples/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro!'
    );
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
