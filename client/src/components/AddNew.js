import React, { Component } from 'react'
import { ADD_STUB } from '../queryData/mutation'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { client } from '../container/app'
import { Mutation } from "react-apollo"
import { currentUser, StubList, GET_USER } from '../queryData/query'
import { history } from '../container/routes'

export const AddNewHeader = styled.h3`
    text-align:center;
    padding-top:5rem;
    font-family:'Play', sans-serif;
    font-size:5rem;
    color:white;
    margin-bottom:3rem;
`
export const Form = styled.form`
display:inline-block;
position:absolute;
top:40%;
left:50%;
transform: translate(-50%,-50%);
`
export const Input = styled.input`
font-family:'Play', sans-serif;
font-size:2rem;
margin-top:3rem;
width:100%;
border-radius:5px;
`
export const TextArea = styled.textarea`
font-family:'Play', sans-serif;
font-size:2rem;
margin-top:3rem;
width:100%;
border-radius:5px;
height:15rem;
`
export const Submit = styled.input`
background-color: #63d471;
background-image: linear-gradient(315deg, #63d471 0%, #233329 74%);
border-radius:5px;
font-family:'Play', sans-serif;
height:5rem;
color:white;
font-size:3rem;
width:100%;
margin-top:5rem;
`
export const Helper = styled.span`
    color:red;
    font-size:2rem;
    font-family:'Play', sans-serif;
`
export const Section = styled.section`
    width:100%;
    height:100vh;
    position:relative;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("./img/background.png");
    background-repeat: no-repeat;
    background-size: cover;
`
export const BackButton = styled.h3`
position: fixed;
   left: 0;
   bottom: 0;
font-size:3rem;
font-family:'Play', sans-serif;
padding:2rem 2rem;

`
export default class AddNew extends React.Component {
    error = true
    style = null
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
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            price: 0,
            shop: "",
            type: "",
            nameError: "",
            priceError: "",
            typeError: "",
            shopError: "",
            descriptionError: "",
        }
    }

    render() {
        if (this.state.nameError === null && this.state.descriptionError === null && this.state.typeError === null && this.state.priceError === null && this.state.shopError === null) {
            this.error = false
            this.style = {
                background: "green"
            }
        } else {
            this.error = true
            this.style = {
                background: "red"
            }
        }
        return (
            <Mutation mutation={ADD_STUB}
                update={
                    (cache, response) => {
                        const data = cache.readQuery({ query: StubList })
                        data.stubList.push(response.data.addStub)
                        cache.writeQuery({
                            query: StubList,
                            data
                        })

                        const getUser = cache.readQuery({
                            query: GET_USER
                        })
                        getUser.user.stubs = data.stubList

                        cache.writeQuery({
                            query: GET_USER,
                            data: getUser
                        })
                    }
                }
            >{
                    newStub => (
                        <div>
                            <Section>
                                <Form onSubmit={(e) => {
                                    e.preventDefault()
                                    newStub({
                                        variables: {
                                            name: this.state.name,
                                            description: this.state.description,
                                            shop: this.state.shop,
                                            price: this.state.price,
                                            type: this.state.type
                                        }
                                    }).then(stub => {
                                        history.push('/dashboard')
                                    })
                                }}>
                                    <AddNewHeader>Add new wish item <i class="fas fa-parachute-box"></i></AddNewHeader>
                                    <Input id="name" placeholder="     Name" onChange={(e => {
                                        this.setState({
                                            name: e.target.value
                                        })
                                    })} onBlur={() => {
                                        if (this.state.name.length === 0) {
                                            this.setState({
                                                nameError: "Name must not be empty!"
                                            })
                                        } else {
                                            this.setState({
                                                nameError: null
                                            })
                                        }
                                    }} />
                                    <Helper>{this.state.nameError}</Helper>
                                    <Input placeholder="     Type" onChange={e => {
                                        this.setState({
                                            type: e.target.value
                                        })
                                    }} onBlur={() => {
                                        if (this.state.type.length === 0) {
                                            this.setState({
                                                typeError: "Type must not be empty!"
                                            })
                                        } else {
                                            this.setState({
                                                typeError: null
                                            })
                                        }
                                    }} />
                                    <Helper>{this.state.typeError}</Helper>
                                    <Input placeholder="     Shop" onChange={e => {
                                        this.setState({
                                            shop: e.target.value
                                        })
                                    }} onBlur={() => {
                                        if (this.state.shop.length === 0) {
                                            this.setState({
                                                shopError: "Shop name must not be empty!"
                                            })
                                        } else {
                                            this.setState({
                                                shopError: null
                                            })
                                        }
                                    }} />
                                    <Helper>{this.state.shopError}</Helper>
                                    <Input placeholder="     Price" type="number" step="0.01" min="0" onChange={e => {
                                        this.setState({
                                            price: e.target.value
                                        })
                                    }} onBlur={() => {
                                        if (this.state.price <= 0) {
                                            this.setState({
                                                priceError: "Price must be greater than 0"
                                            })
                                        }
                                        else {
                                            this.setState({
                                                priceError: null
                                            })
                                        }
                                    }} />
                                    <Helper>{this.state.priceError}</Helper>
                                    <TextArea placeholder="     Description" row="5" onChange={e => {
                                        this.setState({
                                            description: e.target.value
                                        })
                                    }} onBlur={() => {
                                        if (this.state.description.length === 0) {
                                            this.setState({
                                                descriptionError: "Description must not be empty!"
                                            })
                                        } else {
                                            this.setState({
                                                descriptionError: null
                                            })
                                        }
                                    }} />
                                    <Helper>{this.state.descriptionError}</Helper>

                                    <Submit type="submit" value="ADD NOW!" disabled={this.error} style={this.style} />
                                </Form>
                                <Link to="/dashboard"><BackButton style={{ color: "white" }}><i class="fas fa-arrow-left"></i> GO BACK</BackButton></Link>
                            </Section>
                        </div>
                    )
                }

            </Mutation>

        )
    }
}