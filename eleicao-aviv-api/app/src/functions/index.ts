import { APIGatewayProxyEvent } from "aws-lambda"
import { ApiError } from "../util/api-error";

export function defaultResult(statusCode: number, result?: any) {
    const headers = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
    }

    if(!result) {
        return { statusCode: statusCode, body: null, headers: headers };
    }

    return {
        body: JSON.stringify(result),
        statusCode: statusCode,
        headers: headers
    };
}

export function errorResult(err: ApiError) {
    const headers = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
    }

    return { statusCode: err.status || 500, body: err.message, headers: headers };
}

export function getUserId(event: APIGatewayProxyEvent): string {
    return event.requestContext.authorizer.userId;
}