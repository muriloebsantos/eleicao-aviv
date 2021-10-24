import { Db, MongoClient } from 'mongodb';
import ConfiguracaoRepository from '../repositories/configuracaoRepository';

 let db: Db;

 const connectMongoDb = async () : Promise<Db> => {
    if(db) {
        return db;
    }

    const connectionString = await new ConfiguracaoRepository().obterValorConfiguracao('mongodb-connection');
    const client =  new MongoClient(connectionString);
    
    await client.connect();

    db = client.db("cashflow");

    return db;
};

export { connectMongoDb };