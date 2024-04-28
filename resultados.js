// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnSAUDBaTQQJdcgtu9MFZ2Xpr3oOKNdqw",
    authDomain: "prueba2-31849.firebaseapp.com",
    databaseURL: "https://prueba2-31849-default-rtdb.firebaseio.com",
    projectId: "prueba2-31849",
    storageBucket: "prueba2-31849.appspot.com",
    messagingSenderId: "593735540788",
    appId: "1:593735540788:web:4fa918ce020f5050c66a61"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  async function mostrarResultadosEvaluacionPrevia() {
    const user = firebase.auth().currentUser;
    if (!user) {
      alert("Debes iniciar sesión para ver tus resultados.");
      return;
    }
  
    try {
      const resultadosEvaluacionPreviaRef = db.doc(`resultadosEvaluacionPrevia/${user.uid}`);
      const resultadosEvaluacionPreviaDoc = await resultadosEvaluacionPreviaRef.get();
  
      if (resultadosEvaluacionPreviaDoc.exists) {
        const resultadosEvaluacionPrevia = resultadosEvaluacionPreviaDoc.data();
        const cuestionariosRef = resultadosEvaluacionPreviaRef.collection("cuestionarios");
  
        // Mostrar resultados generales
        const resultadosGenerales = `
          Puntuación Total BAI: ${resultadosEvaluacionPrevia.puntuacionTotalBAI}
          Puntuación Total BDI: ${resultadosEvaluacionPrevia.puntuacionTotalBDI}
          Puntuación Total PSS: ${resultadosEvaluacionPrevia.puntuacionTotalPSS}
          Puntuación Total MINI: ${resultadosEvaluacionPrevia.puntuacionTotalMINI}
          Puntuación Total WBI: ${resultadosEvaluacionPrevia.puntuacionTotalWBI}
          Puntuación Total ICSP: ${resultadosEvaluacionPrevia.puntuacionTotalICSP}
        `;
        document.getElementById("resultadosGenerales").textContent = resultadosGenerales;
  
        // Mostrar respuestas de cada cuestionario
        const querySnapshot = await cuestionariosRef.get();
        querySnapshot.forEach((doc) => {
          const cuestionario = doc.data();
          const cuestionarioHTML = `
            <div>
              <h3>${doc.id}</h3>
              <pre>${JSON.stringify(cuestionario, null, 2)}</pre>
            </div>
          `;
          document.getElementById("resultadosCuestionarios").innerHTML += cuestionarioHTML;
        });
      } else {
        console.log("No se encontraron resultados de evaluación previa para el usuario actual.");
      }
    } catch (error) {
      console.error("Error al obtener resultados de evaluación previa:", error.code, error.message);
      alert("Ocurrió un error al obtener los resultados: " + error.message);
    }
  }
  
  // Llamar a la función cuando se cargue la página
  window.onload = mostrarResultadosEvaluacionPrevia;