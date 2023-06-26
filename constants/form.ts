const MAXNAMELENGTH = 30;
const MAXDESCRIPTIONLENGTH = 100;

export const MAXLENGTHS = {
    name: MAXNAMELENGTH,
    description: MAXDESCRIPTIONLENGTH,
}
export const FORM_ERRORS = {
    maxNameLength: `${MAXNAMELENGTH} caracteres máximo`,
    maxDescriptionLength: `${MAXDESCRIPTIONLENGTH} caracteres máximo`,
    noName: "Debe ingresar un título",
    noDescription: "Debe ingresar una descripción",
    noClient: "Debe ingresar el cliente",
    noResource: "Debe ingresar un recurso",
    noPriority: "Debe ingresar una prioridad",
    noSeverity: "Debe ingresar una severidad",
    noCost: "Debe ingresar el costo",
}