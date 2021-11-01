import { connectMongoDb } from '../db/connection';
import { Eleicao } from '../entities/eleicao';

export default class EleicaoRepository {

    public async inserirEleicao(eleicao: Eleicao){
        const db = await connectMongoDb();

         return db.collection('eleicoes').insertOne(eleicao);
    }

    public async atualizarEleicao(id: string, eleicao: Eleicao){
        const db = await connectMongoDb();

         return db.collection('eleicoes').replaceOne({ _id: id }, eleicao);
    }

    public async obterEleicaoPorCodigo(codigo: string) : Promise<Eleicao> {
        const db = await connectMongoDb();

        return db.collection('eleicoes').findOne<Eleicao>({ _id: codigo });
    }

    public async listarEleicoes(): Promise<Eleicao[]> {
        const db = await connectMongoDb();

        return db.collection('eleicoes').find().sort({ dataEleicao: 1}).toArray();
    }
}