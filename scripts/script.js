let myLibrary = [];

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

  return myLibrary;
}

function displayBooks() {
    // For each book, display book with details and buttons
    for (let book of myLibrary) {
        const card = document.createElement("div");
        card.setAttribute('class', 'card');
        card.setAttribute('id', book.id)

        const title = document.createElement("h2");
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = "By " + book.author;
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = "Number of pages: " + book.pages;
        card.appendChild(pages);

        const status = document.createElement("p");
        status.textContent = book.read === 'true' ? 'Status: Finished' : 'Status: Unfinished';
        card.appendChild(status);

        const div = document.createElement("div");

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-button");
        const readButton = document.createElement("button");
        readButton.setAttribute("class", "read-button");

        deleteButton.textContent = "Delete";
        readButton.textContent = book.read === 'true' ? 'Unread' : "Read";

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

    form.reset();
    dialog.close();
})

cancelButton.addEventListener("click", () => {
    dialog.close();
})

// Delete and Read Button Handling
const container = document.querySelector(".container");

container.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.textContent === "Delete") {
        // target = delete button, parent of button = div, parent of div = card
        const card = event.target.parentElement.parentElement;
        const cardId = card.getAttribute("id");
        container.removeChild(card)
        myLibrary = myLibrary.filter((book) => book.id !== cardId);
    } else if (event.target.tagName === "BUTTON" && (event.target.textContent === "Read" || 
                event.target.textContent === "Unread")) {
        const card = event.target.parentElement.parentElement;
        const book = myLibrary.find((book) => book.id === card.getAttribute("id"));
        book.changeReadStatus();
        container.textContent = "";
        displayBooks();
    }
});

Book.prototype.changeReadStatus = function() {
    this.read = this.read === 'true' ? 'false' : 'true';
};