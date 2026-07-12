import { useField } from "../hooks/useField";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
  const { reset: resetUser, ...username } = useField("text");
  const { reset: resetPw, ...password } = useField("password");
  const navigate = useNavigate();
  const toAuthor = () => navigate("/");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const toLogin = async (event) => {
    event.preventDefault();

    const response = await login({
      variables: { username: username.value, password: password.value },
    });

    if (response.data.login.value) {
      toAuthor();
    }
    resetUser();
    resetPw();
  };

  return (
    <>
      <form onSubmit={toLogin}>
        <div>
          <input {...username} />
        </div>
        <div>
          <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
