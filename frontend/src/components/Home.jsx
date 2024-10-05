import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  // render getUser untuk menampilkan semua data user
  useEffect(() => {
    getUsers();
  }, []);

  // method ambil semua data
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/users");
    setUser(response.data.data);
  };

  //   method delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <Link className="button is-success" to={"/add"}>
          Create User
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link className="button is-info mr-2" to={`/edit/${user.id}`}>
                    update
                  </Link>
                  <button
                    className="button is-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
