export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export interface ErrorInputProps {
  name: string
  description: string
  client: string
  cost: string
}