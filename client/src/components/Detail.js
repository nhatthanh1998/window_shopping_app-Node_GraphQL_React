import React, { Component } from 'react'
import { ADD_STUB } from '../queryData/mutation'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { client } from '../container/app'
import { Mutation, Query } from "react-apollo"
import { currentUser, StubList, DETAIL } from '../queryData/query'
import { history } from '../container/routes'
import { AddNewHeader as DetailHeader, BackButton } from './AddNew'


export const Section = styled.section`
    width:100%;
    height:100vh;
    position:relative;
    background-image: linear-gradient(rgba(225, 245, 254, 0.7), rgba(0, 0,0, 0.7)), url("http://getwallpapers.com/wallpaper/full/a/a/4/936323-vertical-full-hd-1080p-desktop-backgrounds-1920x1200-high-resolution.jpg");
    background-repeat: no-repeat;
    background-size: cover;
`



export default class Detail extends React.Component {
    componentWillMount() {
        client.query({
            query: currentUser
        }).then(response => {
            if (response.data) {
                if (response.data.user === null) {
                    return history.push('/')
                }
            }
        })
    }

    
    render() {
        return (
            <Query query={DETAIL} variables={{
                _id: this.props.match.params.id
            }}
            >
                {
                    ({ error, loading, data }) => {
                        if (error) {
                            return <div>Error</div>
                        } if (loading) {
                            return <div>Loading</div>
                        } if (data) {
                            const stub = data.stub
                            return (
                                <Section>

                                    <DetailHeader>
                                        {stub.name} <i class="fas fa-archive"></i>
                                    </DetailHeader>

                                    <div className="container">
                                        <div className="row" style={{ marginTop: "20rem" }}>
                                            <table class="table table-striped" style={{ fontSize: "3rem", color: "white", fontFamily: "'Play', sans-serif" }}>
                                                <thead>
                                                    <tr>
                                                        <td scope="col">Name</td>
                                                        <td>{stub.name}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td scope="row">Type</td>
                                                        <td>{stub.type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">Shop</td>
                                                        <td>{stub.shop}</td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">Price</td>
                                                        <td>{stub.price}</td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">Description</td>
                                                        <td>{stub.description}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <Link to="/dashboard"><BackButton style={{ color: "white" }}><i class="fas fa-arrow-left"></i> GO BACK</BackButton></Link>
                                </Section>


                            )
                        }

                    }
                }
            </Query>


        )
    }
}