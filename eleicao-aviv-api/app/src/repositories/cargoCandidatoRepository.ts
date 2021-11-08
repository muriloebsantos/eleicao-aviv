import { connectMongoDb } from "../db/connection";
import { CargoCandidato } from "../entities/cargo-candidato";

export class CargoCandidatoRepository {

    public async obterCandidatosPorCargo(cargoId: string): Promise<CargoCandidato[]> {
        const db = await connectMongoDb();

        return db.collection('cargo-candidatos')
                    .aggregate([
                        { $match: { cargoId: cargoId } },
                        { $lookup:
                          {
                              from: 'candidatos',
                              localField: 'candidatoId',
                              foreignField: '_id',
                              as: 'candidato'
                          }
                        },
                        { $unwind: "$candidato" },
                        { $sort: { "candidato.nome": 1 }} 
                    ]).toArray();
    }

    public async obterCargoCandidato(cargoId: string, candidatoId: string): Promise<CargoCandidato> {
        const db = await connectMongoDb();

        return db.collection('cargo-candidatos').findOne({ cargoId, candidatoId });
    }

    public async excluirCargoCandidato(id: string) {
        const db = await connectMongoDb();

        return db.collection('cargo-candidatos').deleteOne({ _id: id });
    }

    public async inserirCargoCandidato(cargoCandidato: CargoCandidato) {
        const db = await connectMongoDb();

        return db.collection('cargo-candidatos').insertOne(cargoCandidato);
    }
}