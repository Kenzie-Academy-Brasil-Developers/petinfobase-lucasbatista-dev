import { getLocalStorage } from "./localStorage.js";
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
    // console.log(request);

    if (request.ok) {
      const response = await request.json();
      toast("Sucesso!", "Login feito com Sucesso");
      localStorage.setItem("user", JSON.stringify(response));

      setTimeout(() => {
        window.location.href = "/pages/home/home.html";
      }, 4000);
    } else {
      //   console.log("deu ruim");
      smallPassword.classList = "password-error";
      inputPassword.style.outline = "2px solid #c73650";
      inputEmail.value = "";
      inputPassword.value = "";
    }
  } catch (err) {}
}

async function register(body) {
  try {
    const request = await fetch(`${baseUrl}users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (request.ok) {
      toast(
        "Sua conta foi criada com sucesso!",
        "Agora você pode acessar os contúdos utilizando seu usuário e senha na página de login"
      );
      setTimeout(() => {
        window.location.href = "/pages/login/index.html";
      }, 4000);
    } else {
      toast("Erro!", "Algo deu errado");
    }
  } catch (err) {}
}

async function getPosts() {
  const localStorage = getLocalStorage();

  try {
    const request = await fetch(`${baseUrl}posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer" ${localStorage.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createPost(body) {
  const localStorage = getLocalStorage();

  try {
    const request = await fetch(`${baseUrl}posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(body, idPost) {
  const localStorage = getLocalStorage();

  try {
    const request = await fetch(`${baseUrl}posts/${idPost}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export { login, register, getPosts, createPost, updatePost };
