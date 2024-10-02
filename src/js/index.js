const navBtnsMenu = document.getElementById('nav_btns_menu');
const showNavMenu = document.getElementById('nav-toggle-i');
const closeNavMenu = document.getElementById('close_nav_menu');

const galeryMainImg = document.getElementById('product-main-img');
const galeryImgs = document.querySelectorAll('#product-other-images img');
const galeryBtnL = document.getElementsByClassName('galery-btn galery-btn-left')[0];
const galeryBtnR = document.getElementsByClassName('galery-btn galery-btn-right')[0];

showNavMenu.addEventListener('click', function(){
    navBtnsMenu.classList.remove('hide');
    navBtnsMenu.classList.add('show');
})

closeNavMenu.addEventListener('click', function(){
    navBtnsMenu.classList.remove('show');
    navBtnsMenu.classList.add('hide');
})

// "جاري المعالجة..."

/*====================================
            Carousel
====================================*/
/*
const carousel = document.getElementById('carousel');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let startX;

// Mouse events
carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('mouseup', stopDrag);
carousel.addEventListener('mouseleave', stopDrag);

// Touch events
carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchmove', drag);
carousel.addEventListener('touchend', stopDrag);

function startDrag(e) {
    isDragging = true;
    startX = getPositionX(e);
    carousel.style.cursor = 'grabbing';

    animationID = requestAnimationFrame(animation);
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const delta = currentPosition - startX;
    currentTranslate = prevTranslate + delta;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function stopDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    prevTranslate = currentTranslate;
    carousel.style.cursor = 'grab';
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}
*/

/*=========================================
            galery select image
===========================================*/

let currentImgIndex = 0;
let galeryLength = galeryImgs.length;
galeryBtnL.addEventListener('click', function(){
    if(currentImgIndex == galeryLength-1){
        currentImgIndex = 0;
    }else{
        currentImgIndex++;
    }
    galeryImgs.forEach(img=>{
        img.classList.remove('active-img')
    })
    galeryImgs[currentImgIndex].classList.add('active-img');
    galeryMainImg.src = galeryImgs[currentImgIndex].src;
})
galeryBtnR.addEventListener('click', function(){
    if(currentImgIndex == 0){
        currentImgIndex = galeryLength-1;
    }else{
        currentImgIndex--;
    }
    galeryImgs.forEach(img=>{
        img.classList.remove('active-img')
    })
    galeryImgs[currentImgIndex].classList.add('active-img');
    galeryMainImg.src = galeryImgs[currentImgIndex].src;
})
galeryImgs.forEach(img=>{
    img.addEventListener('click', function(){
        galeryImgs.forEach(img=>{
            img.classList.remove('active-img')
        })
        galeryMainImg.src = this.src;
        this.classList.add('active-img')
        //update the current image index variable
        currentImgIndex = Array.prototype.indexOf.call(this.parentNode.children, this);
    })
})






























