import { ProjectState, statusMap, prioritiesMap } from "./types";

export const PROJECT = {
    id: 0,
    name: "",
    state: ProjectState.NOTSTARTED,
    description: "",
    tasks: [],
    leaderId: 0,
    startDate: new Date(),
    endDate: new Date()
}

export const TASK = {
    id: 0,
    name: "",
    description: "",
    priority: "Low",
    state: "NotStarted",
    dueDate: new Date(),
    consumedHours: 0,
    projectId: 0,
    resourceId: 0,
}

export const RESOURCE = {
    legajo: '',
    Nombre: '',
    Apellido: '',
}