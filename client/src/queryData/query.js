import gql from 'graphql-tag'



export const currentUser = gql`
query currentUser{
    user{
      displayName
    }
  }
`


export const StubList = gql`
query StubList{
  stubList {
	  _id
	  name
	  type
	  price
	}
}
`

export const DETAIL = gql`
query Detail($_id:String){
  stub(_id:$_id){
    name
    description
    shop
    price
    type
    _id
  }
}
`
export const GET_USER = gql`
query{
  user{
    hourlyIncome
    _id
    firstName
    lastName
    displayName
    address
    stubs{
      price
    }
  }
}
`