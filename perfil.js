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
    if (user) {
      // El usuario está autenticado
      const userId = user.uid;
      const userInfoElement = document.getElementById('userInfo');
      userInfoElement.innerHTML = `ID del usuario: ${userId}`;

      // Ahora puedes usar este ID para realizar consultas en Firestore
      const userDocRef = doc(db, 'users', userId);
      getDoc(userDocRef)
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            userInfoElement.innerHTML += `<br>ID: ${userId}`;
            userInfoElement.innerHTML += `<br>Nombre: ${userData.name}`;
            userInfoElement.innerHTML += `<br>Apellido: ${userData.lastname}`;
            userInfoElement.innerHTML += `<br>Correo: ${userData.email}`;
            userInfoElement.innerHTML += `<br>Edad: ${userData.age}`;
            userInfoElement.innerHTML += `<br>Estado civil: ${userData.civilStatus}`;
            userInfoElement.innerHTML += `<br>Género: ${userData.gender}`;
            userInfoElement.innerHTML += `<br>Ocupación: ${userData.occupation}`;
            userInfoElement.innerHTML += `<br>Nivel de estudios: ${userData.educationLevel}`;
          } else {
            userInfoElement.innerHTML += "<br>El documento no existe";
          }
        })
        .catch((error) => {
          userInfoElement.innerHTML += `<br>Error al obtener los datos del usuario: ${error}`;
        });
    } else {
      // El usuario no está autenticado
      const userInfoElement = document.getElementById('userInfo');
      userInfoElement.innerHTML = "No hay usuario autenticado";
    }
  });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerUsuarioAutenticado);