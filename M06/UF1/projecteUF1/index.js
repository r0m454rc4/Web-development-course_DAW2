window.onload = () => {
  class Alumne {
    constructor(dniAlumne, nomAlumne, cognomAlumne, cursAlumne, notaAlumne) {
      this.dniAlumne = dniAlumne;
      this.nomAlumne = nomAlumne;
      this.cognomAlumne = cognomAlumne;
      this.cursAlumne = cursAlumne;
      this.notaAlumne = notaAlumne;
    }
  }

  const llistaAlumnes = [
    // List that contains all of the alumns.
    new Alumne("1A", "Leo", "Herrera", "DAW2", 6.0),
    new Alumne("2A", "Romà", "Sardá", "DAW2", 6.5),
    new Alumne("3A", "Victor", "Toro", "DAW2", 6.12),
    // 2nd group.
    new Alumne("4B", "Alejando", "Torrente", "DAW2", 7.0),
    new Alumne("5B", "Bru", "Carreras", "DAW2", 5.5),
    new Alumne("6B", "Javier", "Pérez", "DAW2", 6.05),
    // 3rd group.
    new Alumne("7C", "Helena", "Alba", "DAW2", 5.5),
    new Alumne("8C", "Daniel", "Collados", "DAW2", 7.12),
    new Alumne("9C", "Toni", "Varon", "DAW2", 6.05),
    // 4th group.
    new Alumne("10D", "Alex", "Maench", "DAW2", 8.25),
    new Alumne("11D", "Adrià", "Millian", "DAW2", 6.69),
    new Alumne("12D", "Arnau", "Vicente", "DAW2", 4.35),
    // 5th group.
    new Alumne("13E", "Martí", "Rodríguez", "DAM2", 3.75),
    new Alumne("14E", "Antonio", "Acosta", "DAM2", 4.49),
    new Alumne("15E", "Lucía", "Rodríguez", "DAW2", 8.31),
    // 6th group.
    new Alumne("16F", "André", "Mafuta", "DAM2", 9.18),
    new Alumne("17F", "Sergi", "Grau", "DAW2", 10.0),
    new Alumne("18F", "Jordi", "Binefa", "DAM2", 8.99),
    // 7th group.
    new Alumne("19F", "Sandra", "Herranz", "DAW2", 9.18),
    new Alumne("20F", "Marta", "Coll", "DAW2", 10.0),
    new Alumne("21F", "David", "Pérez", "SMX2", 8.99),
    // 8th group.
    (alumne22 = new Alumne("19F", "Pepe", "García", "DAW2", 9.18)),
    (alumne23 = new Alumne("20F", "Manuel", "Sánchez", "DAW2", 10.0)),
    (alumne24 = new Alumne("21F", "Jaume", "Reixac", "SMX2", 8.99)),
    // 9th group.
    (alumne25 = new Alumne("19F", "Josefa", "Huerto", "DAW2", 9.18)),
    (alumne26 = new Alumne("20F", "Pepa", "Cerdita", "DAW2", 10.0)),
    (alumne27 = new Alumne("21F", "Pau", "Jaimejuan", "SMX2", 8.99)),
    // 10th group.
    (alumne28 = new Alumne("19F", "Mario", "Gallego", "DAW2", 9.18)),
    (alumne29 = new Alumne("20F", "Júlia", "Serra", "DAW2", 10.0)),
    (alumne30 = new Alumne("21F", "Miquel", "Baztan", "SMX2", 8.99)),
    // 11th group.
    (alumne31 = new Alumne("19F", "Rosa", "Gabaldon", "DAW2", 9.18)),
    (alumne32 = new Alumne("20F", "María", "Cubells", "DAW2", 10.0)),
    (alumne33 = new Alumne("21F", "Gemma", "Simó", "SMX2", 8.99)),
    // 12th group.
    (alumne34 = new Alumne("19F", "Abdou", "Diawara", "DAW2", 9.18)),
    (alumne35 = new Alumne("20F", "Laia", "Sánchez", "DAW2", 10.0)),
    (alumne36 = new Alumne("21F", "Anna", "Martín", "SMX2", 8.99)),
  ];

  let crearAlumesPerGrup = (numeroGrup) => {
    // numeroGrup is a parameter to select the group number.
    let grups = [];

    for (let i = 0; i <= llistaAlumnes.length / 3; i++) {
      // llistaAlumnes.length / 3 is because in each group there are 3 alumns.
      let grup = [];

      for (let j = 0; j < 3; j++) {
        let alumne = i * 3 + j; // Get the index of an alumn.

        if (alumne < llistaAlumnes.length) {
          grup.push(llistaAlumnes[alumne]); // With push I add "alumne" to the end of "grup" array.
        }
      }

      grups.push(grup);
    }

    let nomAlumnesPerGrup = [];

    for (let alumne of grups[numeroGrup]) {
      // If I don't use a for of, I'll get "undefined".
      nomAlumnesPerGrup.push(alumne.nomAlumne);
    }

    return nomAlumnesPerGrup;
  };

  // --- GRUPS --- //
  let crearGrups = () => {};

  let nGrup = [];

  for (let i = 1; i <= llistaAlumnes.length / 3; i++) {
    nGrup.push("Grup " + i);
  }

  console.log(nGrup);

  document.getElementById("llistaGrups").innerHTML = `
  <table>
    <tr id="llistaGps">
      <tr>
        <td id="llistaGrup1">
          ${nGrup[0]}
        </td>
        <td id="llistaGrup2">
          ${nGrup[1]}
        </td>
        <td id="llistaGrup3">
        ${nGrup[2]}
        </td>
        <td id="llistaGrup4">
          ${nGrup[3]}
        </td>
        <td id="llistaGrup5">
          ${nGrup[4]}
        </td>
        <td id="llistaGrup6">
          ${nGrup[5]}
        </td>
        <td id="llistaGrup7">
          ${nGrup[6]}
        </td>
      </tr>
      <tr>
        <td id="llistaGrup8">
          ${nGrup[7]}
        </td>
        <td id="llistaGrup9">
          ${nGrup[8]}
        </td>
        <td id="llistaGrup10">
          ${nGrup[9]}
        </td>
        <td id="llistaGrup11">
          ${nGrup[10]}
        </td>
        <td id="llistaGrup12">
          ${nGrup[11]}
        </td>
        <td id="llistaGrup13">
          ${nGrup[12]}
        </td>
        <td id="llistaGrup14">
          ${nGrup[13]}
        </td>
      </tr>
    </tr>
  </table>
  `;

  // --- MOSTRAR USUARIS -- //

  document.getElementById("llistaGrup1").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(0); // I write the name of the alumns.
  };

  document.getElementById("llistaGrup2").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(1); // I write the name of the alumns.
  };

  document.getElementById("llistaGrup3").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(2);
  };

  document.getElementById("llistaGrup4").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(3);
  };

  document.getElementById("llistaGrup5").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(4);
  };

  document.getElementById("llistaGrup6").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(5);
  };

  document.getElementById("llistaGrup7").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(6);
  };

  document.getElementById("llistaGrup8").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(7);
  };

  document.getElementById("llistaGrup9").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(8);
  };

  document.getElementById("llistaGrup10").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(9);
  };

  document.getElementById("llistaGrup11").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(10);
  };

  document.getElementById("llistaGrup12").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(11);
  };

  document.getElementById("llistaGrup13").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(12);
  };

  document.getElementById("llistaGrup14").onclick = function () {
    document.getElementById("llistaAlumnesGrup").innerHTML =
      `<br>` + crearAlumesPerGrup(13);
  };
};
