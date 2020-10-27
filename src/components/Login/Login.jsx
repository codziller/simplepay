import React, { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Container">
      <div className="Login">
        <Card>
          <h1>Login</h1>
          <br />
          <form onSubmit={submitLogin}>
            <Input
              placeHolder="Username"
              value={username}
              onChange={(val) => setUsername(val)}
              required
              type="text"
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

export default Login;
