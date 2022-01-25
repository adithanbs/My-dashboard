import React,{useState} from "react";
import { Button, Col, Container, Modal, Row, Toast, ToastContainer } from "react-bootstrap";
import './EditCustomerPopup.css';
import {GET_Ticket_QUERY} from "../../graphql/queries/query-gql-docs";
import {UPDATE_USER_PROFILE_MUTATION} from "../../graphql/mutations/mutation-edit-user-gql";
import {GET_CUSTOMER_QUERY} from "../../graphql/queries/query-gql-docs"
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {GET_CITIES_QUERY} from '../../graphql/queries/query-gql-docs';
import {GET_STATES_QUERY} from '../../graphql/queries/query-gql-docs';
import {GET_COUNTRIES_QUERY} from '../../graphql/queries/query-gql-docs';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";



const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('Please enter your First Name'),
    lastName: yup
        .string(),
    email: yup
        .string(),
    mobileNumber: yup
        .string(),
    whatsappNumber:yup
        .string(),     
    addressLine1: yup
        .string()
        // .required('Please enter your house no./apartment name/street name')
        ,
    addressLine2: yup
        .string()
        // .required('Please enter your locality name/area name')
        ,
    country: yup
        .number()
        .min(1, 'Please enter your country name'),
    state: yup
        .number()
        .min(1, 'Please enter your state/county/region name'),
    city: yup
        .number()
        .min(1, 'Please enter your city name'),
    aadhaarNumber:yup
        .string(),
    panNumber:yup
        .string(),
    passportNumber:yup
        .string(),
    drivingLicenceNumber:yup
        .string(),
    postalCode: yup
        .string()
        
        
});




