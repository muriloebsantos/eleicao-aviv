export interface Candidato {
    _id: number;
    igrejaId: string;
    nome: string;
    apelido?: string;
    foto?: string;
    ativo: boolean;
}