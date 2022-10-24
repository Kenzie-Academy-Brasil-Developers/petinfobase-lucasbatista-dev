import { login } from "../../scripts/api.js";
import { spinner } from "../../scripts/spinner.js";

const eventLogin = () => {
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

    await login(body);
  });
};
eventLogin();

// ---------------------> Ativando e desativando botão do form de login

const formLogin = document.querySelector("#form-login");
const button = document.querySelector("#buttonLogin");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

formLogin.addEventListener("input", (e) => {
  if (inputEmail.value.length == 0 || inputPassword.value.length == 0) {
    button.disabled = true;
  } else {
    button.disabled = false;
    spinner();
  }
});
