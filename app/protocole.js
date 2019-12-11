/**
 * @author: AYEDOUN Dossou Fiacre (http://gitlab.com/ayedoun.fiacre)
 */
const path = require('path');
const url = require("url");
(function () {
    String.prototype.ucfirst=function() {
        // original by: AYEDOUN Dossou Fiacre (http://gitlab.com/ayedoun.fiacre)
        // subtract by: Kevin van Zonneveld (http://kvz.io)

        const str = this + '';
        const f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    };
    String.prototype.lcfirst=function() {
        // original by: AYEDOUN Dossou Fiacre (http://gitlab.com/ayedoun.fiacre)
        // subtract by: Kevin van Zonneveld (http://kvz.io)

        const str = this + '';
        const f = str.charAt(0)
            .toLowerCase();
        return f + str.substr(1);
    }
})();

module.exports.createProtocole=function (schemes,protocol,rootApp) {
    //i implemente my own protocole app
    protocol.registerFileProtocol(schemes, function  (request, callback) {
        const schemesRegex= new RegExp(schemes+":\\/\\/((\\w*)?:(\\w*)?\\/)?([^?#]*)(\\?.*)?(#.*)?","ig");
        const schemesUrl =url.parse(request.url);
        console.log(schemesUrl);
        const _path=schemesUrl.pathname;

        var link=null;

        switch (true){
            case /\/?(static).*/.test(_path):

                link = path.normalize(__dirname+'/../web/public'+
                    _path.replace("/static",""));
                break;

            case /app\.(html|htm).*/.test(_path):

                link = path.normalize(__dirname+'/../web/'+
                    _path.replace(/(app\.(html|htm))/i,'$1'));
                break;

            case /\/?dist.*/.test(_path):

                link = path.normalize(__dirname+'/../web/'+
                    _path.replace(/(dist.*)/i,'$1'));
                break;

            case /\/?system.*/.test(_path):
                link = path.normalize(__dirname+'/../node_modules/materialize-css/dist'+
                    _path.replace(/\/?system(.*)/i,'$1'));
                break;

            default:
                link = _path;
                break;
        } console.log(link);

        if(link!=null){
            schemesUrl.path=link;
            callback(schemesUrl);
        }


    }, (error) => {
        if (error) console.error('Failed to register protocol')
    });
};