const MAXNAMELENGTH = 100;
const MAXDESCRIPTIONLENGTH = 1000;

export const MAXLENGTHS = {
    name: MAXNAMELENGTH,
    description: MAXDESCRIPTIONLENGTH,
}
export const FORMERRORS = {
    maxNameLength: `${MAXNAMELENGTH} caracteres máximo`,
    maxDescriptionLength: `${MAXDESCRIPTIONLENGTH} caracteres máximo`,
    noName: "Debe ingresar un título",
    noDescription: "Debe ingresar una descripción",
    noClient: "Debe ingresar el cliente",
    noProductVersion: "Debe la version del producto",
    noResource: "Debe ingresar un recurso",
    noPriority: "Debe ingresar una prioridad",
    noSeverity: "Debe ingresar una severidad",
    noState: "Debe ingresar un Estado",
    noCost: "Debe ingresar el costo",
    InvalidState: "Debe ingresar un Estado",
    noHours: 'Debe ingresar la cantidad de horas',
    noDueDate: "Debe ingresar la fecha límite de la tarea",
}