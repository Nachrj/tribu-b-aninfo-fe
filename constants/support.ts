// esto se deberia configurar con variables de entorno, pero fue
// export const SUPPORT_BASE_URL = "http://localhost:5001";
export const SUPPORT_BASE_URL = "https://psa-soporte.onrender.com";

type TicketOptionsInterface = {
    [key: number]: string
}

export const TICKET_STATE: TicketOptionsInterface = {
    1: "NUEVO",
    2: "ABIERTO",
    3: "EN PROGRESO",
    4: "CERRADO",
};

export const TICKET_PRIORITY = {
    1: "ALTA",
    2: "MEDIA",
    3: "BAJA"
};

export const STATES_OPTIONS = [
    {
        key: 1,
        label: 'NUEVO'
    },
    {
        key: 2,
        label: "ABIERTO"
    },
    {
        key: 3,
        label: "EN PROGRESO"
    },
    {
        key: 4,
        label: "CERRADO"
    }
];

export const SEVERITY_OPTIONS = [
    {
        key: 1,
        label: '1'
    },
    {
        key: 2,
        label: "2"
    },
    {
        key: 3,
        label: "3"
    },
    {
        key: 4,
        label: "4"
    }
];
export const PRIORITY_OPTIONS = [
    {
        key: 1,
        label: 'ALTA'
    },
    {
        key: 2,
        label: "MEDIA"
    },
    {
        key: 3,
        label: "BAJA"
    }
];
