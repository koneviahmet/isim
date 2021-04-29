/* makaleyi içeri al */
const afs       = require('./helper/afs.js');
const deleteKarakter = require('./cumle/deleteKarakter.js');
const _         = require('lodash');
const editCumle = require('./cumle/editCumle.js');
const isCumle   = require('./cumle/isCumle.js');

const editKelime        = require('./kelime/editKelime.js');
const isIsim            = require('./kelime/isIsim.js');
const deleteKelime      = require('./kelime/deleteKelime.js');
const returnIsim        = require('./kelime/returnIsim.js');

main = async (file) => {

    const silTXT        = await afs.readFile("./sozluk/sil.txt");    
    const silTXTArr     = silTXT.split("\n");

    const isimTXT       = await afs.readFile("./sozluk/isim.json");    
    const isimTXTArr    = JSON.parse(isimTXT);

    

    const safMakale          = await afs.readFile(file);
    let cumleList            = [];
    let secilenIsimList      = [];
    let secilmeyenKelimeList = [];

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

        /* 
        cümle tüm filitreleri geçti ise cümleyi listeye aktaralım 
        doğrudan bir yerde kullanmıyoruz ama gerekirse ileride kullanırız.
        */
        if(cumle)
            cumleList.push(cumle.trim());
    
        /* buradan sonra cümleleri kelimelere ayırmaya başlayalım */
        if(cumle){
            let kelimeArr = await editKelime.editKelime(cumle);
            
            /* silinmesi gereken kelimeleri silelim */
            if(kelimeArr)
                kelimeArr = await deleteKelime.deleteKelime([...silTXTArr],kelimeArr);
          
            
            /* kalanlar kelimemi değil mi ona bakacağız */
            for await (kelime of kelimeArr){
                let isim = await isIsim.isIsim([...isimTXTArr],kelime);
                
                if(isim){
                    secilenIsimList.push(isim);
                }else{
                    /* seçilmeyen kelime daha önce eklenmiş tekrar eklemeyi engelleyelim */
                    if(!secilmeyenKelimeList.find(item => item == kelime))
                        secilmeyenKelimeList.push(kelime);
                }
                    
            }
                

        }

    }

    

    /* seçilen isimlere son halini vermek için returnIsim kullanalaım */
    let secilenIsimler = await returnIsim.returnIsim(secilenIsimList);
    
    console.log(secilenIsimler);

    //console.log(cumleList);

    //console.log("seçilen Kelimlere ", secilenIsimList);
    //console.log("seçilmeyen Kelimlere", secilmeyenKelimeList);

    //console.log("seçilen Kelimlere adet", secilenIsimList.length);
    //console.log("seçilmeyen Kelimlere adet", secilmeyenKelimeList.length);

    /* seçilmeyen kelimeleri ayıklamak için secilmeyen.txt ye ekleyelim */
    
    let secilmeyenEkle = await afs.writeFile("./sozluk/secilmeyen.txt", secilmeyenKelimeList.join("\n"));


}

main("makale");