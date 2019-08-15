import axios from 'axios';
import environment from '../../global.js';

export const flightSearch = (token, origin, destination, departureDate) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/flight/flight-offers`, { origin, destination, departureDate }, {headers: {token: token}} )
            .then(res => {
                console.log(res.data);
                if (res.data.length !=0) {
                    console.log('fligth SEARCH SUCCESS!');
                }
             resolve(res.data);
            }).catch(error=>{
                
                console.log('Here is error status.')
                
                return reject(error);
            }
            )
                
        
    })

}

export const hotelSearch = ( token, cityCode ) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + '/hotel/hotel-offers', { cityCode }, {headers: {token: token}})
        .then(res => {
            console.log(res.data);
            if(res.data.length != 0){
                console.log('hotel searhc success!');
            }
            resolve(res.data);
        }).catch(error => {
            console.log('here is error hotel search')
            return reject(error);
        })
    })
}


export const autoOriginLocationResult = ( token ,keyword ) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/flight/locations`, { keyword }, {headers: {token: token}})
            .then(res => {
                console.log(res.data.length);
                if (res.data != '') {
                        localStorage.setItem('originLocationResult', res.data[0].address.cityCode);
                        console.log(localStorage.getItem('originLocationResult'));
                }
                return resolve(res.data);
            }).catch(error=>{
                
                console.log('Here is error status.')                
                return reject(error);
            }
            )
                
        
    })

}


export const autoDestinationLocationResult = ( token ,keyword ) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/flight/locations`, { keyword }, {headers: {token: token}})
            .then(res => {
                if (res.data.length != 0) {
                        localStorage.setItem('destinationLocationResult', res.data[0].address.cityCode);                
                }
                return resolve(res.data);
            }).catch(error=>{
                                
                return reject(error);
            }
            )        
    })

}

export const autoHotelLocationResult = ( token, keyword ) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + '/hotel/locations', { keyword }, { headers: {token:token}})
        .then(res => {
            console.log(res.data);
            if(res.data.length != 0) {
                localStorage.setItem('hotelLocationResult', res.data[0].address.cityCode);
            }
            return resolve(res.data);
        }).catch(error => {
            return reject(error);
        })
    })

}

export const getLocationResult = () => {
    return {
        originLocationResult: localStorage.getItem('originLocationResult'),
        destinationLocationResult : localStorage.getItem('destinationLocationResult'),
        hotelLocationResult: localStorage.getItem('hotelLocationResult')   
    }
}
