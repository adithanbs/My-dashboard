import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {GET_CUSTOMERS_LIST} from '../../graphql/queries/query-gql-docs'
import { DELET_USER_MUTATION } from '../../graphql/mutations/muction_delet_customer_gql'
import UserDetailsPop from './UserDetailsPop';
import DeleteCustomerPopup from './DeleteCustomerPopup';
import EditCustomerPopup from './EditCustomerPopup';
import { Col, Pagination, Row } from 'react-bootstrap';

function Users() {

const [customerDetails,setViewCustomerDetail] = useState()
const [modalShow, setModalShow] = useState(false);
const [deletecustomermodal,setDeleteCustomerModalShow] = useState(false);
const [editusermodel,setEditUserModel] = useState(false);
const [editcustomer,setEditcustome] = useState();


const [customerid,setCustomerId] = useState()

    const { data } = useQuery(GET_CUSTOMERS_LIST, {
        variables: {
          pageRequest:{
            pageNo: 1,
            noOfRecords: 20,
            emailPattern :""
          }
        },
        context: {
          uri:'https://api.shifteasy.com/customer'
        },
        fetchPolicy: 'network-only'
      })


console.log(data);

  //  console.log(data?.getCustomersByPage?.recordsCount);
  //  const totalUserDatas = data?.getCustomersByPage?.recordsCount
  //  const pages = Math.ceil(totalUserDatas/20)
  //  console.log(pages);

  // console.log(customerDetails);
   
// const handleSelectPage = (page) =>{
// console.log(page);
// }

//    const getPageButton = () =>{
//     let pagesArr = []
//     let page = 1
// while( page < 5 && page < pages ){
// pagesArr.push(<Pagination.Item >{page}</Pagination.Item>)
// }
// return pagesArr;
//    }

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
   
   const  handleViewCustomerDetail = (value) =>{
     console.log(value)
    setModalShow(true);
    setViewCustomerDetail(value);

   }

   const handleDeletePop = (e) => {
    //  console.log(e);
    setCustomerId(e)
    setDeleteCustomerModalShow(true)
    
   }

const handleClickEditUser = (e) => {
  setEditUserModel(true)
  setEditcustome(e)
}   

    return (
        <>
<div className="ticket-history ">
         
         <div className="subheader-box ticket-edit">
      <h3 className="text-center ">USERS</h3>
    </div>
    <div className=" h-cutom">
    <div className="container">
    <div className="history-content mt-3 mb-3">
        <div className="table-responsive">
        <table class="table table-striped table-hover table-borderless align-middle">
    <thead className="history-table-bg">
      <tr>
        <th scope="col">S.No</th>
        <th scope="col">Name</th>
        <th scope="col">Customer Id</th>
        <th scope="col">E-Mail</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Created Date</th>
        <th scope="col">Country</th>
        <th scope="col">Delete User</th>
        <th scope="col">Edit User</th>
        <th scope="col">View User</th>

  
  
      </tr>
    </thead>
 
 
    {
        data?.getCustomersByPage?.pageData.map((value,index) =>{
  
            return(
                <tbody>
<tr key = {value?.email} >

       <td>{index+1}</td>
      <td>{value?.firstName}</td>
      <td>{value?.customerId}</td>
      <td>{value?.email}</td>
      <td>{value?.primaryContactNumber}</td>
      <td>{`${new Date(value?.createdAt).getDate()}/${month[new Date(value?.createdAt).getMonth()]}/${new Date(value?.createdAt).getFullYear()}`} </td>
      <td>{value?.address?.country?.countryName?value?.address?.country?.countryName:"Not Update"}</td>
      <td><button className='btn btn-danger' onClick={() => handleDeletePop(value?.customerId) }>Delete</button></td> 
      <td><button className='btn btn-primary' onClick={() => handleClickEditUser(value)}>Edit</button></td>
      <td><button className='btn btn-primary' onClick={() => handleViewCustomerDetail(value)}>view</button></td>
</tr>
                </tbody>
            )

        } )                                     
    }

</table>

        </div>

    </div>
    </div>
    </div>
    <Row>
      <Col>
    <Pagination>
  <Pagination.First />
  <Pagination.Prev />
  {/* {
    getPageButton()
  }  */}
  {/* <Pagination.Item active>{1}</Pagination.Item> */}
  {

  }

  {/* <Pagination.Ellipsis /> */}

  {/* <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item >{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item> */}

  {/* <Pagination.Ellipsis /> */}
  {/* <Pagination.Item>{20}</Pagination.Item> */}
  <Pagination.Next />
  <Pagination.Last />
</Pagination>
</Col>
</Row>
  
    </div>
    <UserDetailsPop show={modalShow} onHide={() => setModalShow(false)} CustomerDetails = {customerDetails}  />
    <DeleteCustomerPopup   show={deletecustomermodal} onHide={() => setDeleteCustomerModalShow(false)} CustomerId  = {customerid} />
    <EditCustomerPopup   show={editusermodel} onHide={() => setEditUserModel(false)} EditCustomerDetails = {editcustomer} />

        </>         
    )
}

export default  Users
