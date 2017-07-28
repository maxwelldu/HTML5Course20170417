let http = require('http');
let i = 0;
let app = http.createServer(function(req, res) {
	i++;
	if (i === 10) {
		throw new Error('炸了');
	}
	console.log('有一个黑客进入了');

	res.end("Hello World\n");
});
app.listen(8000);

console.log('server running');
// pm2
