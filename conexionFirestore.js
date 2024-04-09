// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const database = getDatabase(app);
const auth = getAuth();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar los elementos del formulario
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const ageInput = document.getElementById("edad");
  const civilStatusInput = document.querySelector('select[name="estado_civil"]');
  const genderInputs = document.querySelectorAll('input[name="sexo"]');
  const occupationInput = document.querySelector('select[name="ocupacion"]');
  const educationLevelInput = document.querySelector('select[name="nivel_estudios"]');
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("pass");
  const confirmPasswordInput = document.getElementById("confirPass");
  const signUpButton = document.getElementById("signUp");

  // Agregar evento de clic al botón de registro
  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
  });

  // Función para registrar al usuario
  async function registerUser() {
    try {
      // Obtener los valores del formulario
      const name = nameInput ? nameInput.value : "";
      const lastname = lastnameInput ? lastnameInput.value : "";
      const age = ageInput ? parseInt(ageInput.value) : 0;

      // Obtener los valores de los campos select
      const civilStatus = civilStatusInput ? civilStatusInput.value : "";
      const occupation = occupationInput ? occupationInput.value : "";
      const educationLevel = educationLevelInput ? educationLevelInput.value : "";

      // Obtener el valor del campo de género
      let gender = "";
      genderInputs.forEach((input) => {
        if (input.checked) {
          gender = input.value;
        }
      });
      
      const email = emailInput ? emailInput.value : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      console.log("Datos del usuario:");
      console.log("Nombre:", name);
      console.log("Apellido:", lastname);
      console.log("Edad:", age);
      console.log("Estado civil:", civilStatus);
      console.log("Género:", gender);
      console.log("Ocupación:", occupation);
      console.log("Nivel de estudios:", educationLevel);
      console.log("Email:", email);

      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar los datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        lastname,
        age,
        civilStatus,
        gender,
        occupation,
        educationLevel,
        email,
      });

      alert("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error.code, error.message);
      alert("Ocurrió un error al registrar el usuario: " + error.message);
    }
  }
});