import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { DELET_USER_MUTATION } from '../../graphql/mutations/muction_delet_customer_gql'
import {GET_CUSTOMERS_LIST} from '../../graphql/queries/query-gql-docs'

const DeleteCustomerPopup = (props) => {
    
    const [deleteCustomer, { loading: submittingUserProfile }] = useMutation(DELET_USER_MUTATION, {
        context: {
            uri: process.env.REACT_APP_CUSTOMER_URL
        }
    });
    
    const handleDeletCutomer = (e) => {
        deleteCustomer({
          variables: {
            customerId: props.CustomerId
          },
          refetchQueries:[GET_CUSTOMERS_LIST]
          })

          return props.onHide()
        
       }
      
    return (
    <>
     <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        
      <Modal.Body>
        <h4>Delete Message?</h4>
        <Row >
          <div className="button-container d-flex justify-content-between">
            <Button onClick={props.onHide}>Cancel</Button>
            <Button className='btn btn-danger' onClick={() => handleDeletCutomer()}>Delete</Button>
            </div>
        </Row>
       
      </Modal.Body>
    </Modal>
    </>
)
}

export default DeleteCustomerPopup