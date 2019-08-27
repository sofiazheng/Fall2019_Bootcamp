var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  var parsedPath = parsedUrl.pathname;
 
  if (parsedPath == "/listings"){

    response.statusCode = 200;
    response.setHeader( 'Content-Type', 'application/json' );
    response.end(JSON.stringify(listingData));

  }

  else{

    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Bad gateway error');
  }

};

fs.readFile('listings.json', 'utf8', function(err, data) {

  //Check for errors
  if (err) throw err;
  

  //Save the sate in the listingData variable already defined
  listingData = JSON.parse(data); //parsed data

  //Creates the server

  var server = http.createServer(requestHandler);

  server.listen(port, function(){
    console.log('server listening on: http://localhost:' + port);
  })  
  
  //Start the server
});
