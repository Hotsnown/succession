export interface FamilyExample {
    [key: string]: Member
}

interface Member {
    id: string;
    name: string;
    partners?: string[];
    children?: HouseHold;
    status?: 'valid' | 'invalid';
}

interface HouseHold {
    [key: string]: string[]
}