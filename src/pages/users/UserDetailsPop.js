import React,{useState} from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import './UserDetailsPop.css'
import {GET_Ticket_QUERY} from "../../graphql/queries/query-gql-docs"
import { useQuery } from '@apollo/client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDownload, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";




const UserDetailsPop = (props) => {

    const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
    const [fullscreen, setFullscreen] = useState(true);

// console.log(props.CustomerDetails);

const { data } = useQuery(GET_Ticket_QUERY, {
    variables: {
      customerId:props?.CustomerDetails?.customerId
    },
    context: {
      uri:process.env.REACT_APP_PAYMENT_URL
    },
    fetchPolicy: 'network-only'
  })
// console.log(data);
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

 return(
    <>
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size='xl'> 
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{textTransform: 'uppercase'}}>
        CustomerDetails
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
          <Row>
              <Col><h6>First Name</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.firstName}</p></Col>

          </Row>
          <Row>
              <Col><h6>Last Name</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.lastName}</p></Col>

          </Row>

          <Row>
              <Col><h6>User Id</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.customerId}</p></Col>

          </Row>

          <Row>
              <Col><h6>E-Mail</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.email}</p></Col>

          </Row>

          <Row>
              <Col><h6>Phone Number</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.primaryContactNumber}</p></Col>

          </Row>
          <Row>
              <Col><h6>whatsappNumber</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.whatsappNumber ? props?.CustomerDetails?.whatsappNumber : "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>Aadhaar Number</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.aadhaarNumber ? props?.CustomerDetails?.aadhaarNumber : "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>Pan Number</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.panNumber ? props?.CustomerDetails?.panNumber : "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>Passport Number</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.passportNumber ? props?.CustomerDetails?.passportNumber : "Null"}</p></Col>

          </Row>
       



          <Row>
              <Col><h6>Driving Licence No</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.drivingLicenceNumber ? props?.CustomerDetails?.drivingLicenceNumber: "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>Address Line 1</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.address?.addressLine1 ? props?.CustomerDetails?.address?.addressLine1 : "Null"}</p></Col>

          </Row>


          <Row>
              <Col><h6>Address Line 2</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.address?.addressLine2 ? props?.CustomerDetails?.address?.addressLine2 : "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>City</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.address?.city?.cityName ? props?.CustomerDetails?.address?.city?.cityName : "Null"}</p></Col>

          </Row>

          <Row>
              <Col><h6>State</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.address?.state?.stateName ? props?.CustomerDetails?.address?.state?.stateName : "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>Country</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.address?.country?.countryName ? props?.CustomerDetails?.address?.country?.countryName : "Null"}</p></Col>

          </Row>
          <Row>
              <Col><h6>Postal Code</h6></Col>
              <Col>:</Col>
              <Col><p>{props?.CustomerDetails?.address?.postalCode ? props?.CustomerDetails?.address?.postalCode : "Null"}</p></Col>

          </Row>


          <Row>
          <h2>TicketDetails</h2>
         { data?.getTicketList.length ? 
(          <Col>
          <table class="table table-striped table-hover table-borderless align-middle">
      <thead className="history-table-bg">
        <tr>
          <th scope="col">Product Description</th>
          <th scope="col">Ticket Type</th>
          <th scope="col">Status</th>
          <th scope="col">Order Date</th>
          <th scope="col">Order Amount</th>
          {/* <th scope="col">Cancel Ticket</th>
          <th scope="col">Download</th>
          <th scope="col">View Ticket</th> */}
    
    
        </tr>
      </thead>

  {
  
  data?.getTicketList.map(value =>{
    
    return(
    
      <tbody>
      <tr >
        <td>{value?.description}</td>
        <td className="text-nowrap">{ JSON.parse(value?.metadata)?.quantity}</td>

        <td className="text-nowrap"><i class="fas fa-square text-success me-2 "></i>Booked</td>
        {/* <td className="text-nowrap"><i class="fas fa-pound-sign"></i> 600</td> */}
        {/* <td>#2470299049 <br/> 24 Dec 21 3:37 PM</td> */}

        <td>{`${new Date(value?.created).getDate()}/${month[new Date(value?.created).getMonth()]}/${new Date(value?.created).getFullYear()}`} </td>
        <td className="text-nowrap"><i class="fas fa-pound-sign"></i>{value?.amount}</td>
        {/* <td className="text-nowrap"> <button className="btn btn-outline-danger"><FontAwesomeIcon icon={faTimes}/> Cancel Ticket</button></td>
        <td className="text-nowrap"> <button className="btn btn-outline" ><FontAwesomeIcon icon={faDownload}/> Download</button></td>
        <td className="text-nowrap"> <button className="btn btn-outline" onClick={() => handleTicketView(value)} ><FontAwesomeIcon icon={faEye}/> View Ticket</button></td> */}
  
      </tr>
      </tbody>

    )
  })
}
  </table>

          
          </Col>
)  
:
(
<>
<h1>Please Buy The Tickets Now !!!</h1>
</>
)
}

</Row>
      </Modal.Body>
      </Modal>
    </>
)
}

export default UserDetailsPop 