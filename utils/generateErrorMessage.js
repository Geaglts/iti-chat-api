const generateErrorMessage = (field, type = 'unique') => {
  if (type === 'unique') {
    return `Este ${field} ya está registrado`;
  } else if (type === 'required') {
    return `El campo de ${field} es requerido`;
  }
};

module.exports = generateErrorMessage;
