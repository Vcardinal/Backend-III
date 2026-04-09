const generateUserErrorInfo = (user) => {
  return `
Uno o más datos son inválidos para crear el usuario.
Lista de propiedades requeridas:
- first_name: debe ser String, recibido: ${user.first_name}
- last_name: debe ser String, recibido: ${user.last_name}
- email: debe ser String, recibido: ${user.email}
- password: debe ser String, recibido: ${user.password}
- role: debe ser "user" o "admin", recibido: ${user.role}
`;
};

const generatePetErrorInfo = (pet) => {
  return `
Uno o más datos son inválidos para crear la mascota.
Lista de propiedades requeridas:
- name: debe ser String, recibido: ${pet.name}
- specie: debe ser String, recibido: ${pet.specie}
- birthDate: debe ser una fecha válida, recibido: ${pet.birthDate}
`;
};

const generateLoginErrorInfo = (email) => {
  return `
Error de autenticación.
Credenciales inválidas para el email: ${email}
Verificá que el usuario exista y que la contraseña sea correcta.
`;
};

const generateIdErrorInfo = (id) => {
  return `
El identificador recibido no es válido o no existe en base de datos.
- id recibido: ${id}
`;
};

module.exports = {
  generateUserErrorInfo,
  generatePetErrorInfo,
  generateLoginErrorInfo,
  generateIdErrorInfo
};