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
                        { $sort: { "votos": -1 ,  "candidato.nome": 1 }}
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

    public async atualizarCargoCandidato(cargoCandidato: CargoCandidato) {
        const db = await connectMongoDb();

        return db.collection('cargo-candidatos').replaceOne({ _id: cargoCandidato._id }, cargoCandidato);
    }

    public async inserirCargoCandidatos(cargoCandidatos: CargoCandidato[]) {
        const db = await connectMongoDb();

        return db.collection('cargo-candidatos').insertMany(cargoCandidatos);
    }
}