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

export const atualizarEleicaoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const eleicaoService = new EleicaoService();
    const result = await eleicaoService.atualizarEleicao(event.pathParameters.id, JSON.parse(event.body));
    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}

export const obterEleicaoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const eleicaoService = new EleicaoService();
    const result = await eleicaoService.obterEleicaoPorId(event.pathParameters.id);

    if(result)
      return defaultResult(200, result);
    else 
      return defaultResult(404);
      
  } catch(err) {
    return errorResult(err);
  }
}

export const listarEleicoesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const eleicaoService = new EleicaoService();
    const result = await eleicaoService.listarEleicoes();

    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}
