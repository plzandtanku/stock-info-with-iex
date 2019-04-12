const express = require('express');
const request = require('request');
const port = 5000;
const app = express();
app.listen(port, () => console.log(`started meServer on port ${port}`));

app.get('/api/test', (req, res) => {
	console.log(req.query);
	console.log(req.params);
	res.send({ stuff: 'this is some stuff' });
});
app.get('/api/data', (req, res) =>{
	let baseUrl =  "https://cloud.iexapis.com/beta/stock/market/list/mostactive";
	let totallySecureKey = "pk_8badf50afcae24418c86cb21e7443e0f05";
	request({
		url: baseUrl,
		qs: { token: totallySecureKey },
	}, function (err, resp) {
		let stockInfo = JSON.parse(resp.body);
		res.send(stockInfo);
	});
});

/**let a = 0;
var http = require('http');
http.createServer(function (req, res) {
	console.log(a++);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello WoMrld!');
}).listen(8080); 
**/
