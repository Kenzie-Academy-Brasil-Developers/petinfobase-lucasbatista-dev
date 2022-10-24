import { createPost } from "./api.js";
import { renderPosts } from "../pages/home/home.js";
import { updatePost, deletePost } from "./api.js";
import { openModal } from "./modal.js";

//------------------------------> Formulário de CRIAÇÃO DE POST
const createPostForm = () => {
  const form = document.createElement("form");
  form.classList = "container-create";

  form.insertAdjacentHTML(
    "beforeend",
    `
          <h2>Criando novo post</h2>
          <label for="title ">Título do post</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título aqui..."
            required
          />
          <label for="content">Conteúdo do post</label>
          <textarea
          
          name="content"
          placeholder="Desenvolva o conteúdo do post aqui..."
          required
         ></textarea>
          <div class="width100 flex justify-end gap16">
            <button class="btn-grey">Cancelar</button>
            <button class="button-blue" type="submit">Publicar</button>
          </div> 
  `
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = [...e.target];

    const newPost = {};

    inputs.forEach(({ name, value }) => {
      if (name) {
        newPost[name] = value;
      }
    });

    await createPost(newPost);
    await renderPosts();
  });

  return form;
};

//------------------------------> Formulário de EDIÇÃO DE POST
const updatePostForm = ({ title, content, id }) => {
  const form = document.createElement("form");
  form.classList = "container-edit";

  form.insertAdjacentHTML(
    "beforeend",
    `
            <h2>Edição</h2>
            <label for="title ">Título do post</label>
            <input
              type="text"
              value="${title}"
              name="title"
              placeholder="Digite o título aqui..."
              required
            />
            <label for="content">Conteúdo do post</label>
            <textarea
              name="content"
              value="${content}"              
              placeholder="Desenvolva o conteúdo do post aqui..."
              required
            ></textarea>
            <div class="width100 flex justify-end gap16">
              <button class="btn-grey">Cancelar</button>
              <button class="button-blue" type="submit">Salvar Alterações</button>
            </div> 
    `
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = [...e.target];

    const post = {};

    inputs.forEach(({ name, value }) => {
      if (name) {
        post[name] = value;
      }
    });

    await updatePost(post, id);
    await renderPosts();
  });

  return form;
};

//------------------------------> Formulário de APAGAR POST
const deletePostForm = (id) => {
  const form = document.createElement("form");
  form.classList = "container-delete";

  form.insertAdjacentHTML(
    "beforeend",
    `
    <h3>Confirmação de exclusão</h3>
    <h2>Tem certeza que deseja excluir este post?</h2>
    <p>Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
    <div class="width100 flex justify-start gap16">
     <button class="btn-grey">Cancelar</button>
     <button class="button-red">Sim, excluir este post</button>
    </div>
  `
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await deletePost(id);
    await renderPosts();
  });

  return form;
};

//------------------------------> Abrir o Post

const openPost = (post) => {
  const article = document.createElement("article");
  article.classList = "containerArticle";

  article.insertAdjacentHTML(
    "beforeend",
    `
      <div class="flex gap12">
        <div class="img-user"><img src="${post.avatar}" alt="" /></div>
        <p>${post.username}</p>
        <div><img src="" alt="" /></div>
        <p>${post.createdAt}</p>
      </div>
      <h2 class="h2-home">${post.title}</h2>
      <p>${post.content}</p>
  `
  );
  return article;
};

export { createPostForm, updatePostForm, deletePostForm, openPost };
