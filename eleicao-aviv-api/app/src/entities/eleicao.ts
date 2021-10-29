import { Cargo } from "./cargo";

export interface Eleicao  {
    _id: string;
    igrejaId: string;
    nome: string;
    dataInicio?: Date;
    dataFim?: Date;
    quantidadeEleitores?: number;
    cargos: Cargo[];
}