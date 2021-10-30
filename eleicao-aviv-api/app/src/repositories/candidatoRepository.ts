import { connectMongoDb } from '../db/connection';
import { Candidato } from '../entities/candidato';

export default class CandidatoRepository {

    public async inserirCandidato(candidato: Candidato) {
        const db = await connectMongoDb();

         return db.collection('candidatos').insertOne(candidato);
    }

    public async obterCandidatoPorCodigo(codigo: string) : Promise<Candidato> {
        const db = await connectMongoDb();

        return db.collection('candidatos').findOne<Candidato>({ _id: codigo });
    }

    public async listarCandidatos(): Promise<Candidato[]> {
        const db = await connectMongoDb();

        return db.collection('candidatos').find().sort({ nome: 1}).toArray();
    }
}