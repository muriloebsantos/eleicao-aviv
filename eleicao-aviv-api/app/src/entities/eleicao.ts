import { Document } from "bson";

export interface Eleicao extends Document {
    _id: string;
    igrejaId: string;
    nome: string;
    codigo: string;
    dataInicio?: Date;
    dataFim?: Date;
    quantidadeEleitores?: number;
}