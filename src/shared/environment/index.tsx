const lang = sessionStorage.getItem('language');
const alternateSearch = 'Search...';
const alternateText = 'No records found.';

export const Environment = {
  
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  LIMITE_DE_LINHAS: 7,
  /**
   * Placeholder exibido nas inputs
   */
  
  INPUT_DE_BUSCA: lang ?
    lang === 'us'
      ? 'Search...':
      lang === 'pt'
        ? 'Pesquisar...'
        : 'Rechercher...'
    : alternateSearch,
  /**
   * Texto exibido quando nenhum registro é encontrado em uma listagem
   */
  LISTAGEM_VAZIA: lang ?   
    lang === 'pt'
      ? 'Nenhum registro encontrado.':
      lang === 'us'
        ? 'No records found.'
        : 'Aucun enregistrement trouvé.'
    : alternateText,
  /**
   * Url base de consulta dos dados dessa aplicação
   */
  URL_BASE: 'https://register-typescript-api.onrender.com',
};
