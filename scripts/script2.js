// Class implementation

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();;
    }

    changeReadStatus() {
        this.read = this.read === 'true' ? 'false' : 'true';
    }
}

class MyLibrary {
    static #books = [];

    static get library() {
        return this.#books;
    }

    static removeFromLibrary(cardId) {
        this.#books = this.#books.filter((book) => book.id !== cardId);
    }

    static addBook(book) {
        this.#books.push(book);
    }

    static displayBooks() {
        for (let book of this.#books) {
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

    const book = new Book(title, author, pages, choice);
    MyLibrary.addBook(book);

    const container = document.querySelector(".container");
    container.textContent = "";
    MyLibrary.displayBooks();

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
        console.log(cardId);
        container.removeChild(card);
        MyLibrary.removeFromLibrary(cardId);
    } else if (event.target.tagName === "BUTTON" && (event.target.textContent === "Read" || 
                event.target.textContent === "Unread")) {
        const card = event.target.parentElement.parentElement;
        const book = MyLibrary.library.find((book) => book.id === card.getAttribute("id"));
        book.changeReadStatus();
        container.textContent = "";
        MyLibrary.displayBooks();
    }
});