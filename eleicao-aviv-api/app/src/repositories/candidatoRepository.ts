import { connectMongoDb } from '../db/connection';
import { Candidato } from '../entities/candidato';

export default class CandidatoRepository {

    public async inserirCandidato(candidato: Candidato) {
        const db = await connectMongoDb();

         return db.collection('candidatos').insertOne(candidato);
    }

    public async atualizarCandidato(id: string, candidato: Candidato) {
        const db = await connectMongoDb();

         return db.collection('candidatos').replaceOne({ _id: id }, candidato);
    }

    public async obterCandidatoPorId(id: string) : Promise<Candidato> {
        const db = await connectMongoDb();

        return db.collection('candidatos').findOne<Candidato>({ _id: id });
    }

    public async obterCandidatoPorMatricula(matricula: number) : Promise<Candidato> {
        const db = await connectMongoDb();

        return db.collection('candidatos').findOne<Candidato>({ matricula });
    }

    public async listarCandidatos(): Promise<Candidato[]> {
        const db = await connectMongoDb();

        return db.collection('candidatos').find({ ativo: true }).sort({ nome: 1}).toArray();
    }
}