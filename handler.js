'use strict';
const https = require('https');

module.exports.invokeWS = async event => 
  {
    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        console.log('invokeWS --> '+event.pathParameters);
        
        const { queryStringParameters } = event;
        if (!queryStringParameters || !queryStringParameters.name) {
            console.log('BadRequest');
            resolve({
                statusCode: 400,
                body: 'Please provide a Pokemon name!'
            })
        }
        console.log(`https://pokeapi.co/api/v2/pokemon/${queryStringParameters.name}`);
        const req = https.get(`https://pokeapi.co/api/v2/pokemon/${queryStringParameters.name}`, function(res) {
            res.on('data', chunk => {
                dataString += chunk;
            });
            res.on('end', () => {
                console.log('OK');
                console.log(JSON.stringify({ name: queryStringParameters.name }));
                resolve({
                    statusCode: 200,
                    body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
            console.log('ServerError');
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response;
  

  };

module.exports.directCall = async (event) => {
  let dataString = '';
  
  const response = await new Promise((resolve, reject) => {
      const req = https.get("https://pokeapi.co/api/v2/pokemon/ditto", function(res) {
        res.on('data', chunk => {
          dataString += chunk;
        });
        res.on('end', () => {
          resolve({
              statusCode: 200,
              body: JSON.stringify(JSON.parse(dataString), null, 4)
          });
        });
      });
      
      req.on('error', (e) => {
        reject({
            statusCode: 500,
            body: 'Something went wrong!'
        });
      });
  });
  
  return response;
  //return sendResponse(constantes.SUCESSFULL_EXECUTION, response)
};


module.exports.nasaAPI = async (event) => {
  let dataString = '';
  
  const response = await new Promise((resolve, reject) => {
      const req = https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", function(res) {
        res.on('data', chunk => {
          dataString += chunk;
        });
        res.on('end', () => {
          resolve({
              statusCode: 200,
              body: JSON.stringify(JSON.parse(dataString), null, 4)
          });
        });
      });
      
      req.on('error', (e) => {
        reject({
            statusCode: 500,
            body: 'Something went wrong!'
        });
      });
  });
  return response;
};


