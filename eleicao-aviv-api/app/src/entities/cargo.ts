export interface Cargo {
    _id: string;
    eleicaoId: string;
    nome: string;
    vagas: number;
    dataInicioVotacao?: Date;
    dataFimVotacao?: Date;
}