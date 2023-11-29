/*
 * Aplicació amb Node.js HTTP que permet recuperar dades d'un formulari per XHR2
 * @author  sergi.grau@fje.edu
 * @version 1.0
 * date 13.11.20
 * format del document UTF-8
 *
 * CHANGELOG
 * date 13.11.20
 * - Aplicació amb Node.js HTTP que permet recuperar dades d'un formulari per XHR2
 * 11.11.2021
 * - Actualizacions versió nodeJS 17
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
const http = require("http");
const url = require("url");
const fs = require("fs");
const formidable = require("formidable");

function iniciar() {
  function onRequest(request, response) {
    let sortida;
    const baseURL = request.protocol + "://" + request.headers.host + "/";
    const reqUrl = new URL(request.url, baseURL);
    console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
    const pathname = reqUrl.pathname;

    if (pathname == "/inici") {
      fs.readFile("./M07_formulariXHR2.html", function (err, sortida) {
        response.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        response.write(sortida);
        response.end();
      });
    } else if (pathname == "/enviar") {
      const form = formidable({ multiples: true }); // multiples: true os to be able to upload files formidable is a library to work with forms with post.

      form.parse(request, (err, fields, files) => {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ fields, files }, null, 2)); // JSON.stringify is to transfrorm the fields (that in this case will be: nom & id) to string.
      });
    } else {
      response.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
      });
      sortida = "404 NOT FOUND";
      response.write(sortida);
      response.end();
    }
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;
