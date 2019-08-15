import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Row, Col } from 'reactstrap';
import Booking from './Booking';

class Flightdeparture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
      this.toggle();
    }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="warning" onClick={this.toggle}><i className="fa fa-edit" /></Button>
        <Modal isOpen={this.state.modal} fade = {false} toggle={this.toggle} className={this.props.className} centered>
          <ModalHeader>Departing Flight</ModalHeader>
          <ModalBody style={{textAlign:'center'}}>
          <Form>
              <Label>{this.props.mydata.origin.toUpperCase()} to {this.props.mydata.destination.toUpperCase()}</Label>

            
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="Firstname">depart:&nbsp;{this.props.mydata.depart.services[0].segments[0].flightSegment.departure.at}</Label>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                      <FormGroup>
                        <span style = {{fontSize:'30px'}}>&#129058;</span>
                        </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="Lastname">arrive:&nbsp;{this.props.mydata.depart.services[0].segments[0].flightSegment.arrival.at}</Label>
                    </FormGroup>
                  </Col>
                </Row>
      </Form>
          </ModalBody>
          <ModalFooter>
                            <Booking modalclose={this.toggle}/>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Flightdeparture;