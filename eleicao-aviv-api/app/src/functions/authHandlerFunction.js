var jwt = require('jwt-simple');
var ConfiguracaoRepository = require('../repositories/configuracaoRepository');

exports.handler =  function(event, context, callback) {
  var token = event.authorizationToken;

  if(!token) {
    callback("Unauthorized");
    return;
  }

  new ConfiguracaoRepository().obterValorConfiguracao('jwt-secret').then(secret => {
    let decoded = '';
    try {
      decoded = jwt.decode(token, secret, false, 'HS512');
    } catch {
      callback("Unauthorized");
    }

    if(decoded) {
      callback(null, generatePolicy('user', 'Allow', event.methodArn, decoded));
    }
  });
};

const generatePolicy = function(principalId, effect, resource, decoded) {
  const authResponse = { 
    principalId: principalId
  };
  
  if (effect && resource) {
      const policyDocument = {
        Version: '2012-10-17',
        Statement: []
      };
     
      const statementOne = { 
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      };
      
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
  }
  
  authResponse.context = {
    "userId": decoded.userId
  };

  return authResponse;
}