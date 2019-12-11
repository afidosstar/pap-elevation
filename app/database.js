/**
 * Created by afidoss on 19/12/16.
 */
const firebase = require('firebase');
module.exports=function() {

    const config = {
        apiKey: "AIzaSyDl2IbSww9BUt_sCNKvdvxRgkNO3aEXOpw",
        authDomain: "pap-photo.firebaseapp.com",
        databaseURL: "https://pap-photo.firebaseio.com",
        storageBucket: "pap-photo.appspot.com",
        messagingSenderId: "313281463061"
    };
firebase.initializeApp(config);
return firebase;
};