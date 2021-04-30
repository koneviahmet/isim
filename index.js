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

    const silTXT        = await afs.readFile("./sozluk/sil.json");    
    const silTXTArr     = JSON.parse(silTXT);

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


        /* buradan sonra cümleleri kelimelere ayırmaya başlayalım */
        if(cumle){
            let info = {};
            let kelimeArr = await editKelime.editKelime(cumle);
            

            let kalanKelimeArr;
            let infoSilinenKelimeler = [];
            /* silinmesi gereken kelimeleri silelim */
            if(kelimeArr){
                kalanKelimeArr = await deleteKelime.deleteKelime([...silTXTArr],kelimeArr);
                infoSilinenKelimeler = _.difference(kelimeArr, kalanKelimeArr);
            }
            
            /* kalanlar kelimemi değil mi ona bakacağız */
            let infoSecilenKelime    = [];
            let infoSecilmeyenKelime = [];
            for await (kelime of kalanKelimeArr){
                let isim = await isIsim.isIsim([...isimTXTArr],kelime);
                
                if(isim){
                    secilenIsimList.push(isim);

                    /* her cümleden seçilen kelimeleri bilgi amaçlı alıyoruz.*/
                    infoSecilenKelime.push(kelime);
                }else{
                    /* her cümleden seçilmeyen kelimeleri bilgi amaçlı alıyoruz.*/
                    infoSecilmeyenKelime.push(kelime);

                    /* seçilmeyen kelime daha önce eklenmiş tekrar eklemeyi engelleyelim */
                    if(!secilmeyenKelimeList.find(item => item == kelime))
                        secilmeyenKelimeList.push(kelime);

                        
                }
                    
            }
                

            /* 
            cümle tüm filitreleri geçti ise cümleyi listeye aktaralım 
            doğrudan bir yerde kullanmıyoruz ama gerekirse ileride kullanırız.
            */
            info.cumle          = cumle.trim();
            info.kelimeler      = kelimeArr;
            info.secilenler     = infoSecilenKelime;
            info.silinenler     = infoSilinenKelimeler;
            info.kalanlar       = infoSecilmeyenKelime;
            
            cumleList.push(info);
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
    
    let secilmeyenEkle = await afs.writeFile("./sozluk/secilmeyen.json", JSON.stringify(secilmeyenKelimeList));


    /* elde edilen cümleleri kontrol amaçlı secilenCumlere isimlli bir json dosyasına atayalım */
    let addCumleTXT = await afs.writeFile("./sozluk/secilenCumler.json", [JSON.stringify(cumleList)]);

}

main("makale");