let books = [
  {
    id: 1,
    title: '1984',
    author: 'Gorge',
  },
  {
    id: 2,
    title: 'The great gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 3,
    title: 'Pride and Prejustice',
    author: 'Jane Austen',
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
];

async function getAllBooks() {
  return books;
}

async function getBookById(bookId) {
  return books.find((book) => book.id === bookId);
}

async function addBook(book) {
  console.log(book);
  let newBook = {
    id: books.length + 1,
    ...book,
  };
  books.push(newBook);
  return newBook;
}

module.exports = { getAllBooks, getBookById, addBook };
