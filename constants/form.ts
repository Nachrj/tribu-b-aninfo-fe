const MAXNAMELENGTH = 30;
const MAXDESCRIPTIONLENGTH = 100;

export const MAXLENGTHS = {
    name: MAXNAMELENGTH,
    description: MAXDESCRIPTIONLENGTH,
}
export const FORMERRORS = {
    maxNameLength: `${MAXNAMELENGTH} caracteres máximo`,
    maxDescriptionLength: `${MAXDESCRIPTIONLENGTH} caracteres máximo`,
    noName: "Debe ingresar un nombre",
    noDescription: "Debe ingresar una descripción",
    noClient: "Debe ingresar el cliente",
    noCost: "Debe ingresar el costo",
    noHours: 'Debe ingresar la cantidad de horas',
    noDueDate: "Debe ingresar la fecha límite de la tarea",
}