const MAXNAMELENGTH = 30;
const MAXDESCRIPTIONLENGTH = 100;

export const MAXLENGTHS = {
    name: MAXNAMELENGTH,
    description: MAXDESCRIPTIONLENGTH,
}
export const FORMERRORS = {
    maxNameLength: `${MAXNAMELENGTH} caracteres mínimo`,
    maxDescriptionLength: `${MAXDESCRIPTIONLENGTH} caracteres mínimo`,
    noName: "Debe ingresar un nombre",
    noDescription: "Debe ingresar una descripción",
    noClient: "Debe ingresar el cliente",
    noCost: "Debe ingresar el costo",
}