const EditCustomerPopup = (props) => {

    const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
    const [fullscreen, setFullscreen] = useState(true);
    // console.log(props.CustomerDetails);
    const user = props.EditCustomerDetails;
    // const dispatch = useDispatch();
    // const history = useHistory();
    const [selectedCountry, setSelectedCountry] = React.useState([]);
    const countryRef = React.createRef();
    const [showToast, setShowToast] = React.useState(false);
    const [message,setMessage]= React.useState("")
    const handleCloseToast = () => setShowToast(false);


    const formik = useFormik({
        initialValues: {
            firstName: null,
            lastName: '',
            email: '',
            mobileNumber: '',
            whatsappNumber:'',
            addressLine1: '',
            addressLine2: '',
            country: 0,
            state: 0,
            city: 0,
            aadhaarNumber:'',
            panNumber:'',
            passportNumber:'',
            drivingLicenceNumber:'',
            postalCode: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("value",values);
            updateCustomer({
                variables: {
                    updateData: {
                        customerId: user.customerId || null,
                        firstName: values.firstName || null,
                        lastName: values.lastName || null,
                        email: values.email || null,
                        primaryContactNumber: values.mobileNumber || null,
                        whatsappNumber: values.whatsappNumber || null,

                        address: {
                            addressLine1: values.addressLine1 || null,
                            addressLine2: values.addressLine2 || null,
                            countryId: values.country,
                            stateId: values.state,
                            cityId: values.city,
                            postalCode: values.postalCode
                        },
                        aadhaarNumber:values.aadhaarNumber || null,
                        panNumber:values.panNumber || null,
                        passportNumber:values.passportNumber || null,
                        drivingLicenceNumber:values.drivingLicenceNumber || null,
            
            
                    }
                },
                refetchQueries: [{
                    query: GET_CUSTOMER_QUERY,
                    variables: {
                        customerId: user?.keycloakUserId
                    },
                    context: { uri: process.env.REACT_APP_CUSTOMER_URL },
                    fetchPolicy: 'network-only'
                }]
            })
             .then(() => {
                formik.setSubmitting(false);
                 setMessage("User Updated Done")
                setShowToast(true);
            //     if (data?.updateCustomer) {
                    // dispatch(userLogin(user?.keycloakUserId))
                        // .then(() => {
                        // }).then(() => {
                        //     history.push({
                        //         pathname: '/profile',
                        //         state: { profileUpdated: true }
                        //     });
                        // });
            //     }
             })
        }
    });
    const [updateCustomer, { loading: submittingUserProfile }] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
        context: {
            uri: process.env.REACT_APP_CUSTOMER_URL
        }
    });
    const { loading: fetchingCountries, data: countries } = useQuery(GET_COUNTRIES_QUERY, {
        context: {
            uri: process.env.REACT_APP_LOCATION_URL
        }
    });

    const [getStates, { loading: fetchingStates, data: states }] = useLazyQuery(GET_STATES_QUERY, {
        context: {
            uri: process.env.REACT_APP_LOCATION_URL
        }
    });

    const [getCities, { loading: fetchingCities, data: cities }] = useLazyQuery(GET_CITIES_QUERY, {
        context: {
            uri: process.env.REACT_APP_LOCATION_URL
        }
    });



    const handleMobileNumberChange = (value, data, event, formattedValue) => {
        formik.setFieldValue('countryCode', data.dialCode);
        formik.setFieldValue('mobileNumber', formattedValue);
    };

    const handleWhatsappNumber = (value, data, event, formattedValue) => {
        formik.setFieldValue('countryCode', data.dialCode);
        formik.setFieldValue('whatsappNumber', formattedValue);
    };

    const handleCountryChange = (selected) => {
        if (selected && selected.length) {
            setSelectedCountry(selected);
            formik.setFieldValue('country', selected[0].countryId);

            getStates({
                variables: {
                    countryId: selected[0].countryId
                }
            });

            getCities({
                variables: {
                    citySearchRequest: {
                        countryId: selected[0].countryId,
                        searchString: ""
                    }
                }
            });
        }
    };

    const handleCountryBlur = () => {
        formik.setTouched({ ['country']: true, ...formik.touched });

        if (!selectedCountry.length || countryRef.current.getInput().value !== selectedCountry[0]?.countryName) {
            countryRef.current.clear();
        }
    }

    const handleStateChange = (selected) => {
        formik.setFieldValue('state', selected[0].stateId);
    };

    const handleCityChange = (selected) => {
        formik.setFieldValue('city', selected[0].cityId);
    }
    // const countryToFlag = (isoCode) => {
    //     return typeof String.fromCodePoint !== 'undefined'
    //         ? isoCode
    //             .toUpperCase()
    //             .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    //         : isoCode;
    // }

    React.useEffect(() => {
        formik.setFieldValue('firstName', user?.firstName || '');
        formik.setFieldValue('lastName', user?.lastName || '');
        formik.setFieldValue('email', user?.email || '');
        formik.setFieldValue('mobileNumber', user?.primaryContactNumber || '');
        formik.setFieldValue('whatsappNumber', user?.whatsappNumber || '');
        formik.setFieldValue('addressLine1', user?.address?.addressLine1 || '');
        formik.setFieldValue('addressLine2', user?.address?.addressLine2 || '');
        formik.setFieldValue('country', user?.address?.country?.countryId || 0);
        formik.setFieldValue('state', user?.address?.state?.stateId || 0);
        formik.setFieldValue('city', user?.address?.city?.cityId || 0);
        formik.setFieldValue('postalCode', user?.address?.postalCode || '');
        formik.setFieldValue('aadhaarNumber', user?.aadhaarNumber || '');
        formik.setFieldValue('panNumber', user?.panNumber || '');
        formik.setFieldValue('passportNumber', user?.passportNumber || '');
        formik.setFieldValue('drivingLicenceNumber', user?.drivingLicenceNumber || '');


    }, [user]);

 const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
 return(
    <>
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size='xl'> 
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{textTransform: 'uppercase'}}>
        update Customer Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
      <div className="card-body">
                    <div className = "row justify-content-center">

                        <div className="col-md-8 col-xs-12 col-sm-12">
                    <form className="contact-form " id = "outreachform"  noValidate  onSubmit={formik.handleSubmit} >

                 
                    <Row>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">First Name</label>
                                    <input type="text" className="form-control outreach " name="firstName" id="firstName" placeholder="First Name"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.firstName &&
                                        (<div className="invalid">
                                            {formik.errors.firstName} 
                                         </div>)}

                                </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Last Name</label>
                                    <input type="text" className="form-control outreach" name="lastName" id="lastName" placeholder="Last Name"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.lastName &&
                                        (<div className="invalid">
                                            {formik.errors.lastName}
                                        </div>)}
                                </div>

                        </Col>
                    </Row>
                    <Row>
                           <Col>
                           <div  className="form-group">
                                    <label   for="exampleFormControlInput1">Mobile Number</label>
                                       <PhoneInput
                                            //  className="outreach form-group"
                                            //  className="form-control outreach"
                                               country={'in'}
                                               value={formik.values.mobileNumber}
                                               onChange={handleMobileNumberChange}
                                               onBlur={() => formik.setTouched({ ['mobileNumber']: true, ...formik.touched })}
                                            //    inputClass="phoneinput"
                                            //    dropdownClass="phoneinput"
                                             
                                       />


                                    {formik.touched.mobileNumber &&
                                        (<div className="invalid">
                                            {formik.errors.mobileNumber}
                                        </div>)} 

                                </div>

                           </Col>
                           
                           <Col>
                           <div  className="form-group">
                                    <label   for="exampleFormControlInput1">Whatsapp Number</label>
                                             <PhoneInput
                                             className="outreach form-group"
                                               country={'in'}
                                               value={formik.values.whatsappNumber}
                                               onChange={handleWhatsappNumber}
                                              onBlur={() => formik.setTouched({ ['whatsappNumber']: true, ...formik.touched })}
                                              inputClass="phoneinput"
                                              dropdownClass="phoneinput"
                                             
                                            
                                       />


                                    {formik.touched.whatsappNumber &&
                                        (<div className="invalid">
                                            {formik.errors.whatsappNumber}
                                        </div>)}

                                </div>

                           </Col>

                    </Row>

                    <Row>
                      <Col>
                      <div className="form-group">
                                    <label for="exampleFormControlInput1">Email Address</label>
                                    <input type="email" className="form-control outreach" name="email" id="email" placeholder="name@example.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.email &&
                                        (<div className="invalid">
                                            {formik.errors.email}
                                        </div>)}

                      </div>


                      </Col>

                      <Col>
                      <div className="form-group">
                                    <label for="exampleInputPassword1">Address Line 1</label>
                                    <input type="text" className="form-control outreach" id="addressLine1" name="addressLine1" placeholder="Address Line 1"
                                        value={formik.values.addressLine1}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.addressLine1 &&
                                        (<div className="invalid">
                                            {formik.errors.addressLine1}
                                        </div>)}

                                </div>


                      
                      </Col>

                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Address Line 2</label>
                                    <input type="text" className="form-control outreach" id="addressLine2" name="addressLine2" placeholder="Address Line 2"
                                        value={formik.values.addressLine2}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.addressLine2 &&
                                        (<div className="invalid">
                                            {formik.errors.addressLine2}
                                        </div>)}

                                </div>

                        </Col>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Country</label>
                                    <Typeahead
                                        id="country"
                                        name="country"
                                        ref={countryRef}
                                        labelKey="countryName"
                                       
                                         defaultInputValue={user?.address?.country?.countryName || ''}
                                       
                                       
                                        onChange={handleCountryChange}
                                        onBlur={handleCountryBlur}
                                        options={countries?.getCountries || []}
                                        placeholder="Country"
                                        
                                        />
                                    {formik.touched.country &&
                                        (<div className="invalid">
                                            {formik.errors.country}
                                        </div>)}

                                </div>


                        </Col>



                    </Row>
                    <Row>
                    <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">State</label>
                                    <Typeahead
                                        id="state"
                                        name="state"
                                        labelKey="stateName"
                                         defaultInputValue={user?.address?.state?.stateName || ''}
                                        onChange={handleStateChange}
                                        onBlur={() => formik.setTouched({ ['state']: true, ...formik.touched })}
                                        options={states?.getStatesByCountry || []}
                                        placeholder="State"
                                         />
                                    {formik.touched.state &&
                                        (<div className="invalid">
                                            {formik.errors.state}
                                        </div>)}
                                </div>

                        </Col>

                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">City</label>
                                    <Typeahead
                                        id="city"
                                        name="city"
                                        labelKey="cityName"
                                        defaultInputValue={user?.address?.city?.cityName || ''}
                                        onChange={handleCityChange}
                                        onBlur={() => formik.setTouched({ ['city']: true, ...formik.touched })}
                                        options={cities?.getCitySuggestions || []}
                                        placeholder="City"
                                        
                                        />
                                     {formik.touched.city &&
                                        (<div className="invalid">
                                            {formik.errors.city}
                                        </div>)}
 
                                </div>

                        </Col>



                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Postal Code</label>
                                    <input type="text" className="form-control outreach " name="postalCode" id="postalCode" placeholder="Postal Code"
                                        value={formik.values.postalCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.postalCode &&
                                        (<div className="invalid">
                                            {formik.errors.postalCode} 
                                         </div>)}

                                </div>

                        </Col>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Driving Licence Number</label>
                                    <input type="text" className="form-control outreach" name="drivingLicenceNumber" id="drivingLicenceNumber" placeholder="Driving Licence Number"
                                        value={formik.values.drivingLicenceNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.drivingLicenceNumber &&
                                        (<div className="invalid">
                                            {formik.errors.drivingLicenceNumber}
                                        </div>)}
                                </div>

                        </Col>

                    </Row>

                    <Row>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Aadhaar Number</label>
                                    <input type="text" className="form-control outreach " name="aadhaarNumber" id="aadhaarNumber" placeholder="Aadhaar Number"
                                        value={formik.values.aadhaarNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.aadhaarNumber &&
                                        (<div className="invalid">
                                            {formik.errors.aadhaarNumber} 
                                         </div>)}

                                </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Pan Number</label>
                                    <input type="text" className="form-control outreach" name="panNumber" id="panNumber" placeholder="Pan Numbe"
                                        value={formik.values.panNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.panNumber &&
                                        (<div className="invalid">
                                            {formik.errors.panNumber}
                                        </div>)}
                                </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group">
                                    <label for="exampleInputPassword1">Passport Number</label>
                                    <input type="text" className="form-control outreach " name="passportNumber" id="passportNumber" placeholder="Passport Number"
                                        value={formik.values.passportNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.passportNumber &&
                                        (<div className="invalid">
                                            {formik.errors.passportNumber}
                                        </div>)}

                                </div>
                        </Col>
                        <Col></Col>
                    </Row>

                    <div className="button-container d-flex justify-content-between">
                            {/* <button type="button" className="btn btn-red-header shadow my-2 d-block" disabled={formik.isSubmitting}
                              >
                                Back
                            </button> */}
                            <button type="submit" className="btn btn-success shadow my-2 d-block" disabled={formik.isSubmitting}>
                                {formik.isSubmitting && (<span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>)}
                                Submit
                            </button>
                            <button  className="btn btn-danger shadow my-2 d-block " onClick={() =>props.onHide()}> Cancel </button>
                        </div>


                    </form>
                    </div>
                    </div>
            </div>
            <ToastContainer position="top-center">
                                    <Toast show={showToast} onClose={handleCloseToast} autohide>
                                        <Toast.Body>{message}</Toast.Body>
                                    </Toast>
             </ToastContainer>
      </Modal.Body>
      </Modal>
    </>
)
}

export default EditCustomerPopup