import { User } from './user.model';

export interface TableDataDTO {
    user: User; 
    controlNames: string[]; 
    headers: string[]
}