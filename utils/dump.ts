import { ProjectState } from "./types";

export const PROJECT = {
    id: 0,
    name: "",
    state: ProjectState.NOTSTARTED,
    description: "",
    tasks: [],
    leaderId: 0,
    startDate: new Date(),
    endDate: new Date(),
    consumedHours: 0,
}