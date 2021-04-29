/* 
-- burada doğrudan silinmesi gerekenleri sileceğiz.
-- sil dosyasında silmemiz gerekenler var ise onları sileceğiz.
-- isteiğimiz formata uymayanlar var ise onları sileceğiz.
*/
module.exports.deleteKelime = deleteKelime = (silArr,cumleArr) => {
    
    let selectKelimeList = [];


    for (kelime of cumleArr) {
        /* burada temizleme işlemlerini yapalım */
        let ekleDurum = true;


        /* sağını solunu boşaltınca boş dönüyorsa ekleme*/
        if(silArr.find(item => item == kelime))
            ekleDurum = false;
        

        /* kelimenin boyutu eğer 3 ten küçükse sil gitsin.*/
        if(kelime.length < 3)
            ekleDurum = false;


        if(ekleDurum)
            selectKelimeList.push(kelime.trim())
    }

    /* kelime düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return selectKelimeList || false;
}
