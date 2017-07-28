let http = require('http');
http.createServer(function(request, response){
  response.write('Hello1');
  response.write('Hello2');
  response.write('Hello3');
  response.end('Hello 4');
}).listen(3000);
