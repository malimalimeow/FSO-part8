import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { AllBooks, GET_USER } from "../queries.js";
import { useState } from "react";
import ShowBooks from "./ShowBooks.jsx";

const Recommendation = () => {
  const { data: userData } = useQuery(GET_USER);
  console.log(userData);

  const favoriteGenre = userData?.me?.favoriteGenre || "";

  const { loading, error, data } = useQuery(AllBooks, {
    variables: {
      genre: favoriteGenre,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const books = data?.allBooks || [];

  return (
    <div>
      <h1>Recommendations</h1>

      <p>
        books in your favorite genre
        <strong>{favoriteGenre}</strong>
      </p>
      <ShowBooks books={books} />
    </div>
  );
};
export default Recommendation;
