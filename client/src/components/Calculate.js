import React from 'react'
import { GET_USER } from '../queryData/query'
import { Query } from 'react-apollo'
import { client } from '../container/app'
import styled from 'styled-components'
import _ from 'lodash'
const Cal = styled.h3`
margin-top:10rem;
font-family: 'Play', sans-serif;
font-size:4rem;
color:white;
text-align:center;


`

export default class Calculate extends React.Component {
    render() {
        return (
            <Query query={GET_USER}>
                {
                    ({error,loading,data})=>{
                        if(error){
                            return <div>error</div>
                        }if(loading){
                            return <div>....</div>
                        }if(data){
                            
                            const user = data.user
                            var stubPrice = 0

                            user.stubs.map(stub=>{
                                stubPrice+= stub.price
                            })
                            var hour = _.round(stubPrice / user.hourlyIncome)
                            var value = _.round(((stubPrice/user.hourlyIncome) - hour),2)
                            var min = _.round(value*60)
                            console.log(hour)
                            console.log(min)
                            return (<div><Cal><i class="fab fa-fort-awesome"></i> Hourly income: ${user.hourlyIncome}<br/><br/><i class="fas fa-shopping-bag"></i> : $ {stubPrice}<br/><br/><i class="far fa-clock"></i>:{hour}:{min}                          </Cal></div>)
                        }
                    }
                }
            </Query>
        )

    }
} 