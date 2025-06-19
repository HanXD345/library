const myLibrary = [];

function Book(title, author, pages, read, id) {
  // Book Constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);

  return myLibrary
}

function displayBooks() {
    // For each book, display book with details and buttons
    for (let book of myLibrary) {
        const deleteButton = document.createElement("button");
        const readButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        readButton.textContent = "Read";

        console.log(book);
        const card = document.createElement("div");
        card.setAttribute('class', 'card');

        const title = document.createElement("h2");
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = book.author;
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = book.pages;
        card.appendChild(pages);

        const div = document.createElement("div");
        div.appendChild(deleteButton);
        div.appendChild(readButton);

        card.appendChild(div);

        const container = document.querySelector(".container");
        container.appendChild(card);
    }
}

// Input handling
const addBookButton = document.querySelector(".input > button");
const dialog = document.querySelector(".input dialog");
const submitButton = document.querySelector("[type='submit']")
const cancelButton = document.querySelector("[type='reset']");

addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const form = document.querySelector("form");
    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const choice = formData.get("choice");

    addBookToLibrary(title, author, pages, choice);

    const container = document.querySelector(".container");
    container.textContent = "";
    displayBooks();

    dialog.close();
})

cancelButton.addEventListener("click", () => {
    dialog.close();
})