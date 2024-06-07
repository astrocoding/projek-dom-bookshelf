const BOOKSHELF_KEY = "BOOKSHELF_INVENTORY";
const RENDER_BOOK = "render-buku";
const books = [];

function isStorageExist() {
  if (typeof(Storage) === undefined) {
    alert("Browser Anda tidak mendukung local storage!");
    return false;
  }
  return true;
}

document.addEventListener(RENDER_BOOK, function () {
  const unreadBook = document.getElementById("belumDibaca");
  unreadBook.innerHTML = "";

  const readBook = document.getElementById("sudahDibaca");
  readBook.innerHTML = "";

  for (const book of books) {
    const bookElement = makeBookElement(book);
    if (!book.isComplete) {
      unreadBook.append(bookElement);
    } else {
      readBook.append(bookElement);
    }
  }
});

function loadData() {
  const data = JSON.parse(localStorage.getItem(BOOKSHELF_KEY));

  if (data !== null) {
    for (const item of data) {
      books.push(item);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOK));
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(BOOKSHELF_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
  }
};

function moveData() {
  if(isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(BOOKSHELF_KEY, parsed);
    document.dispatchEvent(new Event("ondatamoved"));
  }
};

function deleteData() {
  if(isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(BOOKSHELF_KEY, parsed);
    document.dispatchEvent(new Event("ondatadeleted"));
  }
};

function addBookItem() {
  const judulBuku = document.getElementById("judul");
  const penulisBuku = document.getElementById("penulis");
  const tahunBuku = document.getElementById("tahun");
  const bukuSelesaiDibaca = document.getElementById("telahDibaca");
  let statusBuku;

  if (bukuSelesaiDibaca.checked) {
    statusBuku = true;
  } else {
    statusBuku = false;
  }

  books.push({
    id: +new Date(),
    title: judulBuku.value,
    author: penulisBuku.value,
    year: Number(tahunBuku.value),
    isComplete: statusBuku
  });

  judulBuku.value = null;
  penulisBuku.value = null;
  tahunBuku.value = null;
  bukuSelesaiDibaca.checked = false;

  document.dispatchEvent(new Event(RENDER_BOOK));
  saveData();
};

const makeBookElement = (book) => {
  const itemJudulBuku = document.createElement("p");
  itemJudulBuku.classList.add("item-judul");
  itemJudulBuku.innerHTML = `${book.title} <span>(${book.year})</span>`;

  const itemPenulisBuku = document.createElement("p");
  itemPenulisBuku.classList.add("item-penulis");
  itemPenulisBuku.innerHTML = `<b>Penulis:</b> ${book.author}`;

  const itemDesc = document.createElement("div");
  itemDesc.classList.add("item-desc");
  itemDesc.append(itemJudulBuku, itemPenulisBuku);

  const itemAction = document.createElement("div");
  itemAction.classList.add("item-event");

  const container = document.createElement("div");
  container.classList.add("item");
  container.append(itemDesc);
  container.setAttribute("id", `book-${book.id}`);

  if (book.isComplete) {
    const unreadButton = document.createElement("button");
    unreadButton.classList.add("unread-btn");
    unreadButton.innerHTML = "pindah";

    unreadButton.addEventListener("click", function () {
      moveBookToUnread(book.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = "hapus";

    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
    });

    itemAction.append(unreadButton, deleteButton);
    container.append(itemAction);
  } else {
    const readButton = document.createElement("button");
    readButton.classList.add("read-btn");
    readButton.innerHTML = "selesai";

    readButton.addEventListener("click", function () {
      moveBookToRead(book.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = "hapus";

    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
    });

    itemAction.append(readButton, deleteButton);
    container.append(itemAction);
  }

  return container;
};

const moveBookToRead = (bookId) => {
  const bukuTujuan = findBook(bookId);

  if (bukuTujuan == null) return;

  bukuTujuan.isComplete = true;
  document.dispatchEvent(new Event(RENDER_BOOK));
  moveData();
};

const moveBookToUnread = (bookId) => {
  const bukuTujuan = findBook(bookId);

  if (bukuTujuan == null) return;

  bukuTujuan.isComplete = false;
  document.dispatchEvent(new Event(RENDER_BOOK));
  moveData();
};

const deleteBook = (bookId) => {
  const bukuTujuan = findBookIndex(bookId);
  
  if (bukuTujuan === -1) return;

  books.splice(bukuTujuan, 1);
  document.dispatchEvent(new Event(RENDER_BOOK));
  deleteData();
};

const findBook = (bookId) => {
  for (const book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
};

const findBookIndex = (bookId) => {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
};

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadData();
  }

  const saveForm = document.getElementById("formulirBuku");
  saveForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookItem();
  });

  const searchForm = document.getElementById("formulirSearch");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  const clearButton = document.querySelector(".reset-btn");
  clearButton.addEventListener("click", function () {
    document.getElementById("pencarian_buku").value = "";
    searchBook();
  });
});

function searchBook() {
  const searchValue = document.getElementById("pencarian_buku").value.toLowerCase();
  const bookItems = document.getElementsByClassName("item");

  for (let i = 0; i < bookItems.length; i++) {
    const itemTitle = bookItems[i].querySelector(".item-judul");
    if (itemTitle.textContent.toLowerCase().includes(searchValue)) {
      bookItems[i].classList.remove("hidden");
    } else {
      bookItems[i].classList.add("hidden");
    }
  }
};

document.addEventListener("ondatasaved", () => {
  const customAlert = document.createElement("div");
  customAlert.classList.add("alert");
  customAlert.innerText = "Buku berhasil ditambahkan!";

  document.body.insertBefore(customAlert, document.body.children[0]);
  setTimeout(() => {
    customAlert.remove();
  }, 1500);
});

document.addEventListener("ondatamoved", () => {
  const customAlert = document.createElement("div");
  customAlert.classList.add("alert");
  customAlert.innerText = "Buku berhasil dipindahkan!";

  document.body.insertBefore(customAlert, document.body.children[0]);
  setTimeout(() => {
    customAlert.remove();
  }, 1500);
});

document.addEventListener("ondatadeleted", () => {
  const customAlert = document.createElement("div");
  customAlert.classList.add("alert");
  customAlert.innerText = "Buku berhasil dihapus!";

  document.body.insertBefore(customAlert, document.body.children[0]);
  setTimeout(() => {
    customAlert.remove();
  }, 1500);
});