import { useState } from "react";
import { loginAdmin } from "../../api/adminApi";
import { setAuthToken } from "../../api/auth";
import "./adminlogin.css";

export default function AdminLogin({
    isOpen,
    onClose,
    onLoginSuccess,
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const result = await loginAdmin({
                username,
                password,
            });

            if (result.status !== "success") {
                throw new Error(result.message || "Login failed");
            }

            const { token, tokenType } = result.data;

            setAuthToken(token, tokenType);
            onLoginSuccess();
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="admin-login-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="admin-login-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-login-title"
            >
                <button
                    type="button"
                    className="admin-login-close"
                    onClick={onClose}
                    aria-label="Close login"
                >
                    &times;
                </button>

                <div className="admin-login-icon">♜</div>

                <h2 id="admin-login-title">Admin Login</h2>

                <p className="admin-login-subtitle">
                    Sign in to manage college content
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="admin-username">Username</label>

                    <input
                        id="admin-username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="admin-password">Password</label>

                    <input
                        id="admin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <p className="admin-login-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-login-submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="admin-login-note">
                    Only authorized administrators can access this area.
                </p>
            </div>
        </div>
    );
}
