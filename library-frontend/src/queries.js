import { gql } from "@apollo/client";

export const AllAuthors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const AllBooks = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`;

export const CreateBook = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`;

export const UpdateBirthYear = gql`
  mutation updateBirth($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`;
