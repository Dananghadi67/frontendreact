//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";

function Login() {
  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);

  //define history
  const history = useHistory();

  //hook useEffect
  useEffect(() => {
    //check token
    if (localStorage.getItem("token")) {
      //redirect page dashboard
      history.push("/admin");
    }
  }, []);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("email", email);
    formData.append("password", password);

    //send data to server
    await axios
      .post("http://localhost:8000/api/login", formData)
      .then((response) => {
        //set token on localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);

        //redirect to dashboard
        history.push("/admin");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center mb-3">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <center>
                <h3 className="fw-bold">HALAMAN LOGIN</h3>
              </center>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Alamat Email"
                  />
                </div>
                {validation.email && (
                  <div className="alert alert-danger">
                    {validation.email[0]}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                </div>
                {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
              <center>
                <a href="/register" className="mt-5">
                  Register
                </a>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
