import React from 'react';
import swal from 'sweetalert';
import { signup } from '../../service/auth';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            birthday:'',
            phonenumber: '',
            city: '',
            province: '',
            country: '',
            postal: ''
        }



        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDate = this.handleDate.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDate(date) {
        this.setState({birthday: date})
    }

    handleSubmit(event) {
        const { email, password, firstname, lastname, birthday, phonenumber, city, province,
            country, postal } = this.state;
        console.log("here is birthday", { birthday });
        console.log(email, password, firstname, lastname, phonenumber);
        console.log(city, province,
            country, postal);
        event.preventDefault()
        if (email == '' || password == '' || firstname == '' || lastname == '' || birthday == '' || phonenumber == ''
            || city == '' || province == '' || country == '' || postal == '') {
            swal({
                title: "Error",
                text: "Please fill out all fields.",
                icon: "error",
                button: "OK",
            });
        } else {
            let birthday_string = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(birthday)
            signup(email, password, firstname, lastname, birthday_string, phonenumber, city, province,
                country, postal).then((res) => {
                    if (res.status) {
                        toastr.success("Sign up Success", "You are signed up successfully!");
                        window.location.href = '/';

                    } else {
                        console.log("Here is no internet error")
                        swal({
                            title: "Error",
                            text: res.message,
                            icon: "error",
                            button: "OK",
                        });
                    }
                })
        }

    }

    render() {
        return (
            <div>
                <section className="banner-area relative">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-between">
                            <form className="signup-form">
                                <h1 className="text-center mb-4">SIGN UP</h1>
                                <div className="form-group">
                                    <label >User Emial</label>
                                    <input type="email" className="form-control" name="email" placeholder="email " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="password " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >First Name</label>
                                    <input type="text" className="form-control" name="firstname" placeholder="firstname " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >Last Name</label>
                                    <input type="text" className="form-control" name="lastname" placeholder="lastname " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >Date of Birth</label>
                                    {/* <input type="text" className="form-control" name="birthday" onChange={this.handleChange} dateFormat="LLL" selected={this.state.birthday}></input> */}
                                    <DatePicker className="form-control"
                                        placeholderText="Click to select a date"
                                        selected={this.state.birthday}
                                        onSelect={this.handleDate} //when day is clicked

                                    />
                                </div>
                                <div className="form-group">
                                    <label >Phone Number</label>
                                    <input type="text" className="form-control" name="phonenumber"  placeholder="phone number " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >City</label>
                                    <input type="text" className="form-control" name="city" placeholder="city " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >Province/State</label>
                                    <input type="text" className="form-control" name="province" placeholder="province " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >Country</label>
                                    <input type="text" className="form-control" name="country" placeholder="country " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label >Postal/Zip Code</label>
                                    <input type="text" className="form-control" name="postal" placeholder="postal " onChange={this.handleChange} ></input>
                                </div>
                                <div className="form-group text-center">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Sign Up</button>
                                </div>
                                <div className="form-group text-center">
                                    <p >Go to <a href="/">home</a>.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>




            </div>

        )
    }
}


export default Signup
