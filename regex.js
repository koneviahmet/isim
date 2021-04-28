
/* exec dizide varmı yok mu onu kontrol eder yoksa null döner */
const isExec = RegExp('foo*', 'g').exec("football");
//console.log("eşleşme durum", isExec);

/* true yada false dönderir. */
const isTest = RegExp('foo*', 'g').test("football");

console.log("eşleşti mi eşleşmedi mi ?", isTest);






/* REGEX NOTLAR 

Regex 101 Thread'i:

— Herhangi bir karakter = .
— 0 ya da sonsuz sayıda = *
— 1 ya da sonsuz sayıda = +
— 3 karakter uzunlukta = {3}
— 3 ila 5 karakter uzunlukta = {3,5}
— En az 3 karakter = {3,}
— En fazla 3 karakter = {0,3}

Dolayısıyla şunlar alias:
* = {0,}
+ = {1,}

— a, b karakterlerinden herhangi biri: [ab]
— a'dan e'ye kadar karakter aralığı: [a-e]
— a-e aralığı ya da 0-3 aralığı: [a-e0-3]
— a-e, 0-3 aralığı ya da t: [a-e0-9t]
— a ya da e değil: [^ae]
— a-e aralığındaki karakterler değil: [^a-e]

— hello ya da world: hello|world
— satır x ile başlıyor: ^x
— satır x ile bitiyor: x$
— x olmayabilir: x?

Şunlar da alias:
— \d = [0-9]
— \w = [a-zA-Z]
— \s = boşluk ya da tab ya da başka bir boş karakter

Bunların büyük harfleri tersi:
— \D = [^0-9]

— \t = tab
— \n = alt satır



*/