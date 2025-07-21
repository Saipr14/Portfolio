import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple hardcoded auth. Replace with API call for production!
    if (username === "user" && password === "password") {
      onLogin(username);
    } else {
      setErr("Invalid credentials. (Try: user / password)");
    }
  };

  return (
    <div className="addTask">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button>Login</button>
        {err && <p style={{color:"tomato",marginTop:8}}>{err}</p>}
      </form>
    </div>
  );
};

export default Login;
