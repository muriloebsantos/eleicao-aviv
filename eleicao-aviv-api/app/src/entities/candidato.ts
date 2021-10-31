export interface Candidato {
    _id: string;
    matricula: number;
    nome: string;
    apelido?: string;
    foto?: string;
    ativo: boolean;
}