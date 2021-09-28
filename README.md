## ElectronJS ile Ypatığım otomatik whatsapp mesajı gönderme uygulaması
### Program Çalıştırılması
  - Node ve npm uygulamarını yükleyin. (Bunları yükledikten sonra "node -v", "npm -v" komutları ile kontrol edebilirsiniz.
  - Kaynak dosyalarının olduğu dizine terminal ile gidin
  - "npm install --save-dev electron" komutunu çalıştırın.
  - "npm start" ile programı başlatın.
### Program Kullanımı
  - Programı açtıktan sonra istersek excel dosyamızı seçelim, istersek Whatsapp'a bağlanalım. 
  - Eğer ilk olarak excel dosyasını seçersek program biz Whatsapp'a bağlanıncaya kadar dosyayı bekletir.
  - Eğer ilk olarak Whatsapp'a bağlanırsak program dosya seçmemizi bekler.
  - Bu işlemleri spagetti kod ile değil OOP uyumlu clean kod ile sağlar.
  - NodeJS tabanlı çalıştığı için çoğu işletim sisteminde kullanılabilir.
  - Tarayıcı oturumumuzu local klasöre kaydeder. Bu sayede tekrar tekrar QR Code okutmak zorunda kalmayız.
  - Dosyayı seçtiğinizde bu dosyanın ismi, boyutu ve row'ları GUI'da görüntülenir.
 
 ### Programı olabildiğince hata ve Bug'lardan arındırmaya çalıştım.
 - Örneğin Chrome açıkken kapatıp tekrar açabiliyoruz.
 - QR okutma ekranında süre dolarsa otomatik yenileme butonuna basıyor.
 - Chrome penceresi yerine programı kapatırsak; program tamamen bellekten silinerek kapanır.
 - Programda Frontend ve Backend arasında köprü oluşturmak için preload.js yazılmıştır. Bu sayede ElectronJS'in son zamanalrda bahsettiği güvenlik açığı kapatılmıştır.
 - Program Puppeteer kullandığı için, programın süre ayarlı bir Whatsapp mesajı gönderme işlevi ile update edilmesi durumunda siz bilgisayarınızda işlerinizi yaparken arka planda çalışabilir.

 ### Uygulamayı kodlarken Puppeteer package'ı kullandım. 
 - Npm üzerinde Puppeteer'ın Whatsapp için özelleştirildiği package'lar vardı, fakat ben bu hazır package'ları kullanmak yerine kendi WhatsappRenderer ve ExcelRenderer class'larımı kullandım.
