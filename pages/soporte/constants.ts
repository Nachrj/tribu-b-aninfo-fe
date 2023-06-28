// esto se deberia configurar con variables de entorno, pero fue
// export const SUPPORT_BASE_URL = "http://localhost:5001";
export const SUPPORT_BASE_URL = "https://psa-soporte.onrender.com";

export const TICKET_STATE = {
    1: "NEW",
    2: "OPEN",
    3: "IN PROGRES",
    4: "CLOSED",
};

export const TICKET_PRIORITY = {
    1: "ALTA",
    2: "MEDIA",
    3: "BAJA"
};

export const STATES_OPTIONS = [
    {
        key: 1,
        label: 'NEW'
    },
    {
        key: 2,
        label: "OPEN"
    },
    {
        key: 3,
        label: "IN PROGRESS"
    },
    {
        key: 4,
        label: "CLOSED"
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
// export const TICKET_PRIORITY = [
//     {
//         key: 0,
//         label: 'select priority'
//     },
//     {
//         key: 1,
//         label: 'ALTA'
//     },
//     {
//         key: 2,
//         label: "MEDIA"
//     },
//     {
//         key: 3,
//         label: "BAJA"
//     },
//     {
//         key: 4,
//         label: "4"
//     }
// ];