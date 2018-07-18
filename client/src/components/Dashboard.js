import React from 'react'
import { Query } from 'react-apollo';
import { client } from '../container/app'
import { currentUser } from '../queryData/query'
import { history } from '../container/routes'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import List from '../components/StubList'
import { Link } from 'react-router-dom'
import Calculate from '../components/Calculate'
const WelcomeMessage = styled.h3`
    font-size:5rem;
    color:white;
    font-family: 'Play', sans-serif;
    margin:10rem auto;
`

const Main = styled.div`
    width:100%;
    height:100vh;
    position:relative;
    background-image: linear-gradient(rgba(225, 245, 254, 0.7), rgba(0, 0,0, 0.7)), url("http://getwallpapers.com/wallpaper/full/a/a/4/936323-vertical-full-hd-1080p-desktop-backgrounds-1920x1200-high-resolution.jpg");
    background-repeat: no-repeat;
    background-size: cover;
`


const Menu = styled.div`
position:fixed;
top:0;
right:0;
`

const Logout = styled.span`
    font-size:3rem;
    font-family:'Play', sans-serif;
    padding:2rem 2rem;
`



export default class DashBoard extends React.Component {
    render() {
        return (
            <Query query={currentUser}>
                {({ error, loading, data }) => {
                    if (error) {
                        return (
                            <div>Error</div>
                        )
                    }
                    if (loading) {
                        return (
                            <div>Loading ...</div>
                        )
                    } if (data) {
                        if (data.user !== null) {
                            return (
                                <Main>
                                    <Menu>
                                        <Link style={{ textDecoration: "none" }} to="/user/profile"><Logout style={{ color: "#00e676" }}>PROFILE <i class="fas fa-user-cog"></i></Logout></Link>
                                        <a href="/auth/logout" style={{ textDecoration: "none" }}><Logout style={{ color: "red" }}>LOG OUT <i class="fas fa-sign-out-alt"></i></Logout></a>
                                    </Menu>
                                    <div className="container">
                                        <div className="row" >
                                            <WelcomeMessage>Welcome {data.user.displayName}!</WelcomeMessage>
                                        </div>
                                        <List />
                                        <Calculate />
                                    </div>
                                </Main>
                            )
                        } else {
                            return (
                                <Link to="/" />
                            )
                        }

                    }
                }
                }
            </Query>
        )
    }
}