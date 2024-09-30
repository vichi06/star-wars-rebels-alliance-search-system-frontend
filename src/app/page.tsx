"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import styles from "./page.module.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      const { token } = response.data;
      // Save the JWT token (localStorage or sessionStorage)
      localStorage.setItem("token", token);
      // Navigate to the search page after successful login
      router.push("/search");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.Login}>
      <h1>Star Wars Rebels Alliance Search System</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
