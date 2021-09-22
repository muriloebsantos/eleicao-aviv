import { DynamoDB } from "aws-sdk";

export default class ConfiguracaoRepository {

    public async obterValorConfiguracao(nomeConfiguracao: string) : Promise<string> {
        const docClient = new DynamoDB.DocumentClient();
        const params = {
            TableName: "eleicao_aviv_settings",
            KeyConditionExpression: "#config_name = :nomeConfiguracao",
            ExpressionAttributeNames:{
                "#config_name": "config_name"
            },
            ExpressionAttributeValues: {
                ":nomeConfiguracao": nomeConfiguracao
            }
        };

        const result = await docClient.query(params).promise();

        if(result.Items?.length > 0) {
            return result.Items[0].config_value;
        }

        return null;
    }
}