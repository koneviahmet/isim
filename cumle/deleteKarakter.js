/* 
istenmeyen karakterleri silelim burada 
*/
const _  = require('lodash');

module.exports.deleteKarakter = deleteKarakter = (cumle) => {
    
    /* cümleyi temizele */
    cumle = cumle.trim();
    
    cumle = _.replace(cumle, new RegExp('\n',"g"), "");
    cumle = _.replace(cumle, new RegExp('\r',"g"), "");


    /* [1]....[9] [a] => [içi tek karakter olanları sil ] */
    cumle = _.replace(cumle, new RegExp(/\[.\]/,"g"), "");

    /* [11]....[99] [aa] => [içi iki karakter olanları sil ] */
    cumle = _.replace(cumle, new RegExp(/\[..\]/,"g"), "");


    /* cümle düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return cumle || false;
}





