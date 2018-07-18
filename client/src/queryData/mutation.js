import gql from 'graphql-tag'


export const deleteStub = gql`
    mutation deteleStub($_id:String!){
    deleteStub(_id:$_id){
      _id
    }
  }
`


export const ADD_STUB = gql`
  mutation addStub($name:String,$description:String,$type:String,$price:Float,$shop:String){
      addStub(name:$name,description:$description,type:$type,price:$price,shop:$shop){
        _id
      }
  }
`


export const UPDATE_STUB = gql`
mutation updateStub($_id:String,$name:String,$description:String,$type:String,$price:Float,$shop:String){
  updateStub(name:$name,description:$description,type:$type,price:$price,shop:$shop,_id:$_id){
      _id
      name
      shop
      type
      description
      price
  }
}
`


export const UPDATE_USER = gql`
mutation updateUser($firstName:String,$lastName:String,$displayName:String,$hourlyIncome:Float,$address:String){
    updateUser(firstName:$firstName,lastName:$lastName,displayName:$displayName,hourlyIncome:$hourlyIncome,address:$address){
      _id
      firstName
      lastName
      displayName
      hourlyIncome
      address
    }
}






`