const lang = sessionStorage.getItem('language');

export const Environment = {
  
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  LIMITE_DE_LINHAS: 7,
  /**
   * Placeholder exibido nas inputs
   */
  
  INPUT_DE_BUSCA: lang === 'pt'
    ? 'Pesquisar...':
    lang === 'us'
      ? 'Search...'
      : 'Rechercher...',
  /**
   * Texto exibido quando nenhum registro é encontrado em uma listagem
   */
  LISTAGEM_VAZIA:  lang === 'pt'
    ? 'Nenhum registro encontrado.':
    lang === 'us'
      ? 'No records found.'
      : 'Aucun enregistrement trouvé.',
  /**
   * Url base de consulta dos dados dessa aplicação
   */
  URL_BASE: 'https://register-typescript-api.onrender.com',
};
