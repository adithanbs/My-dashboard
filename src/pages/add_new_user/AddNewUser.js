import React from 'react';
import './AddNewUser.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../graphql/mutations/mutation-gql-docs';
import { GET_COUNTRIES_QUERY } from '../../graphql/queries/query-gql-docs';
import { useQuery} from '@apollo/client';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';
import { Button } from 'react-bootstrap';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'


const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('Please enter your first name'),
    lastName: yup
        .string()
        .required('Please enter your last name'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Please enter your email'),
    mobileNumber: yup
        .string()
        .required('Please enter your phone number'),
    eventName: yup
        .string()
        .required('Please select Event Name'),

    attendeeRole: yup
        .string()
        .required('Please select options'),
    businessDetails: yup
        .string()
        .required('Please enter your Business / professionDetail'),
    businessAddress: yup
        .string()
        .required('Please enter your Business Address'),
    businessCity: yup
        .string()
        .required('Please enter your Business City'),

    businessCountry: yup
        .string()
        .required('Please enter your Business Country'),
    expectations: yup
        .string()
        .required('Please enter your Message'),



})

const AddNewUser = () => {
   
   
    const [register, { loading: regiserLoading }] = useMutation(REGISTER_MUTATION);
    const [notification, setNotification] = React.useState(false);
    const [ errnotification , setErrNotification] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState([]);
    const countryRef = React.createRef();

    const [showToast, setShowToast] = React.useState(false);
    const [message, setMessage] = React.useState('');
   
    const handleShowToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            eventName: '',
            attendeeRole: '',
            businessDetails: '',
            businessAddress: '',
            businessCity: '',
            businessCountry: '',
            expectations: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm, setFieldValue }) => {
            console.log(formik.errors);
            register({
                variables: {
                    user: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        mobileNumber: values.mobileNumber,
                        email: values.email,
                        eventName: values.eventName,
                        attendeeRole: values.attendeeRole,
                        businessDetails: values.businessDetails,
                        businessAddress: values.businessAddress,
                        businessCity: values.businessCity,
                        businessCountry: values.businessCountry,
                        expectations: values.expectations,
                        originSite: 'https://summit.indoglobalb2b.com'
                    }
                },
                context: {
                    uri: process.env.REACT_APP_AUTH_URL
                },
            }).then(({data}) => {
                // setNotification(true)
                if (data.createEventUser) {
                    setNotification(true)
                    setMessage('User created successfully');
                    handleShowToast();
                }

            }) .catch(err => {
                setErrNotification(true)
                // console.log(err.message);
                setMessage(err.message);
                handleShowToast();
            });
            resetForm();
            setFieldValue('businessCountry', '')
        }
    });
    const handleMobileNumberChange = (value, data, event, formattedValue) => {
        formik.setFieldValue('countryCode', data.dialCode);
        formik.setFieldValue('mobileNumber', formattedValue);
    };
    const handleCountryBlur = () => {
        formik.setTouched({ ['businessCountry']: true, ...formik.touched });

        if (!selectedCountry.length || countryRef.current.getInput().value !== selectedCountry[0]?.countryName) {
            countryRef.current.clear();
        }
    }

    const handleCountryChange = (selected) => {
        if (selected && selected.length) {
            setSelectedCountry(selected);
            formik.setFieldValue('businessCountry', selected[0].countryName);

            // getStates({
            //     variables: {
            //         countryId: selected[0].countryId
            //     }
            // });

            // getCities({
            //     variables: {
            //         citySearchRequest: {
            //             countryId: selected[0].countryId,
            //             searchString: ""
            //         }
            //     }
            // });
        }
    };

    const { loading: fetchingCountries, data: countries } = useQuery(GET_COUNTRIES_QUERY, {
        context: {
            uri: process.env.REACT_APP_LOCATION_URL
        }
    });
 
    return(
        <>
<div className="register_con mb-4">
                <div className="container">
                <div className="card buy-tkt-cards shadow border-0">


    <div className="card-body">
                    <div className = "row justify-content-center">

                        <div className="col-md-8 col-xs-12 col-sm-12">
                    <form className="contact-form " id = "outreachform" onSubmit={formik.handleSubmit} noValidate  >

                        <div className="row ">
                            <div className="col-md-6">
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

                            </div>
                            <div className="col-md-6">
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

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">

                                <div  className="form-group">
                                    <label   for="exampleFormControlInput1">Mobile Number</label>
                                             <PhoneInput
                                             className="outreach form-group"
                                               country={'in'}
                                               value={formik.values.mobileNumber}
                                               onChange={handleMobileNumberChange}
                                              onBlur={() => formik.setTouched({ ['mobileNumber']: true, ...formik.touched })}
                                              inputClass="phoneinput"
                                              dropdownClass="phoneinput"
                                       />


                                    {formik.touched.mobileNumber &&
                                        (<div className="invalid">
                                            {formik.errors.mobileNumber}
                                        </div>)}

                                </div>

                            </div>

                            <div className="col-md-6">
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

                            </div>


                        </div>
                        <div className="row">

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Business / Profession Details:</label>
                                    <input type="text" className="form-control outreach" id="businessDetails" name="businessDetails" placeholder="Business / Profession Details"
                                        value={formik.values.businessDetails}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.businessDetails &&
                                        (<div className="invalid">
                                            {formik.errors.businessDetails}
                                        </div>)}

                                </div>


                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Business Address:</label>
                                    <input type="text" className="form-control outreach" id="businessAddress" name="businessAddress" placeholder="Business Address"
                                        value={formik.values.businessAddress}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.businessAddress &&
                                        (<div className="invalid">
                                            {formik.errors.businessAddress}
                                        </div>)}

                                </div>


                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="businessCity">Business City</label>
                                    <input type="text" className="form-control outreach" id="businessCity" name="businessCity" placeholder="Business City"
                                        value={formik.values.businessCity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.businessCity &&
                                        (<div className="invalid">
                                            {formik.errors.businessCity}
                                        </div>)}

                                </div> 

                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Business Country</label>
                                    <Typeahead

                                        id="businessCountry"
                                        name="businessCountry"
                                        ref={countryRef}
                                        labelKey="countryName"
                                        onChange={handleCountryChange}
                                        onBlur={handleCountryBlur}
                                        options={countries?.getCountries || []}
                                        placeholder="Country"
                                        value={formik.values.businessCountry}


                                    />
                                    {formik.touched.businessCountry &&
                                        (<div className="invalid">
                                            {formik.errors.businessCountry}
                                        </div>)}

                                </div>


                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">I attend this Summit as :</label>

                                    <select className="form-select form-select-md  outreach" aria-label=".form-select-sm example"
                                        id="attendeeRole" name="attendeeRole"
                                        value={formik.values.attendeeRole}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    >
                                        <option value="">Please Select</option>
                                        <option value="BUSINESS_PERSON">Business Person</option>
                                        <option value="ENTREPRENEUR">Entrepreneur</option>
                                        <option value="PROFESSIONAL">Professional</option>
                                        <option value="TAMIL_ENTHUSIAST">Tamil Enthusiast</option>
                                    </select>

                                    {formik.touched.attendeeRole &&
                                        (<div className="invalid">
                                            {formik.errors.attendeeRole}
                                        </div>)}

                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Event Name</label>
                                    <select className="form-select form-select-md outreach " aria-label=".form-select-sm example"
                                        id="eventName" name="eventName"
                                        value={formik.values.eventName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    >
                                        <option selected>Please Select Event</option>
                                        <option value="26 Feb IGBS Summit 2022">1. 26 Feb IGBS Summit 2022</option>
                                        <option value="5-7 May The RISE GSTEP/TEPEC Summit">2. 5-7 May The RISE GSTEP/TEPEC Summit</option>
                                    </select>
                                    {formik.touched.eventName &&
                                        (<div className="invalid">
                                            {formik.errors.eventName}
                                        </div>)}

                                </div>

                            </div>

                        </div>


                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Your Expectations from the Summit:</label>
                            <textarea className="form-control outreach" id="expectations" name="expectations" rows="8"
                                value={formik.values.expectations}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            ></textarea>
                            {formik.touched.expectations &&
                                (<div className="invalid">
                                    {formik.errors.expectations}
                                </div>)}

                        </div>
                        <ToastContainer position="bottom-center">
                                    <Toast show={showToast} onClose={handleCloseToast} autohide>
                                        <Toast.Body>{message}</Toast.Body>
                                    </Toast>
                                </ToastContainer>

                        <button className="btn btn-primary  text-nowrap mt-3" type="submit">Register</button>
                    </form>
                    </div>

</div>
                </div>
                </div>
                </div>
            </div>

        </>
    )

}

export default AddNewUser