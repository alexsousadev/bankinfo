document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    let inputText = document.getElementById("codigo_compensacao").value;

    try {
      const response = await fetch("/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      const outputArea = document.getElementById("outputDiv");
      outputArea.innerHTML = "";

      const card = document.createElement("div");
      card.classList.add("card", "mb-3", "mx-auto", "w-75");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "text-center");

      if (!data.error) {
        const codeText = document.createElement("p");
        codeText.classList.add("card-text", "mb-1");
        codeText.textContent = `Código de Compensação: ${data.bankInfo.codigo_compensacao}`;

        const nameText = document.createElement("p");
        nameText.classList.add("card-text", "mb-0");
        nameText.textContent = `Nome: ${data.bankInfo.nome_instituicao}`;

        cardBody.appendChild(codeText);
        cardBody.appendChild(nameText);
        card.appendChild(cardBody);
        outputArea.appendChild(card);
      } else {
        const errorText = document.createElement("p");
        errorText.classList.add("card-text", "text-danger");
        errorText.textContent = `O Banco não foi encontrado.`;

        cardBody.appendChild(errorText);
        card.appendChild(cardBody);
        outputArea.appendChild(card);
      }
    } catch (e) {
      console.error(e);
    }
  });
