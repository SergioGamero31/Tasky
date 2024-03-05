export const errors = {
  field: {
    MISSING: 'El campo es obligatorio'
  },
  email: {
    MISSING: 'El correo electrónico es obligatorio',
    INVALID_FORMAT: 'El formato del correo electrónico es inválido'
  },
  userName: {
    MISSING: 'El usuario es obligatorio',
    TOO_SHORT: 'Debe tener al menos 4 caracteres'
  },
  password: {
    MISSING: 'La contraseña es obligatoria',
    MISSMATCH: 'Las contraseñas no coinciden',
    TOO_SHORT: 'Debe tener al menos 8 caracteres',
    MISSING_UPPERCASE: 'Debe tener al menos una mayúscula y un número'
  }
}
