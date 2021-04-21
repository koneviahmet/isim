/* 
cümleyi filitreden geçirecek ve bozuk olanları düzenleyecek.
*/
const _  = require('lodash');

module.exports.editCumle = editCumle = (cumle) => {
    
    /* cümlenin sonuna . ekleyelim*/
    cumle = cumle + ".";

    /* daha önce [xxx]. yaptığım üç noktayı tekrar ... yaptım */
    cumle = _.replace(cumle, new RegExp(/\[xxx\]\./,"g"), "...");




    /* cümle düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return cumle || false;
}