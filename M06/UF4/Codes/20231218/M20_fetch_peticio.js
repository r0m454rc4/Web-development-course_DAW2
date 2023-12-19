/**
 * Codi que mostra el funcionament de l'API fetch
 * https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1
 * @author sergi.grau@fje.edu
 * @version 1.0 20.11.2020
 */

var cap = new Headers();
cap.append("Content-Type", "application/json");

var initPropi = {
  method: "GET",
  headers: cap,
  mode: "cors",
  cache: "default",
  credentials: "same-origin",
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

var peticio = new Request(
  "https://itunes.apple.com/search?term=queen&media=music&entity=album",
  initPropi
);

fetch(peticio)
  .then((response) => {
    return response.json();
  })
  .then((dades) => {
    dades.results.forEach((element) => {
      console.log(element.artistName);
    });
  });
