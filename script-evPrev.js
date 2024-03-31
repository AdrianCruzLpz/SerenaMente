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
  const puntuacionTotalSpan2 = document.getElementById("puntuacionTotalSpan2");
  const puntuacionTotalSpan3 = document.getElementById("puntuacionTotalSpan3");
  const puntuacionTotalSpan4 = document.getElementById("puntuacionTotalSpan4");
  const puntuacionTotalSpan5 = document.getElementById("puntuacionTotalSpan5");
  const puntuacionTotalSpan6 = document.getElementById("puntuacionTotalSpan6");
  const termometroDiv = document.querySelector("#termometroBAI .nivel");
  const termometroDiv2 = document.querySelector("#termometroBDI .nivel");
  const termometroDiv3 = document.querySelector("#termometroPSS .nivel");
  const termometroDiv4 = document.querySelector("#termometroMINI .nivel");
  const termometroDiv5 = document.querySelector("#termometroWBI .nivel");
  const termometroDiv6 = document.querySelector("#termometroICSP .nivel");

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

  anterior7.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form7").style.display = "none";
    document.getElementById("form6").style.display = "block";
  });

  enviar.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario7)) {
      const puntuacionTotalBAI = calcularPuntuacionTotalBAI();
      const puntuacionTotalBDI = calcularPuntuacionTotalBDI();
      const puntuacionTotalPSS = calcularPuntuacionTotalPSS();
      const puntuacionTotalMINI = calcularPuntuacionTotalMINI();
      const puntuacionTotalWBI = calcularPuntuacionTotalWBI();
      const puntuacionTotalICSP = calcularPuntuacionTotalICSP();
      document.getElementById("form7").style.display = "none";
      document.getElementById("resultados").style.display = "block";
      mostrarResultadosBAI(puntuacionTotalBAI);
      mostrarResultadosBDI(puntuacionTotalBDI);
      mostrarResultadosPSS(puntuacionTotalPSS);
      mostrarResultadosMINI(puntuacionTotalMINI);
      mostrarResultadosWBI(puntuacionTotalWBI);
      mostrarResultadosICSP(puntuacionTotalICSP);
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

  function calcularPuntuacionTotalBAI() {
    let puntuacionTotalBAI = 0;
    const formularios = [formulario2];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalBAI += parseInt(input.value);
      });
    });
    return puntuacionTotalBAI;
  }

  function calcularPuntuacionTotalBDI() {
    let puntuacionTotalBDI = 0;
    const formularios = [formulario3];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalBDI += parseInt(input.value);
      });
    });
    return puntuacionTotalBDI;
  }

  function calcularPuntuacionTotalPSS() {
    let puntuacionTotalPSS = 0;
    const formularios = [formulario4];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalPSS += parseInt(input.value);
      });
    });
    return puntuacionTotalPSS;
  }

  function calcularPuntuacionTotalMINI() {
    const respuestas = {
      q22: formulario5.q22.value, //1
      q23: formulario5.q23.value, //2
      q24: formulario5.q24.value, //3
      q25: formulario5.q25.value, //4
      q26: formulario5.q26.value, //5
      q27: formulario5.q27.value, //6
    };

    const siCount = Object.values(respuestas).filter(
      (value) => value === "SI"
    ).length;

    let riesgoSuicida = "";

    if (
      respuestas.q25 === "SI" ||
      respuestas.q26 === "SI" ||
      (respuestas.q24 === "SI" && respuestas.q27 === "SI")
    ) {
      riesgoSuicida = "SEVERO";
    } else if (
      respuestas.q24 === "SI" ||
      (respuestas.q23 === "SI" && respuestas.q27 === "SI")
    ) {
      riesgoSuicida = "MODERADO";
    } else {
      riesgoSuicida = "LIGERO";
    }
    return { nivel: riesgoSuicida, count: siCount };
  }

  function calcularPuntuacionTotalWBI() {
    let puntuacionTotalWBI = 0;
    const formularios = [formulario6];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalWBI += parseInt(input.value);
      });
    });
    return puntuacionTotalWBI;
  }

  function calcularPuntuacionTotalICSP() {
    // Obtiene el valor seleccionado en la pregunta # del formulario 7
    const valorPregunta54 = parseInt(formulario7.question54.value);
    const valorPregunta41 = parseInt(formulario7.question41.value);
    const valorPregunta44 = parseInt(formulario7.question44.value);
    const valorPregunta43 = parseInt(formulario7.question43.value);

    let puntuacionPregunta41 = 0;
    let sumaPuntuacionPregunta41Pregunta44 = 0;
    let puntuacionTotalComponente2 = 0;
    let puntuacionTotalComponente3 = 0;

    //Componente 1: Calidad de sueño subjetiva
    if (valorPregunta41 <= 15) {
      puntuacionPregunta41 = 0;
    } else if (valorPregunta41 >= 16 && valorPregunta41 <= 30) {
      puntuacionPregunta41 = 1;
    } else if (valorPregunta41 >= 31 && valorPregunta41 <= 60) {
      puntuacionPregunta41 = 2;
    } else {
      puntuacionPregunta41 = 3;
    }

    sumaPuntuacionPregunta41Pregunta44 = puntuacionPregunta41 + valorPregunta44;

    //Componente 2: Latencia de sueño
    if (sumaPuntuacionPregunta41Pregunta44 == 0) {
      puntuacionTotalComponente2 = 0;
    } else if (
      sumaPuntuacionPregunta41Pregunta44 == 1 ||
      sumaPuntuacionPregunta41Pregunta44 == 2
    ) {
      puntuacionTotalComponente2 = 1;
    } else if (
      sumaPuntuacionPregunta41Pregunta44 == 3 ||
      sumaPuntuacionPregunta41Pregunta44 == 4
    ) {
      puntuacionTotalComponente2 = 2;
    } else {
      puntuacionTotalComponente2 = 3;
    }

    //Componente 3: Duracion del dormir
    if (valorPregunta43 >= 7) {
      puntuacionTotalComponente3 = 0;
    } else if (valorPregunta43 >= 6) {
      puntuacionTotalComponente3 = 1;
    } else if (valorPregunta43 >= 5) {
      puntuacionTotalComponente3 = 2;
    } else {
      puntuacionTotalComponente3 = 3;
    }

    alert(
      'La puntuación del "Componente 1: Calidad de sueño subjetiva" es: ' +
        valorPregunta54
    );
    alert(
      "La puntuación de la pregunta 41 (tardar en dormirse) es: " +
        puntuacionPregunta41
    );
    alert(
      "La puntuación de la pregunta 44 (conciliar sueño) es: " + valorPregunta44
    );
    alert(
      "La suma de los valores de 41 y 44 es: " +
        sumaPuntuacionPregunta41Pregunta44
    );

    alert('La puntuación del "Componente 2: Latencia de sueño" es: ' + puntuacionTotalComponente2);

    /*alert(
      'La puntuación del "Componente 3: Duración del dormir" es: ' +
        puntuacionTotalComponente3
    );*/
    //return valorPregunta54;
    //return valorPregunta44;
    //return puntuacionPregunta41;
    //return puntuacionTotalComponente2;
    return puntuacionTotalComponente3;
  }

  function mostrarResultadosBAI(puntuacionTotalBAI) {
    const porcentaje = (puntuacionTotalBAI / 60) * 100;

    let mensaje = "";
    let termometroColor = "";

    if (puntuacionTotalBAI >= 0 && puntuacionTotalBAI <= 20) {
      mensaje = "Nivel de ansiedad leve.";
      termometroColor = "verde";
    } else if (puntuacionTotalBAI <= 34) {
      mensaje = "Nivel de ansiedad moderado.";
      termometroColor = "naranja";
    } else if (puntuacionTotalBAI <= 60) {
      mensaje = "Nivel de ansiedad severo.";
      termometroColor = "rojo";
    } else {
      mensaje = "ERROR Fuera de rango.";
      termometroColor = "negro";
    }

    puntuacionTotalSpan.textContent = puntuacionTotalBAI;
    mensajeResultado.textContent = mensaje;
    termometroDiv.style.height = `${porcentaje}%`;
    termometroDiv.className = `nivel ${termometroColor}`;
    resultadosDiv.style.display = "block";
  }

  function mostrarResultadosBDI(puntuacionTotalBDI) {
    const porcentajeBDI = (puntuacionTotalBDI / 63) * 100;

    let mensajeBDI = "";
    let termometroColorBDI = "";

    if (puntuacionTotalBDI >= 0 && puntuacionTotalBDI <= 13) {
      mensajeBDI = "Mínima depresión.";
      termometroColorBDI = "verde";
    } else if (puntuacionTotalBDI >= 14 && puntuacionTotalBDI <= 19) {
      mensajeBDI = "Depresión leve.";
      termometroColorBDI = "amarillo";
    } else if (puntuacionTotalBDI >= 20 && puntuacionTotalBDI <= 28) {
      mensajeBDI = "Depresión moderada.";
      termometroColorBDI = "naranja";
    } else if (puntuacionTotalBDI >= 29 && puntuacionTotalBDI <= 63) {
      mensajeBDI = "Depresión grave.";
      termometroColorBDI = "rojo";
    } else {
      mensajeBDI = "ERROR Fuera de rango.";
      termometroColorBDI = "negro";
    }

    puntuacionTotalSpan2.textContent = puntuacionTotalBDI;
    mensajeResultado2.textContent = mensajeBDI;
    termometroDiv2.style.height = `${porcentajeBDI}%`;
    termometroDiv2.className = `nivel ${termometroColorBDI}`;
  }

  function mostrarResultadosPSS(puntuacionTotalPSS) {
    const porcentajePSS = (puntuacionTotalPSS / 56) * 100;

    let mensajePSS = "";
    let termometroColorPSS = "";

    if (puntuacionTotalPSS >= 0 && puntuacionTotalPSS <= 14) {
      mensajePSS = "Muy bajo";
      termometroColorPSS = "verde";
    } else if (puntuacionTotalPSS <= 28) {
      mensajePSS = "Bajo";
      termometroColorPSS = "amarillo";
    } else if (puntuacionTotalPSS <= 42) {
      mensajePSS = "Alto";
      termometroColorPSS = "naranja";
    } else if (puntuacionTotalPSS <= 56) {
      mensajePSS = "Muy alto";
      termometroColorPSS = "rojo";
    } else {
      mensajePSS = "ERROR Fuera de rango.";
      termometroColorPSS = "negro";
    }

    puntuacionTotalSpan3.textContent = puntuacionTotalPSS;
    mensajeResultado3.textContent = mensajePSS;
    termometroDiv3.style.height = `${porcentajePSS}%`;
    termometroDiv3.className = `nivel ${termometroColorPSS}`;
  }

  function mostrarResultadosMINI() {
    const { nivel, count } = calcularPuntuacionTotalMINI();
    let porcentajeMINI = (count / 6) * 100;
    let termometroColorMINI = "";
    let mensajeMINI = "";

    if (nivel === "MODERADO") {
      mensajeMINI = "Riesgo suicida moderado.";
      termometroColorMINI = "naranja";
    } else if (nivel === "SEVERO") {
      mensajeMINI = "Riesgo suicida severo.";
      termometroColorMINI = "rojo";
    } else {
      mensajeMINI = "Riesgo suicida ligero.";
      termometroColorMINI = "verde";
    }

    puntuacionTotalSpan4.textContent = nivel;
    mensajeResultado4.textContent = mensajeMINI;
    termometroDiv4.style.height = `${porcentajeMINI}%`;
    termometroDiv4.className = `nivel ${termometroColorMINI}`;
  }

  function mostrarResultadosWBI(puntuacionTotalWBI) {
    const porcentajeWBI = (puntuacionTotalWBI / 15) * 100;

    let mensajeWBI = "";
    let termometroColorWBI = "";

    if (puntuacionTotalWBI >= 0 && puntuacionTotalWBI <= 13) {
      mensajeWBI = "Nivel de bienestar debajo del promedio.";
      termometroColorWBI = "naranja";
    } else if (puntuacionTotalWBI <= 15) {
      mensajeWBI = "Nivel de bienestar arriba del promedio.";
      termometroColorWBI = "verde";
    } else {
      mensajeWBI = "ERROR Fuera de rango.";
      termometroColorWBI = "negro";
    }

    puntuacionTotalSpan5.textContent = puntuacionTotalWBI;
    mensajeResultado5.textContent = mensajeWBI;
    termometroDiv5.style.height = `${porcentajeWBI}%`;
    termometroDiv5.className = `nivel ${termometroColorWBI}`;
  }

  function mostrarResultadosICSP(puntuacionTotalICSP) {
    //alert("'La puntuación del "Componente 1: Calidad de sueño subjetiva" es: ' + puntuacionTotalICSP);
    //alert("La puntuación de la pregunta 44 (conciliar sueño) es: " + puntuacionTotalICSP);
    //alert("La puntuación de la pregunta 41 (tardar en dormirse) es: " + puntuacionTotalICSP);
    //alert('La puntuacion del "Componente 2: Latencia de sueño" es: ' + puntuacionTotalICSP);
    alert(
      'La puntuación del "Componente 3: Duración del dormir" es: ' +
      puntuacionTotalICSP
    );
  }
});

//<!--HASTA AQUI CALCULA EL VALOR DEL COMPONENTE 1-->
