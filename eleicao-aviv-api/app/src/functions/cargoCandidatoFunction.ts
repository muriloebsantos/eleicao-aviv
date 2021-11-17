import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import CargoCandidatoService from "../services/cargoCandidatoService";
import { defaultResult, errorResult } from "./index"
  
export const listarCandidatosPorCargoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoCandidatoService = new CargoCandidatoService();
    const result = await cargoCandidatoService.obterCandidatosPorCargo(event.pathParameters.cargoId);

    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}

export const inserirCargoCandidatoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoCandidatoService = new CargoCandidatoService();
    
    await cargoCandidatoService.inserirCargoCandidato(event.pathParameters.cargoId, JSON.parse(event.body));

    return defaultResult(201);
  } catch(err) {
    return errorResult(err);
  }
}

export const excluirCargoCandidatoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoCandidatoService = new CargoCandidatoService();
    
    await cargoCandidatoService.excluirCargoCandidato(event.pathParameters.id);

    return defaultResult(200);
  } catch(err) {
    return errorResult(err);
  }
}

export const atribuirCargoCandidatoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoCandidatoService = new CargoCandidatoService();
    
    await cargoCandidatoService.aceitarCargo(event.pathParameters.id, JSON.parse(event.body).candidatoId);

    return defaultResult(200);
  } catch(err) {
    return errorResult(err);
  }
}