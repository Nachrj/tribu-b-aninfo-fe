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
    consumedHours: number,
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