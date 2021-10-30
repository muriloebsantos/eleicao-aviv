export interface Candidato {
    _id: string;
    igrejaId: string;
    nome: string;
    apelido?: string;
    foto?: string;
    ativo: boolean;
}