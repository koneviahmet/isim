/* 
yapının kelime olup olmadığına bakacağız 
*/


module.exports.isIsim = isIsim = (isimArr, kelime) => {
    
    let lastKelime = false;

    

    let findIsim = isimArr.find(
            /* isim içinde geçiyorsa */
            item => item.isim == kelime 

            /* ekler içinde geçiyorsa */
            || item.ekler.find(ek => ek == kelime)

            /* regex yapısına uyuyorsa */
            || (item.regex && RegExp(item.regex, 'g').test(kelime))
        );
   

    if(findIsim)
        lastKelime = findIsim.isim;



    /* kelime düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return lastKelime;  
}
