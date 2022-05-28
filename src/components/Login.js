import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div>
        <span className="username">{user.name}</span>
      </div>
      <form className="form-container">
        <div>
          <input
            style={{ height: "26px" }}
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ height: "26px" }}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className={
              !username || !password
                ? "button-disabled"
                : "form-container-button"
            }
            disabled={!username || !password}
            onClick={handleClick}
          >
            {loading ? "Please wait" : "Login"}
          </button>
        </div>
        <div>
          <span
            className="errorMessage"
            style={{ visibility: error ? "visible" : "hidden" }}
            data-testid="error"
          >
            Something went wrong!
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
