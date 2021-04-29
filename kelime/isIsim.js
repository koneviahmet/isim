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
        /* hangi kelimeleri yakaladı ona bakmak için kelimeyi basalım ancak daha sonra kelimenin ait olduğu ismi basacağız. */
        //lastKelime = kelime;

        /* son durumda bu aktif olacak */
        lastKelime = findIsim.isim;



    /* kelime düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return lastKelime;  
}
