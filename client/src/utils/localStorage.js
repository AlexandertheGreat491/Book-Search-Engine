// exports the getSavedBookIds function
export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem("saved_books")
    ? JSON.parse(localStorage.getItem("saved_books"))
    : [];

  return savedBookIds;
};

// exports the saveBookIds function
export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem("saved_books", JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem("saved_books");
  }
};

// exports the removeBookId function with bookId as an argument
export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem("saved_books")
    ? JSON.parse(localStorage.getItem("saved_books"))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter(
    (savedBookId) => savedBookId !== bookId
  );
  localStorage.setItem("saved_books", JSON.stringify(updatedSavedBookIds));

  return true;
};
