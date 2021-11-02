import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import { CargoService } from "../services/cargoService";
import { defaultResult, errorResult } from "./index"
  
export const inserirCargoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const cargoService = new CargoService();
      const result = await cargoService.inserirCargo(JSON.parse(event.body));
      return defaultResult(201, result);
    } catch(err) {
      return errorResult(err);
    }
}

export const atualizarCargoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoService = new CargoService();
    const result = await cargoService.atualizarCargo(event.pathParameters.id, JSON.parse(event.body));
    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}

export const obterCandidatoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoService = new CargoService();
    const result = await cargoService.obterCargoPorId(event.pathParameters.id);

    if(result)
      return defaultResult(200, result);
    else 
      return defaultResult(404);
      
  } catch(err) {
    return errorResult(err);
  }
}

export const listarCargosHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cargoService = new CargoService();
    const result = await cargoService.listarCargos(event.queryStringParameters.eleicaoId);

    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}
