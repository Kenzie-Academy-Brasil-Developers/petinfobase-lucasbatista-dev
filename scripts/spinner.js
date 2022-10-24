function spinner() {
  const button = document.querySelector("#buttonLogin");

  button.addEventListener("click", () => {
    button.innerText = "";

    const img = document.createElement("img");
    img.src = "/assets/spinner.svg";
    img.classList.add("loading");

    button.append(img);
  });
}

function spinnerRegister() {
  const button = document.querySelector("#buttonRegister");

  button.addEventListener("click", () => {
    button.innerText = "";

    const img = document.createElement("img");
    img.src = "/assets/spinner.svg";
    img.classList.add("loading");

    button.append(img);
  });
}

export { spinner, spinnerRegister };
