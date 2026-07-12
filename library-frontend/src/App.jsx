import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { Route, Routes, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client/react";

const App = () => {
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
            <Link onClick={() => handleLogout()}>Log Out</Link>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="books" element={<Books />} />
        <Route path="add" element={<NewBook />} />
        <Route path="login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
