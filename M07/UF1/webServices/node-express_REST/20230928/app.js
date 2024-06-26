/**
 * Aplicació en ExpressJS que crea una API REST senzilla
 * @author sergi.grau@fje.edu
 * @version 2.0 10.10.21
 */

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // In order to encode the url.
app.use(express.json()); // per analitzar les peticions HTTP que portin JSON al body

let alumnes = [
  { codi: 1, nom: "SERGI" },
  { codi: 2, nom: "ANNA" },
  { codi: 3, nom: "JOAN" },
];
app.get("/", (req, res) => res.send("hola")); // req = request; res = response.

app.get("/api/alumnes", (req, res) => res.send(alumnes)); // In the front-end I get a JSON file.

app.post("/api/alumnes/:codi", (req, res) => {
  let alumne = alumnes.find((a) => a.codi === parseInt(req.params.codi));
  if (!alumne) res.status(404, "error");
  res.send(alumne);
}); // For instance, I can use this url: http://localhost:3000/api/alumnes/1

app.listen(3000, () => console.log("inici servidor"));
