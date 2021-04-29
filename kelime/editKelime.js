/* 
-- kelimeyi düzenleyeceğiz.
-- her bir kelimeyi boşluklardan bölerek diziye aktaracağız.
-- kelimelere düzenlememiz gereken noktalar varsa onları burada yapacağız mesela , ; vb. noktalama işaretlerinden arındırmak gibi.
-- ÖNEMLİ NOT: sonuncu kelimede hep nokta yada 3 nokta geliyor.
*/
module.exports.editKelime = editKelime = (cumle) => {
    
    let selectKelimeList = [];

    const cumleArr = cumle.split(" ");

    let i = 0;    
    for (kelime of cumleArr) {
        i++;
        /* burada temizleme işlemlerini yapalım */
        let ekleDurum = true;


        /* sağını solunu boşaltınca boş dönüyorsa ekleme*/
        if(!kelime.trim())
            ekleDurum = false;


        /* son kelime ise sonunda bulunan . yı veya . ları silelim*/
        if(i == cumleArr.length){
            /* son kelimeye yapılacakları burada yapabiliriz.*/
            kelime = kelime.replace(RegExp(/\./, 'g'), "");
        }

        /* her şey yolunda ise ekle gitsin. */
        if(ekleDurum)
            selectKelimeList.push(kelime.trim())
  
    }

    /* kelime düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return selectKelimeList || false;
}
