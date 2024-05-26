import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnSAUDBaTQQJdcgtu9MFZ2Xpr3oOKNdqw",
  authDomain: "prueba2-31849.firebaseapp.com",
  databaseURL: "https://prueba2-31849-default-rtdb.firebaseio.com",
  projectId: "prueba2-31849",
  storageBucket: "prueba2-31849.appspot.com",
  messagingSenderId: "593735540788",
  appId: "1:593735540788:web:4fa918ce020f5050c66a61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function obtenerUsuariosInfo() {
  onAuthStateChanged(auth, async (user) => {
    const userInfoElement = document.getElementById("userInfo");
    const allUsersInfoElement = document.getElementById("allUsersInfo");
    const evaluacionPreviaInfoElement = document.getElementById("evaluacionPreviaInfo");
    const puntuacionesEvaluacionPreviaElement = document.getElementById("puntuacionesEvaluacionPrevia");
    userInfoElement.innerHTML = "";
    allUsersInfoElement.innerHTML = "";
    evaluacionPreviaInfoElement.innerHTML = "";
    puntuacionesEvaluacionPreviaElement.innerHTML = "";

    if (user) {
      const userId = user.uid;
      const userDocRef = doc(db, "psicologos", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists) {
        const userData = userDoc.data();
        const userInfoDiv = document.createElement("div");
        userInfoDiv.classList.add("usuario-info");
        userInfoDiv.classList.add("usuario-autenticado");

        const fields = [
          { label: "ID del usuario", value: userId },
          { label: "Nombre", value: userData.nombre },
          { label: "Apellidos", value: userData.apellido },
          { label: "Correo electrónico", value: userData.email },
        ];

        fields.forEach((field) => {
          const rowDiv = document.createElement("div");
          rowDiv.classList.add("usuario-row");
          rowDiv.innerHTML = `
                <div class="campo">${field.label}:</div>
                <div class="valor">${field.value}</div>
            `;
          userInfoDiv.appendChild(rowDiv);
        });

        userInfoElement.appendChild(userInfoDiv);
        const hrElement = document.createElement("hr");
        hrElement.classList.add("usuario-separator");
        userInfoElement.appendChild(hrElement);
      } else {
        userInfoElement.appendChild(createParagraph("El documento del usuario autenticado no existe"));
      }
    } else {
      userInfoElement.appendChild(createParagraph("No hay usuario autenticado"));
    }

    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);
    const totalUsuariosRegistrados = usersSnapshot.size;
    const totalUsuariosRegistradosElement = document.getElementById("totalUsuariosRegistrados");
    totalUsuariosRegistradosElement.innerHTML = `<strong style="color: #2DAAA7; font-size: 18px;">Total de registrados: </strong>${totalUsuariosRegistrados}`;
    totalUsuariosRegistradosElement.insertAdjacentHTML("afterend", "<hr>");

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      const userId = doc.id;
      const userDiv = document.createElement("div");
      userDiv.classList.add("usuario-info");

      const fields = [
        { label: "ID del usuario", value: userId },
        { label: "Nombre", value: userData.nombre },
        { label: "Apellidos", value: userData.apellido },
        { label: "Correo electrónico", value: userData.email },
        { label: "Número Telefónico", value: userData.numeroTelefonico },
        { label: "Edad", value: userData.edad },
        { label: "Estado civil", value: userData.estadoCivil },
        { label: "Género", value: userData.genero },
        { label: "Ocupación", value: userData.ocupacion },
        { label: "Nivel de estudios", value: userData.nivelEstudios },
      ];

      fields.forEach((field) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("usuario-row");
        rowDiv.innerHTML = `
            <div class="campo">${field.label}:</div>
            <div class="valor">${field.value}</div>
        `;
        userDiv.appendChild(rowDiv);
      });
      allUsersInfoElement.appendChild(userDiv);
      const hrElement = document.createElement("hr");
      hrElement.classList.add("usuario-separator");
      allUsersInfoElement.appendChild(hrElement);
    }

    const evaluacionRealizadaCollectionRef = collection(db, "evaluacionRealizada");
    const evaluacionRealizadaSnapshot = await getDocs(evaluacionRealizadaCollectionRef);

    evaluacionPreviaInfoElement.appendChild(document.createElement("br"));
    let totalRealizada = 0;
    let totalNoRealizada = 0;
    for (const doc of evaluacionRealizadaSnapshot.docs) {
      const userId = doc.id;
      const evaluacionRealizadaData = doc.data();
      const evaluacionPreviaRealizada = evaluacionRealizadaData.evaluacionPreviaRealizada ? "Realizada" : "No realizada";

      const evaluacionPreviaRowDiv = document.createElement("div");
      evaluacionPreviaRowDiv.classList.add("usuario-row");

      const idUsuarioDiv = document.createElement("div");
      idUsuarioDiv.classList.add("campo");
      idUsuarioDiv.textContent = "ID del usuario:";
      evaluacionPreviaRowDiv.appendChild(idUsuarioDiv);

      const valorIdUsuarioDiv = document.createElement("div");
      valorIdUsuarioDiv.classList.add("valor");
      valorIdUsuarioDiv.textContent = userId;
      evaluacionPreviaRowDiv.appendChild(valorIdUsuarioDiv);

      const evaluacionPreviaDiv = document.createElement("div");
      evaluacionPreviaDiv.classList.add("campo");
      evaluacionPreviaDiv.textContent = "Evaluación Previa:";
      evaluacionPreviaRowDiv.appendChild(evaluacionPreviaDiv);

      const valorEvaluacionPreviaDiv = document.createElement("div");
      valorEvaluacionPreviaDiv.classList.add("valor");
      valorEvaluacionPreviaDiv.textContent = evaluacionPreviaRealizada;
      evaluacionPreviaRowDiv.appendChild(valorEvaluacionPreviaDiv);

      evaluacionPreviaInfoElement.appendChild(evaluacionPreviaRowDiv);

      // Incrementar el contador según si la evaluación previa está realizada o no
      if (evaluacionPreviaRealizada === "Realizada") {
        totalRealizada++;
      } else {
        totalNoRealizada++;
      }
    }

    // Mostrar el total de usuarios que han realizado y no han realizado la evaluación previa
    evaluacionPreviaInfoElement.insertAdjacentHTML(
      "beforeend",
      `<hr class="usuario-separator"><strong style="color: #2DAAA7; font-size: 16px;">Total Realizadas: </strong>${totalRealizada}`
    );
    evaluacionPreviaInfoElement.insertAdjacentHTML(
      "beforeend",
      `<hr class="usuario-separator"><strong style="color: #2DAAA7; font-size: 16px;">Total No Realizadas: </strong>${totalNoRealizada}`
    );
    evaluacionPreviaInfoElement.insertAdjacentHTML("beforeend", "<hr>");

    const evaluacionPreviaCollectionRef = collection(db, "resultadosEvaluacionPrevia");
    const evaluacionPreviaSnapshot = await getDocs(evaluacionPreviaCollectionRef);
    puntuacionesEvaluacionPreviaElement.appendChild(document.createElement("br"));

    for (const doc of evaluacionPreviaSnapshot.docs) {
      const userId = doc.id;
      const evaluacionPreviaData = doc.data();
      const userDiv = document.createElement("div");
      userDiv.classList.add("usuario-info", "usuario-evaluacion-previa");

      const fields = [
        { label: "ID del usuario", value: userId },
        { label: "Puntuación Total BAI", value: evaluacionPreviaData.puntuacionTotalBAI,},
        { label: "Puntuación Total BDI", value: evaluacionPreviaData.puntuacionTotalBDI,},
        { label: "Puntuación Total PSS", value: evaluacionPreviaData.puntuacionTotalPSS,},
        { label: "Puntuación Total MINI",
          value: `${evaluacionPreviaData.puntuacionTotalMINI.count} - ${evaluacionPreviaData.puntuacionTotalMINI.nivel}`,
        },
        { label: "Puntuación Total WBI", value: evaluacionPreviaData.puntuacionTotalWBI,},
        { label: "Puntuación Total ICSP", value: evaluacionPreviaData.puntuacionTotalICSP,},
      ];

      fields.forEach((field) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("usuario-row");
        rowDiv.innerHTML = `
              <div class="campo">${field.label}:</div>
              <div class="valor">${field.value}</div>
            `;
        userDiv.appendChild(rowDiv);
      });

      puntuacionesEvaluacionPreviaElement.appendChild(userDiv);

      const hrElement = document.createElement("hr");
      hrElement.classList.add("usuario-separator");
      puntuacionesEvaluacionPreviaElement.appendChild(hrElement);

      const cuestionariosRef = collection(doc.ref, "cuestionarios");
      const cuestionariosSnapshot = await getDocs(cuestionariosRef);
      puntuacionesEvaluacionPreviaElement.appendChild(
        createParagraph(
          `<span class="campo palabraCuestionarios">Respuestas de cada cuestionario</span>`
        )
      );

      let cuestionariosList = document.createElement("ul");
      const completarConCeros = (numero, longitud) => {
        return String(numero).padStart(longitud, "0");
      };

      // Después de imprimir "Cuestionarios:"
      puntuacionesEvaluacionPreviaElement.appendChild(
        document.createElement("br")
      );
      // Crear un div para contener todos los cuestionarios
      const cuestionariosContainer = document.createElement("div");
      cuestionariosContainer.classList.add("cuestionarios-container");
      cuestionariosContainer.classList.add("ocultar");
      cuestionariosContainer.id = userId;
      puntuacionesEvaluacionPreviaElement.appendChild(cuestionariosContainer);

      // Crea un elemento span para contener el texto "Mostrar"
      const mostrarTexto = document.createElement("span");
      mostrarTexto.textContent = "Mostrar";
      mostrarTexto.classList.add("textoMostrar");

      // Adjunta el texto "Mostrar" al párrafo antes del icono
      const iconoChevron = document.createElement("i");
      iconoChevron.classList.add("fas", "fa-chevron-down", "iconoFlecha");
      iconoChevron.addEventListener("click", function () {
        // Obtén el contenedor asociado al icono clickeado
        const userId = this.dataset.userId;
        const cuestionariosContainer = document.getElementById(userId);

        // Alterna la clase "mostrar" y "ocultar" solo en ese contenedor
        cuestionariosContainer.classList.toggle("mostrar");
        cuestionariosContainer.classList.toggle("ocultar");

        // Cambia el texto y el icono según el estado de visualización
        if (cuestionariosContainer.classList.contains("mostrar")) {
          mostrarTexto.textContent = "Ocultar";
          iconoChevron.classList.remove("fa-chevron-down");
          iconoChevron.classList.add("fa-chevron-up");
        } else {
          mostrarTexto.textContent = "Mostrar";
          iconoChevron.classList.remove("fa-chevron-up");
          iconoChevron.classList.add("fa-chevron-down");
        }
      });

      // Asigna el userId como dataset al icono
      iconoChevron.dataset.userId = userId;
      // Adjunta el texto y el icono al párrafo
      puntuacionesEvaluacionPreviaElement.appendChild(mostrarTexto);
      puntuacionesEvaluacionPreviaElement.appendChild(iconoChevron);

      cuestionariosSnapshot.docs.forEach((cuestionarioDoc) => {
        const cuestionarioData = cuestionarioDoc.data();
        const cuestionarioNombre = cuestionarioDoc.id;

        let cuestionarioWrapper = document.createElement("div");
        cuestionarioWrapper.classList.add("campo");
        cuestionarioWrapper.classList.add("cuestionarioItem");

        // Crear un título para cada cuestionario
        let cuestionarioTitle = document.createElement("h3");
        cuestionarioTitle.classList.add("campo");
        cuestionarioTitle.textContent = cuestionarioNombre;

        let cuestionarioContent = document.createElement("div");
        cuestionarioContent.classList.add("contenidoCuestionario");

        const clavesOrdenadas = Object.keys(cuestionarioData)
          .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
          .map((clave) => completarConCeros(clave, 2));

        clavesOrdenadas.forEach((key) => {
          const value = cuestionarioData[key];
          let item = document.createElement("div");
          item.classList.add("campoResultados");

          let label = document.createElement("span");
          label.classList.add("campoResultadosCampo");
          label.textContent = key + ":";

          let valor = document.createElement("span");
          valor.classList.add("campoResultadosValor");

          if (key.startsWith("Puntuación")) {
            valor.classList.add("contenidoCuestionario");
          }

          if (typeof value === "object" && value !== null) {
            let objectString = "";
            for (const [subKey, subValue] of Object.entries(value)) {
              objectString += `${subKey}: ${subValue}, `;
            }
            valor.textContent = objectString.slice(0, -2);
          } else {
            valor.textContent = value;
          }

          item.appendChild(label);
          item.appendChild(valor);
          cuestionarioContent.appendChild(item);
        });

        cuestionarioWrapper.appendChild(cuestionarioTitle);
        cuestionarioWrapper.appendChild(cuestionarioContent);
        // Agregar el cuestionario al contenedor de cuestionarios
        cuestionariosContainer.appendChild(cuestionarioWrapper);
      });

      puntuacionesEvaluacionPreviaElement.appendChild(cuestionariosList);
      puntuacionesEvaluacionPreviaElement.appendChild(document.createElement("hr"));
    }

    const allUsersInfoAplicacionElement = document.getElementById("allUsersInfoAplicacion");
    allUsersInfoAplicacionElement.innerHTML = ""; // Limpiar el contenido previo

    const usersCollectionRefApp = collection(db, "usuarios");
    const usersSnapshotApp = await getDocs(usersCollectionRefApp);
    const totalUsuariosRegistradosAplicacion = usersSnapshotApp.size;
    const totalUsuariosRegistradosAplicacionElement = document.getElementById("totalUsuariosRegistradosAplicacion");
    totalUsuariosRegistradosAplicacionElement.innerHTML = `<strong style="color: #2DAAA7; font-size: 18px;">Total de registrados: </strong>${totalUsuariosRegistradosAplicacion}`;
    totalUsuariosRegistradosAplicacionElement.insertAdjacentHTML("afterend", "<hr>");

    for (const doc of usersSnapshotApp.docs) {
      const userData = doc.data();
      const userId = doc.id;
      const userDiv = document.createElement("div");
      userDiv.classList.add("usuario-info");

      const fields = [
        { label: "ID del usuario", value: userId },
        { label: "Nombre", value: userData.nombre },
        { label: "Apellidos", value: userData.apellido },
        { label: "Correo electrónico", value: userData.email },
        { label: "Número Telefónico", value: userData.number },
        { label: "Edad", value: userData.edad },
        { label: "Estado civil", value: userData.estadoCivil },
        { label: "Género", value: userData.genero },
        { label: "Ocupación", value: userData.ocupacion },
        { label: "Nivel de estudios", value: userData.educacion },
      ];

      fields.forEach((field) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("usuario-row");
        rowDiv.innerHTML = `
          <div class="campo">${field.label}:</div>
          <div class="valor">${field.value}</div>
        `;
        userDiv.appendChild(rowDiv);
      });

      allUsersInfoAplicacionElement.appendChild(userDiv);
      allUsersInfoAplicacionElement.appendChild(document.createElement("hr"));
    }

    const evaluacionPreviaAppCollectionRef = collection(db, "pre");
    const evaluacionPreviaAppSnapshot = await getDocs(
      evaluacionPreviaAppCollectionRef
    );

    const puntuacionesEvaluacionPreviaAplicacionElement = document.getElementById("puntuacionesEvaluacionPreviaAplicacion");
    puntuacionesEvaluacionPreviaAplicacionElement.innerHTML = "";
    puntuacionesEvaluacionPreviaAplicacionElement.appendChild(document.createElement("br"));
    for (const doc of evaluacionPreviaAppSnapshot.docs) {
      const userId = doc.id;
      const evaluacionPreviaData = doc.data();
      const userDiv = document.createElement("div");
      userDiv.classList.add("usuario-info", "usuario-evaluacion-previa");

      const fields = [
        { label: "ID del usuario", value: userId },
        { label: "Puntuación Total BAI",value: evaluacionPreviaData.puntuacionTotalBAI,    },
        { label: "Puntuación Total BDI", value: evaluacionPreviaData.puntuacionTotalBDI,   },
        { label: "Puntuación Total PSS", value: evaluacionPreviaData.puntuacionTotalPSS,   },
        { label: "Puntuación Total MINI", value: evaluacionPreviaData.puntuacionTotalMINI, },
        { label: "Puntuación Total WBI", value: evaluacionPreviaData.puntuacionTotalWBI,   },
        { label: "Puntuación Total ICSP", value: evaluacionPreviaData.puntuacionTotalICSP, },
      ];

      fields.forEach((field) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("usuario-row");
        rowDiv.innerHTML = `
              <div class="campo">${field.label}:</div>
              <div class="valor">${field.value}</div>
            `;
        userDiv.appendChild(rowDiv);
      });

      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(userDiv);
      const hrElement = document.createElement("hr");
      hrElement.classList.add("usuario-separator");
      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(hrElement);
      const cuestionariosRef = collection(doc.ref, "preguntas");
      const cuestionariosSnapshot = await getDocs(cuestionariosRef);
      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(
        createParagraph(
          `<span class="campo palabraCuestionarios">Respuestas de cada cuestionario</span>`
        )
      );
      let cuestionariosList = document.createElement("ul");
      const completarConCeros = (numero, longitud) => {
        return String(numero).padStart(longitud, "0");
      };
      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(document.createElement("br"));
      const cuestionariosContainer = document.createElement("div");
      cuestionariosContainer.classList.add("cuestionariosContainerAplicacion");
      cuestionariosContainer.classList.add("ocultar");
      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(cuestionariosContainer);

      fetch("./../preguntas.json")
        .then((response) => response.json())
        .then((preguntasJSON) => {
          const preguntas = JSON.parse(JSON.stringify(preguntasJSON));

          cuestionariosSnapshot.docs.forEach((cuestionarioDoc) => {
            const cuestionarioData = cuestionarioDoc.data();
            const cuestionarioNombre = cuestionarioDoc.id;
            let cuestionarioWrapper = document.createElement("div");
            cuestionarioWrapper.classList.add("campo");
            cuestionarioWrapper.classList.add("cuestionarioItemAplicacion");
            let cuestionarioTitle = document.createElement("h3");
            cuestionarioTitle.classList.add("campoAplicacion");
            let cuestionarioContent = document.createElement("div");
            cuestionarioContent.classList.add("contenidoCuestionario");
            const cuestionarioContenedorAplicacion = document.createElement("div");
            cuestionarioContenedorAplicacion.classList.add("cuestionarioContenedorAplicacion", "ocultar");

            const clavesOrdenadas = Object.keys(cuestionarioData)
              .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
              .map((clave) => completarConCeros(clave, 2));

            clavesOrdenadas.forEach((key) => {
              const value = cuestionarioData[key];
              let item = document.createElement("div");
              item.classList.add("campoResultadosAplicacion");

              let label = document.createElement("span");
              label.classList.add("campoResultadosAplicacionCampo");
              label.textContent = key + ":";

              let valor = document.createElement("span");
              valor.classList.add("campoResultadosAplicacionValor");

              if (key === "Pregunta") {
                //console.log("Valor de Pregunta:", value);
                valor.textContent = value;

                const cuestionarioEncontrado = Object.entries(preguntas).find(
                  ([cuestionario, preguntas]) => preguntas.includes(value)
                );

                if (cuestionarioEncontrado) {
                  const [cuestionarioNombre, preguntasArray] =
                    cuestionarioEncontrado;
                  const preguntaIndex = preguntasArray.findIndex(
                    (pregunta) => pregunta === value
                  );
                  /*console.log(
                      `La pregunta "${value}" pertenece al cuestionario "${cuestionarioNombre}" y es la pregunta número ${
                        preguntaIndex + 1
                      }`
                    );*/

                  if (cuestionarioNombre === "ICSP") {
                    if (preguntaIndex >= 0 && preguntaIndex < 4) {
                      cuestionarioTitle.textContent = `${cuestionarioNombre} Pregunta ${ preguntaIndex + 1 }`;
                    } else if (preguntaIndex >= 4 && preguntaIndex < 14) {
                      cuestionarioTitle.textContent = `${cuestionarioNombre} Pregunta 5${String.fromCharCode(
                        97 + (preguntaIndex - 4)
                      )}`;
                    } else if (preguntaIndex >= 14 && preguntaIndex < 18) {
                      cuestionarioTitle.textContent = `${cuestionarioNombre} Pregunta ${ preguntaIndex - 8 }`;
                    }
                  } else {
                    cuestionarioTitle.textContent = `${cuestionarioNombre} Pregunta ${
                      preguntaIndex + 1
                    }`;
                  }
                } else {
                  console.log(`La pregunta "${value}" no se encuentra en el objeto preguntas`);
                }
              } else {
                if (key.startsWith("Puntuación")) {
                  valor.classList.add("contenidoCuestionario");
                }

                if (typeof value === "object" && value !== null) {
                  let objectString = "";
                  for (const [subKey, subValue] of Object.entries(value)) {
                    objectString += `${subKey}: ${subValue}, `;
                  }
                  valor.textContent = objectString.slice(0, -2);
                } else {
                  valor.textContent = value;
                }
              }
              item.appendChild(label);
              item.appendChild(valor);
              cuestionarioContent.appendChild(item);
            });

            cuestionarioContenedorAplicacion.appendChild(cuestionarioContent);
            const mostrarCuestionarioBoton = document.createElement("i");
            mostrarCuestionarioBoton.classList.add("fas", "fa-chevron-down", "iconoFlecha");
            mostrarCuestionarioBoton.addEventListener("click", function () {
              cuestionarioContenedorAplicacion.classList.toggle("ocultar");
              cuestionarioContenedorAplicacion.classList.toggle("mostrar");
              this.classList.toggle("fa-chevron-down");
              this.classList.toggle("fa-chevron-up");
            });

            cuestionarioWrapper.appendChild(cuestionarioTitle);
            cuestionarioWrapper.appendChild(mostrarCuestionarioBoton);
            cuestionarioWrapper.appendChild(cuestionarioContenedorAplicacion);
            cuestionariosContainer.appendChild(cuestionarioWrapper);
          });
        })
        .catch((error) => {
          console.error("Error al cargar el archivo preguntas.json:", error);
        });
      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(
        cuestionariosList
      );
      puntuacionesEvaluacionPreviaAplicacionElement.appendChild(
        document.createElement("hr")
      );
    }

    const contenedorInterbloque = document.createElement("div");
    const divRectanguloTitulos = document.createElement("div");
    divRectanguloTitulos.classList.add("rectanguloTitulos");
    const evaluacionesInterbloque = document.createElement("h2");
    evaluacionesInterbloque.textContent = "Evaluaciones Interbloque";
    evaluacionesInterbloque.classList.add("titulos");
    divRectanguloTitulos.appendChild(evaluacionesInterbloque);
    contenedorInterbloque.appendChild(divRectanguloTitulos);

    puntuacionesEvaluacionPreviaAplicacionElement.appendChild(contenedorInterbloque);

    // Ciclo para obtener los usuarios de cada evaluación interbloque
    for (let i = 1; i <= 6; i++) {
      const interBloqueCollectionRef = collection(db, `interBloque${i}`);
      const interBloqueSnapshot = await getDocs(interBloqueCollectionRef);

      if (!interBloqueSnapshot.empty) {
        const interBloqueTitle = document.createElement("h3");
        interBloqueTitle.textContent = `Usuarios que realizaron la evaluación interbloque ${i}`;
        interBloqueTitle.classList.add("titulos");
        contenedorInterbloque.appendChild(interBloqueTitle);

        interBloqueSnapshot.forEach((doc) => {
          const userId = doc.id;
          const docData = doc.data();
          const sentimiento = docData.sentimiento;

          const userDiv = document.createElement("div");
          userDiv.classList.add("usuario-info", "usuario-evaluacion-previa");

          const idUsuarioRow = document.createElement("div");
          idUsuarioRow.classList.add("usuario-row");
          idUsuarioRow.innerHTML = `
            <div class="campo">ID del usuario:</div>
            <div class="valor">${userId}</div>
          `;
          userDiv.appendChild(idUsuarioRow);

          const sentimientoRow = document.createElement("div");
          sentimientoRow.classList.add("usuario-row");
          sentimientoRow.innerHTML = `
            <div class="campo">Sentimiento:</div>
            <div class="valor">${sentimiento}</div>
          `;
          userDiv.appendChild(sentimientoRow);

          contenedorInterbloque.appendChild(userDiv);
          contenedorInterbloque.appendChild(document.createElement("hr"));
        });
      } else {
        const noUsersMessage = document.createElement("p");
        noUsersMessage.textContent = `No hay usuarios que hayan realizado la evaluación interbloque ${i}`;
        contenedorInterbloque.appendChild(noUsersMessage);
      }
    }//muestra bien solo hay que acomodar el boton
  });
}

