/*const contents = [
    { id: "13213", name: 'ABDden çiple teknoloji seddi: Çini yerinde tutmak istiyor',  imageUrl: '1.jpg', description: 'ABD yönetimi, ağustosta onaylanarak yürürlüğe giren Çip ve Bilim Yasası’nın ardından, Çinli üreticilerin ileri çip teknolojilerine erişimine yönelik kısıtlamalarla Pekin’in bu sektördeki teknolojik kabiliyetine set çekme niyetini açıkça ortaya koydu.ABD Ticaret Bakanlığına bağlı Sanayi ve Güvenlik Bürosu (BIS), 7 Ekim’de yayımladığı duyuruda, aralarında Çin’in en büyük hafıza çipi üreticisi Yangzte Memory Technologies, en büyük yarı iletken donanım üreticisi Naura Technology Group’un bulunduğu 31 şirket ve kurumun İhracat Kontrol Listesi’ne alındığını bildirdi.', categoryid: "3" },
    { id: "13214", name: 'Sağlık, sektöründe yapay zeka dönemi başaladı',  imageUrl: '2.jpg', description: 'Pandemiyle hız kazanan dijitalleşme, sağlık sektöründe de daha fazla hissedilmeye başlandı. HIMSS’in (Sağlık Bilgi ve Yönetim Sistemleri Topluluğu) sağlık hizmetlerinin geleceğine ışık tutan raporuna göre, klinikler ve özel hastaneler gibi sağlık kuruluşlarının %80’i önümüzdeki 5 yıl içinde dijital sağlık hizmetlerine yatırımlarını artırmayı planlıyor.Katılımcıların %47’si dijitalleşmenin kurum yapılanmasında ilk sırada yer aldığını aktarırken, hastalar da yalnız sağlık değil, sigorta alanında da kullanıcı dostu teknolojiler talep ediyor.', categoryid: "2" },
    { id: "13215", name: 'Tesla, daha ucuz bir model için çalışmalar başladı',  imageUrl: '3.jpg', description: 'Elon Musk yıllardır daha ucuz bir Tesla modeli üretmekten bahsediyor, ancak enflasyon, elektrikli arabalara olan yüksek talep ve tedarik sorunları, bunun yerine fiyatların yükselmesine neden oluyor. Tesla mühendislerinin daha önce 25 bin dolarlık bir araç üzerinde çalışacağı duyurulsa da odak noktasının Optimus adı verilen robota ve Model Y nin üretiminin artırılmasına kaydırılması bu sürecin önüne geçti. ', categoryid: "5" },
    { id: "13216", name: ' Zuckerberg duyurdu: Yapay zekadan simultane çeviri', imageUrl: '4.jpg', description: 'Pandemiyle hız kazanan dijitalleşme, sağlık sektöründe de daha fazla hissedilmeye başlandı. HIMSS’in (Sağlık Bilgi ve Yönetim Sistemleri Topluluğu) sağlık hizmetlerinin geleceğine ışık tutan raporuna göre, klinikler ve özel hastaneler gibi sağlık kuruluşlarının %80’i önümüzdeki 5 yıl içinde dijital sağlık hizmetlerine yatırımlarını artırmayı planlıyor.Katılımcıların %47’si dijitalleşmenin kurum yapılanmasında ilk sırada yer aldığını aktarırken, hastalar da yalnız sağlık değil, sigorta alanında da kullanıcı dostu teknolojiler talep ediyor.', categoryid: "1" },
    { id: "13217", name: 'Türkiyenin milli çelik kanatları için geri sayım', imageUrl: '5.jpg', description: 'Hürjet tin de üretim çalışmalarının sürdüğünü aktaran Kotil, bunun yanında buz dağının görünmeyen kısmında da tasarım çalışmaları, rüzgar tüneli, demir kuş, simülatör, yakıt test altyapısı gibi yatırımlar bulunduğunu vurguladı. ', categoryid: "4" },
    { id: "13218", name: 'Milli Teknoloji Hamlesinin lider ismi: Özdemir Bayraktar', imageUrl: '6.jpg', description: "Baykar Yönetim Kurulu Başkanı Özdemir Bayraktar, 72 yaşında vefat etti. Türkiye’nin insansız hava araçları serüveninin öncü isimlerinden olan Bayraktar, Milli Teknoloji Hamlesi idealinin de liderlerindendi.Bir süredir kanser tedavisi gören Özdemir Bayraktar bugün yaşamını yitirdi. Geride savunma sanayii adına büyük bir miras bıraktı.Milli SİHA’ların öncü ismi, girişimci, yüksek mühendis ve sanayici Özdemir Bayraktar, 1949 yılında Sarıyer’in Garipçe köyünde doğdu. Kabataş Erkek Lisesi’nden mezun oldu.Başarıyla dolu eğitim hayatı 1967’de İstanbul Teknik Üniversitesi Makine Mühendisliği bölümüne giren Özdemir Bayraktar, başarılı bir eğitim döneminin ardından 1972 yılında mezun oldu. Mezuniyetinin ardından 2 yıl boyunca İTÜ Motorlar Kürsüsü Profesörü İsmail Hakkı Öz’ün araştırma asistanlığı görevini yürüterek içten yanmalı motorlar konusunda yüksek lisans çalışmasını tamamladı.Türkiye’nin sanayi sektöründe öncü rol üstlenen birçok fabrikanın kuruluş ve yeni yatırımlar aşamasında teknik yönetici görevlerinde çalıştı.", categoryid: "4" }

];

module.exports = class Content {

    constructor(name, imageUrl, description, categoryid) {
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;
    }

    saveContent() {
        contents.push(this);
    }

    static getAll() {
        return contents;
    }

    static getById(id) {
        return contents.find(i => i.id === id);
    }

    static getContentsByCategoryId(categoryid) {
        return contents.filter(i => i.categoryid == categoryid);
    }

    static Update(content) {
        const index = contents.findIndex(i => i.id === content.id);

        contents[index].name = content.name;
        contents[index].imageUrl = content.imageUrl;
        contents[index].description = content.description;
        contents[index].categoryid = content.categoryid;
    }

    static DeleteById(id) {
        const index = contents.findIndex(i => i.id === id);
        contents.splice(index, 1);
    }

}

*/

const Db = require('mongodb/lib/db');


const getDb = require('../utility/database').getdb;

class Content{
    constructor(name, imageUrl, description) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    save(){
        const db = getDb();

        db.collection('contents')
          .insertOne(this)
          .then(result => {
               console.log(result);
          })
          .catch(err => {console.log(err)});
    }

}

module.exports = Content;