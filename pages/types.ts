export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Client {
  id: string
  social_reason: string
  cuit: number
}

export interface Product {
  id: number
  name: string
  version_id: string
  version_name: string
}

export interface ProductVersion {
  id: number
  product_id: string
  version: string
}

export interface Ticket {
  title: string,
  description: string,
  priority: number,
  severity: number,
  product_version_id: number,
  product_id: number,
  resource_id: number,// TODO: Make this field be the resource name!
  client_id: number,
  state: number,
  sla: Date,
}

