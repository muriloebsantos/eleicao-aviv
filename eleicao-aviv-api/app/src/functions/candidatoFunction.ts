import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import CandidatoService from "../services/candidatoService";
import { defaultResult, errorResult } from "./index"
  
export const inserirCandidatoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const candidatoService = new CandidatoService();
      const result = await candidatoService.inserirCandidato(JSON.parse(event.body));
      return defaultResult(201, result);
    } catch(err) {
      return errorResult(err);
    }
}

export const obterCandidatoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const candidatoService = new CandidatoService();
    const result = await candidatoService.obterCandidatoPorId(Number(event.pathParameters.id));

    if(result)
      return defaultResult(200, result);
    else 
      return defaultResult(404);
      
  } catch(err) {
    return errorResult(err);
  }
}

export const listarCandidatosHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const candidatoService = new CandidatoService();
    const result = await candidatoService.listarCandidatos();

    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}
