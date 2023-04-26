import { setLocale } from 'yup';
const lang = sessionStorage.getItem('language');

setLocale({
  mixed: {
    default:  lang === 'pt'
      ? 'Campo não é válido':
      lang === 'us'
        ? 'Field is not valid'
        : 'Le champ n"est pas valide',
    required: lang === 'pt'
      ? 'O campo é obrigatório' 
      : lang === 'us'
        ? 'The field is required' 
        : 'Le champ est obligatoire',
  },
  string: {
    email: () =>  lang === 'pt'
      ?'O campo precisa conter um email válido'
      :  lang === 'us'
        ?  'The field must contain a valid email' 
        : 'Le champ doit contenir un email valide',
    max: ({ max }) =>
      lang === 'pt'
        ? `O campo pode ter no máximo ${max} caracteres`
        : lang === 'us'
          ? `The field can have a maximum of ${max} characters`
          : `Le champ peut contenir un maximum de ${max} caractères`,
    min: ({ min }) =>
      lang === 'pt'
        ? `O campo precisa ter pelo menos ${min} caracteres`
        : lang === 'us'
          ? `Field must be at least ${min} characters long`
          : `Le champ doit comporter au moins ${min} caractères`,
    length: ({ length }) =>
      lang === 'pt'
        ? `O campo precisa ter exatamente ${length} caracteres` 
        : lang === 'us'
          ?`Field must be exactly ${length} characters`
          : `Le champ doit contenir exactement ${length} caractères`,
  },
  date: {
    max: ({ max }) =>  lang === 'pt'
      ? `A data deve ser menor que ${max}`
      :  lang === 'us'
        ? `The date must be less than ${max}`
        : `La date doit être inférieure à ${max}`,
    min: ({ min }) =>  lang === 'pt'
      ? `A data deve ser maior que ${min}`
      : lang === 'us'
        ? `The date must be greater than ${min}`
        : `La date doit être supérieure à ${min}`,
  },
  number: {
    integer: () => lang === 'pt'
      ? 'O campo precisa ter um valor inteiro'
      : lang === 'us'
        ? 'The field must have an integer value'
        : 'Le champ doit avoir une valeur entière' ,
    negative: () => lang === 'pt'
      ? 'O campo precisa ter um valor negativo'
      : lang === 'us'
        ? 'The field must have a negative value'
        : 'Le champ doit avoir une valeur négative' ,
    positive: () =>  lang === 'pt'
      ? 'O campo precisa ter um valor positivo'
      : lang === 'us'
        ? 'The field must have a positive value'
        : 'Le champ doit avoir une valeur positive' ,
    moreThan: ({ more }) =>  lang === 'pt'
      ? `O campo precisa ter um valor maior que ${more}`
      : lang === 'us'
        ? `The field must have a value greater than ${more}`
        : `Le champ doit avoir une valeur supérieure à ${more}` ,
    lessThan: ({ less }) =>  lang === 'pt'
      ? `O campo precisa ter um valor menor que ${less}`
      : lang === 'us'
        ? `The field must have a value less than ${less}`
        : `Le champ doit avoir une valeur inférieure à ${less}`,
    min: ({ min }) => lang === 'pt'
      ?  `O campo precisa ter um valor com mais de ${min} caracteres`
      : lang === 'us'
        ? `Field must have a value longer than ${min} characters`
        : `Le champ doit avoir une valeur supérieure à ${min} caractères`,
    max: ({ max }) => lang === 'pt'
      ?   `O campo precisa ter um valor com menos de ${max} caracteres`
      : lang === 'us'
        ? `Field must have a value of less than ${max} characters`
        : `Le champ doit avoir une valeur inférieure à ${max} caractères`,
  },
  boolean: {},
  object: {},
  array: {},
});
