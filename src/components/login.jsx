
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    try {
      setError("");
      setLoading(true);

      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h2>Welcome to BorrowBox</h2>
      <p>
        Sign in to borrow and lend items on your campus.
      </p>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? "Please wait..." : "Continue with Google"}
      </button>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default Login;
