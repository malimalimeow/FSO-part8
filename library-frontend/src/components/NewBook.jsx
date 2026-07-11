import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { CreateBook, AllBooks, AllAuthors } from "../queries.js";
import { useField } from "../hooks/useField.js";

const NewBook = () => {
  const [genres, setGenres] = useState([]);
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetPublished, ...published } = useField("number");
  const { reset: resetGenre, ...genre } = useField("text");

  const [createBook] = useMutation(CreateBook, {
    refetchQueries: [{ query: AllBooks }, { query: AllAuthors }],
    onError: (error) => console.log(error.message),
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
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
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
