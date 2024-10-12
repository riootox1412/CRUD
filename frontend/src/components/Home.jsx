import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [users, setUser] = useState([]);
  const [sortOrder, setSortOrder] = useState("A-Z");

  // render getUser untuk menampilkan semua data user
  useEffect(() => {
    getUsers();
  }, []);

  // method ambil semua data
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/users");
    setUser(response.data.data);
  };

  // method sort
  const sortUsers = [...users].sort((a, b) => {
    return sortOrder === "A-Z"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  //pop up alert delete
  const alertDeleteUser = async (id) => {
    try {
      //tampilkan konfirmasi sebelum delete
      const result = await Swal.fire({
        title: "Apakah kamu yakin?",
        text: "User ini akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/v1/users/${id}`);

        getUsers();

        Swal.fire("Dihapus", "User telah berhasil dihapus", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus user", "error");
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div className="container is-flex">
          <Link className="button is-success mr-2" to={"/add"}>
            Create User
          </Link>

          {/* sort name a-z */}
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

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
            {sortUsers.map((user, index) => (
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
                    onClick={() => alertDeleteUser(user.id)}
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
