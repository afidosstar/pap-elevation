/**
 * Created by afidoss on 19/12/16.
 */
const ipc = require('electron').ipcRenderer;
const $=require("jquery");
const jquery =require("jquery");
const Vue = require('vue');

import './../materialize.config.scss';

/*$("#window-close").on("click",function () {
    ipc.send('window-close');
});

$("#window-minimiser").on("click",function () {
    ipc.send('window-minimiser');
});*/

var app = new Vue({
    el:'#bar-system',
    methods:{
        windowClose: function () {
            ipc.send('window-all-close');
        },
        windowMaximize:function () {
            ipc.send('window-all-maximize');
        },
        windowMinimize:function () {
            ipc.send('window-all-minimize');
        }

    }
});