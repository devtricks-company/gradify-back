const express = require('express');
const powerbi = require('powerbi-api');
const msrest = require('ms-rest');

const AuthenticationContext = require("adal-node").AuthenticationContext;
const route = express.Router();

route.post('/',(req,res)=>{
  //https://login.microsoftonline.com/common/oauth2/authorize
    const authorityHostUrl = "https://login.microsoftonline.com";
  const tenant = "a99d137e-37e1-4ebf-b1e5-ba76f014252c"; // AAD Tenant name.
  const authorityUrl = authorityHostUrl + "/" + tenant + "/oauth2/token";
  const applicationId = "8a3b7f6d-a698-42c8-b261-c533bd219bf4";
  // Application Id of app registered under AAD.
  const clientSecret = "bi~XctyOv-4Z1QdShU_7G_4ZfEQFimg-57";
  // Secret generated for app. Read this environment variable.
  const resource = "https://analysis.windows.net/powerbi/api";

  const contextAuth = new AuthenticationContext(authorityUrl);
    contextAuth.acquireTokenWithClientCredentials(
    resource,
    applicationId,
    clientSecret,
    function(error,token){
        console.log(token)
        res.status(201).json(token);
      
    }
  );
  
})

route.post('/oauth2',(req,res) => {
  var authorityHostUrl = 'https://login.windows.net';
  const tenant = 'a99d137e-37e1-4ebf-b1e5-ba76f014252c';
  var authorityUrl = authorityHostUrl + '/' + tenant;
  const applicationId  = 'e0a78900-e0c2-4da0-a2df-a2ec2848dad9';
  var clientSecret = 'Kmlil-OnfZc~wo2.E-J_H1jc8KQZ2JrvZt';
  var resource = 'https://analysis.windows.net/powerbi/api';

 
   var context = new AuthenticationContext(authorityUrl);
   context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, function(err, tokenResponse) {
    if (err) {
      console.log('well that didn\'t work: ' + err.stack);
    } else {
      const credentioal = new msrest.TokenCredentials(tokenResponse);
      const client = new powerbi.PowerBIClient(credentioal)
      console.log(client.credentials.token.accessToken);
      res.status(201).json({token: client.credentials.token.accessToken})
    }
  });
  
  // var token = powerbi.PowerBIToken.createReportEmbedToken('DevIAD Demo', '1d27e219-8f13-4863-8ba7-1428b7694df2', 'ca8d7dbc-6bd8-4801-b262-855d48d586ad');
  // const jwt = token.generate('view');
 
  // res.status(201).json({token:jwt});





  
})

module.exports = route;