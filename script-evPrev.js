document.addEventListener("DOMContentLoaded", function () {
  const formulario1 = document.getElementById("formulario1");
  const formulario2 = document.getElementById("formulario2");
  const formulario3 = document.getElementById("formulario3");
  const formulario4 = document.getElementById("formulario4");
  const formulario5 = document.getElementById("formulario5");
  const formulario6 = document.getElementById("formulario6");
  const formulario7 = document.getElementById("formulario7");
  const siguiente1 = document.getElementById("siguiente1");
  const siguiente2 = document.getElementById("siguiente2");
  const siguiente3 = document.getElementById("siguiente3");
  const siguiente4 = document.getElementById("siguiente4");
  const siguiente5 = document.getElementById("siguiente5");
  const siguiente6 = document.getElementById("siguiente6");
  const anterior2 = document.getElementById("anterior2");
  const anterior3 = document.getElementById("anterior3");
  const anterior4 = document.getElementById("anterior4");
  const anterior5 = document.getElementById("anterior5");
  const anterior6 = document.getElementById("anterior6");
  const anterior7 = document.getElementById("anterior7");
  const enviar = document.getElementById("enviar");
  const resultadosDiv = document.getElementById("resultados");
  const puntuacionTotalSpan = document.getElementById("puntuacionTotalSpan");
  const mensajeResultado = document.getElementById("mensajeResultado");
  const termometroDiv = document.querySelector("#termometro .nivel");

  siguiente1.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario1)) {
      document.getElementById("form1").style.display = "none";
      document.getElementById("form2").style.display = "block";
    }
  });

  siguiente2.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario2)) {
      document.getElementById("form2").style.display = "none";
      document.getElementById("form3").style.display = "block";
    }
  });

  siguiente3.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario3)) {
      document.getElementById("form3").style.display = "none";
      document.getElementById("form4").style.display = "block";
    }
  });

  siguiente4.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario4)) {
      document.getElementById("form4").style.display = "none";
      document.getElementById("form5").style.display = "block";
    }
  });

  siguiente5.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario5)) {
      document.getElementById("form5").style.display = "none";
      document.getElementById("form6").style.display = "block";
    }
  });

  siguiente6.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario6)) {
      document.getElementById("form6").style.display = "none";
      document.getElementById("form7").style.display = "block";
    }
  });

  anterior2.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form2").style.display = "none";
    document.getElementById("form1").style.display = "block";
  });

  anterior3.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form3").style.display = "none";
    document.getElementById("form2").style.display = "block";
  });

  anterior4.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form4").style.display = "none";
    document.getElementById("form3").style.display = "block";
  });

  anterior5.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form5").style.display = "none";
    document.getElementById("form4").style.display = "block";
  });

  anterior6.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form6").style.display = "none";
    document.getElementById("form5").style.display = "block";
  });

  enviar.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario7)) {
      const puntuacionTotal = calcularPuntuacionTotal();
      document.getElementById("form7").style.display = "none";
      document.getElementById("resultados").style.display = "block";
      mostrarResultados(puntuacionTotal);
    }
  });

  function validarFormulario(formulario) {
    const inputs = formulario.querySelectorAll("input");
    for (let input of inputs) {
      if (input.type !== "submit" && input.type !== "button") {
        if (input.type === "radio") {
          const name = input.name;
          const radios = formulario.querySelectorAll(
            `input[name='${name}']:checked`
          );
          if (radios.length === 0) {
            alert("Por favor complete todas las preguntas.");
            return false;
          }
        } else {
          if (!input.value) {
            alert("Por favor complete todas las preguntas.");
            return false;
          }
        }
      }
    }
    return true;
  }

  function calcularPuntuacionTotal() {
    let puntuacionTotal = 0;
    const formularios = [formulario2];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotal += parseInt(input.value);
      });
    });
    return puntuacionTotal;
  }

  function mostrarResultados(puntuacionTotal) {
    let mensaje = "";
    let termometroColor = "";
    let porcentaje = 0;

    if (puntuacionTotal >= 0 && puntuacionTotal <= 20) {
      mensaje = "Nivel de ansiedad leve.";
      termometroColor = "verde";
      porcentaje = (puntuacionTotal / 20) * 33;
    } else if (puntuacionTotal >= 21 && puntuacionTotal <= 34) {
      mensaje = "Nivel de ansiedad moderado.";
      termometroColor = "naranja";
      porcentaje = 33 + ((puntuacionTotal - 21) / 13) * 33;
    } else if (puntuacionTotal >= 35 && puntuacionTotal <= 60) {
      mensaje = "Nivel de ansiedad severo.";
      termometroColor = "rojo";
      porcentaje = 66 + ((puntuacionTotal - 35) / 25) * 34;
    } else {
      mensaje = "ERROR.";
      termometroColor = "black";
    }

    puntuacionTotalSpan.textContent = puntuacionTotal;
    mensajeResultado.textContent = mensaje;
    termometroDiv.style.height = `${porcentaje}%`;
    termometroDiv.className = `nivel ${termometroColor}`;
    resultadosDiv.style.display = "block";
  }
  mostrarResultados(60);
});
