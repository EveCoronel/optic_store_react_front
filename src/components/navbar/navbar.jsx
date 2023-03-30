import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "../components.css";

export default function Navbar() {
    const authContext = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setIsAuthenticated(authContext.isAuthenticated())
    });


    return (
        <header>
            <nav className="navbar">
                <section className="sections_Nav">
                    <img src="/logo.png" width="112" height="28" />
                    <Link to={"/"}>
                        <a className="navbar-item">
                            Home
                        </a>
                    </Link>
                    <Link to={"/chat"}>
                        <a className="navbar-item">
                            Chat
                        </a>
                    </Link>
                    <Link to={"/cart"}>
                        <a className="navbar-item">
                            Cart
                        </a>
                    </Link>
                </section>
                {isAuthenticated && <section className="sections_Nav">
                    <Link to={"/"}>
                        <button className="button logout-button" onClick={() => authContext.logout()}>
                            Log out
                        </button>
                    </Link>
                </section>}
            </nav>

        </header>
    );
}
