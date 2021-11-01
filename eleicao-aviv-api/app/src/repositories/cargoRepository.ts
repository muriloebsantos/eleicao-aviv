import { connectMongoDb } from '../db/connection';
import { Cargo } from '../entities/cargo';

export default class CargoRepository {

    public async inserirCargo(cargo: Cargo){
        const db = await connectMongoDb();

         return db.collection('cargos').insertOne(cargo);
    }

    public async atualizarCargo(id: string, cargo: Cargo){
        const db = await connectMongoDb();

         return db.collection('cargos').replaceOne({ _id: id }, cargo);
    }

    public async obterCargoPorCodigo(codigo: string) : Promise<Cargo> {
        const db = await connectMongoDb();

        return db.collection('cargos').findOne<Cargo>({ _id: codigo });
    }

    public async listarCargos(eleicaoId: string): Promise<Cargo[]> {
        const db = await connectMongoDb();

        return db.collection('cargos').find({ eleicaoId }).sort({ nome: 1}).toArray();
    }

    public async excluirCargo(codigo: string) : Promise<any> {
        const db = await connectMongoDb();

        return db.collection('cargos').deleteOne({ _id: codigo});
    }
}