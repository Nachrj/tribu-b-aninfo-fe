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

export type Task = {
    id: number,
    name: string,
    description: string,
    projectId: number,
    priority: TaskPriority,
    status: ProjectState,
    startDate: Date,
    endDate: Date,
    resources: Resource[],
}