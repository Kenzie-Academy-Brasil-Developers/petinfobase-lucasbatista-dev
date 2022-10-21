import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333/";

const smallPassword = document.querySelector("#error-password");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

async function login(body) {
  try {
    const request = await fetch(`${baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(request);

    if (request.ok) {
      const response = await request.json();
      toast("Sucesso!", "Login feito com Sucesso");
      localStorage.setItem("user", JSON.stringify(response));

      setTimeout(() => {
        window.location.href = "/pages/home/home.html";
      }, 4000);
    } else {
      console.log("deu ruim");
      smallPassword.classList = "password-error";
      inputPassword.style.outline = "2px solid #c73650";
      inputEmail.value = "";
      inputPassword.value = "";
    }
  } catch (err) {
    console.log(err);
  }
}

export { login };
