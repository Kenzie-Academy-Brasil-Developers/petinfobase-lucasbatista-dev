import { createPost } from "./api.js";
import { renderPosts } from "../pages/home/home.js";
import { updatePost } from "./api.js";

const createPostForm = () => {
  const form = document.createElement("form");

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
            cols="30"
            rows="10"
            placeholder="Desenvolva o conteúdo do post aqui..."
            required
          ></textarea>
          <div>
            <button>Cancelar</button>
            <button type="submit">Publicar</button>
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

const updatePostForm = ({ title, content, id }) => {
  const form = document.createElement("form");

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
              cols="30"
              rows="10"
              placeholder="Desenvolva o conteúdo do post aqui..."
              required
            ></textarea>
            <div>
              <button>Cancelar</button>
              <button type="submit">Salvar Alterações</button>
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

export { createPostForm, updatePostForm };
