import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Login0 = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const LInput = styled.input`
    height: 30px;
    padding: 10px;
`
const LButton = styled.button`
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;

    &:disabled{
        background-color: #0071c28c;
        cursor: not-allowed;
    }
`

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate("/")

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post('/auth/login', credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }

    return (
        <Login0>
            <LContainer>
                <LInput type="text" id="username" onChange={handleChange} placeholder="username"></LInput>
                <LInput type="password" id="password" onChange={handleChange} placeholder="password"></LInput>
                <LButton disabled={loading} onClick={handleClick}>Log In</LButton>
                {error && <span>{error.message}</span>}
            </LContainer>
        </Login0>
    )
}
