import { AllAuthors, AllBooks } from "../queries";

export const addBookToCache = (cache, bookToAdd) => {
  const data = cache.readQuery({ query: AllBooks });
  if (!data || !data.allBooks) return;
  cache.updateQuery({ query: AllBooks }, ({ allBooks }) => {
    return {
      allBooks: allBooks.concat(bookToAdd),
    };
  });
};

export const addAuthorToCache = (cache, bookToAdd) => {
  const data = cache.readQuery({ query: AllAuthors });
  if (!data || !data.allAuthors) return;
  cache.updateQuery({ query: AllAuthors }, ({ allAuthors }) => {
    const authorExisted = allAuthors.some((a) => a.name === bookToAdd.author);
    if (authorExisted) {
      return {
        allAuthors: allAuthors.map((a) =>
          a.name === bookToAdd.author
            ? { ...a, bookCounts: a.bookCounts + 1 }
            : a,
        ),
      };
    }
    return { allAuthors: allAuthors.concat(bookToAdd.author) };
  });
};
