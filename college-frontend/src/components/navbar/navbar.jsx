import { useState } from "react";
import "./navbar.css";
import collegeLogo from "../../assets/logo.png";
import AdminLogin from "../adminlogin/adminlogin";
import AdminDashboard from "../admindashboard/admindashboard";
import { clearAuthToken, getAuthToken } from "../../api/auth";

export default function Navbar() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        () => Boolean(getAuthToken())
    );

    function handleLoginSuccess() {
        setIsLoggedIn(true);
        setLoginOpen(false);
    }

    function handleLogout() {
        clearAuthToken();
        setIsLoggedIn(false);
        setDashboardOpen(false);
    }

    // Show the full-screen admin dashboard.
    if (dashboardOpen && isLoggedIn) {
        return (
            <AdminDashboard onLogout={handleLogout} onClose={() => setDashboardOpen(false)} />
        );
    }

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-brand">
                    <img
                        id="college-logo"
                        src={collegeLogo}
                        alt="NSS College logo"
                    />

                    <div className="college-info">
                        <h1 id="college-name">NSS COLLEGE</h1>

                        <h4 id="college-slogan">
                            KNOWLEDGE · COMMUNITY · EXCELLENCE
                        </h4>

                        <p id="college-location">
                            RAJAKUMARI · EST · 1995
                        </p>
                    </div>
                </div>

                <nav className="navbar-contents">
                    <a href="/">Home</a>
                    <a href="#about">About</a>
                    <a href="#departments">Departments</a>
                    <a href="/notices">Notices</a>
                    <a href="#gallery">Gallery</a>
                </nav>

                {isLoggedIn ? (
                    <div className="navbar-admin-actions">
                        <button
                            type="button"
                            className="navbar-login-button"
                            onClick={() => setDashboardOpen(true)}
                        >
                            Admin Panel
                        </button>

                        <button
                            type="button"
                            className="navbar-login-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="navbar-login-button"
                        onClick={() => setLoginOpen(true)}
                    >
                        Login
                    </button>
                )}
            </div>

            <AdminLogin
                isOpen={loginOpen}
                onClose={() => setLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}
