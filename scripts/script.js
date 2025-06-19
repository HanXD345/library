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
const button = document.querySelector(".input button");
const dialog = document.querySelector(".input dialog");
const cancel = document.querySelector("[type='reset']");

console.log(cancel);

button.addEventListener("click", () => {
    dialog.showModal();
})

cancel.addEventListener("click", () => {
    dialog.close();
})

// Sample books
addBookToLibrary("sample title 1", "sample author 1", "295 pages", true);
addBookToLibrary("sample title 2", "sample author 2", "295 pages", true);
addBookToLibrary("sample title 3", "sample author 3", "295 pages", true);

displayBooks();