/*
 * exemple bàsic de treball amb Express.JS
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 14.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 14.01.2016
 * - exemple bàsic de treball amb  Express.JS
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */
var express = require("express");
var app = express();

app.get("/salutacio", function (req, res) {
  res.send("Hola Món!");
});

app.listen(3000, function () {
  console.log("Servidor escoltant port 3000");
});

// qualsevol altre petició retorna 404 not found
//req i res són els mateixos objectes de NodeJ
