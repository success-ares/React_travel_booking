import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import Header from '../Layouts/Header/Header';
import Footer from '../Layouts/Footer/Footer';
import swal from 'sweetalert';
import { Row } from 'reactstrap';
import { flightSearch, getFlightResult } from '../Flight/FlightApi';
import { getAuth } from '../../service/auth';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flightResult:'',
            origin: '',
            destination: '',
            departureDate: '',
            returnn: '',
            adults: '',
            child: '',
            username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this)
        console.log(this.state);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    //data-picker function

    handleDate(date) {
        this.setState({departureDate: date})
    }

    handleSubmit(event) {
        const { origin, destination, departureDate, returnn, adults, child } = this.state;
        console.log(origin, destination, departureDate);

        event.preventDefault()
        // if (from === '' || to === '' || start ==='' || returnn==='' || adults===''
        // || child==='') {
        //     toastr.error("Input Error","Please fill out all fields");
        // }
        if (origin === ''|| destination === ''|| departureDate === '' || returnn =='' || adults == '' || child == ''){
            toastr.error("Input Error","Please fill out all fiedls")

        }
        else{
            console.log("here is search post")
            flightSearch(origin, destination, departureDate).then((res) => {
                if ( res.status=== true ) {

                    console.log("Success data search");
                    this.setState({ flightResult : getFlightResult.flightResult }) 

                    
                }
                else{
                    toastr.error("Search Invalid", "Search range is out of the range in this site!");
                }
            }).catch((error) => {
                console.log("here is login page error")
                toastr.error("Failed Search","No Internet!");
                
              }
    
              );
            
        }
    }

    

    componentWillMount(){
        let auth = getAuth();
        if (auth.token) {
            this.setState({ username: auth.username });
        }
    }


    //this is your task.
    //Here , you add the auto complete actions.
  

    render() {
        return (
            <div>
                <Header/>
                <section className="banner-area relative">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-between">
                            <div className="col-lg-6 col-md-6 banner-left">
                                <h6 className="text-white">Away from monotonous life</h6>
                                <h1 className="text-white">Smart Travel</h1>
                                <p className="text-white">
                                    Introducing new Smart Travel option.
                                    <br/>Check our Ca2Fly option for even better prices when you travel by car to the nearest Low Cost Airport.
                                </p>
                                <a href="#" className="primary-btn text-uppercase">Get Started</a>
                            </div>
                            <div className="col-lg-4 col-md-6 banner-right">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="flight-tab" data-toggle="tab" href="#flight" role="tab" aria-controls="flight" aria-selected="true">Flights</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="holiday-tab" data-toggle="tab" href="#holiday" role="tab" aria-controls="holiday" aria-selected="false">Car2Fly</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="hotel-tab" data-toggle="tab" href="#hotel" role="tab" aria-controls="hotel" aria-selected="false">Hotels</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="flight" role="tabpanel" aria-labelledby="flight-tab">
                                        <form className="form-wrap">
                                            <input type="text" className="form-control" name="origin" placeholder="From " onChange={this.handleChange} value={this.state.origin}/>
                                            <input type="text" className="form-control" name="destination" placeholder="To " onChange={this.handleChange} value={this.state.destination}/>
                                            <DatePicker className="form-control"
                                            placeholderText="start"
                                        selected={this.state.departureDate}
                                        onSelect={this.handleDate} //when day is clicked

                                    />
                                            <input type="text" className="form-control date-picker" name="returnn" placeholder="Return "  onChange={this.handleChange} value={this.state.returnn}/>
                                            <input type="number" min="1" max="20" className="form-control" name="adults" placeholder="Adults " onChange={this.handleChange} value={this.state.adults}/>
                                            <input type="number" min="1" max="20" className="form-control" name="child" placeholder="Child " onChange={this.handleChange} value={this.state.child}/>
                                            {(this.state.username === '')
                                                    ?
                                                    <a href="#">Unable to Search ,Please login!</a>
                                                    :
                                                    
                                                    <a href ="#" className="primary-btn text-uppercase" onClick={this.handleSubmit} >Search flights</a>
                                                    }
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="holiday" role="tabpanel" aria-labelledby="holiday-tab">
                                        <form className="form-wrap">
                                            <input type="number" min="1" max="20" className="form-control" name="origin" placeholder="cartrip in hours " />
                                            <input type="text" className="form-control" name="destination" placeholder="To " />
                                            <DatePicker className="form-control"
                                            placeholderText="start"
                                        selected={this.state.departureDate}
                                        onSelect={this.handleDate} //when day is clicked

                                    />
                                            <input type="text" className="form-control date-picker" name="returnn" placeholder="Return "  />
                                            <input type="number" min="1" max="20" className="form-control" name="adults" placeholder="Adults " />
                                            <input type="number" min="1" max="20" className="form-control" name="child" placeholder="Child "/>
                                            {(this.state.username === '')
                                                    ?
                                                    <a href="#">Unable to Search ,Please login!</a>
                                                    :
                                                    
                                                    <a href ="#" className="primary-btn text-uppercase" onClick={this.handleSubmit} >Search Car2Fly</a>
                                                    }
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="hotel" role="tabpanel" aria-labelledby="hotel-tab">
                                        <form className="form-wrap">
                                            <input type="text" className="form-control" name="origin" placeholder="From " />
                                            <input type="text" className="form-control" name="destination" placeholder="To " />
                                            <DatePicker className="form-control"
                                            placeholderText="start"
                                        selected={this.state.departureDate}
                                        onSelect={this.handleDate} //when day is clicked

                                    />
                                            <input type="text" className="form-control date-picker" name="returnn" placeholder="Return "  />
                                            <input type="number" min="1" max="20" className="form-control" name="adults" placeholder="Adults " />
                                            <input type="number" min="1" max="20" className="form-control" name="child" placeholder="Child "/>
                                            {(this.state.username === '')
                                                    ?
                                                    <a href="#">Unable to Search ,Please login!</a>
                                                    :
                                                    
                                                    <a href ="#" className="primary-btn text-uppercase" onClick={this.handleSubmit} >Search Hotels</a>
                                                    }
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* this is the part that are shown the Search result */}
                {(this.state.flightResult === '')
                                             ? 
                                             null
                                             :
                                             <div>
                                                {this.state.flightResult.map((flight, index) => (
                                                    <p>{flight.name} and {flight.data}</p>
                                                )  )}
                                             </div>
                                             
                                            }
                <section className="price-area section-gap">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="menu-content pb-70 col-lg-8">
                                <div className="title text-center">
                                    <h1 className="mb-10">We Provide Affordable Prices</h1>
                                    <p>Especially when using Car2Fly option to search for the lowest price </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="single-price">
                                    <h4>Low Cost Flights</h4>
                                    <ul className="price-list">
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>New York</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Maldives</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Sri Lanka</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Nepal</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Thiland</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Singapore</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-price">
                                    <h4>Popular Hotels</h4>
                                    <ul className="price-list">
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>New York</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Maldives</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Sri Lanka</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Nepal</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Thiland</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Singapore</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-price">
                                    <h4>Last Search Destinations</h4>
                                    <ul className="price-list">
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>New York</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Maldives</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Sri Lanka</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Nepal</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Thiland</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span>Singapore</span>
                                            <a href="#" className="price-btn">$1500</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }


}

export default Home;