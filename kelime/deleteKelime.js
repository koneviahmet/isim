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


        let findSil = silArr.find(
            /* isim içinde geçiyorsa */
            item => item.isim == kelime 

            /* ekler içinde geçiyorsa */
            || item.ekler.find(ek => ek == kelime)

            /* regex yapısına uyuyorsa */
            || (item.regex && RegExp(item.regex, 'g').test(kelime))
        );

        /* sil.txt içinde var mı kontrol edelim */
        if(findSil)
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
