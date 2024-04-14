// JavaScript
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnSAUDBaTQQJdcgtu9MFZ2Xpr3oOKNdqw",
  authDomain: "prueba2-31849.firebaseapp.com",
  projectId: "prueba2-31849",
  storageBucket: "prueba2-31849.appspot.com",
  messagingSenderId: "593735540788",
  appId: "1:593735540788:web:4fa918ce020f5050c66a61",
};

const app = initializeApp(firebaseConfig);

// Obtén la referencia a la autenticación y la base de datos de Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Función para obtener el usuario autenticado
function obtenerUsuarioAutenticado() {
    onAuthStateChanged(auth, (user) => {
      const userInfoElement = document.getElementById('userInfo');
      userInfoElement.innerHTML = ""; // Limpiar el contenido previo
  
      if (user) {
        // El usuario está autenticado
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        getDoc(userDocRef)
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              userInfoElement.appendChild(createParagraph(`<span class="campo">ID del usuario: <span class="valor">${userId}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Nombre:</span> <span class="valor">${userData.name}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Apellido:</span> <span class="valor">${userData.lastname}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Correo:</span> <span class="valor">${userData.email}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Edad:</span> <span class="valor">${userData.age}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Estado civil:</span> <span class="valor">${userData.civilStatus}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Género:</span> <span class="valor">${userData.gender}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Ocupación:</span> <span class="valor">${userData.occupation}</span>`));
              userInfoElement.appendChild(createParagraph(`<span class="campo">Nivel de estudios:</span> <span class="valor">${userData.educationLevel}</span>`));
            } else {
              userInfoElement.appendChild(createParagraph("El documento no existe"));
            }
          })
          .catch((error) => {
            userInfoElement.appendChild(createParagraph(`Error al obtener los datos del usuario: ${error}`));
          });
      } else {
        // El usuario no está autenticado
        userInfoElement.appendChild(createParagraph("No hay usuario autenticado"));
      }
    });
  }
  
  // Función para crear un elemento <p> con la clase especificada
  function createParagraph(html) {
    const p = document.createElement('p');
    p.innerHTML = html;
    return p;
  }
  

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerUsuarioAutenticado);