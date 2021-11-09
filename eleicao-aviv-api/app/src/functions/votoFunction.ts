import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import VotacaoService from "../services/votacaoService";
import { defaultResult, errorResult } from "./index"
  
export const registrarVotoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const votacaoService = new VotacaoService();
      const result = await votacaoService.registrarVoto(JSON.parse(event.body));
      return defaultResult(201, result);
    } catch(err) {
      return errorResult(err);
    }
}