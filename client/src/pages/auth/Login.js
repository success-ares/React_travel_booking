import React from 'react';
import { Button, Modal ,Form} from 'react-bootstrap';
import swal from 'sweetalert';
import { login } from '../../service/auth.js';
import { toastr } from 'react-redux-toastr';




class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          show: false,
          email: '',
          password: ''
      }
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.change = this.change.bind(this);
  
     
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        console.log(email);
        console.log(password);
        event.preventDefault();
        if (email == '' || password == '') {
          swal({
            title: "Error",
            text: "Please fill out all fields.",
            icon: "error",
            button: "OK",
          });
        } else 
        {
          login(email, password).then((res) => {
            if (res.status === false) {
              toastr.error("Failed Signin","Unauthurized user!");
               this.handleClose();
            } else {
                // this.props.history.push(`/`)
                toastr.success("Sign in Success","Successfully signed in!");
                window.location.href = '/';
                this.handleClose();
            }
          })
          .catch((error) => {
            console.log("here is login page error")
            this.handleClose();
            toastr.error("Failed Signin","No Internet!");
            
          }

          );
        }
        
      }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    change(e) {        
        this.setState({
          [e.target.name]: e.target.value
        })
      }
  
    render() {
      return (
        <>
          <a href="#" onClick={this.handleShow}>
            login
          </a>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" id="email" placeholder="email" 
                        value={this.state.email}
                        onChange={this.change}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" placeholder="password" 
                        value={this.state.password}
                        onChange={this.change}/>
                    </Form.Group>
                </Form>
                if you are new account, please <a href="/signup">sign</a> up now. 
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" onClick={this.handleSubmit}>
                Signin
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
  
  export default Login