import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCidade {
  id: string;
  city: string;
  state: string;
}
export interface IDetalheCidade {
  id: string;
  city: string;
  state: string;
}

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  search = ''
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const result = await Api.get('/cities');
    const urlRelativa = `/cities?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&search=${search}`;
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

const getById = async (id: string): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.patch(`/cities/${id}`);
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
  dados: Omit<IDetalheCidade, 'id'>
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cities', dados);
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
  dados: IDetalheCidade
): Promise<void | Error> => {
  try {
    const { data } = await Api.patch(`/cities/${id}`, dados);
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
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro!'
    );
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
