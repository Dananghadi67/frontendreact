//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";

const Edit = () => {
  //state user
  const [user, setUser] = useState({});
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  //state data siswa

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [provinsi, setProvinsi] = useState("");

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
    await axios
      .get("http://localhost:8000/api/siswa/" + id)
      .then((response) => {
        setNama(response.data.data.nama);
        setEmail(response.data.data.email);
        setAlamat(response.data.data.alamat);
        setKota(response.data.data.kota);
        setProvinsi(response.data.data.provinsi);
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

  const updateDataSiswa = () => {
    console.log(nama);
    axios
      .put("http://localhost:8000/api/siswa/" + id, {
        nama: nama,
        email: email,
        alamat: alamat,
        kota: kota,
        provinsi: provinsi,
      })
      .then(() => {
        //set response user to state
        history.push("/admin");
      });
  };

  const Form = () => {
    return (
      <>
        <form>
          <div className="mb-3">
            <label for="nama" className="form-label">
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              id="nama"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="alamat" className="form-label">
              Alamat
            </label>
            <textarea
              className="form-control"
              id="alamat"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => {
                setAlamat(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="kota" className="form-label">
              Kota
            </label>
            <input
              type="text"
              className="form-control"
              id="kota"
              placeholder="Kota"
              value={kota}
              onChange={(e) => {
                setKota(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="provinsi" className="form-label">
              Provinsi
            </label>
            <input
              type="text"
              className="form-control"
              id="provinsi"
              placeholder="Provinsi"
              value={provinsi}
              onChange={(e) => {
                setProvinsi(e.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              updateDataSiswa();
            }}
            type="button"
          >
            Kirim
          </button>
        </form>
      </>
    );
  };
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              Edit Data Siswa <hr />
              {nama ? <Form /> : "Loading"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
