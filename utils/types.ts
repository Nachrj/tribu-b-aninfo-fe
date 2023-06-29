export const statusMap = new Map<string, string>([
    ['Finished', 'Finalizado'],
    ['InProgress', 'En progreso'],
    ['NotStarted', 'No iniciado'],
])

export const prioritiesMap = new Map<string, string>([
    ['Low', 'Baja'],
    ['Medium', 'Media'],
    ['High', 'Alta'],
])

export type Resource = {
    legajo: string,
    Nombre: string,
    Apellido: string,
}

export enum ProjectState {
    NOTSTARTED = "No iniciado",
    INPROGRESS = "En progreso",
    FINISHED = "Finalizado",
}

export enum TaskPriority {
    LOW = "Baja",
    MEDIUM = "Media",
    HIGH = "Alta",
}

export type Project = {
    id: number,
    name: string,
    description: string,
    leaderId: number,
    startDate: Date,
    endDate: Date,
    state: ProjectState,
}

export type ProjectTable = {
    id: number,
    nombre: string,
    descripcion: string,
    [key: string]: any, // Index signature accepting any string key
}

export type TaskTable = {
    id: number,
    nombre: string,
    estado: string,
    prioridad: string,
    [key: string]: any, // Index signature accepting any string key
}

export type Task = {
    id: number,
    name: string,
    description: string,
    projectId: number,
    priority: TaskPriority
    resourceId: number,
    consumedHours: number,
    state: ProjectState,
}

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
  