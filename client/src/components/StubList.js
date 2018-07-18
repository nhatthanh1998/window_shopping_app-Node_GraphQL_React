import React from 'react'
import { StubList,GET_USER } from '../queryData/query'
import { Query } from 'react-apollo'
import { deleteStub } from "../queryData/mutation";
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom'
const ListHeader = styled.h3`
    text-align:center;
    margin-top:3rem;
    font-family:'Play', sans-serif;
    font-size:5rem;
    color:white;
    margin-bottom:3rem;
`


const AddButton = styled.a`
margin:0 auto;
font-family:'Play', sans-serif;
font-size:2.5rem;
margin-bottom:3rem;



`


export default class List extends React.Component {
    handleData = (data) => {
        return data.stubList.map(stub => {
            return (
                <tr style={{ textAlign: "center" }}>
                    <th>{stub.name}</th>
                    <td>{stub.type}</td>
                    <td>$ {stub.price}</td>
                    <td><Link to={`/stub/${stub._id}`} style={{ color: "white" }}><i class="fas fa-box"></i></Link></td>
                    <td><Link to={`/update/stub/${stub._id}`}><i style={{ color: "#64ffda" }} class="fas fa-pencil-ruler"></i></Link></td>
                    <td><Mutation mutation={deleteStub} update={(cache, value) => {
                        const data = cache.readQuery({ query: StubList })
                        const list = data.stubList.filter(stub => stub._id !== value.data.deleteStub._id)
                        data.stubList = list
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
                    }}
                    >
                        {deleteStub =>
                            <a href=""><span style={{ color: "#c62828" }} onClick={(e) => {
                                e.preventDefault()
                                deleteStub({
                                    variables: {
                                        _id: stub._id
                                    }
                                })
                            }}><i class="fas fa-trash-alt"></i></span></a>}
                    </Mutation>
                    </td>

                </tr>
            )
        })
    }




    render() {
        return (
            <Query query={StubList}>
                {
                    ({ error, loading, data }) => {
                        if (error) {
                            return (
                                <div>
                                    error
                                </div>
                            )
                        } if (loading) {
                            return (
                                <div>
                                    loading
                                </div>
                            )
                        } if (data) {
                            return (
                                <div>
                                    <ListHeader>Here is your wish list  <i class="fas fa-chess-knight"></i></ListHeader>
                                    <table className="table" style={{ fontFamily: "'Play', sans-serif", fontSize: "2rem", color: "white" }}>
                                        <thead className="thead-dark">
                                            <tr style={{ textAlign: "center" }}>
                                                <th scope="col">Name</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Detail</th>
                                                <th scope="col">Update</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.handleData(data)}
                                            <td style={{ textAlign: "center", background: "#43a047", fontSize: "3rem" }}><Link to="/addnew" style={{ color: "white", textDecoration: "none" }}>ADD NEW <i class="fas fa-plus"></i></Link></td>
                                        </tbody>

                                    </table>


                                </div>
                            )
                        }
                    }
                }
            </Query>
        )
    }
}