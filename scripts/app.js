const API =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

const search = document.querySelector("input");
const paragraph = document.querySelector(".container+p");
const result = document.querySelector(".result");

search.addEventListener("keyup", (e) => {
  result.innerHTML = "";
  if (e.target.value === "") {
    paragraph.style = "display:block";
    return;
  }

  if (e.key.match(/^[A-z]$/g)) {
    getResult(e.target.value);
  }
});

async function getResult(value) {
  const response = await fetch(`${API}${value}`);
  const json = await response.json();
  json.query.search.forEach(({ title, snippet, pageid }) => {
    result.insertAdjacentHTML(
      "beforeend",
      `<div>
     <h4>${title}</h4>
     <p>${snippet}</p>
     <a href=https://en.wikipedia.org/?curid=${pageid} target=_blank>read more</a>
     </div>`
    );
  });
  paragraph.style = "display:none";
}
