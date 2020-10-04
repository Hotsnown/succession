import { JsonGedcomData } from 'topola';
import { Status } from '../../../../core/devolution/entities';

export interface extendedJsonGedcomData extends JsonGedcomData {
    indis: ExtendedIndi[];
}
interface ExtendedIndi {
    status: Status;
    id: string;
    firstName: string;
    fams?: string[];
    famc?: string;
    death?: {
        date: {
            day: number,
            month: number,
            year: number
        }
    }
}
