export interface User {
    id: number;
    firstName: string;
    name: string;
    mail: string;
    address: string;
    city: string;
    zipCode: string;
    birthday: string;
    roles: string[];
    password?: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface Content {
    id: number;
    title: string;
    content: string;
}

export interface BreathExercise {
    id: number;
    name: string;
    inspirationDuration: string;
    apneaDuration: string;
    expirationDuration: string;
}
