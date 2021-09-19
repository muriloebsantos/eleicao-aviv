import { Candidato } from './candidato.model';

export interface Votacao {
    id: string;
    nome: string;
    candidatos: Candidato[];
}