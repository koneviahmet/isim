/* 
yapının kelime olup olmadığına bakacağız 
*/
module.exports.isIsim = isIsim = (isimArr, kelime) => {
    
    let lastKelime = false;

    if(isimArr.find(item => item == kelime))
        lastKelime = kelime;



    /* kelime düzenlemeller sonunda boşalırsa false olarak dönecek. */
    return lastKelime;
}
