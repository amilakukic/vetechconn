import { FormEvent, useEffect, useRef, useState } from 'react';
import {ArrowLeft, ArrowUpRight, Check, ChevronDown, Globe2, GraduationCap, Mail, Menu, MoveRight, Network, Send, Target, Users, X, ArrowDownToLine,} from 'lucide-react';
const images = {
  hero: 'https://images.pexels.com/photos/8617759/pexels-photo-8617759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  digital: 'https://images.pexels.com/photos/5530483/pexels-photo-5530483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  workshop: 'https://images.pexels.com/photos/18999478/pexels-photo-18999478.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  coding: 'https://images.pexels.com/photos/5621952/pexels-photo-5621952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};
type Language = 'bs' | 'sr' | 'hr' | 'sl' | 'en';
type Page = 'home' | 'about' | 'partners' | 'news' | 'contact' | 'article';
type Copy = {
  nav: { home: string; about: string; partners: string; news: string; contact: string };
  home: { kicker: string; title: string; lead: string; explore: string; latest: string; stat: string; impact: string; impactText: string; viewNews: string };
  about: { kicker: string; title: string; intro: string; body: string; groups: string; goal: string; goalText: string };
  partners: { kicker: string; title: string; lead: string };
  news: { kicker: string; title: string; lead: string; read: string; back: string; category: string };
  contact: { kicker: string; title: string; lead: string; name: string; email: string; message: string; send: string; note: string; success: string };
  footer: string;
};
const copy: Record<Language, Copy> = {
  bs: {
    nav: { home: 'Početna', about: 'O nama', partners: 'Partneri', news: 'Vijesti', contact: 'Kontakt' },
    home: { kicker: 'ERASMUS+ EDU-CB-VET', title: 'Digitalne vještine za bolju budućnost.', lead: 'Zajedno gradimo mostove između obrazovanja, tehnologije i tržišta rada u Bosni i Hercegovini, Crnoj Gori i Hrvatskoj.', explore: 'Istražite projekat', latest: 'Najnovije vijesti', stat: 'aktivnih partnera', impact: 'Znanje koje povezuje.', impactText: 'VETechConn je inicijativa posvećena unapređenju digitalnih vještina instruktora strukovnog obrazovanja i obuke.', viewNews: 'Pogledajte vijesti' },
    about: { kicker: 'O NAMA', title: 'Od ideje do uticaja.', intro: 'VETechConn unapređuje digitalne vještine instruktora strukovnog obrazovanja i obuke.', body: 'Projekat povezuje stručnjake i institucije u Bosni i Hercegovini, Crnoj Gori i Hrvatskoj. Kroz međunarodnu saradnju, praktične radionice i dostupne digitalne resurse stvaramo sigurnije i savremenije obrazovanje.', groups: 'Ciljne grupe', goal: 'Naši ciljevi', goalText: 'Povezati obrazovanje, inovacije i tržište rada kroz razmjenu znanja i razvoj novih programa.' },
    partners: { kicker: 'ZAJEDNO SMO JAČI', title: 'Mreža koja pokreće promjenu.', lead: 'Naš projekat okuplja institucije, škole i stručnjake iz regiona i Evrope.' },
    news: { kicker: 'VIJESTI I AKTIVNOSTI', title: 'Znanje u pokretu.', lead: 'Pratite radionice, susrete i rezultate projekta.', read: 'Pročitajte više', back: 'Nazad na vijesti', category: 'AKTIVNOST PROJEKTA' },
    contact: { kicker: 'KONTAKT', title: 'Razgovarajmo o budućnosti.', lead: 'Imate pitanje ili želite da saznate više o projektu? Pošaljite nam poruku.', name: 'Ime i prezime', email: 'E-mail adresa', message: 'Poruka', send: 'Pošalji poruku', note: 'Klikom na dugme otvoriće se Outlook sa pripremljenom porukom.', success: 'Vaša poruka je pripremljena u Outlooku.' },
    footer: 'Finansirano od strane Evropske unije. Stavovi i mišljenja izraženi su isključivo stavovi autora.',
  },
  en: {
    nav: { home: 'Home', about: 'About us', partners: 'Partners', news: 'News', contact: 'Contact' },
    home: { kicker: 'ERASMUS+ EDU-CB-VET', title: 'Digital skills for a better future.', lead: 'Together we build bridges between education, technology and the labour market in Bosnia and Herzegovina, Montenegro and Croatia.', explore: 'Explore the project', latest: 'Latest news', stat: 'active partners', impact: 'Knowledge that connects.', impactText: 'VETechConn is an initiative dedicated to improving the digital skills of vocational education and training instructors.', viewNews: 'View the news' },
    about: { kicker: 'ABOUT US', title: 'From idea to impact.', intro: 'VETechConn improves the digital skills of vocational education and training instructors.', body: 'The project connects experts and institutions in Bosnia and Herzegovina, Montenegro and Croatia. Through international cooperation, practical workshops and accessible digital resources, we create more confident and modern education.', groups: 'Target groups', goal: 'Our goals', goalText: 'Connect education, innovation and the labour market through knowledge exchange and new programme development.' },
    partners: { kicker: 'STRONGER TOGETHER', title: 'A network that drives change.', lead: 'Our project brings together institutions, schools and experts from the region and Europe.' },
    news: { kicker: 'NEWS & ACTIVITIES', title: 'Knowledge in motion.', lead: 'Follow our workshops, meetings and project results.', read: 'Read more', back: 'Back to news', category: 'PROJECT ACTIVITY' },
    contact: { kicker: 'CONTACT', title: 'Let’s talk about the future.', lead: 'Have a question or want to learn more about the project? Send us a message.', name: 'Full name', email: 'Email address', message: 'Message', send: 'Send message', note: 'Clicking the button will open Outlook with a prepared message.', success: 'Your message has been prepared in Outlook.' },
    footer: 'Funded by the European Union. Views and opinions expressed are solely those of the authors.',
  },
  hr: {
    nav: { home: 'Početna', about: 'O nama', partners: 'Partneri', news: 'Vijesti', contact: 'Kontakt' },
    home: { kicker: 'ERASMUS+ EDU-CB-VET', title: 'Digitalne vještine za bolju budućnost.', lead: 'Zajedno gradimo mostove između obrazovanja, tehnologije i tržišta rada u Bosni i Hercegovini, Crnoj Gori i Hrvatskoj.', explore: 'Istražite projekt', latest: 'Najnovije vijesti', stat: 'aktivnih partnera', impact: 'Znanje koje povezuje.', impactText: 'VETechConn je inicijativa posvećena unapređenju digitalnih vještina instruktora strukovnog obrazovanja i osposobljavanja.', viewNews: 'Pogledajte vijesti' },
    about: { kicker: 'O NAMA', title: 'Od ideje do utjecaja.', intro: 'VETechConn unapređuje digitalne vještine instruktora strukovnog obrazovanja i osposobljavanja.', body: 'Projekt povezuje stručnjake i institucije u Bosni i Hercegovini, Crnoj Gori i Hrvatskoj. Kroz međunarodnu suradnju, praktične radionice i dostupne digitalne resurse stvaramo sigurnije i suvremenije obrazovanje.', groups: 'Ciljne skupine', goal: 'Naši ciljevi', goalText: 'Povezati obrazovanje, inovacije i tržište rada kroz razmjenu znanja i razvoj novih programa.' },
    partners: { kicker: 'ZAJEDNO SMO JAČI', title: 'Mreža koja pokreće promjenu.', lead: 'Naš projekt okuplja institucije, škole i stručnjake iz regije i Europe.' },
    news: { kicker: 'VIJESTI I AKTIVNOSTI', title: 'Znanje u pokretu.', lead: 'Pratite radionice, susrete i rezultate projekta.', read: 'Pročitajte više', back: 'Natrag na vijesti', category: 'AKTIVNOST PROJEKTA' },
    contact: { kicker: 'KONTAKT', title: 'Razgovarajmo o budućnosti.', lead: 'Imate pitanje ili želite saznati više o projektu? Pošaljite nam poruku.', name: 'Ime i prezime', email: 'E-mail adresa', message: 'Poruka', send: 'Pošalji poruku', note: 'Klikom na gumb otvorit će se Outlook s pripremljenom porukom.', success: 'Vaša je poruka pripremljena u Outlooku.' },
    footer: 'Financirano sredstvima Europske unije. Stavovi i mišljenja izraženi su isključivo stavovi autora.',
  },
  sr: {
    nav: { home: 'Почетна', about: 'О нама', partners: 'Партнери', news: 'Вести', contact: 'Контакт' },
    home: { kicker: 'ERASMUS+ EDU-CB-VET', title: 'Дигиталне вештине за бољу будућност.', lead: 'Заједно градимо мостове између образовања, технологије и тржишта рада у Босни и Херцеговини, Црној Гори и Хрватској.', explore: 'Истражите пројекат', latest: 'Најновије вести', stat: 'активних партнера', impact: 'Знање које повезује.', impactText: 'VETechConn је иницијатива посвећена унапређењу дигиталних вештина инструктора стручног образовања и обуке.', viewNews: 'Погледајте вести' },
    about: { kicker: 'О НАМА', title: 'Од идеје до утицаја.', intro: 'VETechConn унапређује дигиталне вештине инструктора стручног образовања и обуке.', body: 'Пројекат повезује стручњаке и институције у Босни и Херцеговини, Црној Гори и Хрватској. Кроз међународну сарадњу, практичне радионице и доступне дигиталне ресурсе стварамо сигурније и савременије образовање.', groups: 'Циљне групе', goal: 'Наши циљеви', goalText: 'Повезати образовање, иновације и тржиште рада кроз размену знања и развој нових програма.' },
    partners: { kicker: 'ЗАЈЕДНО СМО ЈАЧИ', title: 'Мрежа која покреће промену.', lead: 'Наш пројекат окупља институције, школе и стручњаке из региона и Европе.' },
    news: { kicker: 'ВЕСТИ И АКТИВНОСТИ', title: 'Знање у покрету.', lead: 'Пратите радионице, сусрете и резултате пројекта.', read: 'Прочитајте више', back: 'Назад на вести', category: 'АКТИВНОСТ ПРОЈЕКТА' },
    contact: { kicker: 'КОНТАКТ', title: 'Разговарајмо о будућности.', lead: 'Имате питање или желите да сазнате више о пројекту? Пошаљите нам поруку.', name: 'Име и презиме', email: 'Е-mail адреса', message: 'Порука', send: 'Пошаљи поруку', note: 'Кликом на дугме отвориће се Outlook са припремљеном поруком.', success: 'Ваша порука је припремљена у Outlook-у.' },
    footer: 'Финансирано средствима Европске уније. Ставови и мишљења изражени су искључиво ставови аутора.',
  },
  sl: {
    nav: { home: 'Domov', about: 'O nas', partners: 'Partnerji', news: 'Novice', contact: 'Kontakt' },
    home: { kicker: 'ERASMUS+ EDU-CB-VET', title: 'Digitalne veščine za boljšo prihodnost.', lead: 'Skupaj gradimo mostove med izobraževanjem, tehnologijo in trgom dela v Bosni in Hercegovini, Črni gori in na Hrvaškem.', explore: 'Raziščite projekt', latest: 'Najnovejše novice', stat: 'aktivnih partnerjev', impact: 'Znanje, ki povezuje.', impactText: 'VETechConn je pobuda, namenjena izboljšanju digitalnih veščin inštruktorjev poklicnega izobraževanja in usposabljanja.', viewNews: 'Oglejte si novice' },
    about: { kicker: 'O NAS', title: 'Od ideje do vpliva.', intro: 'VETechConn izboljšuje digitalne veščine inštruktorjev poklicnega izobraževanja in usposabljanja.', body: 'Projekt povezuje strokovnjake in ustanove v Bosni in Hercegovini, Črni gori in na Hrvaškem. Z mednarodnim sodelovanjem, praktičnimi delavnicami in dostopnimi digitalnimi viri ustvarjamo varnejše in sodobnejše izobraževanje.', groups: 'Ciljne skupine', goal: 'Naši cilji', goalText: 'Povezati izobraževanje, inovacije in trg dela z izmenjavo znanja in razvojem novih programov.' },
    partners: { kicker: 'SKUPAJ SMO MOČNEJŠI', title: 'Mreža, ki ustvarja spremembe.', lead: 'Naš projekt združuje ustanove, šole in strokovnjake iz regije in Evrope.' },
    news: { kicker: 'NOVICE IN DEJAVNOSTI', title: 'Znanje v gibanju.', lead: 'Spremljajte delavnice, srečanja in rezultate projekta.', read: 'Preberite več', back: 'Nazaj na novice', category: 'PROJEKTNA DEJAVNOST' },
    contact: { kicker: 'KONTAKT', title: 'Pogovorimo se o prihodnosti.', lead: 'Imate vprašanje ali želite izvedeti več o projektu? Pošljite nam sporočilo.', name: 'Ime in priimek', email: 'E-poštni naslov', message: 'Sporočilo', send: 'Pošlji sporočilo', note: 'S klikom na gumb se bo odprl Outlook s pripravljeno vsebino.', success: 'Vaše sporočilo je pripravljeno v Outlooku.' },
    footer: 'Financira Evropska unija. Izražena stališča in mnenja pripadajo izključno avtorjem.',
  },
};
const newsItems = [  
  {
    id: 'digitalne-vjestine-moderne-ucionice',
    title: 'Digitalne vještine za moderne učionice',
    excerpt: 'Mašinski fakultet Univerziteta „Džemal Bijedić“ u Mostaru realizovao je program cjeloživotnog učenja za unapređenje digitalnih kompetencija nastavnika.',
    date: '',
    category: 'Aktivnosti projekta',
    image: 'Digitalne vještine za moderne učionice.webp',
    body: `U okviru Erasmus+ VETechConn projekta, Mašinski fakultet Univerziteta „Džemal Bijedić“ u Mostaru uspješno je realizovao program cjeloživotnog učenja „Digitalne kompetencije za nastavnike u srednjem strukovnom obrazovanju“.

    Ukupno 20 učesnika uspješno je završilo jedan ili više specijalizovanih kurseva koji pokrivaju nove digitalne tehnologije, uključujući:

    3D modeliranje i CNC
    Uvod u Internet stvari (IoT)
    3D printanje
    Fotogrametrija i 3D skeniranje
    Digitalizacija u upravljanju energijom

    Kroz ove programe obuke, nastavnici iz srednjih stručnih škola ojačali su svoje digitalne vještine i unaprijedili svoje kapacitete za integraciju inovativnih tehnologija u procese podučavanja i učenja. Inicijativa također doprinosi jačoj saradnji između obrazovnog sektora i industrije, podržavajući modernizaciju stručnog obrazovanja i obuke.

    Čestitamo svim učesnicima na uspješnom završetku programa i zahvaljujemo se svim partnerima koji su doprinijeli ovom postignuću. Radujemo se nastavku naših zajedničkih napora na unapređenju digitalnih kompetencija i podsticanju inovacija u strukovnom obrazovanju.

    Zajedno oblikujemo budućnost digitalnog i stručnog obrazovanja.`
    },
  {
    id: 'radionica-digitalne-pismenosti-zagreb',
    title: 'Radionica digitalne pismenosti u Zagrebu',
    excerpt: 'U sklopu Erasmus+ projekta, u Zagrebu je održana radionica usmjerena na jačanje digitalnih kompetencija i primjenu savremenih alata u obrazovanju.',
    date: '',
    category: 'Aktivnosti projekta',
    image: '/Radionica digitalne pismenosti u Zagrebu.webp',
    body: `U sklopu Erasmus+ projekta, u Zagrebu je uspješno održana Radionica digitalne pismenosti, koja je okupila projektne partnere s ciljem jačanja digitalnih kompetencija, razmjene znanja i unapređenja modernih pristupa obrazovanju. Tokom programa, učesnici su imali priliku da se uključe u specijalizovane obuke usmjerene na primjenu vještačke inteligencije u obrazovanju, korištenje platforme Google Classroom i drugih digitalnih alata, kao i razvoj multimedijalnog sadržaja za nastavni proces.

    Poseban segment programa uključivao je posjetu Regionalnom centru kompetencija u Tehničkoj školi Ruđer Bošković, gdje su partneri stekli vrijedan uvid u primjere najboljih praksi u tehničkom obrazovanju, digitalizaciji nastavnih procesa i razvoju kompetencija za buduće stručnjake. Ova razmjena iskustava dodatno je ojačala međunarodnu saradnju među partnerima i otvorila nove mogućnosti za implementaciju inovativnih obrazovnih modela.

    Kroz radionice, praktične sesije i interaktivne diskusije, učesnici su unaprijedili svoja znanja o modernim digitalnim alatima, inovativnim metodama podučavanja i transformaciji obrazovanja u skladu s potrebama modernog društva. Aktivnosti provedene u Zagrebu predstavljaju važan korak ka jačanju kapaciteta partnerskih institucija, modernizaciji obrazovnih praksi i razvoju održivih digitalnih kompetencija u okviru Erasmus+ inicijative.

    Ovaj događaj je još jednom potvrdio važnost međunarodne saradnje, razmjene stručnosti i zajedničkog razvoja inovativnih rješenja koja doprinose kvalitetnijem, inkluzivnijem i tehnološki naprednijem obrazovanju.`
  },
  {
    id: 'digitalne-vjestine-podgorica',
    date: '',
    image: '/Digitalne vještine koje čine razliku1.webp',
    images: [
      '/Digitalne vještine koje čine razliku1.webp',
      '/Digitalne vještine koje čine razliku2.webp',
    ],
    title: 'Digitalne vještine koje čine razliku – od učionice do stvarnog svijeta',
    excerpt:
      'Događaj u Podgorici okupio je nastavnike, predstavnike institucija, univerzitetske profesore i partnere iz EU radi razmjene iskustava o digitalnoj transformaciji obrazovanja.',
    body:
      'Događaj održan u Podgorici okupio je nastavnike koji su podijelili praktična iskustva iz učionice, predstavnike relevantnih institucija koji su se bavili digitalizacijom iz sistemske perspektive, univerzitetske profesore koji su govorili o očekivanjima za buduće studente i partnere iz zemalja EU koji su predstavili dokazane i uspješne prakse u digitalnoj transformaciji obrazovanja.\n\nTokom trodnevnog događaja, fokus je bio na usklađivanju obrazovanja s potrebama tržišta rada, razvoju ključnih digitalnih kompetencija kod učenika, predstavljanju praktične primjene digitalnih alata u školama, redefiniranju uloge nastavnika, razmjeni najboljih regionalnih praksi i promoviranju sistemskog pristupa digitalizaciji obrazovanja.\n\nKroz panel diskusije, radionice, studije slučaja i regionalne prezentacije, učesnici su istražili:\n\nŠta zaista funkcioniše u praksi\nKljučne izazove i kako ih prevazići\nKako digitalni alati doprinose mjerljivim poboljšanjima u nastavi\nSljedeće korake za škole i donosioce odluka\n\nCilj događaja je jasan – preći s dijaloga na konkretne preporuke i zajedničke inicijative koje unapređuju digitalne kompetencije i poboljšavaju zapošljivost studenata.',
  },
    {
    id: 'radionica-sarajevo',
    date: '',
    image: '/Radionica u Sarajevu1.webp',
    images: [
      '/Radionica u Sarajevu1.webp',
      '/Radionica u Sarajevu2.webp',
      '/Radionica u Sarajevu3.webp',
    ],
    title: 'Radionica u Sarajevu',
    excerpt:
      'U okviru ERASMUS VETechConn projekta organizovali smo radionice o digitalnoj transformaciji u obrazovanju za predstavnike srednjih stručnih škola i relevantnih institucija.',
    body:
      'U okviru ERASMUS VETechConn projekta, ove sedmice smo zajedno sa Zavodom za razvoj preduniverzitetskog obrazovanja Kantona Sarajevo organizovali radionice na temu „Digitalna transformacija u obrazovanju: Izazovi i rješenja“ za predstavnike srednjih stručnih škola i relevantnih institucija.\n\nOkupili smo 40 učesnika koji su kroz niz predavanja, diskusija i praktičnih aktivnosti istražili ključne digitalne kompetencije potrebne u modernoj nastavi. Učesnici su se upoznali s dobrim praksama za sigurno i odgovorno korištenje digitalnih alata, inovativnim pristupima nastavi, integraciji novih tehnologija u proces učenja i osnovama strateškog planiranja digitalne transformacije obrazovnih institucija.\n\nOvi skupovi jasno pokazuju da su razvoj digitalnih vještina nastavnika i jačanje međuinstitucionalne saradnje ključni temelji za izgradnju modernog, visokokvalitetnog i inkluzivnog obrazovnog sistema. Zajedno stvaramo okruženje u kojem digitalne tehnologije nisu samo alati, već prilika za napredak cijele zajednice.',
  },
  {
    id: 'simpozij-podgorica',
    date: '',
    image: '/Simpozij u Podgorici1.webp',
    images: [
      '/Simpozij u Podgorici1.webp',
      '/Simpozij u Podgorici2.webp',
    ],
    title: 'Simpozij u Podgorici: Jačanje digitalnih vještina kroz regionalnu saradnju',
    excerpt:
      'U Podgorici je od 23. do 25. juna održan simpozij posvećen digitalnim kompetencijama u srednjem stručnom obrazovanju, na kojem su predstavljeni rezultati analize jaza u vještinama za Bosnu i Hercegovinu i Crnu Goru.',
    body:
      'U okviru Erasmus+ projekta VET Tech Conn, u Podgorici je od 23. do 25. juna održan simpozij posvećen digitalnim kompetencijama u srednjem stručnom obrazovanju. Na simpoziju su predstavljeni rezultati Analize jaza u vještinama (Skills Gap Analysis) za Bosnu i Hercegovinu i Crnu Goru.\n\nDogađaj je okupio 14 partnera iz Hrvatske, Slovenije, Crne Gore i Bosne i Hercegovine. Rezultati istraživanja pokazuju da nastavnici u obje zemlje već koriste digitalne alate, ali je potrebna dodatna obuka kako bi proširili svoje znanje. Učenici također izražavaju snažan interes za rad s modernim digitalnim alatima i uglavnom preferiraju ovu vrstu učenja u odnosu na tradicionalne pristupe.\n\nTokom simpozija održane su dvije panel diskusije:\n\nPanel 1: Osnaživanje nastavnika – Uloga edukatora u unapređenju digitalnih kompetencija.\n\nDiskusija se fokusirala na ključne digitalne kompetencije za moderno obrazovanje, izazove s kojima se nastavnici suočavaju i vrstu institucionalne podrške koju očekuju.\n\nPanel 2: Institucionalne perspektive – Uloga institucija i agencija u oblikovanju digitalnih vještina.\n\nOvaj panel je ponudio uvid u to kako institucije mogu podržati škole u savladavanju prepreka i doprinijeti digitalnoj transformaciji obrazovanja.',
  },
    {
    id: 'izvjestaj-analiza-vjestina',
    date: '',
    image: '',
    title: 'Izvještaj o analizi nedostataka vještina',
    excerpt:
      'Analiza pristupa digitalnom usavršavanju nastavnika u strukovnom obrazovanju u Bosni i Hercegovini i Crnoj Gori, s fokusom na najbolje prakse i razvoj prilagođene metodologije.',
    body:
      'Ovaj dokument ima za cilj da predstavi detaljnu analizu različitih pristupa koji se trenutno primjenjuju u oblasti digitalnog usavršavanja nastavnika u strukovnom obrazovanju i obuci (VET) u Bosni i Hercegovini i Crnoj Gori. U njemu će se identifikovati i detaljnije objasniti najbolje prakse koje su se pokazale efikasnim i održivim, s posebnim fokusom na one koje se mogu prilagoditi specifičnim potrebama i kontekstima ove dvije zemlje. Ove najbolje prakse će poslužiti kao ključni doprinos u razvoju prilagođene metodologije za poboljšanje digitalnih kompetencija među edukatorima u strukovnom obrazovanju i obuci u obje zemlje.',
    pdf: '/Skills-Gap-Analysis-Report-.pdf',
  },
  {
    id: 'pocetni-sastanak',
    date: '28.01.2025.',
    image: '/pocetniSastanak.webp',
    title: 'Početni sastanak',
    excerpt:
      'Svih 14 projektnih partnera okupilo se 28. januara 2025. godine u Zagrebu kako bi razgovarali o narednim koracima i uspješnoj implementaciji projektnih aktivnosti.',
    body:
      'Na uvodnom sastanku Erasmus projekta VETechConn, čiji je cilj unapređenje digitalnih vještina nastavnika i edukatora iz ustanova strukovnog obrazovanja, svih 14 projektnih partnera okupilo se 28. januara 2025. godine u Zagrebu kako bi razgovarali o sljedećim koracima u saradnji s ciljem osiguranja uspješne implementacije projektnih aktivnosti. Projekat VETechConn unapređuje digitalne vještine nastavnika i osoblja u ustanovama strukovnog obrazovanja širom Bosne i Hercegovine i Crne Gore. Kroz naprednu digitalnu platformu, edukatori dobijaju obuku za suočavanje s izazovima digitalne transformacije u obrazovanju. Inicijativa ne samo da osnažuje nastavnike, već i poboljšava digitalnu pismenost učenika, povećavajući njihove vještine i konkurentnost na tržištu rada. Podsticanjem međunarodne saradnje, VETechConn doprinosi socioekonomskom razvoju lokalnih zajednica.',
  },
];

type NewsTranslation = {
  title: string;
  excerpt: string;
  body: string;
};

const newsTranslations: Record<
  Language,
  Record<string, NewsTranslation>
> = {
  bs: {
    'digitalne-vjestine-moderne-ucionice': {
      title: 'Digitalne vještine za moderne učionice',
      excerpt: 'Mašinski fakultet Univerziteta „Džemal Bijedić“ u Mostaru realizovao je program cjeloživotnog učenja za unapređenje digitalnih kompetencija nastavnika.',
      body: newsItems[0].body,
    },
    'radionica-digitalne-pismenosti-zagreb': {
      title: 'Radionica digitalne pismenosti u Zagrebu',
      excerpt: 'U sklopu Erasmus+ projekta, u Zagrebu je održana radionica usmjerena na jačanje digitalnih kompetencija i primjenu savremenih alata u obrazovanju.',
      body: newsItems[1].body,
    },
    'digitalne-vjestine-podgorica': {
      title: 'Digitalne vještine koje čine razliku – od učionice do stvarnog svijeta',
      excerpt: 'Događaj u Podgorici okupio je nastavnike, predstavnike institucija, univerzitetske profesore i partnere iz EU radi razmjene iskustava o digitalnoj transformaciji obrazovanja.',
      body: newsItems[2].body,
    },
    'radionica-sarajevo': {
      title: 'Radionica u Sarajevu',
      excerpt: 'U okviru ERASMUS VETechConn projekta organizovali smo radionice o digitalnoj transformaciji u obrazovanju za predstavnike srednjih stručnih škola i relevantnih institucija.',
      body: newsItems[3].body,
    },
    'simpozij-podgorica': {
      title: 'Simpozij u Podgorici: Jačanje digitalnih vještina kroz regionalnu saradnju',
      excerpt: 'U Podgorici je održan simpozij posvećen digitalnim kompetencijama u srednjem stručnom obrazovanju, uz predstavljanje rezultata analize jaza u vještinama.',
      body: newsItems[4].body,
    },
    'izvjestaj-analiza-vjestina': {
      title: 'Izvještaj o analizi nedostataka vještina',
      excerpt: 'Analiza pristupa digitalnom usavršavanju nastavnika u Bosni i Hercegovini i Crnoj Gori.',
      body: newsItems[5].body,
    },
    'pocetni-sastanak': {
      title: 'Početni sastanak',
      excerpt: 'Projektni partneri okupili su se u Zagrebu kako bi razgovarali o narednim koracima i implementaciji projektnih aktivnosti.',
      body: newsItems[6].body,
    },
  },

  en: {
    'digitalne-vjestine-moderne-ucionice': {
      title: 'Digital Skills for Modern Classrooms',
      excerpt: 'The Faculty of Mechanical Engineering at the University “Džemal Bijedić” in Mostar delivered a lifelong learning programme to improve teachers’ digital competences.',
      body: `As part of the Erasmus+ VETechConn project, the Faculty of Mechanical Engineering at the University “Džemal Bijedić” in Mostar successfully delivered the lifelong learning programme “Digital Competences for Teachers in Secondary Vocational Education”.

A total of 20 participants successfully completed one or more specialised courses covering new digital technologies, including:

3D modelling and CNC
Introduction to the Internet of Things (IoT)
3D printing
Photogrammetry and 3D scanning
Digitalisation in energy management

Through these training programmes, teachers from secondary vocational schools strengthened their digital skills and improved their ability to integrate innovative technologies into teaching and learning. The initiative also supports stronger cooperation between education and industry, contributing to the modernisation of vocational education and training.

Congratulations to all participants on completing the programme, and thank you to all partners who contributed to this achievement. We look forward to continuing our joint efforts to improve digital competences and encourage innovation in vocational education.

Together, we are shaping the future of digital and vocational education.`,
    },
    'radionica-digitalne-pismenosti-zagreb': {
      title: 'Digital Literacy Workshop in Zagreb',
      excerpt: 'As part of the Erasmus+ project, a workshop was held in Zagreb to strengthen digital competences and promote the use of modern educational tools.',
      body: `As part of the Erasmus+ project, a Digital Literacy Workshop was successfully held in Zagreb, bringing together project partners to strengthen digital competences, exchange knowledge and improve modern approaches to education. Participants took part in specialised training on the use of artificial intelligence in education, Google Classroom and other digital tools, as well as the development of multimedia teaching materials.

A special part of the programme included a visit to the Regional Centre of Competence at Ruđer Bošković Technical School. The partners gained valuable insight into best practices in technical education, the digitalisation of teaching and the development of skills for future professionals. This exchange further strengthened international cooperation and opened new opportunities for implementing innovative educational models.

Through workshops, practical sessions and interactive discussions, participants improved their knowledge of modern digital tools, innovative teaching methods and educational transformation in line with the needs of modern society. The activities in Zagreb represent an important step towards strengthening partner institutions, modernising educational practices and developing sustainable digital competences within the Erasmus+ initiative.

The event once again confirmed the importance of international cooperation, sharing expertise and jointly developing innovative solutions for more effective, inclusive and technologically advanced education.`,
    },
    'digitalne-vjestine-podgorica': {
      title: 'Digital Skills That Make a Difference – From the Classroom to the Real World',
      excerpt: 'The event in Podgorica brought together teachers, institutional representatives, university professors and EU partners to exchange experiences on the digital transformation of education.',
      body: `The event held in Podgorica brought together teachers who shared practical classroom experiences, representatives of relevant institutions who discussed digitalisation from a systemic perspective, university professors who spoke about expectations for future students, and EU partners who presented proven practices in the digital transformation of education.

During the three-day event, the focus was on aligning education with labour-market needs, developing key digital competences among students, demonstrating the practical use of digital tools in schools, redefining the role of teachers, exchanging regional best practices and promoting a systematic approach to educational digitalisation.

Through panel discussions, workshops, case studies and regional presentations, participants explored:

What works in practice
Key challenges and how to overcome them
How digital tools contribute to measurable improvements in teaching
Next steps for schools and decision-makers

The goal is clear: to move from dialogue to concrete recommendations and joint initiatives that improve digital competences and students’ employability.`,
    },
    'radionica-sarajevo': {
      title: 'Workshop in Sarajevo',
      excerpt: 'As part of the ERASMUS VETechConn project, workshops on digital transformation in education were organised for vocational school representatives and relevant institutions.',
      body: `As part of the ERASMUS VETechConn project, we organised workshops this week together with the Institute for the Development of Pre-University Education of Sarajevo Canton. The workshops focused on “Digital Transformation in Education: Challenges and Solutions” and were intended for representatives of secondary vocational schools and relevant institutions.

We brought together 40 participants who explored the key digital competences needed in modern teaching through lectures, discussions and practical activities. Participants learned about good practices for the safe and responsible use of digital tools, innovative teaching approaches, integrating new technologies into learning and the basics of strategic planning for the digital transformation of educational institutions.

These events clearly show that developing teachers’ digital skills and strengthening cooperation between institutions are essential foundations for a modern, high-quality and inclusive education system. Together, we are creating an environment in which digital technologies are not merely tools, but an opportunity for progress across the community.`,
    },
    'simpozij-podgorica': {
      title: 'Symposium in Podgorica: Strengthening Digital Skills Through Regional Cooperation',
      excerpt: 'A symposium on digital competences in secondary vocational education was held in Podgorica, presenting findings from a skills-gap analysis for Bosnia and Herzegovina and Montenegro.',
      body: `As part of the Erasmus+ VETechConn project, a symposium on digital competences in secondary vocational education was held in Podgorica from 23 to 25 June. The event presented the results of the Skills Gap Analysis for Bosnia and Herzegovina and Montenegro.

The event brought together 14 partners from Croatia, Slovenia, Montenegro and Bosnia and Herzegovina. The research shows that teachers in both countries already use digital tools, but further training is needed to expand their knowledge. Students also show strong interest in working with modern digital tools and generally prefer this type of learning to traditional approaches.

Two panel discussions were held during the symposium:

Panel 1: Empowering Teachers – The Role of Educators in Improving Digital Competences.

The discussion focused on key digital competences for modern education, the challenges teachers face and the types of institutional support they expect.

Panel 2: Institutional Perspectives – The Role of Institutions and Agencies in Shaping Digital Skills.

This panel explored how institutions can help schools overcome barriers and contribute to the digital transformation of education.`,
    },
    'izvjestaj-analiza-vjestina': {
      title: 'Skills Gap Analysis Report',
      excerpt: 'An analysis of approaches to digital training for vocational education teachers in Bosnia and Herzegovina and Montenegro, focusing on best practices and a tailored methodology.',
      body: `This document presents a detailed analysis of the approaches currently used for digital training of teachers in vocational education and training (VET) in Bosnia and Herzegovina and Montenegro. It identifies and explains best practices that have proven effective and sustainable, with particular attention to practices that can be adapted to the specific needs and contexts of these two countries. These practices will contribute to the development of a tailored methodology for improving digital competences among VET educators in both countries.`,
    },
    'pocetni-sastanak': {
      title: 'Kick-off Meeting',
      excerpt: 'All 14 project partners met in Zagreb on 28 January 2025 to discuss the next steps and the successful implementation of project activities.',
      body: `At the kick-off meeting of the VETechConn Erasmus project, which aims to improve the digital skills of teachers and educators in vocational education institutions, all 14 project partners gathered in Zagreb on 28 January 2025 to discuss the next steps and ensure the successful implementation of project activities. VETechConn improves the digital skills of teachers and staff in vocational education institutions across Bosnia and Herzegovina and Montenegro. Through an advanced digital platform, educators receive training to address the challenges of digital transformation in education. The initiative strengthens teachers and improves students’ digital literacy, skills and competitiveness in the labour market. By promoting international cooperation, VETechConn contributes to the socioeconomic development of local communities.`,
    },
  },

  hr: {
    'digitalne-vjestine-moderne-ucionice': {
      title: 'Digitalne vještine za moderne učionice',
      excerpt: 'Strojarski fakultet Sveučilišta „Džemal Bijedić“ u Mostaru proveo je program cjeloživotnog učenja za unaprjeđenje digitalnih kompetencija nastavnika.',
      body: `U okviru Erasmus+ projekta VETechConn, Strojarski fakultet Sveučilišta „Džemal Bijedić“ u Mostaru uspješno je proveo program cjeloživotnog učenja „Digitalne kompetencije nastavnika u srednjem strukovnom obrazovanju“.

Ukupno je 20 sudionika uspješno završilo jedan ili više specijaliziranih tečajeva koji obuhvaćaju nove digitalne tehnologije, uključujući:

3D modeliranje i CNC
Uvod u Internet stvari (IoT)
3D ispis
Fotogrametrija i 3D skeniranje
Digitalizacija u upravljanju energijom

Kroz ove programe osposobljavanja nastavnici srednjih strukovnih škola unaprijedili su svoje digitalne vještine i sposobnost integracije inovativnih tehnologija u poučavanje i učenje. Inicijativa također potiče suradnju obrazovnog sektora i industrije te modernizaciju strukovnog obrazovanja i osposobljavanja.

Čestitamo svim sudionicima na uspješnom završetku programa i zahvaljujemo svim partnerima koji su pridonijeli ovom postignuću. Radujemo se nastavku zajedničkih napora u unaprjeđenju digitalnih kompetencija i poticanju inovacija u strukovnom obrazovanju.

Zajedno oblikujemo budućnost digitalnog i strukovnog obrazovanja.`,
    },
    'radionica-digitalne-pismenosti-zagreb': {
      title: 'Radionica digitalne pismenosti u Zagrebu',
      excerpt: 'U sklopu Erasmus+ projekta u Zagrebu je održana radionica usmjerena na jačanje digitalnih kompetencija i primjenu suvremenih alata u obrazovanju.',
      body: `U sklopu Erasmus+ projekta u Zagrebu je uspješno održana Radionica digitalne pismenosti koja je okupila projektne partnere radi jačanja digitalnih kompetencija, razmjene znanja i unaprjeđenja suvremenih pristupa obrazovanju. Sudionici su sudjelovali u specijaliziranim edukacijama o primjeni umjetne inteligencije u obrazovanju, korištenju platforme Google Classroom i drugih digitalnih alata te izradi multimedijskih sadržaja za nastavu.

Poseban dio programa uključivao je posjet Regionalnom centru kompetencija u Tehničkoj školi Ruđer Bošković. Partneri su dobili vrijedan uvid u primjere dobre prakse u tehničkom obrazovanju, digitalizaciji nastavnih procesa i razvoju kompetencija budućih stručnjaka. Razmjena iskustava dodatno je ojačala međunarodnu suradnju i otvorila nove mogućnosti za primjenu inovativnih obrazovnih modela.

Kroz radionice, praktične sesije i interaktivne rasprave sudionici su unaprijedili znanje o suvremenim digitalnim alatima, inovativnim metodama poučavanja i transformaciji obrazovanja u skladu s potrebama modernog društva. Aktivnosti u Zagrebu važan su korak prema jačanju partnerskih institucija, modernizaciji obrazovnih praksi i razvoju održivih digitalnih kompetencija u okviru Erasmus+ inicijative.

Događaj je još jednom potvrdio važnost međunarodne suradnje, razmjene stručnosti i zajedničkog razvoja inovativnih rješenja za kvalitetnije, uključivije i tehnološki naprednije obrazovanje.`,
    },
    'digitalne-vjestine-podgorica': {
      title: 'Digitalne vještine koje čine razliku – od učionice do stvarnog svijeta',
      excerpt: 'Događaj u Podgorici okupio je nastavnike, predstavnike institucija, sveučilišne profesore i partnere iz EU-a radi razmjene iskustava o digitalnoj transformaciji obrazovanja.',
      body: `Događaj u Podgorici okupio je nastavnike koji su podijelili praktična iskustva iz učionice, predstavnike institucija koji su govorili o digitalizaciji iz sistemske perspektive, sveučilišne profesore koji su predstavili očekivanja za buduće studente te partnere iz EU-a koji su prikazali provjerene prakse digitalne transformacije obrazovanja.

Tijekom trodnevnog događaja naglasak je bio na usklađivanju obrazovanja s potrebama tržišta rada, razvoju ključnih digitalnih kompetencija učenika, praktičnoj primjeni digitalnih alata u školama, redefiniranju uloge nastavnika, razmjeni regionalnih primjera dobre prakse i sustavnom pristupu digitalizaciji obrazovanja.

Kroz panel-rasprave, radionice, studije slučaja i regionalna predstavljanja sudionici su istražili:

Što u praksi zaista funkcionira
Ključne izazove i načine njihova prevladavanja
Kako digitalni alati donose mjerljiva poboljšanja u nastavi
Sljedeće korake za škole i donositelje odluka

Cilj događaja je jasan – prijeći s dijaloga na konkretne preporuke i zajedničke inicijative koje unapređuju digitalne kompetencije i zapošljivost studenata.`,
    },
    'radionica-sarajevo': {
      title: 'Radionica u Sarajevu',
      excerpt: 'U okviru projekta ERASMUS VETechConn organizirane su radionice o digitalnoj transformaciji obrazovanja za predstavnike strukovnih škola i relevantnih institucija.',
      body: `U okviru projekta ERASMUS VETechConn ovog smo tjedna, zajedno sa Zavodom za razvoj preduniverzitetskog obrazovanja Kantona Sarajevo, organizirali radionice na temu „Digitalna transformacija u obrazovanju: izazovi i rješenja“ za predstavnike srednjih strukovnih škola i relevantnih institucija.

Okupili smo 40 sudionika koji su kroz predavanja, rasprave i praktične aktivnosti istražili ključne digitalne kompetencije potrebne u suvremenoj nastavi. Upoznali su se s dobrim praksama sigurnog i odgovornog korištenja digitalnih alata, inovativnim pristupima poučavanju, integracijom novih tehnologija u učenje i osnovama strateškog planiranja digitalne transformacije obrazovnih institucija.

Ovi susreti pokazuju da su razvoj digitalnih vještina nastavnika i jačanje međuinstitucionalne suradnje ključni temelji modernog, kvalitetnog i uključivog obrazovnog sustava. Zajedno stvaramo okruženje u kojem digitalne tehnologije nisu samo alati, nego prilika za napredak cijele zajednice.`,
    },
    'simpozij-podgorica': {
      title: 'Simpozij u Podgorici: Jačanje digitalnih vještina regionalnom suradnjom',
      excerpt: 'U Podgorici je održan simpozij o digitalnim kompetencijama u srednjem strukovnom obrazovanju, uz predstavljanje analize jaza u vještinama za BiH i Crnu Goru.',
      body: `U okviru Erasmus+ projekta VETechConn u Podgorici je od 23. do 25. lipnja održan simpozij o digitalnim kompetencijama u srednjem strukovnom obrazovanju. Predstavljeni su rezultati Analize jaza u vještinama za Bosnu i Hercegovinu i Crnu Goru.

Događaj je okupio 14 partnera iz Hrvatske, Slovenije, Crne Gore i Bosne i Hercegovine. Istraživanje pokazuje da nastavnici u obje zemlje već koriste digitalne alate, ali im je potrebna dodatna edukacija. Učenici također pokazuju velik interes za suvremene digitalne alate i uglavnom preferiraju takav način učenja u odnosu na tradicionalne pristupe.

Tijekom simpozija održane su dvije panel-rasprave:

Panel 1: Osnaživanje nastavnika – uloga edukatora u unaprjeđenju digitalnih kompetencija.

Rasprava se usredotočila na ključne digitalne kompetencije za suvremeno obrazovanje, izazove s kojima se nastavnici suočavaju i institucionalnu podršku koju očekuju.

Panel 2: Institucionalne perspektive – uloga institucija i agencija u oblikovanju digitalnih vještina.

Panel je prikazao kako institucije mogu pomoći školama u prevladavanju prepreka i pridonijeti digitalnoj transformaciji obrazovanja.`,
    },
    'izvjestaj-analiza-vjestina': {
      title: 'Izvješće o analizi nedostataka vještina',
      excerpt: 'Analiza pristupa digitalnom usavršavanju nastavnika u strukovnom obrazovanju u BiH i Crnoj Gori, s naglaskom na dobre prakse i prilagođenu metodologiju.',
      body: `Ovaj dokument donosi detaljnu analizu različitih pristupa koji se trenutačno primjenjuju u digitalnom usavršavanju nastavnika u strukovnom obrazovanju i osposobljavanju u Bosni i Hercegovini i Crnoj Gori. Identificira i objašnjava dobre prakse koje su se pokazale učinkovitima i održivima, osobito one koje se mogu prilagoditi potrebama i kontekstu tih dviju zemalja. Te će prakse pridonijeti razvoju prilagođene metodologije za unaprjeđenje digitalnih kompetencija nastavnika u strukovnom obrazovanju i osposobljavanju.`,
    },
    'pocetni-sastanak': {
      title: 'Početni sastanak',
      excerpt: 'Svih 14 projektnih partnera sastalo se u Zagrebu 28. siječnja 2025. kako bi dogovorili sljedeće korake i uspješnu provedbu projektnih aktivnosti.',
      body: `Na početnom sastanku Erasmus projekta VETechConn, čiji je cilj unaprijediti digitalne vještine nastavnika i edukatora u ustanovama strukovnog obrazovanja, svih 14 projektnih partnera okupilo se u Zagrebu 28. siječnja 2025. kako bi razgovarali o sljedećim koracima i uspješnoj provedbi projektnih aktivnosti. Projekt unapređuje digitalne vještine nastavnika i osoblja u ustanovama strukovnog obrazovanja u Bosni i Hercegovini i Crnoj Gori. Putem napredne digitalne platforme edukatori se osposobljavaju za izazove digitalne transformacije obrazovanja. Inicijativa jača nastavnike te poboljšava digitalnu pismenost, vještine i konkurentnost učenika na tržištu rada. Poticanjem međunarodne suradnje VETechConn pridonosi društveno-gospodarskom razvoju lokalnih zajednica.`,
    },
  },

  sr: {
    'digitalne-vjestine-moderne-ucionice': {
      title: 'Дигиталне вештине за модерне учионице',
      excerpt: 'Машински факултет Универзитета „Џемал Биједић“ у Мостару реализовао је програм целоживотног учења за унапређење дигиталних компетенција наставника.',
      body: `У оквиру Erasmus+ VETechConn пројекта, Машински факултет Универзитета „Џемал Биједић“ у Мостару успешно је реализовао програм целоживотног учења „Дигиталне компетенције наставника у средњем стручном образовању“.

Укупно 20 учесника успешно је завршило један или више специјализованих курсева који обухватају нове дигиталне технологије, укључујући:

3D моделирање и CNC
Увод у Интернет ствари (IoT)
3D штампање
Фотограметрија и 3D скенирање
Дигитализација у управљању енергијом

Кроз ове програме обуке, наставници средњих стручних школа унапредили су своје дигиталне вештине и способност интеграције иновативних технологија у наставу и учење. Иницијатива доприноси и јачој сарадњи образовног сектора и индустрије, као и модернизацији стручног образовања и обуке.

Честитамо свим учесницима на успешном завршетку програма и захваљујемо свим партнерима који су допринели овом постигнућу. Радујемо се наставку заједничких напора на унапређењу дигиталних компетенција и подстицању иновација у стручном образовању.

Заједно обликујемо будућност дигиталног и стручног образовања.`,
    },
    'radionica-digitalne-pismenosti-zagreb': {
      title: 'Радионица дигиталне писмености у Загребу',
      excerpt: 'У оквиру Erasmus+ пројекта, у Загребу је одржана радионица усмерена на јачање дигиталних компетенција и примену савремених алата у образовању.',
      body: `У оквиру Erasmus+ пројекта, у Загребу је успешно одржана Радионица дигиталне писмености која је окупила пројектне партнере ради јачања дигиталних компетенција, размене знања и унапређења савремених приступа образовању. Учесници су похађали специјализоване обуке о примени вештачке интелигенције у образовању, коришћењу платформе Google Classroom и других дигиталних алата, као и развоју мултимедијалних наставних материјала.

Посебан део програма обухватио је посету Регионалном центру компетенција у Техничкој школи Руђер Бошковић. Партнери су стекли драгоцен увид у примере добре праксе у техничком образовању, дигитализацији наставе и развоју компетенција будућих стручњака. Размена искустава додатно је ојачала међународну сарадњу и отворила нове могућности за примену иновативних образовних модела.

Кроз радионице, практичне сесије и интерактивне дискусије, учесници су унапредили знање о савременим дигиталним алатима, иновативним методама наставе и трансформацији образовања у складу са потребама савременог друштва. Активности у Загребу представљају важан корак ка јачању партнерских институција, модернизацији образовних пракси и развоју одрживих дигиталних компетенција у оквиру Erasmus+ иницијативе.

Догађај је још једном потврдио значај међународне сарадње, размене стручности и заједничког развоја иновативних решења за квалитетније, инклузивније и технолошки напредније образовање.`,
    },
    'digitalne-vjestine-podgorica': {
      title: 'Дигиталне вештине које праве разлику – од учионице до стварног света',
      excerpt: 'Догађај у Подгорици окупио је наставнике, представнике институција, универзитетске професоре и партнере из ЕУ ради размене искустава о дигиталној трансформацији образовања.',
      body: `Догађај у Подгорици окупио је наставнике који су поделили практична искуства из учионице, представнике институција који су говорили о дигитализацији из системске перспективе, универзитетске професоре који су представили очекивања за будуће студенте и партнере из ЕУ који су приказали проверене праксе дигиталне трансформације образовања.

Током тродневног догађаја, фокус је био на усклађивању образовања са потребама тржишта рада, развоју кључних дигиталних компетенција ученика, практичној примени дигиталних алата у школама, промени улоге наставника, размени регионалних примера добре праксе и системском приступу дигитализацији образовања.

Кроз панел-дискусије, радионице, студије случаја и регионалне презентације, учесници су истражили:

Шта заиста функционише у пракси
Кључне изазове и како их превазићи
Како дигитални алати доприносе мерљивим побољшањима наставе
Следеће кораке за школе и доносиоце одлука

Циљ догађаја је јасан – прећи са дијалога на конкретне препоруке и заједничке иницијативе које унапређују дигиталне компетенције и запошљивост студената.`,
    },
    'radionica-sarajevo': {
      title: 'Радионица у Сарајеву',
      excerpt: 'У оквиру ERASMUS VETechConn пројекта организоване су радионице о дигиталној трансформацији образовања за представнике средњих стручних школа и релевантних институција.',
      body: `У оквиру ERASMUS VETechConn пројекта, ове седмице смо заједно са Заводом за развој предуниверзитетског образовања Кантона Сарајево организовали радионице на тему „Дигитална трансформација у образовању: изазови и решења“ за представнике средњих стручних школа и релевантних институција.

Окупили смо 40 учесника који су кроз предавања, дискусије и практичне активности истражили кључне дигиталне компетенције потребне у савременој настави. Учесници су се упознали са добрим праксама безбедног и одговорног коришћења дигиталних алата, иновативним приступима настави, интеграцијом нових технологија у процес учења и основама стратешког планирања дигиталне трансформације образовних институција.

Ови скупови показују да су развој дигиталних вештина наставника и јачање међуинституционалне сарадње кључни темељи модерног, квалитетног и инклузивног образовног система. Заједно стварамо окружење у којем дигиталне технологије нису само алати, већ прилика за напредак целе заједнице.`,
    },
    'simpozij-podgorica': {
      title: 'Симпозијум у Подгорици: Јачање дигиталних вештина кроз регионалну сарадњу',
      excerpt: 'У Подгорици је одржан симпозијум о дигиталним компетенцијама у средњем стручном образовању, уз представљање анализе јаза у вештинама за БиХ и Црну Гору.',
      body: `У оквиру Erasmus+ пројекта VETechConn, у Подгорици је од 23. до 25. јуна одржан симпозијум о дигиталним компетенцијама у средњем стручном образовању. Представљени су резултати Анализе јаза у вештинама за Босну и Херцеговину и Црну Гору.

Догађај је окупио 14 партнера из Хрватске, Словеније, Црне Горе и Босне и Херцеговине. Истраживање показује да наставници у обе земље већ користе дигиталне алате, али им је потребна додатна обука. Ученици такође показују велико интересовање за савремене дигиталне алате и углавном преферирају овај начин учења у односу на традиционалне приступе.

Током симпозијума одржане су две панел-дискусије:

Панел 1: Оснаживање наставника – улога едукатора у унапређењу дигиталних компетенција.

Дискусија се усредсредила на кључне дигиталне компетенције за савремено образовање, изазове са којима се наставници суочавају и институционалну подршку коју очекују.

Панел 2: Институционалне перспективе – улога институција и агенција у обликовању дигиталних вештина.

Панел је показао како институције могу помоћи школама да превазиђу препреке и допринесу дигиталној трансформацији образовања.`,
    },
    'izvjestaj-analiza-vjestina': {
      title: 'Извештај о анализи недостатака вештина',
      excerpt: 'Анализа приступа дигиталном усавршавању наставника у стручном образовању у БиХ и Црној Гори, са фокусом на добре праксе и прилагођену методологију.',
      body: `Овај документ представља детаљну анализу приступа који се тренутно примењују у дигиталном усавршавању наставника у стручном образовању и обуци у Босни и Херцеговини и Црној Гори. Идентификује и објашњава добре праксе које су се показале ефикасним и одрживим, посебно оне које се могу прилагодити потребама и контексту ове две земље. Те праксе ће допринети развоју прилагођене методологије за унапређење дигиталних компетенција наставника у стручном образовању и обуци у обе земље.`,
    },
    'pocetni-sastanak': {
      title: 'Почетни састанак',
      excerpt: 'Свих 14 пројектних партнера окупило се у Загребу 28. јануара 2025. године како би разговарали о наредним корацима и спровођењу пројектних активности.',
      body: `На почетном састанку Erasmus пројекта VETechConn, чији је циљ унапређење дигиталних вештина наставника и едукатора у установама стручног образовања, свих 14 пројектних партнера окупило се у Загребу 28. јануара 2025. године како би разговарали о наредним корацима и успешној реализацији пројектних активности. Пројекат унапређује дигиталне вештине наставника и особља у установама стручног образовања широм Босне и Херцеговине и Црне Горе. Кроз напредну дигиталну платформу, едукатори се обучавају за изазове дигиталне трансформације образовања. Иницијатива јача наставнике и унапређује дигиталну писменост ученика, њихове вештине и конкурентност на тржишту рада. Подстицањем међународне сарадње, VETechConn доприноси друштвено-економском развоју локалних заједница.`,
    },
  },

  sl: {
    'digitalne-vjestine-moderne-ucionice': {
      title: 'Digitalne spretnosti za sodobne učilnice',
      excerpt: 'Strojna fakulteta Univerze „Džemal Bijedić“ v Mostarju je izvedla program vseživljenjskega učenja za izboljšanje digitalnih kompetenc učiteljev.',
      body: `V okviru projekta Erasmus+ VETechConn je Strojna fakulteta Univerze „Džemal Bijedić“ v Mostarju uspešno izvedla program vseživljenjskega učenja „Digitalne kompetence učiteljev v srednjem poklicnem izobraževanju“.

Skupno je 20 udeležencev uspešno zaključilo enega ali več specializiranih tečajev, ki zajemajo nove digitalne tehnologije, vključno z:

3D-modeliranjem in CNC
Uvodom v internet stvari (IoT)
3D-tiskanjem
Fotogrametrijo in 3D-skeniranjem
Digitalizacijo upravljanja energije

S temi programi usposabljanja so učitelji srednjih poklicnih šol izboljšali svoje digitalne spretnosti in sposobnost vključevanja inovativnih tehnologij v poučevanje in učenje. Pobuda spodbuja tudi tesnejše sodelovanje med izobraževanjem in industrijo ter posodabljanje poklicnega izobraževanja in usposabljanja.

Čestitamo vsem udeležencem za uspešen zaključek programa in se zahvaljujemo vsem partnerjem, ki so prispevali k temu dosežku. Veselimo se nadaljnjih skupnih prizadevanj za izboljšanje digitalnih kompetenc in spodbujanje inovacij v poklicnem izobraževanju.

Skupaj oblikujemo prihodnost digitalnega in poklicnega izobraževanja.`,
    },
    'radionica-digitalne-pismenosti-zagreb': {
      title: 'Delavnica digitalne pismenosti v Zagrebu',
      excerpt: 'V okviru projekta Erasmus+ je v Zagrebu potekala delavnica za krepitev digitalnih kompetenc in uporabo sodobnih orodij v izobraževanju.',
      body: `V okviru projekta Erasmus+ je v Zagrebu uspešno potekala delavnica digitalne pismenosti, ki je povezala projektne partnerje z namenom krepitve digitalnih kompetenc, izmenjave znanja in izboljšanja sodobnih pristopov k izobraževanju. Udeleženci so se vključili v specializirana usposabljanja o uporabi umetne inteligence v izobraževanju, platforme Google Classroom in drugih digitalnih orodij ter o razvoju večpredstavnih učnih vsebin.

Poseben del programa je vključeval obisk Regionalnega centra kompetenc na Tehniški šoli Ruđer Bošković. Partnerji so pridobili dragocen vpogled v dobre prakse tehniškega izobraževanja, digitalizacije poučevanja in razvoja kompetenc prihodnjih strokovnjakov. Izmenjava izkušenj je dodatno okrepila mednarodno sodelovanje in odprla nove možnosti za uvajanje inovativnih izobraževalnih modelov.

Z delavnicami, praktičnimi srečanji in interaktivnimi razpravami so udeleženci izboljšali znanje o sodobnih digitalnih orodjih, inovativnih metodah poučevanja in preobrazbi izobraževanja v skladu s potrebami sodobne družbe. Dejavnosti v Zagrebu so pomemben korak h krepitvi partnerskih ustanov, posodobitvi izobraževalnih praks in razvoju trajnostnih digitalnih kompetenc v okviru pobude Erasmus+.

Dogodek je ponovno potrdil pomen mednarodnega sodelovanja, izmenjave strokovnega znanja in skupnega razvoja inovativnih rešitev za kakovostnejše, vključujoče in tehnološko naprednejše izobraževanje.`,
    },
    'digitalne-vjestine-podgorica': {
      title: 'Digitalne spretnosti, ki prinašajo spremembe – od učilnice do resničnega sveta',
      excerpt: 'Dogodek v Podgorici je povezal učitelje, predstavnike ustanov, univerzitetne profesorje in partnerje iz EU za izmenjavo izkušenj o digitalni preobrazbi izobraževanja.',
      body: `Dogodek v Podgorici je povezal učitelje, ki so predstavili praktične izkušnje iz učilnic, predstavnike ustanov, ki so razpravljali o digitalizaciji s sistemskega vidika, univerzitetne profesorje, ki so govorili o pričakovanjih za prihodnje študente, ter partnerje iz EU, ki so predstavili preverjene prakse digitalne preobrazbe izobraževanja.

V treh dneh je bil poudarek na usklajevanju izobraževanja s potrebami trga dela, razvoju ključnih digitalnih kompetenc učencev, praktični uporabi digitalnih orodij v šolah, spreminjanju vloge učiteljev, izmenjavi regionalnih dobrih praks in sistemskem pristopu k digitalizaciji izobraževanja.

Na panelnih razpravah, delavnicah, študijah primerov in regionalnih predstavitvah so udeleženci raziskali:

Kaj v praksi dejansko deluje
Ključne izzive in načine za njihovo premagovanje
Kako digitalna orodja prispevajo k merljivim izboljšavam poučevanja
Naslednje korake za šole in odločevalce

Cilj dogodka je jasen – preiti od dialoga h konkretnim priporočilom in skupnim pobudam, ki izboljšujejo digitalne kompetence in zaposljivost študentov.`,
    },
    'radionica-sarajevo': {
      title: 'Delavnica v Sarajevu',
      excerpt: 'V okviru projekta ERASMUS VETechConn smo za predstavnike srednjih poklicnih šol in ustreznih ustanov organizirali delavnice o digitalni preobrazbi izobraževanja.',
      body: `V okviru projekta ERASMUS VETechConn smo ta teden skupaj z Zavodom za razvoj preduniverzitetnega izobraževanja Kantona Sarajevo organizirali delavnice z naslovom „Digitalna preobrazba izobraževanja: izzivi in rešitve“ za predstavnike srednjih poklicnih šol in ustreznih ustanov.

Zbrali smo 40 udeležencev, ki so na predavanjih, razpravah in praktičnih dejavnostih raziskovali ključne digitalne kompetence za sodobni pouk. Spoznali so dobre prakse varne in odgovorne uporabe digitalnih orodij, inovativne pristope k poučevanju, vključevanje novih tehnologij v učenje in osnove strateškega načrtovanja digitalne preobrazbe izobraževalnih ustanov.

Ti dogodki kažejo, da sta razvoj digitalnih spretnosti učiteljev in krepitev sodelovanja med ustanovami ključna temelja sodobnega, kakovostnega in vključujočega izobraževalnega sistema. Skupaj ustvarjamo okolje, v katerem digitalne tehnologije niso le orodja, temveč priložnost za napredek celotne skupnosti.`,
    },
    'simpozij-podgorica': {
      title: 'Simpozij v Podgorici: Krepitev digitalnih spretnosti z regionalnim sodelovanjem',
      excerpt: 'V Podgorici je potekal simpozij o digitalnih kompetencah v srednjem poklicnem izobraževanju, na katerem so bili predstavljeni rezultati analize vrzeli v znanju za BiH in Črno goro.',
      body: `V okviru projekta Erasmus+ VETechConn je v Podgorici od 23. do 25. junija potekal simpozij o digitalnih kompetencah v srednjem poklicnem izobraževanju. Predstavljeni so bili rezultati analize vrzeli v znanju za Bosno in Hercegovino ter Črno goro.

Dogodek je povezal 14 partnerjev iz Hrvaške, Slovenije, Črne gore in Bosne in Hercegovine. Raziskava kaže, da učitelji v obeh državah že uporabljajo digitalna orodja, vendar potrebujejo dodatno usposabljanje. Tudi učenci kažejo veliko zanimanje za sodobna digitalna orodja in tak način učenja večinoma raje izbirajo kot tradicionalne pristope.

Med simpozijem sta potekali dve panelni razpravi:

Panel 1: Opolnomočenje učiteljev – vloga izobraževalcev pri izboljšanju digitalnih kompetenc.

Razprava se je osredotočila na ključne digitalne kompetence za sodobno izobraževanje, izzive učiteljev in institucionalno podporo, ki jo pričakujejo.

Panel 2: Institucionalni vidiki – vloga ustanov in agencij pri oblikovanju digitalnih spretnosti.

Panel je pokazal, kako lahko ustanove pomagajo šolam premagovati ovire in prispevajo k digitalni preobrazbi izobraževanja.`,
    },
    'izvjestaj-analiza-vjestina': {
      title: 'Poročilo o analizi vrzeli v spretnostih',
      excerpt: 'Analiza pristopov k digitalnemu usposabljanju učiteljev v poklicnem izobraževanju v BiH in Črni gori, s poudarkom na dobrih praksah in prilagojeni metodologiji.',
      body: `Ta dokument predstavlja podrobno analizo pristopov, ki se trenutno uporabljajo za digitalno usposabljanje učiteljev v poklicnem izobraževanju in usposabljanju v Bosni in Hercegovini ter Črni gori. Opredeljuje in pojasnjuje dobre prakse, ki so se izkazale za učinkovite in trajnostne, zlasti tiste, ki jih je mogoče prilagoditi potrebam in okoliščinam obeh držav. Te prakse bodo prispevale k razvoju prilagojene metodologije za izboljšanje digitalnih kompetenc izobraževalcev v poklicnem izobraževanju in usposabljanju v obeh državah.`,
    },
    'pocetni-sastanak': {
      title: 'Uvodni sestanek',
      excerpt: 'Vseh 14 projektnih partnerjev se je 28. januarja 2025 zbralo v Zagrebu, da bi razpravljali o naslednjih korakih in uspešni izvedbi projektnih dejavnosti.',
      body: `Na uvodnem sestanku projekta Erasmus VETechConn, katerega cilj je izboljšati digitalne spretnosti učiteljev in izobraževalcev v ustanovah poklicnega izobraževanja, se je vseh 14 projektnih partnerjev 28. januarja 2025 zbralo v Zagrebu, da bi razpravljali o naslednjih korakih in uspešni izvedbi projektnih dejavnosti. Projekt izboljšuje digitalne spretnosti učiteljev in osebja v ustanovah poklicnega izobraževanja v Bosni in Hercegovini ter Črni gori. Prek napredne digitalne platforme se izobraževalci usposabljajo za izzive digitalne preobrazbe izobraževanja. Pobuda krepi učitelje ter izboljšuje digitalno pismenost, spretnosti in konkurenčnost učencev na trgu dela. Z mednarodnim sodelovanjem VETechConn prispeva k družbeno-gospodarskemu razvoju lokalnih skupnosti.`,
    },
  },
};
type AboutDetails = { primary: string; secondary: string; groupsIntro: string; goalDescription: string; goals: { title: string; text: string }[] };
const aboutDetails: Record<Language, AboutDetails> = {
  bs: { primary: 'Inicijativa VETechConn posvećena je unapređenju digitalne vještine instruktora stručnog obrazovanja i obuke (VET) širom Bosne i Hercegovine (u Sarajevu i Vogošći) i Crne Gore (u Nikšiću i Podgorici), zajedno s edukatorima iz relevantnih stručnih institucija (u Sarajevu, Zenici, Goraždu i Širokom Brijegu u Bosni i Hercegovini; i Podgorici u Crnoj Gori). Cilj ovog poduhvata je osnažiti ove edukatore pružajući im sveobuhvatne resurse i materijale za obuku dostupne putem najsavremenije digitalne platforme, simbolično nazvane VETechConn. Razvoj prilagođenih programa obuke olakšat će partnerske organizacije iz zemalja Zapadnog Balkana, koristeći svoju specifičnu stručnost i znanje, uz istovremeno primanje smjernica od cijenjenih partnera iz EU iz Hrvatske i Slovenije. Ovaj zajednički napor usmjeren je na premošćivanje različitih zahtjeva sektora strukovnog obrazovanja i izazova digitalne transformacije s kojima se suočava osoblje strukovnih institucija.', secondary: 'Projekat će pažljivo planirati integriranu raspodjelu zadataka širom Bosne i Hercegovine i Crne Gore, shvatajući vitalni značaj njegove međunarodne implementacije. Kroz ovu transformativnu inicijativu, koja se fokusira na podsticanje digitalnih vještina nastavnika i institucionalnog osoblja, učenici će značajno poboljšati svoju digitalnu pismenost. Posljedično, to će povećati njihovu konkurentnost na tržištu rada i imati pozitivan uticaj na socioekonomsko okruženje cijele zajednice.', groupsIntro: 'U skladu sa prepoznatim izazovima, identifikovane su sljedeće ciljne grupe:', goalDescription: 'Stručno obrazovanje i obuka igraju ključnu ulogu u unaprjeđivanju nekoliko važnih aspekata vezanih za zapošljavanje mladih i poboljšanje njihovih izgleda na tržištu rada. Stručno obrazovanje značajno doprinosi sprečavanju nezaposlenosti mladih pružajući im specifična znanja i vještine direktno primjenjive u određenim industrijama, čime se povezuju njihovo znanje i zapošljavanje nakon završenog obrazovanja. Osim toga, inovativno stručno obrazovanje igra ključnu ulogu u usklađivanju obrazovanja i obuke sa zahtjevima tržišta rada.', goals: [{ title: 'Specifični cilj 1:', text: 'Uspostaviti mrežu koja olakšava razmjenu primjernih praksi između pružatelja stručnog obrazovanja u Bosni i Hercegovini i Crnoj Gori i među državama članicama EU, Hrvatskoj i Sloveniji, kao i podsticanje mogućnosti za međukulturnu saradnju.' }, { title: 'Specifični cilj 2:', text: 'Razvoj i implementacija inovativnih programa za profesore iz strukovnih škola korištenjem moderne digitalne tehnologije i optimizacijom njenog potencijala među relevantnim učesnicima.' }, { title: 'Specifični cilj 3:', text: 'Unaprijediti metode podučavanja razvojem inovativnih programa prilagođenih specifičnim potrebama tržišta rada.' }] },
  en: { primary: 'VETechConn is dedicated to improving the digital skills of vocational education and training instructors across Bosnia and Herzegovina and Montenegro. It empowers educators with practical resources, training materials and a modern digital platform while connecting Western Balkan partners with experienced EU partners from Croatia and Slovenia.', secondary: 'The project coordinates an international implementation focused on strengthening the digital literacy of teachers, institutional staff and learners. This will improve learners’ employability and contribute to the socioeconomic development of their communities.', groupsIntro: 'Based on the identified challenges, the following target groups have been recognised:', goalDescription: 'Vocational education and training plays a key role in youth employment and in improving access to the labour market. It equips learners with practical, industry-relevant skills and helps align education and training with real labour-market needs.', goals: [{ title: 'Specific objective 1:', text: 'Create a network that supports the exchange of good practices between VET providers in Bosnia and Herzegovina, Montenegro, Croatia and Slovenia and encourages intercultural cooperation.' }, { title: 'Specific objective 2:', text: 'Develop and implement innovative programmes for vocational school teachers using modern digital technologies.' }, { title: 'Specific objective 3:', text: 'Improve teaching methods through innovative programmes adapted to specific labour-market needs.' }] },
  hr: { primary: 'Inicijativa VETechConn posvećena je unapređenju digitalnih vještina instruktora strukovnog obrazovanja i osposobljavanja u Bosni i Hercegovini i Crnoj Gori. Edukatorima pruža resurse, materijale za obuku i savremenu digitalnu platformu, uz povezivanje partnera Zapadnog Balkana s iskusnim partnerima iz Hrvatske i Slovenije.', secondary: 'Projekt planira međunarodnu provedbu usmjerenu na jačanje digitalne pismenosti nastavnika, institucionalnog osoblja i učenika. Time se poboljšava njihova konkurentnost na tržištu rada i doprinosi razvoju lokalnih zajednica.', groupsIntro: 'U skladu s prepoznatim izazovima, identificirane su sljedeće ciljne skupine:', goalDescription: 'Strukovno obrazovanje i osposobljavanje ima ključnu ulogu u zapošljavanju mladih. Učenicima pruža praktična znanja i vještine te obrazovanje usklađuje sa stvarnim potrebama tržišta rada.', goals: [{ title: 'Specifični cilj 1:', text: 'Uspostaviti mrežu za razmjenu dobrih praksi između pružatelja strukovnog obrazovanja i poticati međukulturnu suradnju.' }, { title: 'Specifični cilj 2:', text: 'Razviti i provesti inovativne programe za nastavnike strukovnih škola uz korištenje suvremenih digitalnih tehnologija.' }, { title: 'Specifični cilj 3:', text: 'Unaprijediti metode poučavanja programima prilagođenima potrebama tržišta rada.' }] },
  sr: { primary: 'Иницијатива VETechConn посвећена је унапређењу дигиталних вештина инструктора стручног образовања и обуке у Босни и Херцеговини и Црној Гори. Едукаторима пружа ресурсе, материјале за обуку и савремену дигиталну платформу, повезујући партнере Западног Балкана са искусним партнерима из Хрватске и Словеније.', secondary: 'Пројекат планира међународну реализацију усмерену на јачање дигиталне писмености наставника, институционалног особља и ученика. Тиме се побољшава њихова конкурентност на тржишту рада и доприноси развоју заједнице.', groupsIntro: 'У складу са препознатим изазовима, идентификоване су следеће циљне групе:', goalDescription: 'Стручно образовање и обука имају кључну улогу у запошљавању младих. Ученицима пружају практична знања и вештине и усклађују образовање са потребама тржишта рада.', goals: [{ title: 'Специфични циљ 1:', text: 'Успоставити мрежу за размену добрих пракси и подстицати међукултурну сарадњу.' }, { title: 'Специфични циљ 2:', text: 'Развити иновативне програме за наставнике стручних школа уз употребу савремених дигиталних технологија.' }, { title: 'Специфични циљ 3:', text: 'Унапредити методе подучавања програмима прилагођеним потребама тржишта рада.' }] },
  sl: { primary: 'Pobuda VETechConn izboljšuje digitalne veščine inštruktorjev poklicnega izobraževanja in usposabljanja v Bosni in Hercegovini ter Črni gori. Izobraževalcem zagotavlja vire, gradiva za usposabljanje in sodobno digitalno platformo ter povezuje partnerje Zahodnega Balkana s partnerji iz Hrvaške in Slovenije.', secondary: 'Projekt načrtuje mednarodno izvedbo, usmerjeno v krepitev digitalne pismenosti učiteljev, institucionalnega osebja in učencev. To bo izboljšalo njihovo konkurenčnost na trgu dela in prispevalo k razvoju skupnosti.', groupsIntro: 'Na podlagi prepoznanih izzivov so bile opredeljene naslednje ciljne skupine:', goalDescription: 'Poklicno izobraževanje ima ključno vlogo pri zaposlovanju mladih. Učencem zagotavlja praktična znanja in spretnosti ter izobraževanje usklajuje z dejanskimi potrebami trga dela.', goals: [{ title: 'Specifični cilj 1:', text: 'Vzpostaviti mrežo za izmenjavo dobrih praks in spodbujati medkulturno sodelovanje.' }, { title: 'Specifični cilj 2:', text: 'Razviti inovativne programe za učitelje poklicnih šol z uporabo sodobnih digitalnih tehnologij.' }, { title: 'Specifični cilj 3:', text: 'Izboljšati metode poučevanja s programi, prilagojenimi potrebam trga dela.' }] },
};
const targetGroups = [
  { icon: GraduationCap, title: 'Nastavnici stručnog obrazovanja', text: 'Nastavnici koji svakodnevno razvijaju savremene vještine i znanja.' },
  { icon: Network, title: 'Multiplikatori znanja', text: 'Stručnjaci i institucije koji prenose iskustva i dobre prakse.' },
  { icon: Users, title: 'Učenici', text: 'Mladi koji kroz bolje obrazovanje grade sigurniju budućnost.' },
];
const targetGroupsByLanguage: Record<Language, { icon: typeof GraduationCap; title: string; text: string }[]> = {
  bs: targetGroups,
  sr: [{ icon: GraduationCap, title: 'Наставници стручног образовања', text: 'Наставници који развијају савремена знања и вештине.' }, { icon: Network, title: 'Мултипликатори знања', text: 'Стручњаци који преносе искуства и добре праксе.' }, { icon: Users, title: 'Ученици', text: 'Млади који кроз боље образовање граде будућност.' }],
  hr: [{ icon: GraduationCap, title: 'Nastavnici strukovnog obrazovanja', text: 'Nastavnici koji razvijaju suvremena znanja i vještine.' }, { icon: Network, title: 'Multiplikatori znanja', text: 'Stručnjaci koji prenose iskustva i dobre prakse.' }, { icon: Users, title: 'Učenici', text: 'Mladi koji kroz bolje obrazovanje grade budućnost.' }],
  sl: [{ icon: GraduationCap, title: 'Učitelji poklicnega izobraževanja', text: 'Učitelji, ki razvijajo sodobno znanje in spretnosti.' }, { icon: Network, title: 'Multiplikatorji znanja', text: 'Strokovnjaki, ki prenašajo izkušnje in dobre prakse.' }, { icon: Users, title: 'Učenci', text: 'Mladi, ki z boljšim izobraževanjem gradijo prihodnost.' }],
  en: [{ icon: GraduationCap, title: 'VET teachers', text: 'Teachers developing modern knowledge and skills.' }, { icon: Network, title: 'Knowledge multipliers', text: 'Experts sharing experience and good practice.' }, { icon: Users, title: 'Learners', text: 'Young people building their future through better education.' }],
};
const partners = [
  { name: 'Sveučilište', url: 'https://www.algebra.hr/sveuciliste/', logo: 'algebra.webp' },
  { name: 'Cene Štupar – Ljubljana', url: 'https://www.cene-stupar.si/', logo: 'cene-stupa.webp' },
  { name: 'Univerzitet „Džemal Bijedić“ u Mostaru', url: 'https://www.unmo.ba/', logo: 'dzemala_bijedic-1.webp' },
  { name: 'Institut za razvoj preduniverzitetskog obrazovanja', url: 'https://irpo.ba/', logo: 'irpo.webp' },
  { name: 'LURS', url: 'https://lu-rogaska.si/', logo: 'lurs.webp' },
  { name: 'Pedagoški zavod Bosansko-podrinjskog kantona', url: 'https://pzbpkgorazde.ba/', logo: 'pzbbkgorazde-1-300x102.webp' },
  { name: 'Srednja mašinska tehnička škola Sarajevo', url: 'https://smts.edu.ba/', logo: 'smts-300x229.webp' },
  { name: 'Stručna škola', url: 'https://elektroskolank.me/', logo: 'ss_niksic.gif' },
  { name: 'Institute', url: 'https://verlabinstitute.com/', logo: 'inst2-1.webp' },
  { name: 'Centar za stručno obrazovanje', url: 'https://www.gov.me/cso', logo: 'cg_centar-3-300x246.webp' },
  { name: 'Srednjoškolski centar Vogošća', url: '', logo: 'vogosca-2 (1).webp' },
  { name: 'Zavod za odgoj i obrazovanje', url: 'https://zavod-zzoo.com/', logo: 'zzoo.webp' },
  { name: 'Pedagoški zavod Zenica', url: 'https://pedzavodzenica.ba/', logo: 'image-Photoroom-768x160.webp' },
  { name: 'Srednja stručna škola Podgorica', url: 'https://elektropg.online/ets/', logo: 'vaso_sss.webp' },
];
function getRoute(): { page: Page; articleId?: string } {
  const value = window.location.hash.replace(/^#\/?/, '') || 'pocetna';
  if (value.startsWith('vijesti/')) return { page: 'article', articleId: value.replace('vijesti/', '') };
  const pages: Record<string, Page> = { pocetna: 'home', 'o-nama': 'about', partneri: 'partners', vijesti: 'news', kontakt: 'contact' };
  return { page: pages[value] ?? 'home' };
}
function App() {
  const [language, setLanguage] = useState<Language>('bs');
  const [route, setRoute] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languagePickerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      languagePickerRef.current &&
      !languagePickerRef.current.contains(event.target as Node)
    ) {
      setLanguageOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
  const t = copy[language];
const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'bs', label: 'Bosanski', flag: '/bih.jpeg' },
  { value: 'sr', label: 'Srpski', flag: '/serbia.jpeg' },
  { value: 'hr', label: 'Hrvatski', flag: '/croatia.jpeg' },
  { value: 'sl', label: 'Slovenski', flag: '/slovenia.jpg' },
  { value: 'en', label: 'English', flag: '/uk.webp' },
];
  useEffect(() => { const onHashChange = () => { setRoute(getRoute()); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }; window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange); }, []);
  const go = (path: string) => { window.location.hash = path; setMenuOpen(false); };
  const changeLanguage = (value: Language) => { setLanguage(value); setLanguageOpen(false); };

  return <div className="site-shell">
    <header className="site-header"><button className="brand" onClick={() => go('pocetna')}>
  <img
    src="/VeTechConn-3-Transparent-1-edited.webp"
    alt="VETechConn"
    className="brand-logo"
  />
