import { connectMongoDb } from '../db/connection';
import { Voto } from '../entities/voto';

export default class VotacaoRepository {

    public async obterQuantidadeVotos(cargoId: string): Promise<number> {
        const db = await connectMongoDb();

        const contagem = await db.collection('votos').aggregate([
            { $match: { cargoId }},
            { $count: 'qtde' }
        ]).toArray();

        if(contagem && contagem.length > 0)
            return contagem[0].qtde;
        
        return 0;
    }

    public async inserirVoto(voto: Voto) {
        const db = await connectMongoDb();

        return db.collection('votos').insertOne(voto);
    }
}