var http = require("http");
var url = require("url");
var querystring = require("querystring");

function iniciar() {
  function onRequest(req, res) {
    const baseURL = req.protocol + "://" + req.headers.host + "/";
    const reqUrl = new URL(req.url, baseURL);
    console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    res.write("camí: " + reqUrl.pathname + "\n");
    var consulta = reqUrl.searchParams;
    console.log(consulta);

    consulta.forEach(function (valor, clau) {
      res.write("parametre: " + clau + "\n");
      res.write("valor: " + valor + "\n");
    });
    res.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;