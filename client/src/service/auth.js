import axios from 'axios';
import environment from '../global.js';
export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/login`, { email, password })
            .then(res => {
                if (res.data.status) {
                    console.log(res.data);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userID', res.data.user.id);
                    localStorage.setItem('email', res.data.user.email);
                    localStorage.setItem('username', res.data.user.firstname);
                    console.log(localStorage.getItem('token'));
                    console.log(localStorage.getItem('userID'));
                    console.log(localStorage.getItem('email'));
                    console.log(localStorage.getItem('username'));
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

export const signup = (email, password,firstname , lastname , birthday ,phonenumber , city ,province ,
    country , postal) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/signup`, { email, password ,firstname , lastname , birthday ,phonenumber , city ,province ,
            country , postal})
            .then(res => {
                return resolve(res.data)
            })
    })
}


export const getAuth = () => {
    return {
        email: localStorage.getItem('email'),
        userID: localStorage.getItem('userID'),
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    }
}

export const logoutAuth = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    return true;
}

//This is part of getting user information from back end.

// export const getUserData = (userID) => {
//     return new Promise((resolve, reject) => {
//         axios.post(environment.apiUrl + `/getUserData`, { userID })
//             .then(res => {
//                 return resolve(res.data)
//             })
//     })
// }

// export const updateUserData = (userID, amount) => {
//     return new Promise((resolve, reject) => {
//         axios.post(environment.apiUrl + `/updateUserData`, { userID, amount })
//             .then(res => {
//                 return resolve(res.data)
//             })
//     })
// }