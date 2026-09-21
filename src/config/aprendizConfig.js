export const BASE = '/api/v1/aprendiz_mongodb'

export const FIELDS = [
  'numero_identificacion',
  'nombre',
  'apellido',
  'genero',
  'tipo_sangre',
  'telefono',
  'programa',
  'ficha',
  'regional'
]

export const LABELS = {
  numero_identificacion: 'Número de identificación',
  nombre: 'Nombre',
  apellido: 'Apellido',
  genero: 'Género',
  tipo_sangre: 'Tipo de sangre',
  telefono: 'Teléfono',
  programa: 'Programa',
  ficha: 'Ficha',
  regional: 'Regional'
}

export const emptyForm = () => Object.fromEntries(FIELDS.map(f => [f, '']))