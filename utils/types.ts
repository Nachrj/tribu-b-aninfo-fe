export const statusMap = new Map<string, string>([
    ['Finished', 'Finalizado'],
    ['InProgress', 'En progreso'],
    ['NotStarted', 'No iniciado'],
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