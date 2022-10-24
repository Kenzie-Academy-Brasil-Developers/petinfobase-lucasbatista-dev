import { getLocalStorage } from "../../scripts/localStorage.js";
import { getPosts } from "../../scripts/api.js";
import {
  createPostForm,
  updatePostForm,
  deletePostForm,
  openPost,
} from "../../scripts/forms.js";
import { openModal } from "../../scripts/modal.js";
import { createPost } from "../../scripts/api.js";

// ---------------------------------------->

const baseUrl = "http://localhost:3333/";

// ----------------------------------------> Verificando se usuario esta com o token no localStorage
const verifyPermission = () => {
  const user = getLocalStorage();

  if (user == "") {
    window.location.replace("../../index.html");
  }
};
verifyPermission();

// console.log(await getPosts());

console.log(getLocalStorage());
// ---------------------------------------->
async function renderImgProfile() {
  const user = getLocalStorage();

  try {
    const request = await fetch(`${baseUrl}users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer" ${localStorage.token}`,
      },
    });
    const response = await request.json();
    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
// renderImgProfile();

// ----------------------------------------> Renderizando Posts na tela
const renderPosts = async () => {
  const render = await getPosts();

  const ulList = document.querySelector("#listPosts");

  ulList.innerHTML = "";

  render.forEach((post) => {
    // console.log(post);

    const tagLi = document.createElement("li");
    const divHeaderPost = document.createElement("div");
    const divUser = document.createElement("div");
    const divImgUser = document.createElement("div");
    const imgUser = document.createElement("img");
    const nameUser = document.createElement("p");
    const divContention = document.createElement("div");
    const imgContention = document.createElement("img");
    const postDate = document.createElement("p");

    const divButtons = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    const titlePost = document.createElement("h2");
    const informationPost = document.createElement("p");
    const linkPost = document.createElement("a");

    tagLi.classList = "p-bottom40 containerLi ";

    divHeaderPost.classList = "flex align-center justify-between m-botton20";
    divUser.classList = "flex align-center gap12";
    divImgUser.classList = "img-user";
    divButtons.classList = "flex align-center gap12";
    editButton.classList = "button-transparentSmall";
    deleteButton.classList = "button-transparentSmall";
    titlePost.classList = "h2-home";
    informationPost.classList = "post-home";
    linkPost.classList = "post-link";

    tagLi.id = `${post.id}`;
    imgUser.src = `${post.user.avatar}`;
    nameUser.innerText = `${post.user.username}`;
    postDate.innerText = `${post.createdAt}`;
    imgContention.src = "../../assets/_.svg";
    titlePost.innerText = `${post.title}`;
    informationPost.innerText = `${post.content}`;
    editButton.innerText = "Editar";

    editButton.addEventListener("click", () => {
      const formEdit = updatePostForm(post);
      openModal(formEdit);
    });

    deleteButton.innerText = "Deletar";
    linkPost.innerText = "Acessar publicação";
    linkPost.addEventListener("click", () => {
      const openPostModal = openPost(post);
      openModal(openPostModal);
    });

    deleteButton.onclick = () => {
      const deletePost = deletePostForm(post.id);
      openModal(deletePost);
    };
    tagLi.append(divHeaderPost, titlePost, informationPost, linkPost);

    divHeaderPost.append(divUser, divButtons);

    divUser.append(divImgUser, nameUser, divContention, postDate);
    divImgUser.append(imgUser);
    divContention.append(imgContention);

    divButtons.append(editButton, deleteButton);

    ulList.append(tagLi);

    return tagLi;
  });
};

renderPosts();

// ----------------------------------------> Abrindo Modal ao clicar em nova publicação
const createNewPost = () => {
  const button = document.querySelector("#btnPost");

  button.addEventListener("click", async () => {
    const formCreate = createPostForm();
    openModal(formCreate);
  });
};

createNewPost();

export { renderPosts };
