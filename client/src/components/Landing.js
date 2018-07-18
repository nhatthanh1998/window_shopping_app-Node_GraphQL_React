import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
const Section = styled.section`
    width:100%;
    min-height:100vh;
    position:relative;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("./img/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    
`

const TextBox = styled.div`
position:absolute;
top:50%;
left:50%;
transform: translate(-50%,-50%);
text-align:center;
`


const AppTitle = styled.h3`
    font-size:7rem;
    font-family: 'Play', sans-serif;
    font-weight: bold;
    letter-spacing: 1.3rem;
    
    background-color: #c7e9fb;
    background-image: linear-gradient(315deg, #c7e9fb 0%, #e61d8c 74%);
    -webkit-background-clip: text;
    color:transparent;

    margin-bottom:5rem;
`

const LoginButtonGoogle = styled.a`
    padding:1rem 4rem;
    font-size:3rem;
    text-decoration:none;
    border-radius:1.5rem;
    display:block;
    font-family: 'Play', sans-serif;
    margin:0 auto;
    mragin-top:5rem;
    &:hover:{
        text-decoration:none;
    }
    background-color: #f9484a;
    background-image: linear-gradient(315deg, #f9484a 0%, #fbd72b 74%);
`
const LoginButtonFacebook = styled.a`
    padding:1rem 4rem;
    font-size:3rem;
    text-decoration:none;
    border-radius:1.5rem;
    display:block;
    font-family: 'Play', sans-serif;
    margin:0 auto;
    mragin-top:5rem;
    &:hover:{
        text-decoration:none;
    }
    background-color: #0abcf9;
background-image: linear-gradient(315deg, #0abcf9 0%, #2c69d1 74%);
`


export default class Landing extends React.Component {
    render() {
        return (
            <Section>
                <TextBox>
                    <AppTitle><span style={{ color: "white" }}>DREAMCART.IO</span><br /><span style={{ fontSize: "2rem" }}>Let us share your dream</span></AppTitle>
                    <LoginButtonGoogle href="/auth/google" style={{ color: "white",textDecoration:"none" }}>Login with Google<i style={{ marginLeft: "1.5rem" }} className="fab fa-google-plus-g"></i></LoginButtonGoogle>
                    <div style={{ marginTop: "2rem", marginBottom: "2rem", fontSize: "3rem", color: "white" }}>OR</div>
                    <LoginButtonFacebook href="/auth/facebook" style={{ color: "white",textDecoration:"none" }}>Login with Facebook <i style={{ marginLeft: "1.5rem" }} className="fab fa-facebook-f"></i></LoginButtonFacebook>
                </TextBox>
            </Section>
        )
    }
}