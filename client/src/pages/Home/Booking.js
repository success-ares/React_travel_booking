import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Row, Col } from 'reactstrap';
import swal from 'sweetalert';
import { login } from '../../service/auth.js';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import DatePicker from "react-datepicker";
import environment from '../../global';
 
import "react-datepicker/dist/react-datepicker.css";


const options = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name:'',
      selectedOption: null,
      bookDate: new Date(),
      firstname:'',
      lastname:'',
      birthday:'',
      city:'',
      state:'',
      zip:''


    };

    this.toggle = this.toggle.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    
  }

  genderhandleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  handleChange(date) {
    this.setState({
      bookDate: date
    });
  }

  

  onChange(e){
      this.setState({[e.target.name]:e.target.value});
      console.log(e.target.value);
  }

  handleSubmit(event) {
    const { firstname, lastname, birthday, bookDate, city, state, zip } = this.state;
    var month = bookDate.getUTCMonth() + 1; //months from 1-12
    var day = bookDate.getUTCDate();
    var year = bookDate.getUTCFullYear();

    var newdate = year + "/" + month + "/" + day;
    console.log(firstname, lastname, birthday, newdate, city, state, zip)
    event.preventDefault();
    if (firstname == '' || lastname == '' || birthday == '' || newdate == '' || city == '' || state == '' || zip == '') {
      swal({
        title: "Error",
        text: "Please fill out all fields.",
        icon: "error",
        button: "OK",
      });
    } else 
    {
      axios.post(environment.apiUrl + `/booking`, {firstname,lastname,birthday, bookDate, city, state, zip})
            .then(res => {
              console.log(res)
                if (res.data.status) {
                    toastr.success("Success Booking","successfully booked");
                    this.handleClose();
                }
                else{
                  toastr.error("Failed Booking","booking is failed")
                  this.handleClose();
                }
            })
      
     
    }
  }

   
  handleClose(){
    this.toggle();
    this.props.modalclose();
  }  
  

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    

  }

  render() {

    
    const { selectedOption } = this.state;

    return (
      <div>
         <Button color="info" onClick ={this.toggle} style = {{width:'146px', marginRight:'154px'}}>Continue</Button>
        <Modal isOpen={this.state.modal} fade = {false} backdrop = {false} toggle={this.toggle} className={this.props.className} centered>
          <ModalHeader>Booking</ModalHeader>
          <ModalBody>
          <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Firstname">First Name</Label>
                      <Input type="text" name="firstname" placeholder="First name" onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Lastname">Last name</Label>
                      <Input type="text" name="lastname" placeholder="Last name"  onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="birthday">Date of Birth</Label>
                  <Input type="text" name="birthday" placeholder="date of birth" onChange={this.onChange}/>
                </FormGroup>
                <Row form>
                    <Col md = {6}>
                      <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Select
                          value={selectedOption}
                          onChange={this.genderhandleChange}
                          options={options}
                          placeholder="gender"
                        />
                      </FormGroup>
                     </Col>
                    <Col md = {6}>
                          <FormGroup>
                          <Label for="bookDate">Book Date</Label>
                          <DatePicker
                            selected={this.state.bookDate}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" placeholder="city" onChange={this.onChange}/>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="state">State</Label>
                        <Input type="text" name="state" placeholder="state" onChange={this.onChange}/>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="zip">Zip</Label>
                        <Input type="text" name="zip" placeholder="zip" onChange={this.onChange}/>
                      </FormGroup>  
                    </Col>
                </Row>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.handleSubmit} >Book</Button>
            <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Booking;