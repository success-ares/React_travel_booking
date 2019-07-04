import axios from 'axios';
import environment from '../../global.js';
export const flightSearch = (origin, destination, departureDate) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/flight-offers`, { origin, destination, departureDate })
            .then(res => {
                console.log(res.data.status);
                if (res.data.status) {
                    console.log(res.data);
                    localStorage.setItem('flightResult', res.data.flightResult);

                    // localStorage.setItem('from', res.data.from);
                    // localStorage.setItem('to', res.data.to);
                    // localStorage.setItem('start', res.data.start);
                    // localStorage.setItem('returnn', res.data.returnn);
                    // localStorage.setItem('adults', res.data.adults);
                    // localStorage.setItem('child', res.data.child);
                    // console.log(localStorage.getItem('from'));
                    // console.log(localStorage.getItem('to'));
                    // console.log(localStorage.getItem('start'));
                    // console.log(localStorage.getItem('adults'));
                }
                return resolve(res.data);
            }).catch(error=>{
                
                console.log('Here is error status.')
                console.log(error)
                
                return reject(error);
            }
            )
                
        
    })

}


//this don't have hotel search function in back end.

// export const hotelSearch = (email, password) => {
//     return new Promise((resolve, reject) => {
//         axios.post(environment.apiUrl + `/hotel`, { email, password })
//             .then(res => {
//                 if (res.data.status) {

                    
//                 }
//                 return resolve(res.data);
//             })
//     })

// }

// export const carSearch = (email, password) => {
//     return new Promise((resolve, reject) => {
//         axios.post(environment.apiUrl + `/car`, { email, password })
//             .then(res => {
//                 if (res.data.status) {
//                     console.log(res.data);
        
//                 }
//                 return resolve(res.data);
//             })
//     })

// }

export const getFlightResult = () => {
    return {
        flightResult: localStorage.getItem('flightResult')
    }
}
