/*
 * programa que mostra com es pot treballar amb l'API D&D
 * es un programa que permet jugar al 3 en ratlla
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 25.12.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 25.12.2016
 * - programa que mostra com es pot treballar amb l'API D&D
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

window.onload = function () {
  var tds = document.querySelectorAll("td"); // querySelectorAll is to select all of the elemets that have an element, in this case, td
  [].forEach.call(tds, function (item) {
    // Here I use an empty array, and for each item, I call the function.
    item.addEventListener("dragover", gestionarSobreDrag, false); // dragover -> When I hover it.
    item.addEventListener("drop", gestionarDrop, false); // gestionarDrop -> WHen I drop the image.
  });

  var imatges = document.querySelectorAll("img");
  [].forEach.call(imatges, function (item) {
    // Foreach image, I call gestionarIniciDrag.
    item.addEventListener("dragstart", gestionarIniciDrag, false); // dragstart: When I start dragging it.
  });

  function gestionarSobreDrag(ev) {
    // ev = event.
    ev.preventDefault(); // This is to disable the other, for instance, if I had a link or something like this, it'll ignore it.
  }

  // When I drag the itmage I call this function and the value I store is the id(creu/ ratlla), not the image.
  function gestionarIniciDrag(ev) {
    ev.dataTransfer.setData("imatge", ev.target.id); // dataTransfer works like a clipboard.
  }

  function gestionarDrop(ev) {
    // Here ev is the <td>.
    ev.preventDefault();
    var data = ev.dataTransfer.getData("imatge"); // Here I store if it's creu o ratlla.

    ev.target.appendChild(document.getElementById(data)); // Here I cleate a clone of creu or ratlla.
    // }
  }
};