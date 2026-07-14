import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { Route, Routes, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client/react";
import Recommendation from "./components/Recommendation";

const App = () => {
  const [pickedGenre, setPickedGenre] = useState(null);
  const [page, setPage] = useState("authors");
  const [token, setToken] =
    useState(localStorage.getItem("library-user-token")) || null;
  const client = useApolloClient();

  const handleLogout = () => {
    localStorage.removeItem("library-user-token");
    setToken(null);
    client.resetStore();
  };

  return (
    <div>
      <h1>Library App 📖</h1>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          padding: "20px",
          border: "2px dashed black",
        }}
      >
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        {token !== null ? (
          <>
            <Link to="/add">add book</Link>
            <Link to="/recommend">recommend</Link>
            <Link onClick={() => handleLogout()}>logout</Link>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route
          path="/books"
          element={
            <Books pickedGenre={pickedGenre} setPickedGenre={setPickedGenre} />
          }
        />
        <Route path="/add" element={<NewBook pickedGenre={pickedGenre} />} />
        <Route path="/recommend" element={<Recommendation />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
