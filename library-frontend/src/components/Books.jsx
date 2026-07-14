import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { AllBooks } from "../queries.js";
import { useState } from "react";
import ShowBooks from "./ShowBooks.jsx";

const Books = ({ setPickedGenre, pickedGenre }) => {
  const { loading, error, data } = useQuery(AllBooks, {
    variables: pickedGenre ? { genre: pickedGenre } : undefined,
  });

  const {
    loading: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useQuery(AllBooks);

  console.log(pickedGenre);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (loadingAll) {
    return <div>Loading Genres...</div>;
  }

  if (errorAll) {
    return <div>{errorAll.message}</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const books = data?.allBooks || [];
  const booksAll = dataAll?.allBooks || [];
  const toShowBooks = pickedGenre === null ? booksAll : books;
  let allGenres = [];
  if (booksAll.length !== 0) {
    booksAll.forEach((book) => {
      const trimmedGenre = book.genres.map((g) => g.trim());
      allGenres.push(...trimmedGenre);
    });
  }

  const genresToShow = [...new Set(allGenres)];

  return (
    <div>
      <h2>books</h2>

      {pickedGenre !== null && <h3>in genre {pickedGenre} </h3>}

      <ShowBooks books={toShowBooks} />
      {genresToShow.map((g) => (
        <button key={g} onClick={() => setPickedGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setPickedGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