var cities = {
    "DZ-01": ["Adrar", "Tamest", "Reggane", "Inozghmir", "Tit", "Tsabit", "Zaouiet Kounta", "Aoulef", "Timokten", "Tamentit", "Fenoughil", "Sali", "Akabli", "Ouled Ahmed Timmi", "Bouda", "Sbaa"],
    "DZ-02": ["Chlef", "Tenes", "Benairia", "El Karimia", "Tadjna", "Taougrite", "Beni Haoua", "Sobha", "Harchoun", "Ouled Fares", "Sidi Akacha", "Boukadir", "Beni Rached", "Talassa", "Herenfa", "Oued Goussine", "Dahra", "Ouled Abbes", "Sendjas", "Zeboudja", "Oued Sly", "Abou El Hassen", "El Marsa", "Chettia", "Sidi Abderrahmane", "Moussadek", "El Hadjadj", "Labiod Medjadja", "Oued Fodda", "Ouled Ben Abdelkader", "Bouzghaia", "Ain Merane", "Oum Drou", "Breira", "Ben Boutaleb"],
    "DZ-03": ["Laghouat", "Ksar El Hirane", "Benacer Ben Chohra", "Sidi Makhlouf", "Hassi Delaa", "Hassi R Mel", "Ain Mahdi", "Tadjmout", "Kheneg", "Gueltat Sidi Saad", "Ain Sidi Ali", "Beidha", "Brida", "El Ghicha", "Hadj Mechri", "Sebgag", "Taouiala", "Tadjrouna", "Aflou", "El Assafia", "Oued Morra", "Oued M Zi", "El Haouaita", "Sidi Bouzid"],
    "DZ-04": ["Oum El Bouaghi", "Ain Beida", "Ainmlila", "Behir Chergui", "El Amiria", "Sigus", "El Belala", "Ain Babouche", "Berriche", "Ouled Hamla", "Dhala", "Ain Kercha", "Hanchir Toumghani", "El Djazia", "Ain Diss", "Fkirina", "Souk Naamane", "Zorg", "El Fedjoudj Boughrar", "Ouled Zouai", "Bir Chouhada", "Ksar Sbahi", "Oued Nini", "Meskiana", "Ain Fekroune", "Rahia", "Ain Zitoun", "Ouled Gacem", "El Harmilia"],
    "DZ-05": ["Batna", "Ghassira", "Maafa", "Merouana", "Seriana", "Menaa", "El Madher", "Tazoult", "Ngaous", "Guigba", "Inoughissen", "Ouyoun El Assafir", "Djerma", "Bitam", "Metkaouak", "Arris", "Kimmel", "Tilatou", "Ain Djasser", "Ouled Selam", "Tigherghar", "Ain Yagout", "Fesdis", "Sefiane", "Rahbat", "Tighanimine", "Lemsane", "Ksar Belezma", "Seggana", "Ichmoul", "Foum Toub", "Beni Foudhala El Hakania", "Oued El Ma", "Talkhamt", "Bouzina", "Chemora", "Oued Chaaba", "Taxlent", "Gosbat", "Ouled Aouf", "Boumagueur", "Barika", "Djezzar", "Tkout", "Ain Touta", "Hidoussa", "Teniet El Abed", "Oued Taga", "Ouled Fadel", "Timgad", "Ras El Aioun", "Chir", "Ouled Si Slimane", "Zanat El Beida", "Amdoukal", "Ouled Ammar", "El Hassi", "Lazrou", "Boumia", "Boulhilat", "Larbaa"],
    "DZ-06": ["Bejaia", "Amizour", "Ferraoun", "Taourirt Ighil", "Chelata", "Tamokra", "Timzrit", "Souk El Thenine", "Mcisna", "Thinabdher", "Tichi", "Semaoun", "Kendira", "Tifra", "Ighram", "Amalou", "Ighil Ali", "Ifelain Ilmathen", "Toudja", "Darguina", "Sidi Ayad", "Aokas", "Beni Djellil", "Adekar", "Akbou", "Seddouk", "Tazmalt", "Ait Rizine", "Chemini", "Souk Oufella", "Taskriout", "Tibane", "Tala Hamza", "Barbacha", "Beni Ksila", "Ouzallaguen", "Bouhamza", "Beni Melikeche", "Sidi Aich", "El Kseur", "Melbou", "Akfadou", "Leflaye", "Kherrata", "Draa Kaid", "Tamridjet", "Ait Smail", "Boukhelifa", "Tizi Nberber", "Beni Maouch", "Oued Ghir", "Boudjellil"],
    "DZ-07": ["Biskra", "Oumache", "Branis", "Chetma", "Ras El Miaad", "Sidi Okba", "Mchouneche", "El Haouch", "Ain Naga", "Zeribet El Oued", "El Feidh", "El Kantara", "Ain Zaatout", "El Outaya", "Djemorah", "Tolga", "Lioua", "Lichana", "Ourlal", "Mlili", "Foughala", "Bordj Ben Azzouz", "Meziraa", "Bouchagroun", "Mekhadma", "El Ghrous", "El Hadjab", "Khanguet Sidinadji"],
    "DZ-08": ["Bechar", "Erg Ferradj", "Meridja", "Lahmar", "Mechraa Houari B", "Kenedsa", "Taghit", "Boukais", "Mogheul", "Abadla", "Beni Ounif"],
    "DZ-09": ["Blida", "Chebli", "Bouinan", "Oued El Alleug", "Ouled Yaich", "Chrea", "El Affroun", "Chiffa", "Hammam Melouane", "Ben Khlil", "Soumaa", "Mouzaia", "Souhane", "Meftah", "Ouled Selama", "Boufarik", "Larbaa", "Oued Djer", "Beni Tamou", "Bouarfa", "Beni Mered", "Bougara", "Guerrouaou", "Ain Romana", "Djebabra"],
    "DZ-10": ["Bouira", "El Asnam", "Guerrouma", "Souk El Khemis", "Kadiria", "Hanif", "Dirah", "Ait Laaziz", "Taghzout", "Raouraoua", "Mezdour", "Haizer", "Lakhdaria", "Maala", "El Hachimia", "Aomar", "Chorfa", "Bordj Oukhriss", "El Adjiba", "El Hakimia", "El Khebouzia", "Ahl El Ksar", "Bouderbala", "Zbarbar", "Ain El Hadjar", "Djebahia", "Aghbalou", "Taguedit", "Ain Turk", "Saharidj", "Dechmia", "Ridane", "Bechloul", "Boukram", "Ain Bessam", "Bir Ghbalou", "Mchedallah", "Sour El Ghozlane", "Maamora", "Ouled Rached", "Ain Laloui", "Hadjera Zerga", "Ath Mansour", "El Mokrani", "Oued El Berdi"],
    "DZ-11": ["Tamanghasset", "Abalessa", "Idles", "Tazouk", "In Amguel"],
    "DZ-12": ["Tebessa", "Bir El Ater", "Cheria", "Stah Guentis", "El Aouinet", "Lahouidjbet", "Safsaf El Ouesra", "Hammamet", "Negrine", "Bir El Mokadem", "El Kouif", "Morsott", "El Ogla", "Bir Dheheb", "El Ogla El Malha", "Gorriguer", "Bekkaria", "Boukhadra", "Ouenza", "El Ma El Biodh", "Oum Ali", "Thlidjene", "Ain Zerga", "El Meridj", "Boulhaf Dyr", "Bedjene", "El Mazeraa", "Ferkane"],
    "DZ-13": ["Tlemcen", "Beni Mester", "Ain Tallout", "Remchi", "El Fehoul", "Sabra", "Ghazaouet", "Souani", "Djebala", "El Gor", "Oued Chouly", "Ain Fezza", "Ouled Mimoun", "Amieur", "Ain Youcef", "Zenata", "Beni Snous", "Bab El Assa", "Dar Yaghmouracene", "Fellaoucene", "Azails", "Sebbaa Chioukh", "Terni Beni Hediel", "Bensekrane", "Ain Nehala", "Hennaya", "Maghnia", "Hammam Boughrara", "Souahlia", "Msirda Fouaga", "Ain Fetah", "El Aricha", "Souk Thlata", "Sidi Abdelli", "Sebdou", "Beni Ouarsous", "Sidi Medjahed", "Beni Boussaid", "Marsa Ben Mhidi", "Nedroma", "Sidi Djillali", "Beni Bahdel", "El Bouihi", "Honaine", "Tianet", "Ouled Riyah", "Bouhlou", "Souk El Khemis", "Ain Ghoraba", "Chetouane", "Mansourah", "Beni Semiel", "Ain Kebira"],
    "DZ-14": ["Tiaret", "Medroussa", "Ain Bouchekif", "Sidi Ali Mellal", "Ain Zarit", "Ain Deheb", "Sidi Bakhti", "Medrissa", "Zmalet El Emir Aek", "Madna", "Sebt", "Mellakou", "Dahmouni", "Rahouia", "Mahdia", "Sougueur", "Sidi Abdelghani", "Ain El Hadid", "Ouled Djerad", "Naima", "Meghila", "Guertoufa", "Sidi Hosni", "Djillali Ben Amar", "Sebaine", "Tousnina", "Frenda", "Ain Kermes", "Ksar Chellala", "Rechaiga", "Nadorah", "Tagdemt", "Oued Lilli", "Mechraa Safa", "Hamadia", "Chehaima", "Takhemaret", "Sidi Abderrahmane", "Serghine", "Bougara", "Faidja", "Tidda"],
    "DZ-15": ["Tizi Ouzou", "Ain El Hammam", "Akbil", "Freha", "Souamaa", "Mechtrass", "Irdjen", "Timizart", "Makouda", "Draa El Mizan", "Tizi Ghenif", "Bounouh", "Ait Chaffaa", "Frikat", "Beni Aissi", "Beni Zmenzer", "Iferhounene", "Azazga", "Iloula Oumalou", "Yakouren", "Larba Nait Irathen", "Tizi Rached", "Zekri", "Ouaguenoun", "Ain Zaouia", "Mkira", "Ait Yahia", "Ait Mahmoud", "Maatka", "Ait Boumehdi", "Abi Youcef", "Beni Douala", "Illilten", "Bouzguen", "Ait Aggouacha", "Ouadhia", "Azzefoun", "Tigzirt", "Ait Aissa Mimoun", "Boghni", "Ifigha", "Ait Oumalou", "Tirmitine", "Akerrou", "Yatafen", "Beni Ziki", "Draa Ben Khedda", "Ouacif", "Idjeur", "Mekla", "Tizi Nthlata", "Beni Yenni", "Aghrib", "Iflissen", "Boudjima", "Ait Yahia Moussa", "Souk El Thenine", "Ait Khelil", "Sidi Naamane", "Iboudraren", "Aghni Goughran", "Mizrana", "Imsouhal", "Tadmait", "Ait Bouadou", "Assi Youcef", "Ait Toudert"],
    "DZ-16": ["Alger Centre", "Sidi Mhamed", "El Madania", "Hamma Anassers", "Bab El Oued", "Bologhine Ibn Ziri", "Casbah", "Oued Koriche", "Bir Mourad Rais", "El Biar", "Bouzareah", "Birkhadem", "El Harrach", "Baraki", "Oued Smar", "Bourouba", "Hussein Dey", "Kouba", "Bachedjerah", "Dar El Beida", "Bab Azzouar", "Ben Aknoun", "Dely Ibrahim", "Bains Romains", "Rais Hamidou", "Djasr Kasentina", "El Mouradia", "Hydra", "Mohammadia", "Bordj El Kiffan", "El Magharia", "Beni Messous", "Les Eucalyptus", "Birtouta", "Tassala El Merdja", "Ouled Chebel", "Sidi Moussa", "Ain Taya", "Bordj El Bahri", "Marsa", "Haraoua", "Rouiba", "Reghaia", "Ain Benian", "Staoueli", "Zeralda", "Mahelma", "Rahmania", "Souidania", "Cheraga", "Ouled Fayet", "El Achour", "Draria", "Douera", "Baba Hassen", "Khracia", "Saoula"],
    "DZ-17": ["Djelfa", "Moudjebara", "El Guedid", "Hassi Bahbah", "Ain Maabed", "Sed Rahal", "Feidh El Botma", "Birine", "Bouira Lahdeb", "Zaccar", "El Khemis", "Sidi Baizid", "Mliliha", "El Idrissia", "Douis", "Hassi El Euch", "Messaad", "Guettara", "Sidi Ladjel", "Had Sahary", "Guernini", "Selmana", "Ain Chouhada", "Oum Laadham", "Dar Chouikh", "Charef", "Beni Yacoub", "Zaafrane", "Deldoul", "Ain El Ibel", "Ain Oussera", "Benhar", "Hassi Fedoul", "Amourah", "Ain Fekka", "Tadmit"],
    "DZ-18": ["Jijel", "Erraguene", "El Aouana", "Ziamma Mansouriah", "Taher", "Emir Abdelkader", "Chekfa", "Chahna", "El Milia", "Sidi Maarouf", "Settara", "El Ancer", "Sidi Abdelaziz", "Kaous", "Ghebala", "Bouraoui Belhadef", "Djmila", "Selma Benziada", "Boussif Ouled Askeur", "El Kennar Nouchfi", "Ouled Yahia Khadrouch", "Boudria Beni Yadjis", "Kemir Oued Adjoul", "Texena", "Djemaa Beni Habibi", "Bordj Taher", "Ouled Rabah", "Ouadjana"],
    "DZ-19": ["Setif", "Ain El Kebira", "Beni Aziz", "Ouled Sidi Ahmed", "Boutaleb", "Ain Roua", "Draa Kebila", "Bir El Arch", "Beni Chebana", "Ouled Tebben", "Hamma", "Maaouia", "Ain Legraj", "Ain Abessa", "Dehamcha", "Babor", "Guidjel", "Ain Lahdjar", "Bousselam", "El Eulma", "Djemila", "Beni Ouartilane", "Rosfa", "Ouled Addouane", "Belaa", "Ain Arnat", "Amoucha", "Ain Oulmane", "Beidha Bordj", "Bouandas", "Bazer Sakhra", "Hammam Essokhna", "Mezloug", "Bir Haddada", "Serdj El Ghoul", "Harbil", "El Ouricia", "Tizi Nbechar", "Salah Bey", "Ain Azal", "Guenzet", "Talaifacene", "Bougaa", "Beni Fouda", "Tachouda", "Beni Mouhli", "Ouled Sabor", "Guellal", "Ain Sebt", "Hammam Guergour", "Ait Naoual Mezada", "Ksar El Abtal", "Beni Hocine", "Ait Tizi", "Maouklane", "Guelta Zerka", "Oued El Barad", "Taya", "El Ouldja", "Tella"],
    "DZ-20": ["Saida", "Doui Thabet", "Ain El Hadjar", "Ouled Khaled", "Moulay Larbi", "Youb", "Hounet", "Sidi Amar", "Sidi Boubekeur", "El Hassasna", "Maamora", "Sidi Ahmed", "Ain Sekhouna", "Ouled Brahim", "Tircine", "Ain Soltane"],
    "DZ-21": ["Skikda", "Ain Zouit", "El Hadaik", "Azzaba", "Djendel Saadi Mohamed", "Ain Cherchar", "Bekkouche Lakhdar", "Benazouz", "Es Sebt", "Collo", "Beni Zid", "Kerkera", "Ouled Attia", "Oued Zehour", "Zitouna", "El Harrouch", "Zerdazas", "Ouled Hebaba", "Sidi Mezghiche", "Emdjez Edchich", "Beni Oulbane", "Ain Bouziane", "Ramdane Djamel", "Beni Bachir", "Salah Bouchaour", "Tamalous", "Ain Kechra", "Oum Toub", "Bein El Ouiden", "Fil Fila", "Cheraia", "Kanoua", "El Ghedir", "Bouchtata", "Ouldja Boulbalout", "Kheneg Mayoum", "Hamadi Krouma", "El Marsa"],
    "DZ-22": ["Sidi Bel Abbes", "Tessala", "Sidi Brahim", "Mostefa Ben Brahim", "Telagh", "Mezaourou", "Boukhanafis", "Sidi Ali Boussidi", "Badredine El Mokrani", "Marhoum", "Tafissour", "Amarnas", "Tilmouni", "Sidi Lahcene", "Ain Thrid", "Makedra", "Tenira", "Moulay Slissen", "El Hacaiba", "Hassi Zehana", "Tabia", "Merine", "Ras El Ma", "Ain Tindamine", "Ain Kada", "Mcid", "Sidi Khaled", "Ain El Berd", "Sfissef", "Ain Adden", "Oued Taourira", "Dhaya", "Zerouala", "Lamtar", "Sidi Chaib", "Sidi Dahou Dezairs", "Oued Sbaa", "Boudjebaa El Bordj", "Sehala Thaoura", "Sidi Yacoub", "Sidi Hamadouche", "Belarbi", "Oued Sefioun", "Teghalimet", "Ben Badis", "Sidi Ali Benyoub", "Chetouane Belaila", "Bir El Hammam", "Taoudmout", "Redjem Demouche", "Benachiba Chelia", "Hassi Dahou"],
    "DZ-23": ["Annaba", "Berrahel", "El Hadjar", "Eulma", "El Bouni", "Oued El Aneb", "Cheurfa", "Seraidi", "Ain Berda", "Chetaibi", "Sidi Amer", "Treat"],
    "DZ-24": ["Guelma", "Nechmaya", "Bouati Mahmoud", "Oued Zenati", "Tamlouka", "Oued Fragha", "Ain Sandel", "Ras El Agba", "Dahouara", "Belkhir", "Ben Djarah", "Bou Hamdane", "Ain Makhlouf", "Ain Ben Beida", "Khezara", "Beni Mezline", "Bou Hachana", "Guelaat Bou Sbaa", "Hammam Maskhoutine", "El Fedjoudj", "Bordj Sabat", "Hamman Nbail", "Ain Larbi", "Medjez Amar", "Bouchegouf", "Heliopolis", "Ain Hessania", "Roknia", "Salaoua Announa", "Medjez Sfa", "Boumahra Ahmed", "Ain Reggada", "Oued Cheham", "Djeballah Khemissi"],
    "DZ-25": ["Constantine", "Hamma Bouziane", "El Haria", "Zighoud Youcef", "Didouche Mourad", "El Khroub", "Ain Abid", "Beni Hamiden", "Ouled Rahmoune", "Ain Smara", "Mesaoud Boudjeriou", "Ibn Ziad"],
    "DZ-26": ["Medea", "Ouzera", "Ouled Maaref", "Ain Boucif", "Aissaouia", "Ouled Deide", "El Omaria", "Derrag", "El Guelbelkebir", "Bouaiche", "Mezerena", "Ouled Brahim", "Damiat", "Sidi Ziane", "Tamesguida", "El Hamdania", "Kef Lakhdar", "Chelalet El Adhaoura", "Bouskene", "Rebaia", "Bouchrahil", "Ouled Hellal", "Tafraout", "Baata", "Boghar", "Sidi Naamane", "Ouled Bouachra", "Sidi Zahar", "Oued Harbil", "Benchicao", "Sidi Damed", "Aziz", "Souagui", "Zoubiria", "Ksar El Boukhari", "El Azizia", "Djouab", "Chahbounia", "Meghraoua", "Cheniguel", "Ain Ouksir", "Oum El Djalil", "Ouamri", "Si Mahdjoub", "Tlatet Eddoair", "Beni Slimane", "Berrouaghia", "Seghouane", "Meftaha", "Mihoub", "Boughezoul", "Tablat", "Deux Bassins", "Draa Essamar", "Sidi Errabia", "Bir Ben Laabed", "El Ouinet", "Ouled Antar", "Bouaichoune", "Hannacha", "Sedraia", "Medjebar", "Khams Djouamaa", "Saneg"],
    "DZ-27": ["Mostaganem", "Sayada", "Fornaka", "Stidia", "Ain Nouissy", "Hassi Maameche", "Ain Tadles", "Sour", "Oued El Kheir", "Sidi Bellater", "Kheiredine ", "Sidi Ali", "Abdelmalek Ramdane", "Hadjadj", "Nekmaria", "Sidi Lakhdar", "Achaacha", "Khadra", "Bouguirat", "Sirat", "Ain Sidi Cherif", "Mesra", "Mansourah", "Souaflia", "Ouled Boughalem", "Ouled Maallah", "Mezghrane", "Ain Boudinar", "Tazgait", "Safsaf", "Touahria", "El Hassiane"],
    "DZ-28": ["Msila", "Maadid", "Hammam Dhalaa", "Ouled Derradj", "Tarmount", "Mtarfa", "Khoubana", "Mcif", "Chellal", "Ouled Madhi", "Magra", "Berhoum", "Ain Khadra", "Ouled Addi Guebala", "Belaiba", "Sidi Aissa", "Ain El Hadjel", "Sidi Hadjeres", "Ouanougha", "Bou Saada", "Ouled Sidi Brahim", "Sidi Ameur", "Tamsa", "Ben Srour", "Ouled Slimane", "El Houamed", "El Hamel", "Ouled Mansour", "Maarif", "Dehahna", "Bouti Sayah", "Khettouti Sed Djir", "Zarzour", "Oued Chair", "Benzouh", "Bir Foda", "Ain Fares", "Sidi Mhamed", "Ouled Atia", "Souamaa", "Ain El Melh", "Medjedel", "Slim", "Ain Errich", "Beni Ilmane", "Oultene", "Djebel Messaad"],
    "DZ-29": ["Mascara", "Bou Hanifia", "Tizi", "Hacine", "Maoussa", "Teghennif", "El Hachem", "Sidi Kada", "Zelmata", "Oued El Abtal", "Ain Ferah", "Ghriss", "Froha", "Matemore", "Makdha", "Sidi Boussaid", "El Bordj", "Ain Fekan", "Benian", "Khalouia", "El Menaouer", "Oued Taria", "Aouf", "Ain Fares", "Ain Frass", "Sig", "Oggaz", "Alaimia", "El Gaada", "Zahana", "Mohammadia", "Sidi Abdelmoumene", "Ferraguig", "El Ghomri", "Sedjerara", "Moctadouz", "Bou Henni", "Guettena", "El Mamounia", "El Keurt", "Gharrous", "Gherdjoum", "Chorfa", "Ras Ain Amirouche", "Nesmot", "Sidi Abdeldjebar", "Sehailia"],
    "DZ-30": ["Ouargla", "Ain Beida", "Ngoussa", "Hassi Messaoud", "Rouissat", "Sidi Khouiled", "Hassi Ben Abdellah", "El Borma"],
    "DZ-31": ["Oran", "Gdyel", "Bir El Djir", "Hassi Bounif", "Es Senia", "Arzew", "Bethioua", "Marsat El Hadjadj", "Ain Turk", "El Ancar", "Oued Tlelat", "Tafraoui", "Sidi Chami", "Boufatis", "Mers El Kebir", "Bousfer", "El Karma", "El Braya", "Hassi Ben Okba", "Ben Freha", "Hassi Mefsoukh", "Sidi Ben Yabka", "Messerghin", "Boutlelis", "Ain Kerma", "Ain Biya"],
    "DZ-32": ["El Bayadh", "Rogassa", "Stitten", "Brezina", "Ghassoul", "Boualem", "El Abiodh Sidi Cheikh", "Ain El Orak", "Arbaouat", "Bougtoub", "El Kheither", "Kef El Ahmar", "Boussemghoun", "Chellala", "Krakda", "El Bnoud", "Cheguig", "Sidi Ameur", "El Mehara", "Tousmouline", "Sidi Slimane", "Sidi Tifour"],
    "DZ-33": ["Illizi", "Debdeb", "Bordj Omar Driss", "In Amenas"],
    "DZ-34": ["Bordj Bou Arreridj", "Ras El Oued", "Bordj Zemoura", "Mansoura", "El Mhir", "Ben Daoud", "El Achir", "Ain Taghrout", "Bordj Ghdir", "Sidi Embarek", "El Hamadia", "Belimour", "Medjana", "Teniet En Nasr", "Djaafra", "El Main", "Ouled Brahem", "Ouled Dahmane", "Hasnaoua", "Khelil", "Taglait", "Ksour", "Ouled Sidi Brahim", "Tafreg", "Colla", "Tixter", "El Ach", "El Anseur", "Tesmart", "Ain Tesra", "Bir Kasdali", "Ghilassa", "Rabta", "Haraza"],
    "DZ-35": ["Boumerdes", "Boudouaou", "Afir", "Bordj Menaiel", "Baghlia", "Sidi Daoud", "Naciria", "Djinet", "Isser", "Zemmouri", "Si Mustapha", "Tidjelabine", "Chabet El Ameur", "Thenia", "Timezrit", "Corso", "Ouled Moussa", "Larbatache", "Bouzegza Keddara", "Taourga", "Ouled Aissa", "Ben Choud", "Dellys", "Ammal", "Beni Amrane", "Souk El Had", "Boudouaou El Bahri", "Ouled Hedadj", "Laghata", "Hammedi", "Khemis El Khechna", "El Kharrouba"],
    "DZ-36": ["El Tarf", "Bouhadjar", "Ben Mhidi", "Bougous", "El Kala", "Ain El Assel", "El Aioun", "Bouteldja", "Souarekh", "Berrihane", "Lac Des Oiseaux", "Chefia", "Drean", "Chihani", "Chebaita Mokhtar", "Besbes", "Asfour", "Echatt", "Zerizer", "Zitouna", "Ain Kerma", "Oued Zitoun", "Hammam Beni Salah", "Raml Souk"],
    "DZ-37": ["Tindouf", "Oum El Assel"],
    "DZ-38": ["Tissemsilt", "Bordj Bou Naama", "Theniet El Had", "Lazharia", "Beni Chaib", "Lardjem", "Melaab", "Sidi Lantri", "Bordj El Emir Abdelkader", "Layoune", "Khemisti", "Ouled Bessem", "Ammari", "Youssoufia", "Sidi Boutouchent", "Larbaa", "Maasem", "Sidi Abed", "Tamalaht", "Sidi Slimane", "Boucaid", "Beni Lahcene"],
    "DZ-39": ["El Oued", "Robbah", "Oued El Alenda", "Bayadha", "Nakhla", "Guemar", "Kouinine", "Reguiba", "Hamraia", "Taghzout", "Debila", "Hassani Abdelkrim", "Hassi Khelifa", "Taleb Larbi", "Douar El Ma", "Sidi Aoun", "Trifaoui", "Magrane", "Beni Guecha", "Ourmas", "El Ogla", "Mih Ouansa"],
    "DZ-40": ["Khenchela", "Mtoussa", "Kais", "Baghai", "El Hamma", "Ain Touila", "Taouzianat", "Bouhmama", "El Oueldja", "Remila", "Cherchar", "Djellal", "Babar", "Tamza", "Ensigha", "Ouled Rechache", "El Mahmal", "Msara", "Yabous", "Khirane", "Chelia"],
    "DZ-41": ["Souk Ahras", "Sedrata", "Hanancha", "Mechroha", "Ouled Driss", "Tiffech", "Zaarouria", "Taoura", "Drea", "Haddada", "Khedara", "Merahna", "Ouled Moumen", "Bir Bouhouche", "Mdaourouche", "Oum El Adhaim", "Ain Zana", "Ain Soltane", "Quillen", "Sidi Fredj", "Safel El Ouiden", "Ragouba", "Khemissa", "Oued Keberit", "Terraguelt", "Zouabi"],
    "DZ-42": ["Tipaza", "Menaceur", "Larhat", "Douaouda", "Bourkika", "Khemisti", "Aghabal", "Hadjout", "Sidi Amar", "Gouraya", "Nodor", "Chaiba", "Ain Tagourait", "Cherchel", "Damous", "Meurad", "Fouka", "Bou Ismail", "Ahmer El Ain", "Bou Haroun", "Sidi Ghiles", "Messelmoun", "Sidi Rached", "Kolea", "Attatba", "Sidi Semiane", "Beni Milleuk", "Hadjerat Ennous"],
    "DZ-43": ["Mila", "Ferdjioua", "Chelghoum Laid", "Oued Athmenia", "Ain Mellouk", "Telerghma", "Oued Seguen", "Tadjenanet", "Benyahia Abderrahmane", "Oued Endja", "Ahmed Rachedi", "Ouled Khalouf", "Tiberguent", "Bouhatem", "Rouached", "Tessala Lamatai", "Grarem Gouga", "Sidi Merouane", "Tassadane Haddada", "Derradji Bousselah", "Minar Zarza", "Amira Arras", "Terrai Bainen", "Hamala", "Ain Tine", "El Mechira", "Sidi Khelifa", "Zeghaia", "Elayadi Barbes", "Ain Beida Harriche", "Yahia Beniguecha", "Chigara"],
    "DZ-44": ["Ain Defla", "Miliana", "Boumedfaa", "Khemis Miliana", "Hammam Righa", "Arib", "Djelida", "El Amra", "Bourached", "El Attaf", "El Abadia", "Djendel", "Oued Chorfa", "Ain Lechiakh", "Oued Djemaa", "Rouina", "Zeddine", "El Hassania", "Bir Ouled Khelifa", "Ain Soltane", "Tarik Ibn Ziad", "Bordj Emir Khaled", "Ain Torki", "Sidi Lakhdar", "Ben Allal", "Ain Benian", "Hoceinia", "Barbouche", "Djemaa Ouled Chikh", "Mekhatria", "Bathia", "Tachta Zegagha", "Ain Bouyahia", "El Maine", "Tiberkanine", "Belaas"],
    "DZ-45": ["Naama", "Mechria", "Ain Sefra", "Tiout", "Sfissifa", "Moghrar", "Assela", "Djeniane Bourzeg", "Ain Ben Khelil", "Makman Ben Amer", "Kasdir", "El Biod"],
    "DZ-46": ["Ain Temouchent", "Chaabet El Ham", "Ain Kihal", "Hammam Bouhadjar", "Bou Zedjar", "Oued Berkeche", "Aghlal", "Terga", "Ain El Arbaa", "Tamzoura", "Chentouf", "Sidi Ben Adda", "Aoubellil", "El Malah", "Sidi Boumediene", "Oued Sabah", "Ouled Boudjemaa", "Ain Tolba", "El Amria", "Hassi El Ghella", "Hassasna", "Ouled Kihal", "Beni Saf", "Sidi Safi", "Oulhaca El Gheraba", "Tadmaya", "El Emir Abdelkader", "El Messaid"],
    "DZ-47": ["Ghardaia", "Dhayet Bendhahoua", "Berriane", "Metlili", "El Guerrara", "El Atteuf", "Zelfana", "Sebseb", "Bounoura", "Mansoura"],
    "DZ-48": ["Relizane", "Oued Rhiou", "Belaassel Bouzegza", "Sidi Saada", "Ouled Aiche", "Sidi Lazreg", "El Hamadna", "Sidi Mhamed Ben Ali", "Mediouna", "Sidi Khettab", "Ammi Moussa", "Zemmoura", "Beni Dergoun", "Djidiouia", "El Guettar", "Hamri", "El Matmar", "Sidi Mhamed Ben Aouda", "Ain Tarek", "Oued Essalem", "Ouarizane", "Mazouna", "Kalaa", "Ain Rahma", "Yellel", "Oued El Djemaa", "Ramka", "Mendes", "Lahlef", "Beni Zentis", "Souk El Haad", "Dar Ben Abdellah", "El Hassi", "Had Echkalla", "Bendaoud", "El Ouldja", "Merdja Sidi Abed", "Ouled Sidi Mihoub"],
    "DZ-49": ["Timimoun", "Charouine", "Ksar Kaddour", "Ouled Said", "Tinerkouk", "Deldoul", "Metarfa", "Aougrout", "Talmine", "Ouled Aissa"],
    "DZ-50": ["B Badji Mokhtar", "Timiaouine"],
    "DZ-51": ["Ouled Djellal", "Sidi Khaled", "Ras El Miad ", "Besbes", "Chaiba", "Doucen"],
    "DZ-52": ["Beni Abbes", "Tamtert", "Kerzaz", "Timoudi", "Beni Ikhlef", "El Ouata", "Tabelbala", "Ouled Khoudir", "Ksabi", "Igli"],
    "DZ-53": ["In Salah", "In Ghar", "Foggaret Azzaouia"],
    "DZ-54": ["In Guezzam", "Tinzaouatine"],
    "DZ-55": ["Touggourt", "Nezla", "Tebesbest", "Zaouia El Abidia", "Temacine", "Blidet Amor", "Megarine", "Mnaguer", "Taibet", "Benaceur", "Sidi Slimane", "El-hadjira", "El Alia"],
    "DZ-56": ["Djanet", "Bordj El Haouasse"],
    "DZ-57": ["El-mghair", "Oum Touyour", "Still", "Sidi Khelil", "Djamaa", "Sidi Amrane", "Tenedla", "Mrara"],
    "DZ-58": ["El Meniaa", "Hassi Gara", "Hassi Fehal"]
};