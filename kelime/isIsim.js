/* 
yapının kelime olup olmadığına bakacağız 
*/
module.exports.isIsim = isIsim = (isimArr, kelime) => {
    
    let lastKelime = false;


    let findIsim = isimArr.find(item => item.isim == kelime || item.ekler.find(itemx => itemx == kelime));
   
    if(findIsim)
        lastKelime = findIsim.isim;



    /* kelime düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return lastKelime;  
}
