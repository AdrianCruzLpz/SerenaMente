// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0kLe5l_gNuBwhkOOvBr8RO150dHCU31k",
  authDomain: "serena-mente.firebaseapp.com",
  projectId: "serena-mente",
  storageBucket: "serena-mente.appspot.com",
  messagingSenderId: "183868385167",
  appId: "1:183868385167:web:442b02f182fc8a28260dfa",
  measurementId: "G-LVWYEJBRHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

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
  
      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("Inicio de Sesión exitoso");
  
      // Verificar el rol del usuario
      const rol = await verificarRolUsuario(user.uid);
  
      if (rol === "usuario") {
        // Verificar si el usuario ha completado la evaluación previa
        const evaluacionPreviaRealizada = await verificarEvaluacionPrevia();
  
        if (evaluacionPreviaRealizada) {
          window.location.href = "./perfil.html";
        } else {
          window.location.href = "./evaluacionPrevia.html";
        }
      } else if (rol === "administrador") {
        window.location.href = "./infoUsers.html";
      } else {
        console.log("Rol de usuario no válido");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al iniciar sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al iniciar sesión: " + errorMessage);
    }
  }
  
  // Función para verificar el rol del usuario
  async function verificarRolUsuario(uid) {
    const db = getFirestore(app);
    const usuariosRef = doc(db, "usuarios", uid);
    const usersRef = doc(db, "users", uid);
    const administradorRef = doc(db, "administrador", uid);
  
    const usuariosSnap = await getDoc(usuariosRef);
    const usersSnap = await getDoc(usersRef);
    const administradorSnap = await getDoc(administradorRef);
  
    if (usuariosSnap.exists()) {
      return "usuario";
    } else if (usersSnap.exists()) {
      return "usuario";
    } else if (administradorSnap.exists()) {
      return "administrador";
    }else {
      return null;
    }
  }

  const olvidePassword = document.getElementById("olvide");
  olvidePassword.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("restorePass").style.display = "block";
    const resetPasswordInput = document.getElementById("resetPasswordInput");
    resetPasswordInput.addEventListener("input", function() {
      console.log("El valor ingresado es:", resetPasswordInput.value);
    });
  });
});

// Función para enviar correo de restablecimiento de contraseña
document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordButton = document.getElementById("resetPasswordButton");
  resetPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    resetPassword();
  });

  async function resetPassword() {
    try {
      const resetPasswordInput = document.getElementById("resetPasswordInput");
      const email = resetPasswordInput ? resetPasswordInput.value : "";
      await sendPasswordResetEmail(auth, email);
      alert("Correo de restablecimiento de contraseña enviado");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al restablecer contraseña:", errorCode, errorMessage);
      alert("Ocurrió un error al restablecer la contraseña: " + errorMessage);
    }
  }
});

// Función para verificar si el usuario ha completado la evaluación previa
async function verificarEvaluacionPrevia() {
  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "evaluacionRealizada", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.evaluacionPreviaRealizada;
  } else {
    console.log("No se encontró el documento en evaluacionRealizada");
    return false;
  }
}