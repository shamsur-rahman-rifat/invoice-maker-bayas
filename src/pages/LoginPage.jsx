import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Tiny delay for UX feel
    await new Promise((r) => setTimeout(r, 400));

    if (!login(username, password)) {
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card className="shadow-sm" style={{ width: "380px" }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h4 className="fw-bold text-dark">BAYAS</h4>
            <p className="text-muted small">Sign in to generate invoices</p>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
