import { Cargo } from "./cargo";

export interface Eleicao  {
    _id: string;
    nome: string;
    dataEleicao: Date;
    quantidadeEleitores?: number;
}