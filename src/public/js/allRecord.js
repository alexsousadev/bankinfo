document
  .getElementById("allRecord")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let inputText = document.getElementById("codigo_compensacao");

    inputText.value = "";
    try {
      const response = await fetch("/allRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const outputArea = document.getElementById("outputDiv");
      outputArea.innerHTML = "";

      if (!data.error) {
        // exibindo todos os registros
        for (let i = 0; i < data.response.length; i++) {
          const card = document.createElement("div");
          card.classList.add("card", "mb-3", "mx-auto", "w-75");

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body", "text-center");

          const codeText = document.createElement("p");
          codeText.classList.add("card-text", "mb-1");
          codeText.textContent = `Código de Compensação: ${data.response[i].codigo_compensacao}`;

          const nameText = document.createElement("p");
          nameText.classList.add("card-text", "mb-0");
          nameText.textContent = `Nome: ${data.response[i].nome_instituicao}`;

          cardBody.appendChild(codeText);
          cardBody.appendChild(nameText);
          card.appendChild(cardBody);
          outputArea.appendChild(card);
        }
      } else {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "mx-auto", "w-75");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center");

        const errorText = document.createElement("p");
        errorText.classList.add("card-text", "text-danger");
        errorText.textContent = `O Banco não foi encontrado.`;

        cardBody.appendChild(errorText);
        card.appendChild(cardBody);
        outputArea.appendChild(card);

        console.error(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  });
