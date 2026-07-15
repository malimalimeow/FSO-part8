import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { CreateBook, AllBooks, AllAuthors } from "../queries.js";
import { useField } from "../hooks/useField.js";
import { addAuthorToCache, addBookToCache } from "../utils/apolloCache.js";
import { useApolloClient, useSubscription } from "@apollo/client/react";

const NewBook = ({ pickedGenre }) => {
  const [genres, setGenres] = useState([]);
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetPublished, ...published } = useField("number");
  const { reset: resetGenre, ...genre } = useField("text");
  const client = useApolloClient();
  const [createBook] = useMutation(CreateBook, {
    onError: (error) => console.log(error.message),
    refetchQueries: [{ query: AllBooks, variables: { genre: pickedGenre } }],
  });

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: {
        title: title.value,
        published: Number(published.value),
        author: author.value,
        genres,
      },
    });

    console.log("add book...");
    resetTitle();
    resetAuthor();
    resetPublished();
    resetGenre();
    setGenres([]);
  };

  const addGenre = (event) => {
    event.preventDefault();
    setGenres(genres.concat(genre.value));
    resetGenre();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            title
            <input id="title-input" {...title} />
          </label>
        </div>
        <div>
          <label>
            author
            <input id="author-input" {...author} />
          </label>
        </div>
        <div>
          <label>
            published
            <input id="published-input" {...published} />
          </label>
        </div>
        <div>
          <label>
            <input id="genre-input" {...genre} />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
