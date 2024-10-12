import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil disimpan.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/v1/users/${id}`, {
        name,
        email,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/${id}`
    );
    setName(response.data.data.name);
    setEmail(response.data.data.email);
    setGender(response.data.data.gender);
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          {/* Field input Name */}
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Masukan Nama..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* field untuk email */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Masukan Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* gender */}
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* submit */}
          <div className="field">
            <button
              onClick={showSuccessAlert}
              type="submit"
              className="button is-success"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
