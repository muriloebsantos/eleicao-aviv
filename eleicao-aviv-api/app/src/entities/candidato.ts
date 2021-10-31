export interface Candidato {
    _id: string;
    matricula: number;
    igrejaId: string;
    nome: string;
    apelido?: string;
    foto?: string;
    ativo: boolean;
}