function createParagraph(html) {
  const p = document.createElement("p");
  p.innerHTML = html;
  return p;
}

document.addEventListener("DOMContentLoaded", obtenerUsuariosInfo);

document.addEventListener("DOMContentLoaded", function () {
  const exportWebUsersButton = document.getElementById("exportUsersPaginaCSVButton");
  exportWebUsersButton.addEventListener("click", exportWebUsersCSV);

  const exportAppUsersButton = document.getElementById("exportUsersAplicacionCSVButton");
  exportAppUsersButton.addEventListener("click", exportAppUsersCSV);

  const exportAppUsersEvPrevButton = document.getElementById("exportUsersEvPrevRealizadaCSVButton");
  exportAppUsersEvPrevButton.addEventListener("click", exportAppUsersEvPrevCSV);

  const exportAllDataUsersEvPrevButton = document.getElementById("exportAllDataUsersCSVButton");
  exportAllDataUsersEvPrevButton.addEventListener("click", exportAllDataAsCSV);

  const exportEvaluacionPreviaButton = document.getElementById("exportEvaluacionPreviaPaginaCSVButton");
  exportEvaluacionPreviaButton.addEventListener("click", exportEvaluacionPreviaPaginaCSV);

  const exportEvaluacionPreviaAplicacionButton = document.getElementById("exportEvaluacionPreviaAplicacionCSVButton");
  exportEvaluacionPreviaAplicacionButton.addEventListener("click", exportEvaluacionPreviaAplicacionCSV);

  function exportAllDataAsCSV() {
    exportWebUsersCSV();
    exportAppUsersCSV();
    exportAppUsersEvPrevCSV();
    exportEvaluacionPreviaPaginaCSV();
    exportEvaluacionPreviaAplicacionCSV();
  }

  function exportWebUsersCSV() {
    const webUsersContainer = document.getElementById("allUsersInfo");
    const csvContent = generateCSV(webUsersContainer);
    downloadCSV(csvContent, "UsuariosPagina.csv");
  }

  function exportAppUsersCSV() {
    const appUsersContainer = document.getElementById("allUsersInfoAplicacion");
    const csvContent = generateCSV(appUsersContainer);
    downloadCSV(csvContent, "UsuariosAplicacion.csv");
  }

  function exportAppUsersEvPrevCSV() {
    const appUsersContainer = document.getElementById("evaluacionPreviaInfo");
    const csvContent = generateCSVWithEvalInfo(appUsersContainer);
    downloadCSV(csvContent, "UsuariosEvaluacionPreviaRealizada.csv");
  }

  function exportEvaluacionPreviaPaginaCSV() {
    const evaluacionPreviaContainer = document.getElementById("puntuacionesEvaluacionPrevia");
    const csvContent = generateEvaluacionPreviaPaginaCSV(evaluacionPreviaContainer);
    downloadCSV(csvContent, "PuntuacionesEvaluacionesPreviasPagina.csv");
  }

  function generateEvaluacionPreviaPaginaCSV(container) {
    const usuariosEvaluacionPrevia = container.querySelectorAll(".usuario-evaluacion-previa");
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; 

    const firstUserFields = usuariosEvaluacionPrevia[0].querySelectorAll(".campo");
    const fieldNames = Array.from(firstUserFields).map((field) => field.textContent.trim());
    const fieldRowCSV = fieldNames
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(",");

    csvContent += fieldRowCSV + "\r\n";

    usuariosEvaluacionPrevia.forEach((usuario) => {
      const fields = usuario.querySelectorAll(".valor");
      const rowData = Array.from(fields).map((field) => field.textContent.trim());
      const rowCSV = rowData
        .map((field) => `"${field.replace(/"/g, '""')}"`)
        .join(",");
      csvContent += rowCSV + "\r\n";
    });
    return csvContent;
  }

  function exportEvaluacionPreviaAplicacionCSV() {
    const evaluacionPreviaAplicacionContainer = document.getElementById("puntuacionesEvaluacionPreviaAplicacion");
    const csvContent = generateEvaluacionPreviaAplicacionCSV(evaluacionPreviaAplicacionContainer);
    downloadCSV(csvContent, "PuntuacionesEvaluacionesPreviasAplicacion.csv");
  }

  function generateEvaluacionPreviaAplicacionCSV(container) {
    const usuariosEvaluacionPrevia = container.querySelectorAll(".usuario-evaluacion-previa");
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    const firstUserFields = usuariosEvaluacionPrevia[0].querySelectorAll(".campo");
    const fieldNames = Array.from(firstUserFields).map((field) => field.textContent.trim());
    const fieldRowCSV = fieldNames
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(",");
    csvContent += fieldRowCSV + "\r\n";

    usuariosEvaluacionPrevia.forEach((usuario) => {
      const fields = usuario.querySelectorAll(".valor");
      const rowData = Array.from(fields).map((field) => field.textContent.trim());
      const rowCSV = rowData
        .map((field) => `"${field.replace(/"/g, '""')}"`)
        .join(",");
      csvContent += rowCSV + "\r\n";
    });
    return csvContent;
  }

  function generateCSVWithEvalInfo(container) {
    const rows = container.querySelectorAll(".usuario-row");
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; 
    csvContent += '"ID del usuario","Evaluación Previa Realizada - No Realizada"\r\n';

    rows.forEach((row) => {
      const idUsuario = row.querySelector(".valor").textContent.trim();
      const evaluacionPrevia = row
        .querySelector(".valor:last-of-type")
        .textContent.trim();
      const rowData = `"${idUsuario.replace(
        /"/g,
        '""'
      )}","${evaluacionPrevia.replace(/"/g, '""')}"`;
      csvContent += rowData + "\r\n";
    });
    return csvContent;
  }

  function generateCSV(container) {
    const rows = container.querySelectorAll(".usuario-info");
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";

    const firstUserFields = rows[0].querySelectorAll(".campo");
    const fieldNames = Array.from(firstUserFields).map((field) => field.textContent.trim());
    const fieldRowCSV = fieldNames
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(",");
    csvContent += fieldRowCSV + "\r\n";

    rows.forEach((row) => {
      const fields = row.querySelectorAll(".valor");
      const rowData = Array.from(fields).map((field) => field.textContent.trim());
      const rowCSV = rowData
        .map((field) => `"${field.replace(/"/g, '""')}"`)
        .join(","); 
      csvContent += rowCSV + "\r\n";
    });
    return csvContent;
  }

  function downloadCSV(csvContent, filename) {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  }
});