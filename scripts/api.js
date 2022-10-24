import { getLocalStorage } from "./localStorage.js";
import { spinner, spinnerRegister } from "./spinner.js";
import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333/";

//------------------------------> Capturando Elementos HTML
const smallPassword = document.querySelector("#error-password");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const button = document.querySelector("#buttonLogin");
const buttonRegister = document.querySelector("#buttonRegister");

//------------------------------> Função de LOGAR
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
      spinner();

      setTimeout(() => {
        window.location.href = "/pages/home/home.html";
      }, 4000);
    } else {
      setTimeout(() => {
        smallPassword.classList = "password-error";
        inputPassword.style.outline = "2px solid #c73650";
        inputEmail.value = "";
        inputPassword.value = "";
        button.innerText = "Acessar";
      }, 3000);
    }
  } catch (err) {}
}

//------------------------------> Função de CADASTRAR
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
      spinnerRegister();
      setTimeout(() => {
        window.location.href = "/pages/login/index.html";
      }, 4000);
    } else {
      toast("Erro!", "Algo deu errado");
      setTimeout(() => {
        buttonRegister.innerText = "Cadatrar";
      }, 3000);
    }
  } catch (err) {}
}
//------------------------------> Função de PEGAR TODOS OS POSTS
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

//------------------------------> Função de CRIAR POST
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

//------------------------------> Função de MODIFICAR POST
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

//------------------------------> Função de DELETAR POST
async function deletePost(idPost) {
  const localStorage = getLocalStorage();

  try {
    const request = await fetch(`${baseUrl}posts/${idPost}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

//------------------------------>

export { login, register, getPosts, createPost, updatePost, deletePost };
