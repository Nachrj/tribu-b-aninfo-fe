import { list } from "postcss"

export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Client {
  id: number
  social_reason: string
  cuit: number
}

export interface Resource {
  legajo: number
  Nombre: string
  Apellido: string
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
export interface ErrorInputProps {
  name: string
  description: string
  client: string
  cost: string
}

export interface TicketTask {
  ticket_id: number
  task_ids: number[]
}

export interface functionInterface {
  (event: Event): void
}