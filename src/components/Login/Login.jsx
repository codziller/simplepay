import React, { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import "./Login.css";

import axios from "axios";
import { BASE_URL } from "../../helpers/API_CONFIG";
import Loading from "../ui/Loading";
import { withRouter } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();
    const url = BASE_URL + "/api/login/";
    setLoading(true);
    setError(false);
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(url, data)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("id", res.data.id.toString());
        history.replace("/");
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="Container">
      {loading ? <Loading /> : null}
      <div className="Login">
        <Card>
          <h1>Login</h1>
          <br />
          {error ? (
            <p className="Error">Incorrect username and or password</p>
          ) : null}
          <form onSubmit={submitLogin}>
            <Input
              placeHolder="Email"
              value={email}
              onChange={(val) => setEmail(val)}
              required
              type="email"
            />
            <Input
              placeHolder="Password"
              value={password}
              onChange={(val) => setPassword(val)}
              required
              type="password"
            />
            <Button title="submit" type="submit" />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Login);