</button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button><nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>{(['about', 'partners', 'news', 'contact'] as const).map((key) => <button key={key} onClick={() => go({ about: 'o-nama', partners: 'partneri', news: 'vijesti', contact: 'kontakt' }[key])}>{t.nav[key]}</button>)}<div className="language-picker" ref={languagePickerRef}><button className="language-trigger" onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><img
  className="flag-image"
  src={languages.find((item) => item.value === language)?.flag ?? '/flags/bosnia.png'}
  alt=""
/><span>{language === 'sr' ? 'СР' : language.toUpperCase()}</span><ChevronDown size={14} /></button>{languageOpen && <div className="language-menu">{languages.map((item) => <button className={language === item.value ? 'language-option active' : 'language-option'} key={item.value} onClick={() => changeLanguage(item.value)}><img className="flag-image" src={item.flag} alt="" /><span>{item.label}</span><b>{item.value === 'sr' ? 'СР' : item.value.toUpperCase()}</b></button>)}</div>}</div></nav></header>
    <main>{route.page === 'home' && <Home t={t} go={go} language={language} />} {route.page === 'about' && <About t={t} language={language} />} {route.page === 'partners' && <Partners t={t} language={language} />} {route.page === 'news' && <News t={t} go={go} language={language} />} {route.page === 'article' && <Article t={t} id={route.articleId ?? ''} go={go} language={language} />} {route.page === 'contact' && <Contact t={t} language={language} />}</main>
    <Footer t={t} go={go} language={language} />
  </div>;
}
function PageIntro({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) { 
  return <section className="page-intro"><div className="section-wrap"><p className="eyebrow"><span /> {kicker}</p><h1>{title}</h1>{lead && <p>{lead}</p>}</div></section>; 
}
function Home({t, go, language, }: {t: Copy; go: (path: string) => void; language: Language;}) {
  const region = {
    bs: 'u regionu',
    sr: 'у региону',
    hr: 'u regiji',
    sl: 'v regiji',
    en: 'in the region',
  }[language];
  const countries = {
    bs: 'države partneri',
    sr: 'државе партнери',
    hr: 'države partneri',
    sl: 'partnerske države',
    en: 'partner countries',
  }[language];
  const visualTitle = {
    bs: 'Učenje',
    sr: 'Учење',
    hr: 'Učenje',
    sl: 'Učenje',
    en: 'Learning',
  }[language];
  const visualSubtitle = {
    bs: 'bez granica',
    sr: 'без граница',
    hr: 'bez granica',
    sl: 'brez meja',
    en: 'without limits',
  }[language];
  return (
    <>
      <section className="home-hero section-wrap">
        <div>
          <p className="eyebrow">
            <span /> {t.home.kicker}
          </p>

          <h1>
            {t.home.title.split(' ').slice(0, -2).join(' ')}{' '}
            <em>{t.home.title.split(' ').slice(-2).join(' ')}</em>
          </h1>

          <p className="hero-lead">{t.home.lead}</p>

          <button
            className="button button-primary"
            onClick={() => go('o-nama')}
          >
            {t.home.explore} <ArrowUpRight size={17} />
          </button>

          <div className="hero-metrics">
            <strong>14</strong>
            <span>
              {t.home.stat}
              <br />
              {region}
            </span>

            <strong>03</strong>
            <span>
              {language === 'en'
                ? 'partner'
                : language === 'sr'
                  ? 'државе'
                  : 'države'}
              <br />
              {countries}
            </span>
          </div>
        </div>

        <div className="home-visual">
          <div className="visual-ring" />

          <div
            className="hero-animation"
            aria-label="Animated education network"
          >
            <div className="hero-core">
              <Globe2 size={48} />
            </div>

            <div className="hero-orbit orbit-a">
              <span>
                <GraduationCap size={21} />
              </span>
            </div>

            <div className="hero-orbit orbit-b">
              <span>
                <Network size={21} />
              </span>
            </div>

            <div className="hero-orbit orbit-c">
              <span>
                <Target size={21} />
              </span>
            </div>

            <i className="hero-particle particle-a" />
            <i className="hero-particle particle-b" />
            <i className="hero-particle particle-c" />
          </div>

          <div className="visual-label">
            <Target size={18} />
            <span>
              <b>{visualTitle}</b>
              <br />
              {visualSubtitle}
            </span>
          </div>
        </div>
      </section>

      <section className="dark-intro">
        <div className="section-wrap split-section">
          <div>
            <p className="eyebrow light">
              <span /> {t.about.kicker}
            </p>
            <h2>{t.home.impact}</h2>
          </div>

          <div>
            <p>{t.home.impactText}</p>
            <button
              className="text-button light"
              onClick={() => go('vijesti')}
            >
              {t.home.viewNews} <MoveRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <section className="home-news section-wrap">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">
              <span /> {t.home.latest}
            </p>
            <h2>{t.news.title}</h2>
          </div>

          <button
            className="text-button"
            onClick={() => go('vijesti')}
          >
            {t.news.read} <MoveRight size={17} />
          </button>
        </div>

        <div className="featured-grid">
          {newsItems.slice(0, 3).map((item) => (
            <button
              className="featured-card"
              key={item.id}
              onClick={() => go(`vijesti/${item.id}`)}
            >
              <img src={item.image} alt={item.title} />

              <span>{t.news.category}</span>

              <h3>{item.title}</h3>

              <p>{item.excerpt}</p>

              <b>
                {t.news.read} <ArrowUpRight size={15} />
              </b>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
function About({ t, language }: { t: Copy; language: Language }) { const details = aboutDetails[language]; return <><PageIntro kicker={t.about.kicker} title={t.about.title} lead={details.primary} /><section className="section-wrap about-body"><div className="about-image"><img src={images.digital} alt="Učenici koriste digitalne alate" /><span>ERASMUS+<br /><b>EDU-CB-VET</b></span></div><div><p className="eyebrow"><span /> VETechConn</p><h2>{language === 'sr' ? 'Образовање које' : language === 'en' ? 'Education that' : language === 'sl' ? 'Izobraževanje, ki' : 'Obrazovanje koje'}<br /><em>{language === 'sr' ? 'гледа напред.' : language === 'en' ? 'looks ahead.' : language === 'sl' ? 'gleda naprej.' : 'gleda naprijed.'}</em></h2><p className="large-copy">{details.primary}</p></div></section><section className="section-wrap about-secondary"><p className="large-copy">{details.secondary}</p><img src={images.coding} alt="Digitalno obrazovanje i učenje" /></section><section className="soft-section"><div className="section-wrap"><p className="eyebrow"><span /> {t.about.groups}</p><p className="section-lead">{details.groupsIntro}</p><div className="target-grid">{targetGroupsByLanguage[language].map(({ icon: Icon, title, text }) => <article className="target-card" key={title}><div className="target-icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="section-wrap goals-section"><div className="goals-heading"><p className="eyebrow"><span /> {t.about.goal}</p><h2>{language === 'sr' ? 'Општи циљ и ' : language === 'en' ? 'Overall and ' : language === 'hr' ? 'Opći i ' : language === 'sl' ? 'Splošni in ' : 'Opći cilj i '}<em>{language === 'sr' ? 'специфични циљеви' : language === 'en' ? 'specific objectives' : language === 'hr' ? 'specifični ciljevi' : language === 'sl' ? 'specifični cilji' : 'specifični ciljevi'}</em></h2><p>{details.goalDescription}</p></div><div className="goals-grid">{details.goals.map((goal) => <article className="goal-card" key={goal.title}><h3>{goal.title}</h3><p>{goal.text}</p></article>)}</div></section></>; }
function Partners({ t, language }: { t: Copy; language: Language }) { const intro = { bs: 'Regionalna mreža obrazovnih institucija, organizacija i stručnjaka koji dijele istu viziju: savremeno, dostupno i povezano obrazovanje.', sr: 'Регионална мрежа образовних институција, организација и стручњака који деле исту визију: савремено, доступно и повезано образовање.', hr: 'Regionalna mreža obrazovnih institucija, organizacija i stručnjaka koji dijele istu viziju: suvremeno, dostupno i povezano obrazovanje.', sl: 'Regionalna mreža izobraževalnih ustanov, organizacij in strokovnjakov, ki delijo isto vizijo: sodobno, dostopno in povezano izobraževanje.', en: 'A regional network of educational institutions, organisations and experts who share one vision: modern, accessible and connected education.' }[language]; return <><PageIntro kicker={t.partners.kicker} title={t.partners.title} lead={t.partners.lead} /><section className="section-wrap partners-page"><div className="partner-intro"><Network size={38} /><p>{intro}</p></div>
<div className="partner-grid">
  {partners.map((partner) => (
    <a
      className="partner-logo"
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      key={partner.name}
      aria-label={partner.name}
      title={partner.name}
    >
      <img src={partner.logo} alt={partner.name} />
    </a>
  ))}
</div></section></>; }
function News({
  t,
  go,
  language,
}: {
  t: Copy;
  go: (path: string) => void;
  language: Language;
}) {
  return (
    <>
      <PageIntro
        kicker={t.news.kicker}
        title={t.news.title}
        lead={t.news.lead}
      />

      <section className="section-wrap news-list">
        {newsItems.map((item, index) => {
          const translated =
            newsTranslations[language][item.id] ??
            newsTranslations.bs[item.id];

          return (
            <article
              className={`news-row ${index === 0 ? 'featured' : ''} ${
                item.image ? 'has-image' : 'no-image'
              }`}
              key={item.id}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={translated.title}
                />
              )}

              <div className="news-content">
                <p className="eyebrow">
                  <span /> {t.news.category}
                </p>

                <h2>{translated.title}</h2>
                <p>{translated.excerpt}</p>

                <button
                  className="text-button"
                  onClick={() => go(`vijesti/${item.id}`)}
                >
                  {t.news.read} <ArrowUpRight size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
function Article({
  t,
  id,
  go,
  language,
}: {
  t: Copy;
  id: string;
  go: (path: string) => void;
  language: Language;
}) {
  const item = newsItems.find((news) => news.id === id) ?? newsItems[0];

  const translated =
    newsTranslations[language][item.id] ??
    newsTranslations.bs[item.id];

  const paragraphs = translated.body.split('\n\n');

  const itemImages =
    'images' in item && Array.isArray(item.images)
      ? item.images
      : item.image
        ? [item.image]
        : [];

  const relatedNews = newsItems
    .filter((news) => news.id !== item.id)
    .slice(0, 3);

  const isZagrebArticle =
    item.id === 'radionica-digitalne-pismenosti-zagreb';

  const isDigitalSkillsArticle =
    item.id === 'digitalne-vjestine-podgorica';

  const isKickoffArticle =
    item.id === 'pocetni-sastanak';

  const isSymposiumArticle =
    item.id === 'simpozij-podgorica';

  const hasPdf =
    'pdf' in item &&
    typeof item.pdf === 'string' &&
    item.pdf.length > 0;

  return (
    <section className="article-page section-wrap">
      <button className="back-button" onClick={() => go('vijesti')}>
        <ArrowLeft size={17} /> {t.news.back}
      </button>

      <p className="eyebrow">
        <span /> {t.news.category}
      </p>

      <h1>{translated.title}</h1>

      {hasPdf ? (
        <div className="pdf-article-layout pdf-article-stacked">
          <div className="pdf-article-content">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="pdf-article-preview">
            <div className="pdf-viewer">
              <iframe
                src={item.pdf}
                title={translated.title}
              />
            </div>

            <a
              className="pdf-download"
              href={item.pdf}
              download
              target="_blank"
              rel="noreferrer"
            >
              <ArrowDownToLine size={18} />
              {language === 'en' ? 'Download PDF' : 'Skini PDF'}
            </a>
          </div>
        </div>
      ) : isDigitalSkillsArticle ? (
        <div className="digital-skills-article">
          <div className="digital-skills-copy">
            {paragraphs.slice(0, 2).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {paragraphs.length > 2 && (
              <>
                <p>{paragraphs[2].split('\n')[0]}</p>

                <ul className="digital-skills-checklist">
                  {paragraphs[2]
                    .split('\n')
                    .slice(1)
                    .filter((line) => line.trim() !== '')
                    .map((line, index) => (
                      <li key={index}>
                        <Check size={15} />
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </>
            )}

            {paragraphs.slice(3).map((paragraph, index) => (
              <p
                className={index === 0 ? 'digital-skills-goal' : ''}
                key={index + 3}
              >
                {index === 0 && <Target size={15} />}
                <span>{paragraph}</span>
              </p>
            ))}
          </div>

          {itemImages.length > 0 && (
            <div className="digital-skills-gallery">
              {itemImages.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${translated.title} – ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : isZagrebArticle ? (
        <div className="zagreb-article-layout">
          {itemImages.length > 0 && (
            <img
              className="zagreb-article-image"
              src={itemImages[0]}
              alt={translated.title}
            />
          )}

          <div className="article-copy">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {itemImages.length > 1 && (
            <div className="article-gallery">
              {itemImages.slice(1).map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  className="article-image"
                  src={image}
                  alt={`${translated.title} – ${index + 2}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : isKickoffArticle ? (
        <div className="kickoff-article-layout">
          {itemImages.length > 0 && (
            <img
              className="kickoff-article-image"
              src={itemImages[0]}
              alt={translated.title}
            />
          )}

          <div className="article-copy">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : isSymposiumArticle && itemImages.length >= 2 ? (
        <div className="symposium-article symposium-article-podgorica">
          <div className="symposium-intro">
            {paragraphs.slice(0, 2).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <img
            className="symposium-main-image"
            src={itemImages[0]}
            alt={`${translated.title} – grupna fotografija`}
          />

          <div className="symposium-row symposium-row-podgorica">
            <img
              src={itemImages[1]}
              alt={`${translated.title} – fotografija učesnika`}
            />

            <div className="symposium-text">
              {paragraphs.slice(2).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {itemImages.length > 2 && (
            <div className="article-gallery">
              {itemImages.slice(2).map((image, index) => (
                <img
                  key={`${image}-${index + 2}`}
                  className="article-image"
                  src={image}
                  alt={`${translated.title} – ${index + 3}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {itemImages.length > 0 && (
            <img
              className="article-image"
              src={itemImages[0]}
              alt={translated.title}
            />
          )}

          <div className="article-copy">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {itemImages.length > 1 && (
            <div className="article-gallery">
              {itemImages.slice(1).map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  className="article-image"
                  src={image}
                  alt={`${translated.title} – ${index + 2}`}
                />
              ))}
            </div>
          )}
        </>
      )}

      <section className="related-news">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">
              <span /> {t.home.latest}
            </p>
            <h2>{t.news.title}</h2>
          </div>

          <button
            className="text-button"
            onClick={() => go('vijesti')}
          >
            {t.news.read} <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="featured-grid">
          {relatedNews.map((news) => {
            const translatedNews =
              newsTranslations[language][news.id] ??
              newsTranslations.bs[news.id];

            return (
              <button
                className="featured-card"
                key={news.id}
                onClick={() => go(`vijesti/${news.id}`)}
              >
                {news.image && (
                  <img
                    src={news.image}
                    alt={translatedNews.title}
                  />
                )}

                <span>{t.news.category}</span>
                <h3>{translatedNews.title}</h3>
                <p>{translatedNews.excerpt}</p>

                <b>
                  {t.news.read} <ArrowUpRight size={15} />
                </b>
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}
function Contact({ t, language }: { t: Copy; language: Language }) { const [sent, setSent] = useState(false); const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); const subject = encodeURIComponent('VETechConn upit'); const body = encodeURIComponent(`Ime: ${data.get('name')}\nE-mail: ${data.get('email')}\n\n${data.get('message')}`); setSent(true); window.location.href = `mailto:info@vetechconn.eu?subject=${subject}&body=${body}`; }; return <><PageIntro kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} /><section className="section-wrap contact-layout"><div className="contact-details"><div className="contact-icon"><Mail /></div><h2>VETech<em>Conn</em></h2><p>{({ bs: 'Otvoreni smo za nova partnerstva, ideje i pitanja.', sr: 'Отворени смо за нова партнерства, идеје и питања.', hr: 'Otvoreni smo za nova partnerstva, ideje i pitanja.', sl: 'Odprti smo za nova partnerstva, ideje in vprašanja.', en: 'We are open to new partnerships, ideas and questions.' }[language])}</p><a href="mailto:info@vetechconn.eu">info@vetechconn.eu</a></div><form className="contact-form" onSubmit={submit}><label>{t.contact.name}<input required name="name" placeholder="John Doe" /></label><label>{t.contact.email}<input required type="email" name="email" placeholder="john@example.com" /></label><label>{t.contact.message}<textarea required name="message" rows={6} placeholder={t.contact.message} /></label><button className="button button-primary" type="submit"><Send size={16} /> {t.contact.send}</button><small>{sent ? <span className="success"><Check size={14} /> {t.contact.success}</span> : t.contact.note}</small></form></section></>; }
function Footer({ t, go, language }: { t: Copy; go: (path: string) => void; language: Language }) { const notice = { bs: 'Finansirano od strane Evropske unije. Međutim, izneseni stavovi i mišljenja su isključivo stavovi autora i ne odražavaju nužno stavove Evropske unije ili Izvršne agencije za obrazovanje i kulturu (EACEA).', sr: 'Финансирано од стране Европске уније. Изнети ставови и мишљења припадају искључиво ауторима.', hr: 'Financirano sredstvima Europske unije. Izneseni stavovi i mišljenja pripadaju isključivo autorima.', sl: 'Financira Evropska unija. Izražena stališča in mnenja pripadajo izključno avtorjem.', en: 'Funded by the European Union. Views and opinions expressed are solely those of the authors.' }[language]; return <footer><div className="section-wrap footer-top"><button className="brand footer-brand" onClick={() => go('pocetna')}>
  <img
    src="/VeTechConn-3-Transparent-1-edited.webp"
    alt="VETechConn"
    className="brand-logo"
  />
</button><div className="footer-links"><button onClick={() => go('o-nama')}>{t.nav.about}</button><button onClick={() => go('vijesti')}>{t.nav.news}</button><button onClick={() => go('kontakt')}>{t.nav.contact}</button></div></div><div className="footer-eu"><img
  className="eu-flag"
  src="/euflag.jpg"
  alt="Zastava Evropske unije"
/><p>{notice}</p></div><div className="section-wrap footer-bottom"><span>© 2024 VETechConn</span></div></footer>; }
export default App;