//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";
import { Pagination } from "react-laravel-paginex";

const Dashboard = () => {
  //state user
  const [user, setUser] = useState({});

  //state data siswa
  const [siswas, setSiswas] = useState({});

  //define history
  const history = useHistory();

  //token
  const token = localStorage.getItem("token");

  //role
  const role = localStorage.getItem("role");

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/user").then((response) => {
      //set response user to state
      setUser(response.data);
    });
    await axios.get("http://localhost:8000/api/siswa").then((response) => {
      setSiswas(response.data.data);
    });
  };

  const getDataSiswa = async (data) => {
    await axios
      .get("http://localhost:8000/api/siswa?page=" + data.page)
      .then((response) => {
        setSiswas(response.data.data);
      });
  };

  const deleteDataSiswa = async (id) => {
    await axios.delete("http://localhost:8000/api/siswa/" + id).then(() => {
      fetchData();
    });
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history.push("/");
    }
    if (role === "user") {
      history.push("/user");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  //function logout
  const logoutHandler = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios.post("http://localhost:8000/api/logout").then(() => {
      //remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      //redirect halaman login
      history.push("/");
    });
  };

  const Tbody = () => {
    return (
      <>
        <tbody>
          {siswas.data.map((siswa, index) => (
            <tr key={siswa.id}>
              <td>{index + 1}</td>
              <td>{siswa.nama}</td>
              <td>{siswa.email}</td>
              <td>{siswa.alamat}</td>
              <td>{siswa.kota}</td>
              <td>{siswa.provinsi}</td>
              <td className="d-flex">
                <button
                  className="btn btn-danger btn-sm mx-3"
                  type="button"
                  onClick={() => {
                    deleteDataSiswa(siswa.id);
                  }}
                >
                  Delete
                </button>
                <a
                  className="btn btn-success btn-sm mx-3"
                  href={"/admin/edit?id=" + siswa.id}
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        <Pagination changePage={getDataSiswa} data={siswas} />
      </>
    );
  };
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              SELAMAT DATANG {" "}
              <strong className="text-uppercase">{user.name}</strong>
              <button
                onClick={logoutHandler}
                className="btn btn-md btn-danger float-end"
              >
                Log Out
              </button>
              <hr />
              <table className="table table-striped table-bordered table-hover mb-1">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>Kota</th>
                    <th>Provinsi</th>
                    <th>
                      <a className="btn btn-primary px-5" href="/admin/create">
                        Tambah
                      </a>
                    </th>
                  </tr>
                </thead>
                {siswas.data ? <Tbody /> : "Loading Data"}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
