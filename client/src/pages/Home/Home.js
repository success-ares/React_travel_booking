import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import Header from '../Layouts/Header/Header';
import Footer from '../Layouts/Footer/Footer';
import { Row, Table } from 'reactstrap';
import { flightSearch, hotelSearch, getLocationResult, autoOriginLocationResult, autoDestinationLocationResult, autoHotelLocationResult } from '../Flight/FlightApi';
import { getAuth } from '../../service/auth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loading_icon from './Loading_icon.gif';
import Flightdeparture from './Flightdeparture';
import Hotelbooking from './Hotelbooking';
// import Autocomplete from 'react-autocomplete';
// import { getCountry, matchCountry } from './dataService';



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            flightResult: '',
            origin: '',
            destination: '',
            departureDatee: '',
            returnn: '',
            adults: '',
            child: '',
            username: '',

            cityCode:'',
            hdestination:'',
            hdepartureDate: '',
            hreturnn: '',
            hadults: '',
            hchild:'',
            flightResults: [],
            hotelResults: [],

            show: false,
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.hotelhandleSubmit = this.hotelhandleSubmit.bind(this);

    }

    handleChange(e) {
        console.log('@@@here is the target value@@@@', e.target.value, this.state.token);
        if (e.target.name == 'origin') {
            autoOriginLocationResult(this.state.token, e.target.value).then((res) => {
                if (res.length != 0) {
                    toastr.success("Success Search", "Location Search is completed successfully!");

                }
                else {
                    document.getElementById('myOriginInput').value = '';
                    toastr.error("Failed Search", "No Internet! or Bad Request(unknown cityname)");

                }
            })
        } else if (e.target.name == 'destination') {
            autoDestinationLocationResult(this.state.token, e.target.value).then((res) => {
                if (res.length != 0) {
                    toastr.success("Success Search", "Location Search is completed successfully!");
                }
                else {
                    document.getElementById('myDepartureInput').value = '';
                    toastr.error("Failed Search", "No Internet! or Bad Request(unknown cityname)");
                }
            })

        } else if (e.target.name == 'cityCode') {
            autoHotelLocationResult(this.state.token, e.target.value).then((res) => {
                if (res.length != 0) {
                    toastr.success("Success Search","Hotel Location search Success!")
                }
                else {
                    document.getElementById('myHotelInput').value = '';
                    toastr.error("Failed Search", "No Internet! or Bad Request(unknown cityname)");
                }
            })
        }
    


        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //data-picker function
    handleDate(date) {
        this.setState({ departureDatee: date })
    }

    handleSubmit(event) {
        const { departureDatee, returnn, adults, child } = this.state;
        let search = getLocationResult();
        console.log(search.destinationLocationResult);
        const destination = search.destinationLocationResult;
        const origin = search.originLocationResult;
            if(departureDatee.getDate()<10 && departureDatee.getMonth()<9){
                var departureDate = departureDatee.getFullYear() + "-0" +
            (departureDatee.getMonth() + 1) + "-0" +
            departureDatee.getDate();
            }
            else if(departureDatee.getDate() >= 10 && departureDatee.getMonth()>=9){
                var departureDate = departureDatee.getFullYear() + "-" +
            (departureDatee.getMonth() + 1) + "-" +
            departureDatee.getDate();

            }
            else if(departureDatee.getDate() >= 10 && departureDatee.getMonth() < 9){
                var departureDate = departureDatee.getFullYear() + "-0" +
            (departureDatee.getMonth() + 1) + "-" +
            departureDatee.getDate();
            }
            else {
                var departureDate = departureDatee.getFullYear() + "-" +
            (departureDatee.getMonth() + 1) + "-0" +
            departureDatee.getDate();
            }

        event.preventDefault()
        if (origin === '' || destination === '' || departureDatee === '' || adults == '' || child == '') {
            toastr.error("Input Error", "Please fill out all fiedls")

        }
        else {
            document.getElementById('myimg').style.display = '';
            document.getElementById('hotel').style.display = 'none';
            document.getElementById('flight').style.display = 'none';
            document.getElementById('holiday').style.display = 'none';
            flightSearch(this.state.token, origin, destination, departureDate).then((res) => {
                if (res.length != 0) {
;
                    document.getElementById('myimg').style.display = 'none';
                    document.getElementById('hotel').style.display = '';
                    document.getElementById('flight').style.display = '';
                    document.getElementById('holiday').style.display = '';
                    var sortdata = res.sort((a, b) => a.offerItems[0].price.totalTaxes - b.offerItems[0].price.totalTaxes);
                    this.setState({flightResults: sortdata})

                    

                    document.getElementById('home-tab').click();
                    toastr.success("Success Search", "Search is completed successfully!");
                }
                else {
                    toastr.error("Search Invalid", "Search range is out of the range in this site!");
                }
            }).catch((error) => {
                toastr.success("Success Search", "Search is completed successfully!");
                document.getElementById('myimg').style.display = 'none';
                document.getElementById('hotel').style.display = '';
                document.getElementById('flight').style.display = '';
                document.getElementById('holiday').style.display = '';
            }
            );

        }

        this.setState({
            departureDatee : ''
            , returnn : ''
            , adults : ''
            , child : ''
        })
    }

    hotelhandleSubmit(event){
        const { hdestination,  hadults, hchild } = this.state;
        console.log(hdestination, hadults, hchild);
        let search = getLocationResult();
        console.log(this.state.token, search.hotelLocationResult);
        const cityCode = search.hotelLocationResult;
        event.preventDefault()
        if (cityCode === '' || hdestination == '' || hadults == '' || hchild == '') {
            toastr.error("Input Error", "Please fill out all fiedls")

        }
        else {
            document.getElementById('myimg').style.display = '';
            document.getElementById('hotel').style.display = 'none';
            document.getElementById('flight').style.display = 'none';
            document.getElementById('holiday').style.display = 'none';
            hotelSearch(this.state.token, cityCode).then((res) => {
                document.getElementById('myimg').style.display = 'none';
                document.getElementById('hotel').style.display = '';
                document.getElementById('flight').style.display = '';
            document.getElementById('holiday').style.display = '';
                if (res.length != 0) {
                    var sortdata = res.sort((a, b) => a.offers[0].price.total - b.offers[0].price.total);
                    this.setState({hotelResults: sortdata})
                    console.log('HHHHHHHHHotel search results')
                    console.log(this.state.hotelResults);
                    document.getElementById('contact-tab').click();
                    toastr.success("Success Search", "Search is completed successfully!");
                }
                else {
                    toastr.error("Search Invalid", "Search range is out of the range in this site!");
                }
            }).catch((error) => {
                document.getElementById('myimg').style.display = 'none';
                document.getElementById('hotel').style.display = '';
                document.getElementById('flight').style.display = '';
                document.getElementById('holiday').style.display = '';
                toastr.success("Success Search", "Search is completed successfully!");
            }
            );

        }

        this.setState({
            cityCode:'',
            hdestination:'',
            hreturnn:'',
            hdepartureDate:'',
            hadults:'',
            hchild:''
            })
            


    }

    

    componentWillMount() {
        let auth = getAuth();
        if (auth.token) {
            this.state.token = auth.token;
            console.log(this.state.token);
            this.setState({ username: auth.username });
        }
    }

    render() {
        return (
            <div>
                <Header />

                <section className="banner-area relative">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-between">
                            <div className="col-lg-6 col-md-6 banner-left">
                                <h6 className="text-white">Away from monotonous life</h6>
                                <h1 className="text-white">Smart Travel</h1>
                                <p className="text-white">
                                    Introducing new Smart Travel option.
                                    <br />Check our Ca2Fly option for even better prices when you travel by car to the nearest Low Cost Airport.
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
                                <img src={loading_icon} style = {{width:'100%',display: 'none'}} id = "myimg"></img>
                                    <div className="tab-pane fade show active" id="flight" role="tabpanel" aria-labelledby="flight-tab" style={{display:''}}>
                                        <form className="form-wrap">
                                            <input type="text" id="myOriginInput" className="form-control" name="origin" placeholder="From " onChange={this.handleChange} value={this.state.origin} />
                                            <input type="text" id="myDepartureInput" className="form-control" name="destination" placeholder="To " onChange={this.handleChange} value={this.state.destination} />
                                            <DatePicker className="form-control"
                                                placeholderText="start"
                                                selected={this.state.departureDatee}
                                                onSelect={this.handleDate} //when day is clicked
                                            />
                                            <input type="text" className="form-control date-picker" name="returnn" placeholder="Return " />
                                            <input type="number" min="1" max="20" className="form-control" name="adults" placeholder="Adults " onChange={this.handleChange} value={this.state.adults} />
                                            <input type="number" min="1" max="20" className="form-control" name="child" placeholder="Child " onChange={this.handleChange} value={this.state.child} />
                                            {(this.state.username === '')
                                                ?
                                                <a href="#">Unable to Search ,Please login!</a>
                                                :
                                                <a href="#" className="primary-btn text-uppercase" onClick={this.handleSubmit} >Search flights</a>
                                            }
                                        </form>
                                    </div>
                                    {/* this is hotel research form */}
                                    <div className="tab-pane fade" id="holiday" role="tabpanel" aria-labelledby="holiday-tab" style={{display:''}}>
                                        <form className="form-wrap">
                                            <input type="number" min="1" max="20" className="form-control" name="origin" placeholder="cartrip in hours " />
                                            <input type="text" className="form-control" name="destination" placeholder="To " />
                                            <DatePicker className="form-control"
                                                placeholderText="start"
                                                selected={this.state.departureDate}
                                                onSelect={this.handleDate} //when day is clicked

                                            />
                                            <input type="text" className="form-control date-picker" name="returnn" placeholder="Return " />
                                            <input type="number" min="1" max="20" className="form-control" name="adults" placeholder="Adults " />
                                            <input type="number" min="1" max="20" className="form-control" name="child" placeholder="Child " />
                                            {(this.state.username === '')
                                                ?
                                                <a href="#">Unable to Search ,Please login!</a>
                                                :

                                                <a href="#" className="primary-btn text-uppercase" onClick={this.carhandleSubmit} >Search Car2Fly</a>
                                            }
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="hotel" role="tabpanel" aria-labelledby="hotel-tab" style={{display:''}}>
                                        <form className="form-wrap" >
                                            <input type="text" className="form-control" name="cityCode" placeholder="From " onChange={this.handleChange} />
                                            <input type="text" className="form-control" name="hdestination" placeholder="To " onChange= {this.handleChange}/>
                                            <input type="text" className="form-control date-picker" name="hdepartureDate" placeholder="Departure " />
                                            <input type="text" className="form-control date-picker" name="hreturnn" placeholder="Return " />
                                            <input type="number" min="1" max="20" className="form-control" name="hadults" placeholder="Adults " onChange={this.handleChange} />
                                            <input type="number" min="1" max="20" className="form-control" name="hchild" placeholder="Child " onChange={this.handleChange} />
                                            {(this.state.username === '')
                                                ?
                                                <a href="#">Unable to Search ,Please login!</a>
                                                :

                                                <a href="#" className="primary-btn text-uppercase" onClick={this.hotelhandleSubmit}>Search Hotels</a>
                                            }
                                        </form>
                                    </div>
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="price-area section-gap">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="menu-content pb-70 col-lg-8">
                                <div className="title text-center">
                                    <h1 className="mb-10">We Provide The Search Funcion of Cheap Price Travel</h1>
                                    <p>Especially when using Car2Fly option to search for the lowest price </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="single-price">
                                    <h4>Low Cost Flights</h4>
                                    <Table striped bordered responsive>
                                                <thead>
                                                    <tr>
                                                        {/* <th>No</th> */}
                                                        <th>aircraft-code</th>
                                                        {/* <th>departure-iataCode</th> */}
                                                        {/* <th>departure-at</th> */}
                                                        {/* <th>duration</th>
                                                        <th>number</th> */}
                                                        <th>price</th>
                                                        <th>
                                                            booking
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.flightResults.map((flightResult, index) => (
                                                <tr key={flightResult.id}>
                                                {/* <th scope="row"> {index + 1} </th> */}
                                                <th>
                                                    {/* booking tag */}
                                                    {flightResult.offerItems[0].services[0].segments[0].flightSegment.aircraft.code}
                                                </th>
                                                {/* <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.departure.iataCode}</th> */}
                                                {/* <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.departure.at}</th> */}
                                                {/* <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.duration}</th>
                                                <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.number}</th> */}
                                                <th>{flightResult.offerItems[0].price.totalTaxes}</th>
                                                <th>
                                                    <Flightdeparture mydata = {{origin: this.state.origin,  destination: this.state.destination, 
                                                        depart:flightResult.offerItems[0]}}/>
                                                </th>
                                                </tr>)
                                                )}
                                                </tbody>
                                            </Table>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-price">
                                    <h4>Popular Hotels</h4>
                                    <Table striped bordered responsive>
                                                <thead>
                                                    <tr>
                                                        <th>hotel name</th>
                                                        <th>price</th>
                                                        <th>
                                                            booking
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.hotelResults.map((hotelResult, index) => (
                                                <tr key={hotelResult.type}>
                                                <th>
                                                    {/* booking tag */}
                                                    {hotelResult.hotel.name}
                                                </th>
                                                <th>{hotelResult.offers[0].price.total}</th>
                                                <th>
                                                    <Hotelbooking hdata = {{price:hotelResult.offers[0].price.total, hotelname:hotelResult.hotel.name}}/>
                                                </th>
                                                
                                                </tr>)
                                                )}
                                                </tbody>
                                                
                                            </Table>
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
                <Footer />

                


                                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">flightSearch</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">car2flySearch</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">hotelSearch</a>
                                        </li>
                                </ul> */}
                                {/* <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="d-flex flex-column">
                                            <Table striped bordered responsive>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>aircraft-code</th>
                                                        <th>departure-iataCode</th>
                                                        <th>departure-at</th>
                                                        <th>duration</th>
                                                        <th>number</th>
                                                        <th>price-totalTaxes</th>

                                                    </tr>
                                                </thead>
                                                <tbody> */}
                                                {/* {this.state.flightResults.map((flightResult, index) => (
                                                <tr key={flightResult.id}>
                                                <th scope="row"> {index + 1} </th>
                                                <th> */}
                                                    {/* booking tag */}
                                                    {/* {flightResult.offerItems[0].services[0].segments[0].flightSegment.aircraft.code}
                                                </th>
                                                <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.departure.iataCode}</th>
                                                <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.departure.at}</th>
                                                <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.duration}</th>
                                                <th>{flightResult.offerItems[0].services[0].segments[0].flightSegment.number}</th>
                                                <th>{flightResult.offerItems[0].price.totalTaxes}</th>
                                                </tr>)
                                                )} */}
                                                {/* </tbody>
                                            </Table>
                                            
                                        </div>

                                        </div>
                                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">car2fly
                                        
                                            
                                        </div>
                                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <div className="d-flex flex-column">
                                            <Table striped bordered responsive>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>hotelname</th>
                                                        <th>hotelID</th>
                                                        <th>address-lines</th>
                                                        <th>base price</th>
                                                        <th>currency</th>
                                                        <th>room type</th>

                                                    </tr>
                                                </thead>
                                                <tbody> */}
                                                {/* {this.state.hotelResults.map((hotelResult, index) => (
                                                <tr key={hotelResult.type}>
                                                <th scope="row"> {index + 1} </th>
                                                <th> */}
                                                    {/* booking tag */}
                                                    {/* {hotelResult.hotel.name}
                                                </th>
                                                <th>{hotelResult.hotel.hotelId}</th>
                                                <th>{hotelResult.hotel.address.lines}</th>
                                                <th>{hotelResult.offers[0].price.total}</th>
                                                <th>{hotelResult.offers[0].price.currency}</th>
                                                <th>{hotelResult.offers[0].room.type}</th>
                                                </tr>)
                                                )} */}
                                                {/* </tbody>
                                                
                                            </Table>
                                            
                                        </div>
                                        </div>
                                </div> */}


        </div>

        )
    }


}

export default Home;