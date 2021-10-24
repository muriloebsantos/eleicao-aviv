import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import { defaultResult, errorResult } from "./index"
import EleicaoService from "../services/eleicaoService";
  
export const inserirEleicaoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const eleicaoService = new EleicaoService();
      const result = await eleicaoService.inserirEleicao(JSON.parse(event.body));
      return defaultResult(201, result);
    } catch(err) {
      return errorResult(err);
    }
}