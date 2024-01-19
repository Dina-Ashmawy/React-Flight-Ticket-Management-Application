import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
    const accessToken = localStorage.getItem("access_token") ?? null;
    const [loggedInUser, setLoggedInUser] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('access_token', '');
        setLoggedInUser(false)
        navigate('/login');
    };

    useEffect(() => {
        if (!accessToken) {
            setLoggedInUser(false)
        } else {
            setLoggedInUser(true)

        }
    }, [accessToken, loggedInUser]);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Flight tickets App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" >
                        {loggedInUser &&
                            <>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/flight/addFlight">Add Flight</Nav.Link>
                            </>
                        }
                    </Nav>
                    {loggedInUser ?
                        <Button variant="link" className="nav-link" onClick={handleLogout}>
                            Logout
                        </Button>
                        :
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
