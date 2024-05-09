import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, reload, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const ageInput = document.getElementById("edad");
  const civilStatusInput = document.querySelector('select[name="estado_civil"]');
  const genderInputs = document.querySelectorAll('input[name="sexo"]');
  const occupationInput = document.querySelector('select[name="ocupacion"]');
  const educationLevelInput = document.querySelector('select[name="nivel_estudios"]');
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("pass");
  const confirmPasswordInput = document.getElementById("confirPass");
  const signUpButton = document.getElementById("signUp");

  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
  });

  async function registerUser() {
    try {
      const nombre = nameInput ? nameInput.value : "";
      const apellido = lastnameInput ? lastnameInput.value : "";
      const edad = ageInput ? parseInt(ageInput.value) : 0;

      const estadoCivil = civilStatusInput ? civilStatusInput.value : "";
      const ocupacion = occupationInput ? occupationInput.value : "";
      const nivelEstudios = educationLevelInput ? educationLevelInput.value : "";
      const numeroTelefonico = phoneInput ? phoneInput.value : "";

      let genero = "";
      genderInputs.forEach((input) => {
        if (input.checked) {
          genero = input.value;
        }
      });
      
      const email = emailInput ? emailInput.value : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert("Se ha enviado un correo de verificación a tu cuenta de email.");

      let verificationInterval;
      verificationInterval = setInterval(async () => {
        await reload(user);
        if (user.emailVerified) {
          clearInterval(verificationInterval);

          try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Sesión iniciada correctamente");
            window.location.href = "./evaluacionPrevia.html";
          } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
          }
        }
      }, 5000);

      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        edad,
        estadoCivil,
        genero,
        ocupacion,
        nivelEstudios,
        numeroTelefonico,
        email,
      });

      await setDoc(doc(db, "evaluacionRealizada", user.uid), {
        evaluacionPreviaRealizada: false,
      });

    } catch (error) {
      console.error("Error al registrar usuario:", error.code, error.message);
      alert("Ocurrió un error al registrar el usuario: " + error.message);
    }
  }
});