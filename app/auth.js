/**
 * Created by afidoss on 19/12/16.
 */

const FireBase = require( './database');
const database  = FireBase().database();
const referenceUser =database.ref("users");
const crypto = require("crypto");
const url = require('url');
const objectUrl= url.parse(location.href,true);

export default {
    login(username, password,cb)
    {
        console.log(objectUrl);
        if (objectUrl.auth && objectUrl.auth.pass) {
            if (cb) cb(true);
            this.onChange(true);
            return null;
        }
        pretendRequest(username, password, (res) => {
            if (res.authenticated) {
                console.log(url.auth);
                objectUrl.auth={};
                objectUrl.auth.username='token';
                objectUrl.auth.password=res.token;
                console.log(url.format(objectUrl).href);
                //window.location.href=url.format(objectUrl).href;
                if (cb) cb(true);
                this.onChange(true);
            } else {
                if (cb) cb(false);
                this.onChange(false);
            }
        })
    },

    getToken () {
        return objectUrl.auth.pass;
    },


    logout (cb) {
        delete objectUrl.auth.user;
        delete objectUrl.auth.pass;
        if (cb) cb();
        this.onChange(false);
    },

    loggedIn () {
        return !!objectUrl.auth.pass;
    },
    getUser(){
        referenceUser.orderByChild('token').equalTo(getToken()).once('child_added',function (snap) {
            return snap;
        });
    },

    onChange () {}
};

function pretendRequest (username, pass, cb) {
    //setTimeout(() => {
        const token=verification(username,pass);
        if(token){
            cb({
                authenticated: true,
                token: new updateToken(token).token,
            })
        }else{
            cb({ authenticated: false });
        }

        /*if (email === 'joe@example.com' && pass === 'password1') {
            cb({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            })
        } else {
            cb({ authenticated: false })
        }*/
    //}, 0)
}

function verification(username,password){
    //begin search user with the name and search in result user with this password
    //return the token of the valide user
    referenceUser.orderByChild('username')
        .equalTo(username).once("value",function (snapshot) {
                password =crypto.createHmac('sha256', password)
                    .digest('hex');
        console.log(username,pass);
            snapshot.forEach(function (childSnapshot) {
                if(childSnapshot.val().password == password){
                    return childSnapshot.val().token;
                }
            });
        return false;
    });
    return "304909LZZ";
}


//update token of user by taking token for search user and udapte
function updateToken (token){
    //generate nexw token
    this.token = Math.random().toString(30).substring(9);
    //change token of user
    const a=this.token;
    this.key = referenceUser.orderByChild('token').equalTo(token).once('child_added',function (snapshot) {
        if(snapshot.key){
            referenceUser.child(snapshot.key).update({"token":a});
        }
        return snapshot.key;

    });
    return this;
}