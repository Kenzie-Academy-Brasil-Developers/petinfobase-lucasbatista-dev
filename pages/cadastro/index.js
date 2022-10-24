import { register } from "../../scripts/api.js";
import { spinnerRegister } from "../../scripts/spinner.js";

const eventRegister = () => {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {};

    elements.forEach((elem) => {
      if (elem.tagName == "INPUT" && elem.value !== "") {
        body[elem.id] = elem.value;
      }
    });

    await register(body);
  });
};

eventRegister();

// ---------------------> Ativando e desativando botão do form de cadastro
const button = document.querySelector("#buttonRegister");
const formLogin = document.querySelector("#form-register");
const inputUser = document.querySelector("#username");
const inputEmail = document.querySelector("#email");
const inputPicture = document.querySelector("#avatar");
const inputPassword = document.querySelector("#password");

formLogin.addEventListener("input", (e) => {
  if (
    inputUser.value.length == 0 ||
    inputEmail.value.length == 0 ||
    inputPicture.value.length == 0 ||
    inputPassword.value.length == 0
  ) {
    button.disabled = true;
  } else {
    button.disabled = false;
    spinnerRegister();
  }
});
