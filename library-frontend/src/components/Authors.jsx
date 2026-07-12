import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { AllAuthors, UpdateBirthYear } from "../queries.js";
import { useField } from "../hooks/useField.js";

const Authors = ({ token }) => {
  const { loading, error, data } = useQuery(AllAuthors);
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetBirth, ...birth } = useField("number");

  const [updateBirth] = useMutation(UpdateBirthYear, {
    refetchQueries: [{ query: AllAuthors }],
    onError: (error) => console.log(error.message),
  });

  const updateBirthYear = async (event) => {
    event.preventDefault();
    updateBirth({
      variables: { name: name.value, born: Number(birth.value) },
    });

    resetName();
    resetBirth();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  const authors = data?.allAuthors || [];

  console.log(token);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCounts}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token !== null ? (
        <div>
          <h3>Set BirthYear</h3>
          <form onSubmit={updateBirthYear}>
            <div>
              <label>
                name
                <select {...name}>
                  {authors.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              born <input {...birth} />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Authors;
