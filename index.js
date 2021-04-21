/* makaleyi içeri al */
const afs  = require('./helper/afs.js');
const deleteKarakter = require('./cumle/deleteKarakter.js');
const _  = require('lodash');
const editCumle = require('./cumle/editCumle.js');
const isCumle   = require('./cumle/isCumle.js');
const arrCumle  = require('./cumle/arrCumle.js');


main = async (file) => {

    const safMakale = await afs.readFile(file);
    let cumleList = [];

    /* 3 noktayı silip yerine [xxx] ekledim.*/
    const makale = await afs.replaceFile(safMakale,/\.\.\./,"[xxx].");
    

    /* . kulllanarak diziye bölüyorum */
    const cumleArr = makale.split(".");
    for await (cumle of cumleArr) {
       
        /* cümlede karakter temizlemesi yapalım */
        cumle = await deleteKarakter.deleteKarakter(cumle.trim());
        
        /* cümleyi düzenleyelim */
        if(cumle)
            cumle = await editCumle.editCumle(cumle.trim());
        
        /* düzenleme sonucunda oluşan yapı cümlemi ona bakalım */
        if(cumle)
            cumle = await isCumle.isCumle(cumle.trim());

        /* cümle tüm filitreleri geçti ise cümleyi listeye aktaralım */
        if(cumle)
            cumleList.push(cumle.trim());
    }


    console.log(cumleList);


}

main("makale");