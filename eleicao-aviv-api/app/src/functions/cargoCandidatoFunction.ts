import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import { CargoCandidatoRepository } from "../repositories/cargoCandidatoRepository";
import { CargoService } from "../services/cargoService";
import { defaultResult, errorResult } from "./index"
  
export const listarCargoCandidatosHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    //const cargoService = new CargoService();
    const result = await new CargoCandidatoRepository().obterCandidatosPorCargo(event.pathParameters.id);

    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}
