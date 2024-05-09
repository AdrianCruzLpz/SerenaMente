import { db, auth } from "./firebase.js";

async function obtenerDatosEvaluacionPrevia(userId) {
  try {
    const evaluacionPreviaRef = doc(db, "evaluacionPrevia", userId);
    const evaluacionPreviaSnapshot = await getDoc(evaluacionPreviaRef);

    if (evaluacionPreviaSnapshot.exists()) {
      const evaluacionPreviaData = evaluacionPreviaSnapshot.data();
      return evaluacionPreviaData;
    } else {
      console.log("No se encontraron datos de evaluación previa para el usuario.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos de evaluación previa:", error.code, error.message);
    throw error;
  }
}

function generarHTMLResultados(datosEvaluacionPrevia) {
  if (!datosEvaluacionPrevia) {
    return;
  }

  let html = `
    <h2>BAI (Inventario de Ansiedad de Beck)</h2>
    <p>Puntuación total: ${datosEvaluacionPrevia.puntuacionTotalBAI}</p>
    <h2>BDI (Inventario de Depresión de Beck)</h2>
    <p>Puntuación total: ${datosEvaluacionPrevia.puntuacionTotalBDI}</p>
    <h2>PSS (Escala de Estrés Percibido)</h2>
    <p>Puntuación total: ${datosEvaluacionPrevia.puntuacionTotalPSS}</p>
    <h2>MINI (Mini International Neuropsychiatric Interview)</h2>
    <p>Puntuación total: ${datosEvaluacionPrevia.puntuacionTotalMINI.nivel}</p>
    <h2>WBI (Bienestar Psicológico)</h2>
    <p>Puntuación total: ${datosEvaluacionPrevia.puntuacionTotalWBI}</p>
    <h2>ICSP (Índice de Calidad de Sueño de Pittsburgh)</h2>
    <p>Puntuación total: ${datosEvaluacionPrevia.puntuacionTotalICSP}</p>
  `;

  return html;
}

async function mostrarResultadosEnHTML() {
  const user = auth.currentUser;
  if (!user) {
    alert("Debes iniciar sesión para ver los resultados.");
    return;
  }

  try {
    const datosEvaluacionPrevia = await obtenerDatosEvaluacionPrevia(user.uid);
    const htmlResultados = generarHTMLResultados(datosEvaluacionPrevia);

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = htmlResultados;
  } catch (error) {
    console.error("Error al obtener y generar los resultados:", error.code, error.message);
    alert("Ocurrió un error al mostrar los resultados: " + error.message);
  }
}

mostrarResultadosEnHTML();