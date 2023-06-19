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
  id: number,
  SLA: string,
  client_id: number,
  description: string,
  priority: number,
  product_version_id: number,
  resource_name: string,
  severity: number,
  state: number,
  title: string
}

