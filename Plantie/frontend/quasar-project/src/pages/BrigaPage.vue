<template>
  <div class="q-pa-md">
    <h2>Trgovina cvijećem</h2>

    <!-- Lista cvijeća -->
    <q-list>
      <q-item v-for="(flower, index) in flowers" :key="index">
        <q-item-section>
          <q-item-label>{{ flower.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn @click="showFlowerDetails(flower)" label="Pogledaj detalje" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Obavijest koja prikazuje informacije o cvijetu -->
    <q-snackbar v-model="snackbarVisible" color="positive" text-color="white" :timeout="3000">
      {{ notificationMessage }}
    </q-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flowers: [
        {
          name: 'Orhideja',
          description: 'Elegantna orhideja koja cvate tijekom cijele godine.',
          care: 'Orhideje su elegantne i egzotične biljke koje zahtijevaju specifične uvjete za rast. Najbolje rastu na svijetlim mjestima, ali ne podnose izravnu sunčevu svjetlost jer to može uzrokovati opekline na lišću. Orhideje vole visoku vlažnost, pa ih je potrebno redovito magliti ili postaviti na pladanj s vodom kako bi se povećala vlažnost zraka. Zalijevanje orhideja treba biti umjereno, tek kada tlo postane suho, a korijeni biljke ne smiju biti stalno mokri. Za orhideje se preporučuje korištenje specijaliziranog supstrata, poput kore drveta, koji omogućuje dobru drenažu. Orhideje ne zahtijevaju puno gnojiva, ali će bolje cvjetati ako ih redovito prihranjujete tekućim gnojivom tijekom razdoblja cvjetanja. Nakon što orhideje završe s cvjetanjem, stabljiku treba rezati kako bi biljka mogla usmjeriti energiju na novi rast. Orhideje su vrlo osjetljive na temperaturne promjene, pa im treba osigurati stabilne uvjete.'
        },
        {
          name: 'Ruža',
          description: 'Ruža je simbol ljubavi i strasti.',
          care: 'Ruže su popularne vrtne biljke koje zahtijevaju puno sunca i redovito zalijevanje. Ruže vole dobro drenirano tlo koje je bogato hranjivim tvarima, pa je preporučljivo redovito gnojiti biljke, osobito tijekom proljeća i ljeta. Kada ruže počnu cvjetati, potrebno je redovito uklanjati uvelo cvijeće kako bi biljka mogla potaknuti rast novih cvjetova. Zalijevanje je potrebno umjereno, osobito u sušnim periodima, ali treba izbjegavati mokre korijene, pa je najbolje zalijevati ujutro. Ruže također treba redovito obrezivati, kako bi se uklonili suhi i oštećeni dijelovi biljke, što potiče rast novih izdanaka. Uz to, ruže mogu biti podložne bolestima i napadima štetnika, pa je važno redovito provoditi preventivne mjere kako bi biljka bila zdrava. Dobro je koristiti ekološke insekticide i fungicide kako bi se održala u dobrom stanju.'
        },
        {
          name: 'Tulipan',
          description: 'Tulipan je vesela i šarena biljka koja voli sunce.',
          care: 'Tulipani su predivne proljetne biljke koje zahtijevaju određene uvjete za uspješan rast. Najbolje ih je saditi u jesen, obično između rujna i listopada, kada tlo počne hladiti. Lukovice treba posaditi na dubinu od 10 do 15 cm, s vrhom okrenutim prema gore, a razmak između svake lukovice treba biti oko 10 cm. Tulipani vole sunčana mjesta s puno svjetla, jer cvjetaju najbolje kad imaju najmanje 6 sati izravne sunčeve svjetlosti dnevno. Tlo mora biti dobro drenirano kako bi se spriječilo nakupljanje vode koje može uzrokovati truljenje lukovica. Zalijevanje treba biti umjereno, osobito nakon sadnje, kako bi lukovice bile u mogućnosti dobro ukorijeniti, no kasnije se zalijevanje smanjuje. Preporučuje se umjereno zalijevanje, pazeći da tlo bude vlažno, ali nikako preplavljeno vodom. Također, važno je ukloniti uvelo cvijeće nakon cvatnje kako bi biljka mogla uštedjeti energiju za razvoj lukovica za sljedeću sezonu. Lišće treba ostaviti dok se prirodno ne osuši, jer će to pomoći biljci da pohrani hranjive tvari u lukovice.'
        },
        {
          name: 'Fikus',
          description: 'Fikus je popularna sobna biljka koja zahtijeva minimalnu njegu.',
          care: 'Fikus je popularna sobna biljka koja može rasti u različitim uvjetima, ali najbolje uspijeva na svijetlim mjestima bez izravne sunčeve svjetlosti, koja može uzrokovati opekline na lišću. Fikus treba redovito zalijevanje, ali tlo ne smije biti previše vlažno, jer to može dovesti do truljenja korijena. Zalijevanje treba obaviti kada je gornji sloj tla suhi, a u zimskim mjesecima potrebno je smanjiti količinu vode jer biljka tada usporava rast. Fikus također preferira umjerene temperature i ne voli nagle promjene. Povremeno ga je potrebno prihranjivati tekućim gnojivom tijekom proljeća i ljeta, dok u zimi, kad biljka ulazi u fazu mirovanja, gnojidba nije potrebna. Ako se primijeti da lišće postaje žuto ili pada, to može biti znak prekomjernog zalijevanja, premalo svjetla ili stresa zbog temperaturnih promjena. Fikus se također može obrezivati kako bi se održao željeni oblik i uklonili suhi listovi.'
        },
        {
          name: 'Kaktus',
          description: 'Kaktus je otporna biljka koja voli sunčana mjesta i rijetko zahtijeva zalijevanje.',
          care: 'Kaktusi su vrlo otporne biljke koje preferiraju sunčana i suha mjesta. Ove biljke su prilagođene sušnim uvjetima i zahtijevaju minimalnu njegu. Kaktusi ne podnose vlagu, pa je važno posaditi ih u tlo koje se brzo dreniruje, kako bi se spriječilo nakupljanje vode u posudi. Zalijevanje treba biti rijetko, tek kada je tlo potpuno suho, jer previše vode može uzrokovati truljenje korijena. Tijekom zime, mnogi kaktusi ulaze u fazu mirovanja, pa im tada nije potrebno zalijevanje, osim ako ne živite u vrlo toplom i suhom okruženju. Također, kaktusi ne zahtijevaju puno gnojiva, ali tijekom aktivnog rasta, povremeno ih možete prihraniti specijaliziranim gnojivom za sukulente. Kaktusi su idealne biljke za osobe koje nemaju puno vremena za brigu o biljkama jer su vrlo otporne i ne zahtijevaju puno pažnje, ali i dalje će vas nagraditi svojim jedinstvenim izgledom.'
        },
        {
          name: 'Lavanda',
          description: 'Lavanda je mirisna biljka koja privlači pčele i leptire.',
          care: 'Lavanda je mediteranska biljka koja voli sunčana i topla mjesta. Iako je vrlo otporna na sušu, lavanda zahtijeva dobro drenirano tlo jer ne podnosi prekomjernu vlagu, koja može uzrokovati truljenje korijena. Zalijevanje treba biti umjereno, osobito u sušnim periodima, ali treba izbjegavati da tlo bude previše mokro. Lavanda također voli alkalno tlo, pa ako je vaše tlo kiselo, može biti korisno dodati malo vapna kako bi se povećala pH vrijednost. Tijekom vegetacije, lavanda je najbolje prihraniti povremeno, koristeći gnojivo bogato fosforom kako bi potaknula cvjetanje. Nakon što lavanda završi s cvatnjom, obavezno je obrezujte kako biste zadržali njezin kompaktni oblik i potaknuli rast novih izdanaka.'
        },
        {
          name: 'Paprat',
          description: 'Paprat je biljka koja dobro raste u vlažnim i sjenovitim uvjetima.',
          care: 'Paprat je biljka koja preferira vlažna i sjenovita mjesta, zbog čega je idealna za unutarnje prostore ili vlažne vrtove. Paprati trebaju indirektnu sunčevu svjetlost jer previše sunčanja može uzrokovati opekline na lišću. Ove biljke vole stalnu vlagu, pa je važno redovito zalijevati, ali paziti da ne preplavite tlo, jer prekomjerna vlaga može uzrokovati truljenje korijena. Idealno je zalijevati paprat kada je gornji sloj tla suhi, no tlo mora ostati konstantno vlažno. Povećanje vlažnosti zraka također može pomoći paprati da raste bolje, pa je dobro magliti biljku ili staviti je na pladanj s vodom i kamenčićima. Ako biljka pokazuje znakove stresa, poput sušenja lišća, može biti znak da nije dobila dovoljno vlage. U proljeće i ljeto paprati dobro reagiraju na povremenu prihranu tekućim gnojivom, dok se zimi, kad biljka ulazi u fazu mirovanja, gnojidba obustavlja.'
        },
        {
          name: 'Bonsai',
          description: 'Bonsai je miniatuurna stabla koja zahtijevaju puno pažnje i njege.',
          care: 'Bonsai je umjetnost oblikovanja drveća u minijaturnom obliku, koja zahtijeva puno pažnje i strpljenja. Bonsai drveće treba svijetlo, ali ne izravnu sunčevu svjetlost jer može doći do opeklina na lišću. Idealno je smjestiti bonsai na mjesto s puno indirektne sunčeve svjetlosti. Tlo mora biti lagano, dobro drenirano i prozračno, jer stagnacija vode može uzrokovati truljenje korijena. Zalijevanje bonsaija treba biti redovito, ali nikako prekomjerno. Treba ga zalijevati tek kad tlo počne sušiti na površini, a višnje ili korijenje ne smiju stajati u vodi. Bonsai također zahtijeva redovito obrezivanje grana i lišća kako bi zadržao željeni oblik. Ovo obrezivanje uključuje i obrezivanje korijena, što je obavezno pri presađivanju svakih 2 do 3 godine. Bonsai drveće treba i oblikovati žicama koje pomažu usmjeriti grane u željeni smjer. U periodu vegetacije, bonsai je potrebno prihranjivati, ali s umjerenim količinama gnojiva kako bi se potaknuo zdrav rast. Održavanje bonsaija zahtijeva posvećenost, ali rezultati u obliku prelijepog minijaturnog drveća bit će nagrada za trud.'
        }
      ],
      snackbarVisible: false,
      notificationMessage: '',
    };
  },
  methods: {
    // Funkcija za prikazivanje informacija o cvijetu
    showFlowerDetails(flower) {
      this.notificationMessage = `${flower.name} - ${flower.description}\nSavjeti o brizi: ${flower.care}`;
      this.snackbarVisible = true;
    }
  }
};
</script>

