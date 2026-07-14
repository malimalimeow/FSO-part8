import { useField } from "../hooks/useField";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginForm = ({ setToken }) => {
  const { reset: resetUser, ...username } = useField("text");
  const { reset: resetPw, ...password } = useField("password");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const toAuthor = () => navigate("/");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    },
    onError: (error) => {
      setFailed(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setFailed(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [failed]);

  return (
    <>
      <form onSubmit={toLogin}>
        {failed && <p>login failed</p>}
        <div>
          <label>
            username
            <input id="username-input" {...username} />
          </label>
        </div>
        <div>
          <label>
            password
            <input id="password-input" {...password} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
