// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnSAUDBaTQQJdcgtu9MFZ2Xpr3oOKNdqw",
  authDomain: "prueba2-31849.firebaseapp.com",
  projectId: "prueba2-31849",
  storageBucket: "prueba2-31849.appspot.com",
  messagingSenderId: "593735540788",
  appId: "1:593735540788:web:4fa918ce020f5050c66a61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar los elementos del formulario
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("pass");
  const loginButton = document.getElementById("Login");

  // Agregar evento de clic al botón de login
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginUser();
  });

  // Función para iniciar sesión
  async function loginUser() {
    try {
      // Obtener los valores del formulario
      const email = emailInput ? emailInput.value : "";
      const password = passwordInput ? passwordInput.value : "";
      console.log("Email:", email);
      console.log("Password: ", password);

      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      alert("Inicio de Sesión exitoso");
      window.location.href = '/evaluacionPrevia.html';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al iniciar sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al iniciar sesión: " + errorMessage);
    }
  }
});