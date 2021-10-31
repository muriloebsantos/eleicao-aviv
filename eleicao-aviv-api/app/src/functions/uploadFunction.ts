import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import { UploadService } from "../services/uploadService";
import { defaultResult, errorResult } from "./index"

export const uploadHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const uploadService = new UploadService();
    const result = await uploadService.obterUrlUpload(event.queryStringParameters.extensao);
    return defaultResult(200, result);
  } catch(err) {
    return errorResult(err);
  }
}