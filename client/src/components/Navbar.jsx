import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = styled.div`
    height: 50px;
    background-color: #003580;
    display: flex;
    justify-content: center;
`
const NavContainer = styled.div`
    width: 70%;
    max-width: 1024px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.span`
    font-weight: 500;
`
const NavItems = styled.div`

`
const NavButton = styled.button`
    margin-left: 20px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: #003580;
    background: white;
`

export const Navbar = () => {
    const { user } = useContext(AuthContext)

    return (
        <NavBar>
            <NavContainer>
                <Link to="/" style={{ "color": "inherit", textDecoration: "none" }}>
                    <Logo>kusibooking</Logo>
                </Link>
               
                {user ? user.username : (<NavItems>
                    <NavButton>Register</NavButton>
                    <NavButton>Login</NavButton>
                </NavItems>)}

            </NavContainer> 
        </NavBar>
    )
}
