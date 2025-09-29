import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { login } from "../features/authSlice";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 Validation function
  const validate = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Firebase Auth login
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user profile (username, etc.) from Firestore
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
      const userData = userDoc.data();

      if (userData) {
        dispatch(
          login({
            uid: userCred.user.uid,
            email: userCred.user.email,
            username: userData.name || "User",
          })
        );
      }

      console.log("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome <span style={{ color: "#2575fc" }}>Back</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Login to track your expenses
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "grid", gap: 2, mt: 3 }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, borderRadius: 2, py: 1.2 }}
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#2575fc", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/")}
            >
              Sign Up
            </span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
