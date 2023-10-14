window.onload = function () {
  class Alumne {
    constructor(dniAlumne, nomAlumne, cognomAlumne, cursAlumne, notaAlumne) {
      this.dniAlumne = dniAlumne;
      this.nomAlumne = nomAlumne;
      this.cognomAlumne = cognomAlumne;
      this.cursAlumne = cursAlumne;
      this.notaAlumne = notaAlumne;
    }
  }

  function crearGrupsAlunes(numeroGrup) {
    // numeroGrup is a parameter to select the group number.
    const llistaAlumnes = [
      // List that contains all of the alumns.
      (alumne1 = new Alumne("1A", "Leo", "Herrera", "DAW2", 6)),
      (alumne2 = new Alumne("2A", "Romà", "Sardá", "DAW2", 6.5)),
      (alumne3 = new Alumne("3A", "Victor", "Toro", "DAW2", 6)),
      // 2nd group.
      (alumne4 = new Alumne("4B", "Alejando", "Torrente", "DAW2", 7)),
      (alumne5 = new Alumne("5B", "Bru", "Carreras", "DAW2", 5.5)),
      (alumne6 = new Alumne("6B", "Javier", "Pérez", "DAW2", 6.05)),
      // 3rd group.
      (alumne7 = new Alumne("7C", "Helena", "Alba", "DAW2", 5.5)),
      (alumne8 = new Alumne("8C", "Daniel", "Collados", "DAW2", 7.12)),
      (alumne9 = new Alumne("9C", "Toni", "Varon", "DAW2", 6.05)),
      // 4th group.
      (alumne7 = new Alumne("10D", "Alex", "Maench", "DAW2", 8.25)),
      (alumne8 = new Alumne("11D", "Adrià", "Millian", "DAW2", 6.69)),
      (alumne9 = new Alumne("12D", "Arnau", "Vicente", "DAW2", 4.35)),
      // 5th group.
      (alumne7 = new Alumne("11E", "Martí", "Rodríguez", "DAM2", 3.75)),
      (alumne8 = new Alumne("12E", "Antonio", "Acosta", "DAM2", 4.49)),
      (alumne9 = new Alumne("13E", "Lucía", "Rodríguez", "DAW2", 8.31)),
    ];

    let grups = [];

    // console.log(grups);

    for (let i = 0; i < 10; i++) {
      let grup = [];

      for (let j = 0; j < 3; j++) {
        let alumne = i * 3 + j; // Get the index of an alumn.

        // This part I did it with the help of ChatGPT.
        if (alumne < llistaAlumnes.length) {
          grup.push(llistaAlumnes[alumne]); // With push I add "alumne" to the end of "grup" array.
        }
      }

      grups.push(grup);
    }

    let nomAlumnesPerGrup = [];

    for (let alumne of grups[numeroGrup]) {
      // If I don't use a for of, I'll get "undefined".
      // console.log(alumne.nomAlumne);
      nomAlumnesPerGrup.push(alumne.nomAlumne);
    }

    return nomAlumnesPerGrup;
  }

  document.getElementById("grup1").onclick = function () {
    document.getElementById("grup").innerHTML = `<br>` + crearGrupsAlunes(0);
  };

  document.getElementById("grup2").onclick = function () {
    document.getElementById("grup").innerHTML = `<br>` + crearGrupsAlunes(1);
  };
};
