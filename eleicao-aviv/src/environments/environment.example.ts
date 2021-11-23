// copy and rename to environment.ts - added environment to gitignore to hide sensitive URL
export const environment = {
  production: true,
  apiUrl: 'https://something.execute-api.us-east-1.amazonaws.com/prod',
  bucketFotosUrl: 'https://some-bucket-name.s3.amazonaws.com',
  login: 'admin', // TODO: implementar endpoint de autenticacao
  password: 'admin' // TODO: implementar endpoint de autenticacao
};

