const express  = require('express');
const app = express();
// app.enable('trust proxy');
// app.use((req,res,next)=>{
//   if(req.protocol=='https'){
//     next();
//   }else{
//     res.redirect(`https://${req.hostname}`);
//   }
// })
// const path=require('path');
// app.use(express.static(path.join(__dirname,"../build")));
const server  = require('http').createServer(app);
let bodyParser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;
let crypto = require('crypto-js');
const myKey = "forkify";
// app.get("/",(req,res,next)=>{
//   res.sendFile(path.join(__dirname,"../build","index.html"));
// })


//mongodb connectivity
// var mongoUrl = "mongodb://localhost:27017/"
var mongoUrl ="mongodb+srv://shivam:shivam027@cluster0-jg0ns.mongodb.net/test?retryWrites=true&w=majority";



//mongo DB funtions
// insertOne
// findOne
// updateOne
// deleteOne







app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))

let list = { 
  "data" : 
  [
    {
      "title":"Paris",
      "img":"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
    },
    {
      "title":"South Island, New Zealand",
      "img":"https://resources.stuff.co.nz/content/dam/images/1/e/7/z/j/e/image.related.StuffLandscapeSixteenByNine.710x400.1f3nqt.png/1477606780731.jpg"
    },
    {
      "title":"Rome",
      "img":"https://lonelyplanetimages.imgix.net/mastheads/stock-photo-roman-sunset-77415821.jpg?sharp=10&vib=20&w=1200"
    },
    {
      "title":"Tahiti",
      "img":"https://www.airtahitinui.com/sites/default/files/img-slides/desktop/hero-content-islands-of-tahiti-desk1.jpg"
    },
    {
      "title":"London",
      "img":"https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/United%20Kingdom/London/london-aerial-thames-guide.jpg?imwidth=1400"
    },
    {
      "title":"Maui",
      "img":"https://www.islands.com/resizer/eSpDCtkLFWVrFLdb3sl31PF0XZg=/1293x970/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/LXTFAFIPTHG5Q4BCOAW72MJG7A.jpg"
    },
    {
      "title":"Bora Bora",
      "img":"https://www.fourseasons.com/alt/img-opt/~70.1530.0,0000-0,0000-1600,0000-900,0000/publish/content/dam/fourseasons/images/web/BOR/BOR_306_aspect16x9.jpg"
    },
    {
      "title":"Phuket",
      "img":"https://bkkaruncloud.b-cdn.net/wp-content/uploads/2019/03/pattaya-to-phuket.jpg"
    },
    {
      "title":"Grand Canyon",
      "img":"https://today.tamu.edu/wp-content/uploads/2019/02/GettyImages-858637934.jpg"
    },
    {
      "title":"Yosemite",
      "img":"https://www.nationalgeographic.com/content/dam/travel/2019-digital/yosemite-guide/yosemite-national-park-california.jpg"
    },
    {
      "title":"Barcelona",
      "img":"https://media.nomadicmatt.com/barcelonaguide.jpg"
    },
    {
      "title":"New York City",
      "img":"https://www.ytravelblog.com/wp-content/uploads/2016/12/nyc-travel-tips-1.jpg"
    },
    {
      "title":"Dubai",
      "img":"http://www.travelstart.co.za/blog/wp-content/uploads/2018/05/burjkhalifa.jpg"
    },
    {
      "title":"Machu Picchu",
      "img":"https://cdn.getyourguide.com/img/location_img-1570-3285976407-148.jpg"
    },
    {
      "title":"Sydney",
      "img":"https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/australia-oceania/sydney-travel.adapt.1900.1.jpg"
    },
    {
      "title":"Maldives",
      "img":"https://q-cf.bstatic.com/images/hotel/max1280x900/132/132680097.jpg"
    },
    {
      "title":"Amsterdam",
      "img":"https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m"
    },
    {
      "title":"San Francisco",
      "img":"https://image.cnbcfm.com/api/v1/image/105284147-GettyImages-673632588.jpg?v=1557935343&w=1400&h=950"
    },
    {
      "title":"Florence",
      "img":"https://cdn-01.independent.ie/life/travel/article37363195.ece/9061d/AUTOCROP/w620/florence.jpg"
    },
    {
      "title":"Yellowstone",
      "img":"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1134220530%2F960x0.jpg%3Ffit%3Dscale"
    },
    {
      "title":"Banff",
      "img":"https://s16592.pcdn.co/wp-content/uploads/2018/01/john-lee-351482-2.jpg"
    },
    {
      "title":"Argentine Patagonia",
      "img":"https://cache-graphicslib.viator.com/graphicslib/page-images/742x525/798025_Full_Day_Tour_to_the_Perito_Moreno_Glacier_including_Boat_Safari_039.jpg"
    },
    {
      "title":"British Virgin Islands",
      "img":"https://www.islands.com/resizer/f9Wj0HYUMUKK02KIlpRNhYaSiXA=/1293x862/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/AUPMGKQCNPQEJEXS3YWCILBXJA.jpg"
    },
    {
      "title":"Santorini",
      "img":"https://www.discovergreece.com/~/media/images/article-background-images/santorini-the-one-and-only/santorini-view.ashx"
    },
    {
      "title":"St Lucia",
      "img":"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fjimdobson%2Ffiles%2F2018%2F08%2FJade-Sea2-1024x782.jpg"
    },
    {
      "title":"Prague",
      "img":"https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Czech%20Republic/Prague/prague-main-image.jpg?imwidth=1400"
    },
    {
      "title":"Rio de Janeiro",
      "img":"https://www.brazil-insider.com/en/wp-content/uploads/2017/09/exklusiv-rio.jpg"
    },
    {
      "title":"Great Barrier Reef",
      "img":"https://australiapostcollectables.com.au/content/dam/auspost_corp_microsites/collectables/articles-2018/explore-the-great-barrier-reef-during-stamp-collecting-month-2018/explore-the-great-barrier-reef-during-stamp-collecting-month-2018.png"
    },
    {
      "title":"Costa Rica",
      "img":"https://rialzo.meridianhs.org/wp-content/uploads/2019/03/Costa-Rica.jpg"
    },
    {
      "title":"Amalfi Coast",
      "img":"https://www.thenaturaladventure.com/wp-content/uploads/2018/01/amalfi-coast-italy.jpg"
    }
  ]
}






let info = {
  'Paris':
    `<h1>Why Go To Paris ?</h1>
    The City of Light draws millions of visitors every year with its unforgettable ambiance. Of course, the divine cuisine and vast art collections deserve some of the credit as well. The gentle River Seine rambles through the city, flanked by stately museums, centuries-old churches, and blocks of Rococo- and Neoclassic-design architecture, further enhanced by cascading trees and glowing streetlamps. Peppering the Seine's cobbled walks and graceful bridges are impossibly chic Parisians, probably on their way to the market, cafe or cinema.

    Containing world-class museums, fashion, cuisine and an atmosphere all its own, Paris is also a city of "many splendors," as Ernest Hemingway recalled in his memoir, "A Moveable Feast." Visit the beloved Musée d'Orsay, shop the biggest designers on the Champs Élysées or hit the boutiques in Le Marais, take in the view atop the Eiffel Tower, or even plan a day trip to Versailles Palace. But don't miss out on the simple pleasure of meandering the marvelous arrondissements (districts), or snacking on street crepes either.
    <p></p>
    <h2>Top Hotels in Paris :</h2>
    <ul>
      <li><a id="hotel" href="https://relais-christine.com/en/">Relais Christine</a></li>
      <li><a id="hotel" href="https://www.leballu-paris.com/en/">Hôtel Le Ballu</a></li>
      <li><a id="hotel" href="https://www.ritzparis.com/en-GB">Ritz Paris</a></li>
      <li><a id="hotel" href="http://www.hoteldaubusson.com/en/">Hôtel D'Aubusson</a></li>
      <li><a id="hotel" href="https://www.hotel-fauchon-paris.fr/">Fauchon L'Hôtel Paris</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Paris :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/disneyland-paris-tickets.a171360.activity-details?srp=true&location=Paris&pageNumber=1&expandedRegion=false">Visit Disneyland Paris</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/dinner-cruise-on-the-seine-river.a171081.activity-details?srp=true&location=Paris&pageNumber=1&expandedRegion=false">Dinner Cruise on the Seine River</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/paris-hop-on-hop-off-bus-tour.a278015.activity-details?srp=true&location=Paris&pageNumber=1&expandedRegion=false">Paris Hop-On Hop-Off Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/skip-the-line-louvre-museum-audio-tour.a171593.activity-details?srp=true&location=Paris&pageNumber=1&expandedRegion=false">Skip-the-Line Louvre Museum Audio Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/river-seine-sightseeing-cruise.a171063.activity-details?srp=true&location=Paris&pageNumber=1&expandedRegion=false">River Seine Sightseeing Cruise</a></li>
    <ul/>`
    ,
  'South Island, New Zealand':
    `<h1>Why Go To South Island, New Zealand ?</h1>
    New Zealand's South Island brims with majestic landscapes at every turn, from dramatic mountains to fjords to glaciers. Here, you can explore Fiordland National Park, a UNESCO World Heritage Area, or gaze at the starry skies at Mount John Observatory. You can also indulge your inner daredevil in Queenstown, explore two of the most accessible glaciers in the world on the west coast or sample delicious food and wine in Marlborough.The South Island of New Zealand is renowned for its mountains, lakes and glaciers. The Southern Alps, home to 3,724m-high Aoraki Mt. Cook, run along the entire length of the island. In the southwest is Fiordland National Park, with steep-sided Milford Sound. In the north is Abel Tasman National Park, known for its trails and ocean kayaking. Queenstown is famed for adventure sports like bungee jumping and skiing.
    <p></p>
    <h2>Top Hotels in South Island, New Zealand :</h2>
    <ul>
      <li><a id="hotel" href="https://www.robertsonlodges.com/the-lodges/matakauri">Matakauri Lodge</a></li>
      <li><a id="hotel" href="https://www.themarlboroughlodge.co.nz/">The Marlborough Lodge</a></li>
      <li><a id="hotel" href="http://www.blanketbay.com">Blanket Bay</a></li>
      <li><a id="hotel" href="https://www.fiordlanddiscovery.co.nz/">Milford Sound Overnight Cruise - Fiordland Discovery</a></li>
      <li><a id="hotel" href="https://www.azur.co.nz/">Azur Lodge</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in South Island, New Zealand :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/christchurch-hop-on-hop-off-double-decker-city-tour.a182742.activity-details">Christchurch Hop On Hop Off Double Decker City Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/christchurch-tramway-dinner-experience.a299938.activity-details">Christchurch Tramway Dinner Experience</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/lord-of-the-rings-edoras-full-day-tour.a182735.activity-details">Lord of the Rings Edoras Full-Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/international-antarctic-centre-admission.a497809.activity-details">International Antarctic Centre Admission</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/zipline-across-christchurch-adventure-park.a520922.activity-details">Zipline across Christchurch Adventure Park</a></li>
    <ul/>`      
  ,
  'Rome':
    `<h1>Why Go To Rome ?</h1>
    Rome, the city of seven hills, enjoyed a mythic beginning. Romulus and Remus – twin brothers who were nursed by a she-wolf and fathered by a war god – reportedly founded the Eternal City. And although historians are a little skeptical about this epic entry into the world, most travelers are absolutely certain that there is something magical about Rome. Whether it's the mystery of nearby Vatican City or the ghosts of the Colosseum, an afternoon caffè on Piazza Navona or a piled-high plate of pasta at a trattoria, Roma is sure to enchant.

    Italy's capital city, Rome is also known for a history that dates back to the eras of Octavian, Julius Caesar and Hadrian, among others. Left behind are structures like the Pantheon, the Roman Forum and dozens of churches, among other historic gems. Art enthusiasts will relish the trove of art housed at the Vatican Museums, and foodies will enjoy the splendid Italian fare, not to mention the gelato. And though its momentous past is the focus for many vacationers, Rome is also a fast-paced, modern and relevant city, with gleaming designer storefronts, sleek hotels and cutting-edge restaurants.
    <p></p>
    <h2>Top Hotels in Rome :</h2>
    <ul>
      <li><a id="hotel" href="https://www.radicalhotel.it/en/">The Radical Hotel Roma</a></li>
      <li><a id="hotel" href="http://boutique-relais-bramante.tophotelsrome.com/en/">Boutique Relais Bramante</a></li>
      <li><a id="hotel" href="https://www.hotelsantamariatrastevere.it/">Hotel Santa Maria</a></li>
      <li><a id="hotel" href="https://www.navonastyle.com/navona-style-hotel-rome.htm">Navona Style</a></li>
      <li><a id="hotel" href="https://www.hotelvilon.com/en/">Hotel Vilòn - Small Luxury Hotels of the World</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Rome :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/faster-than-skip-the-line-vatican-sistine-chapel-and-st-peters-tour.a166597.activity-details">Faster Than Skip-the-Line: Vatican, Sistine Chapel and St. Peter's Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/skip-the-line-colosseum-forum-tour-with-special-gladiators-gate-arena-floor-access.a451710.activity-details">Skip-the-line: Colosseum & Forum Tour with Special Gladiator’s Gate & Arena Floor Access</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/rome-hop-on-hop-off-bus-tour.a376190.activity-details">Rome Hop-On Hop-Off Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/skip-the-line-vatican-museums-tickets-with-hosted-entry.a490292.activity-details">Skip the Line: Vatican Museums Tickets with Hosted Entry</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/skip-the-line-colosseum-forum-palatine-hill-guided-tour.a166587.activity-details">Skip the Line: Colosseum, Forum & Palatine Hill Guided Tour</a></li>
    <ul/>`  
  ,
  'Tahiti':
  `<h1>Why Go To Tahiti ?</h1>
  Miles of shoreline, dozens of resorts, French cuisine to die for – Tahiti has all the makings of a honeymoon destination. But beach bums often pass over Tahiti's sands in favor of Bora Bora's ivory shores. Despite its idyllic reputation and accessibility, Tahiti is more of an off-the-beaten-path stop than a romantic getaway. However, that doesn't mean Tahiti should be ignored.

  Leafy forests sit beside sandy shores, French crêpes are served alongside Tahitian poisson cru (raw fish). If there ever was a place that embodies the beautiful duality of the French Polynesian archipelago, it's Tahiti. Here, the quirky, often chaotic atmosphere of the island's capital, Papeete, rubs elbows with uncorrupted natural beauty. In fact, Tahiti – the largest of French Polynesia's 118 islands – is often referred to as two separate islands despite them being joined by a tiny land bridge. Tahiti Nui is the larger, northern section where Papeete can be found. Tahiti Iti (the smaller half) is less accessible, although many visitors make the trek here for a taste of seclusion. Just note that spending a week on either part of Tahiti will cost you quite a chunk of change. But travelers agree that the warm waters, the lush jungles and the luxurious resorts are worth the splurge.
  <p></p>
    <h2>Top Hotels in Tahiti :</h2>
    <ul>
      <li><a id="hotel" href="https://tahiti.intercontinental.com/">InterContinental Tahiti Resort & Spa</a></li>
      <li><a id="hotel" href="http://sofitel-moorea-iaora.com/">Sofitel Moorea Ia Ora Beach Resort</a></li>
      <li><a id="hotel" href="https://www.manavamoorearesort.com/en/">Manava Beach Resort & Spa - Moorea</a></li>
      <li><a id="hotel" href="https://www3.hilton.com/en/hotels/french-polynesia/hilton-moorea-lagoon-resort-and-spa-PPTMLHI/index.html?WT.srch=1&WT.mc_id=zIMDPDA0APAC1MB2PSH3PPC_Google_search4cid272300587_aid17673870907_mb_kkwd-410247074195Brand_Nano6PPTMLHI7en&utm_source=Google&utm_medium=ppc&utm_campaign=paidsearch&campaignid=272300587&adgroupid=17673870907&targetid=kwd-41024707419&gclsrc=aw.ds&ds_rl=1258120">Hilton Moorea Lagoon Resort & Spa</a></li>
      <li><a id="hotel" href="https://www.fenua-mataioa.com/index.php?lg=2">Fenua Mata'i'oa</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Tahiti :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/polynesian-island-full-day-tour.a297171.activity-details?srp=true&sortBy=ExpediaPicks&latLong=-16.538064%2C-151.701069&rid=180103&pageNumber=1&expandedRegion=true">Polynesian Island Full-Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/bora-bora-4x4-adventure.a174584.activity-details?srp=true&sortBy=ExpediaPicks&latLong=-16.538064%2C-151.701069&rid=180103&pageNumber=1&expandedRegion=true">Bora Bora 4x4 Adventure</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/polynesian-island-half-day-tour.a297175.activity-details?srp=true&sortBy=ExpediaPicks&latLong=-16.538064%2C-151.701069&rid=180103&pageNumber=1&expandedRegion=true">Polynesian Island Half-Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/half-day-4wd-safari-in-bora-bora.a359528.activity-details?srp=true&sortBy=ExpediaPicks&latLong=-16.538064%2C-151.701069&rid=180103&pageNumber=1&expandedRegion=true">Half day 4WD Safari in Bora Bora</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/ultimate-shark-ray-watching-cruise.a362002.activity-details?srp=true&sortBy=ExpediaPicks&latLong=-16.538064%2C-151.701069&rid=180103&pageNumber=1&expandedRegion=true">Ultimate Shark & Ray Watching Cruise</a></li>
    <ul/>`  
  ,
  'London':
  `<h1>Why Go To London ?</h1>
  The English writer Samuel Johnson famously said, "You find no man, at all intellectual, who is willing to leave London. No, Sir, when a man is tired of London, he is tired of life; for there is in London all that life can afford." More than two centuries have passed since Johnson's era, but his words still ring true. Life in London is nothing short of invigorating, and travelers find that one visit isn't enough to experience everything this two-millennia-old city has to offer.

  Here, the antiquated clasps hands with the contemporary. You'll find the historic Tower of London and the avant-garde Tate Modern both considered must-sees. Shakespeare's sonnets are still being uttered by actors who don modern garb. Londoners most certainly still respect the royals, but they also jam to the likes of Arctic Monkeys and Adele. And while they still praise the power of tea, they now make room for some Starbucks here and there, and pressed juice too. A current leader in everything from politics and banking to fashion and music, London's culture compass is always attuned to what's next.
  <p></p>
  <h2>Top Hotels in London :</h2>
  <ul>
    <li><a id="hotel" href="https://www.rosewoodhotels.com/en/london">Rosewood London</a></li>
    <li><a id="hotel" href="https://www.thesavoylondon.com/">The Savoy</a></li>
    <li><a id="hotel" href="https://www.corinthia.com/en/hotels/london">Corinthia Hotel London</a></li>
    <li><a id="hotel" href="https://www.the-shard.com/shangri-la/">Shangri-La Hotel at The Shard, London </a></li>
    <li><a id="hotel" href="https://www.dorchestercollection.com/en/london/the-dorchester/">The Dorchester - Dorchester Collection</a></li>
  </ul>
  <h2>Top things to do in London :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/tower-of-london-tickets-with-beefeater-tour-crown-jewels.a169662.activity-details">Tower of London Tickets with Beefeater Tour & Crown Jewels</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/the-london-eye-experience-tickets.a169631.activity-details">The London Eye Experience Tickets</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/harry-potter-warner-bros-studio-tour.a254128.activity-details">Harry Potter Warner Bros. Studio Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/plaza-premium-lounge-at-london-heathrow-airport-lhr-terminal.a249740.activity-details">Plaza Premium Lounge at London Heathrow Airport (LHR) - Terminal</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/business-london-gatwick-airport-transfer-e-class.a730836.activity-details">Business London Gatwick Airport Transfer E-Class</a></li>
    <ul/>`
  ,
  'Maui':
  `<h1>Why Go To Maui ?</h1>
  Maui is not nearly as large as the Big Island, nor is it as small as Lanai, as bustling as Oahu or as quiet as Kauai. For many Hawaii vacationers, Maui is just right – offering a taste of just about everything the Aloha State has to offer, from impressive wildlife to intriguing history and culture. While on a visit here, you can shimmy alongside professional hula dancers, golf along coastal fairways, snorkel alongside five different types of sea turtles or simply lounge along some of Hawaii's most notable beaches.

  One of the archipelago's most popular tourism spots, Maui can be found sandwiched between the Big Island and the much tinier Molokai. Maui is divided into five distinct regions: Many travelers base themselves along the coasts of South Maui (home to the famous Wailea Beach) or West Maui, where the sands of Kaanapali Beach and the music from the Old Lahaina Luau are located. But the rest of the island should not be missed. Travel along the Road to Hana to experience East Maui's scenic coastline, explore Haleakala – the world's largest dormant volcano – in the Upcountry and explore the former tribal battlegrounds of Central Maui's Iao Valley State Park. And for a bird's-eye view of it all, reserve a spot on one of Maui's best helicopter tours.
  <p></p>
    <h2>Top Hotels in Maui :</h2>
    <ul>
      <li><a id="hotel" href="https://www.fourseasons.com/maui/">Four Seasons Resort Maui at Wailea</a></li>
      <li><a id="hotel" href="https://www.grandwailea.com/">Ho'olei at Grand Wailea</a></li>
      <li><a id="hotel" href="https://www.hyatt.com/en-US/hotel/hawaii/andaz-maui-at-wailea-resort/oggaw?&src=adm_sem_agn_360i_crp_ppc_D+Brand-Hawaii+Other-NonGP_google_Brand-Hawaii+Other-Wailea-AZ+Maui-BMM_b_%2Bandaz%20%2Bwailea_Brand&&src=adm_sem_agn_360i_crp_ppc_D+Brand-Hawaii+Other-NonGP_google_Brand-Hawaii+Other-Wailea-AZ+Maui-BMM_%7bbidmatchtype%7d_%2Bandaz%20%2Bwailea_Brand&gclid=CjwKCAjw5fzrBRASEiwAD2OSV0fEHyG4SPxxVA4yRYMTBf9xVbW5SNfKbvC5FxtYjjDNgdb86BN4GhoC3NMQAvD_BwE&gclsrc=aw.ds">Andaz Maui at Wailea Resort - A Concept by Hyatt</a></li>
      <li><a id="hotel" href="https://www.montagehotels.com/kapaluabay/">Montage Kapalua Bay</a></li>
      <li><a id="hotel" href="https://www.marriott.com/hotels/travel/hnmmc-wailea-beach-resort-marriott-maui/">Wailea Beach Resort - Marriott, Maui</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Maui :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/drums-of-the-pacific-luau-at-the-hyatt-regency-resort.a380190.activity-details?srp=true&location=Maui+Island&pageNumber=1&expandedRegion=false">Drums of the Pacific Luau at the Hyatt Regency Resort</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/underwater-submarine-adventure.a387430.activity-details?srp=true&location=Maui+Island&pageNumber=1&expandedRegion=false">Underwater Submarine Adventure</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/molokini-turtle-arches-snorkeling.a379536.activity-details?srp=true&location=Maui+Island&pageNumber=1&expandedRegion=false">Molokini & Turtle Arches Snorkeling</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/te-au-moana-luau-at-the-wailea-beach-marriott-resort.a382588.activity-details?srp=true&location=Maui+Island&pageNumber=1&expandedRegion=false">Te Au Moana Luau at the Wailea Beach Marriott Resort</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/lahaina-group-surf-lessons.a559959.activity-details?srp=true&location=Maui+Island&pageNumber=1&expandedRegion=false">Lahaina Group Surf Lessons</a></li>
    <ul/>`
  ,
  'Bora Bora':
  `<h1>Why Go To Bora Bora ?</h1>
  The small island of Bora Bora (just about 6 miles long and a little more than 2 miles wide) overflows with beauty. A dormant volcano rises up at its center and fans out into lush jungle before spilling into an aquamarine lagoon. In fact, author James Michener, who wrote "Tales of the South Pacific," called Bora Bora "the most beautiful island in the world." The 18th-century British explorer James Cook even coined it as the "Pearl of the Pacific." The very definition of a tropical getaway, blissful Bora Bora abounds with luxurious resorts, sunny skies, warm waters and friendly locals. 

  And as you might've already guessed, the main industry on this petite island in French Polynesia and its swarm of tiny motu (islands) is tourism. To that end, you can snorkel, explore Vaitape (Bora Bora's main port), hike Mount Otemanu and more. But there's a catch: Bora Bora is expensive – very expensive. In short, visit Bora Bora for natural beauty, visit for utter relaxation and visit if you have the money.
  <p></p>
    <h2>Top Hotels in Bora Bora :</h2>
    <ul>
      <li><a id="hotel" href="https://www.sunsethilllodge.com/">Sunset Hill Lodge</a></li>
      <li><a id="hotel" href="http://www.bora.hotelmaitai.com/">Maitai Polynesia Bora Bora</a></li>
      <li><a id="hotel" href="https://www.overwaterbungalows.net/oa-oa-lodge">Oa Oa Lodge</a></li>
      <li><a id="hotel" href="http://www.blueheavenisland.com/">Blue Heaven Island lodge</a></li>
      <li><a id="hotel" href="https://www.villareahanaa.net/maestro">Villa Rea Hanaa</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Bora Bora :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/polynesian-island-full-day-tour.a297171.activity-details">Polynesian Island Full-Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/bora-bora-4x4-adventure.a174584.activity-details">Bora Bora 4x4 Adventure</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/bora-bora-lagoon-snorkeling-tour-with-shark-stingray.a459870.activity-details">Bora Bora Lagoon Snorkeling Tour with Shark & Stingray</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/polynesian-island-half-day-tour.a297175.activity-details">Polynesian Island Half-Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/bora-bora-luxury-catamaran-sunset-cruise.a702989.activity-details">Bora Bora Luxury Catamaran Sunset Cruise</a></li>
    <ul/>`  
  ,
  'Phuket':
  `<h1>Why Go To Phuket ?</h1>
  Pure white sands, aquamarine waters and limestone cliffs await travelers who visit Thailand's southwestern island of Phuket. Surrounded by the Andaman Sea and about an hour by plane from Bangkok, this island is a little piece of paradise, which comes with a relatively low price tag for everything from its accommodations to spa treatments and boat tours. But along with its tropical appeal, Phuket beckons to travelers wanting to experience its flavorful cuisine (think: lemongrass, lime leaves, chillies) and its rich culture, heavily influenced by its reigning religion: Buddhism. 

  And although the island's beaches and tourism operators have bounced back from the 2004 tsunami, which hammered its western coast and tragically claimed thousands of lives, it remembers the past with memorials and a better warning system, should the area once again come under threat.
  <p></p>
    <h2>Top Hotels in Phuket :</h2>
    <ul>
      <li><a id="hotel" href="http://www.theshorephuket.com/">The Shore At Katathani</a></li>
      <li><a id="hotel" href="https://www.themarinaphuket.com/">The Marina Phuket Hotel</a></li>
      <li><a id="hotel" href="https://www.asperyphuket.com/">Aspery Hotel</a></li>
      <li><a id="hotel" href="https://www.phuketgraceland.com/">Phuket Graceland Resort & Spa</a></li>
      <li><a id="hotel" href="http://www.bandaraphuket.com/intro/index.php">Bandara Phuket Beach Resort</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Phuket :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/amazing-phuket-island-guided-tour-with-optional-big-buddha.a546707.activity-details">Amazing Phuket Island Guided Tour with optional Big Buddha</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/phuket-island-introduction-tour-half-day.a237853.activity-details">Phuket Island Introduction Tour Half Day</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/john-grays-hong-by-starlight-with-sea-kayaking-loy-krathong-floating.a446676.activity-details">John Gray's Hong by Starlight with Sea Kayaking & Loy Krathong Floating</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/phi-phi-early-bird-sunrise.a482500.activity-details">Phi Phi Early Bird - Sunrise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/james-bond-island-phang-nga-bay-and-snorkeling-day-trip.a462496.activity-details">James Bond Island & Phang Nga Bay and Snorkeling Day Trip</a></li>
    <ul/>`  
  ,
  'Grand Canyon':
  `<h1>Why Go To Grand Canyon ?</h1>
  "Grand" doesn't begin to do this canyon justice. Measuring approximately 277 river miles in length, up to 18 miles in width and a mile deep, this massive chasm in northern Arizona is truly a natural wonder. For six million years, the Grand Canyon has expanded with the help of the mighty Colorado River, and for centuries, people from all over the globe have traveled to gaze out over its red and orange grandeur. Managed by the National Park Service and officially designated as a UNESCO World Heritage site, the Grand Canyon leaves its approximately 6 million visitors per year awestruck.

  But if you're seeking a secluded escape to Mother Nature, you should be prepared: The Grand Canyon can be very crowded. The South Rim – home to the Grand Canyon Village and the well-worn Bright Angel Trail – is particularly popular for sightseers and hikers. It is on this side that you'll find the most amenities. For a break from the crowds, head to the North Rim. This is the place for backwoods camping and hardcore hiking.
  <p></p>
    <h2>Top Hotels in Grand Canyon :</h2>
    <ul>
      <li><a id="hotel" href="https://www.visitgrandcanyon.com/yavapai-lodge">Yavapai Lodge</a></li>
      <li><a id="hotel" href="https://www.grandcanyonlodges.com/lodging/maswik-lodge/">Maswik Lodge</a></li>
      <li><a id="hotel" href="https://www.hiexpress.com/hotels/gb/en/grand-canyon/gcnaz/hoteldetail?fromRedirect=true&qSrt=sBR&qIta=99615773&icdv=99615773&glat=SEAR&qSlH=GCNAZ&setPMCookies=true&qSHBrC=EX&qDest=226%20Hwy%2064,%20Grand%20Canyon,%20AZ,%20US&dp=true&gclid=CjwKCAjw5fzrBRASEiwAD2OSV65W9-8pdMJ28aRoMV0G3iQSZ0xL19tWJfQU7G6BC8DB-pHLEN3HdhoCarAQAvD_BwE&cid=8685&srb_u=1">Holiday Inn Express Grand Canyon</a></li>
      <li><a id="hotel" href="https://www.grandcanyonplaza.com/">Grand Canyon Plaza Hotel</a></li>
      <li><a id="hotel" href="https://redfeatherlodge.com/index.php">Red Feather Lodge</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Grand Canyon :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/multi-stop-grand-canyon-south-rim-tour.a362596.activity-details"">Multi-Stop Grand Canyon South Rim Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/full-day-grand-canyon-south-rim-bus-tour.a184199.activity-details">Full-Day Grand Canyon South Rim Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/multi-stop-grand-canyon-west-rim-bus-tour.a363096.activity-details">Multi-Stop Grand Canyon West Rim Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/grand-canyon-west-rim-bus-tour.a184203.activity-details">Grand Canyon West Rim Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/grand-canyon-picnic-with-limo-landing-champagne.a246393.activity-details">Grand Canyon Picnic with Limo, Landing & Champagne</a></li>
    <ul/>`  
  ,
  'Yosemite':
  `<h1>Why Go To Yosemite ?</h1>
    One of California's most formidable natural landscapes, Yosemite National Park features nearly 1,200 square miles of sheer awe: towering waterfalls, millennia-old Sequoia trees, striking, daunting cliff faces and some of the most unique rock formations in the United States. But despite its enormous size, most of the tourist activity takes place within the 8-square-mile area of Yosemite Valley. Here you'll find the park's most famous landmarks – Half Dome and El Capitan – as well as excellent hiking trails through the natural monuments. Even inexperienced hikers can enjoy Yosemite: Guided tours and climbing lessons are available from local adventure outfitters. Just don't expect to experience it by yourself. Like so many other American tourist destinations, crowds are the biggest obstacles to an enjoyable Yosemite vacation – approximately 4 million people visit each year. But if you go at the right time (and start your day a little earlier than usual), Mother Nature's wonders will reveal themselves to you in a miraculous and serene way.
    <p></p>
    <h2>Top Hotels in Yosemite :</h2>
    <ul>
      <li><a id="hotel" href="https://www.yosemite.com/lodging/hotels/yosemite-valley-lodge/">Yosemite Valley Lodge</a></li>
      <li><a id="hotel" href="https://www.yosemite.com/lodging/hotels/wawona-hotel/">Wawona Hotel</a></li>
      <li><a id="hotel" href="https://www.thevillagelodgemammoth.com/">The Village Lodge</a></li>
      <li><a id="hotel" href="https://www.evergreenlodge.com/">Evergreen Lodge at Yosemite</a></li>
      <li><a id="hotel" href="https://www.stayyosemiteviewlodge.com/">Yosemite View Lodge</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Yosemite :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/total-yosemite-experience-with-giant-sequoias.a249490.activity-details">Total Yosemite Experience with Giant Sequoias</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/yosemite-national-park-valley-highlights-tour.a219734.activity-details">Yosemite National Park Valley Highlights Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/yosemite-national-park-full-day-tour-from-san-francisco.a304202.activity-details">Yosemite National Park - Full Day Tour from San Francisco</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/2-day-yosemite-tour-night-at-cedar-lodge.a277197.activity-details">2-Day Yosemite Tour & Night at Cedar Lodge</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/yosemite-one-day-half-dome-and-el-capitan-4-hours-in-park.a553858.activity-details">Yosemite One Day - Half Dome and El Capitan 4 Hours in Park</a></li>
    <ul/>`  
  ,
  'Barcelona':
  `<h1>Why Go To Barcelona ?</h1>
  Barcelona contains both the authentically historic and the wildly bizarre. From the scenic trails of the colorful Park Güell to the romantic narrow alleys of Barri Gòtic; from the beachside nightclubs to the city's dozens of sacred churches and architectural marvels, this city by the sea seems to attract all types: the adventurer, the couple, the partier, the culture lover – and more – with an almost overwhelming variety of things to do. You could stay for a few days, but chances are you'll need a whole week to explore.

  In Barcelona, even the beach is bustling, but it's really the cosmopolitan city that gets all the attention. Much of the activity revolves around Las Ramblas, a series of narrow streets and alleys packed with restaurants, nightclubs and a vibrant pedestrian market. But you should also take a tour of Antoni Gaudí's masterpieces; Gaudí is responsible for sites like Casa Milà, Casa Batlló and La Sagrada Familia. You also shouldn't miss out on the eclectic shopping scene and the region's exquisite food and wine. You see why we suggest a week vacation?
  <p></p>
    <h2>Top Hotels in Barcelona :</h2>
    <ul>
      <li><a id="hotel" href="https://holiday-inn-express-barcelona-city-22.hotel-ds.com/en/">Holiday Inn Express Barcelona City 22</a></li>
      <li><a id="hotel" href="https://www.bestwestern.com/en_US/book/hotels-in-barcelona/best-western-plus-hotel-alfa-aeropuerto/propertyCode.92112.html">Best Western Plus Hotel Alfa Aeropuerto</a></li>
      <li><a id="hotel" href="https://www.hotelbarcelona1882.com/en/">Hotel Barcelona 1882</a></li>
      <li><a id="hotel" href="https://www.hotel-antibesbcn.com/en/">Hotel Acta Antibes</a></li>
      <li><a id="hotel" href="https://www.hrs.com/en/hotel/leonardo-boutique-sagrada-familia/a-525201">Leonardo Boutique Hotel Barcelona Sagrada Familia</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Barcelona :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/barcelona-hop-on-hop-off-bus-tour.a167139.activity-details">Barcelona Hop-On Hop-Off Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/fast-track-sagrada-familia-guided-tour.a167440.activity-details">Fast Track: Sagrada Familia Guided Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/barcelona-hop-on-hop-off-bus-tour-by-bus-turistic.a167019.activity-details">Barcelona Hop-On Hop-Off Bus Tour by Bus Turistic</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sagrada-familia-fast-track-tickets-and-guided-tour.a395644.activity-details">Sagrada Família Fast-Track Tickets and Guided Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/montserrat-half-day-excursion-from-barcelona.a167451.activity-details">Montserrat Half-Day Excursion from Barcelona</a></li>
    <ul/>`  
  ,
  'New York City':
  `<h1>Why Go To New York City ?</h1>
  Cool, cosmopolitan, crowded, constantly evolving … the Big Apple blends big city splendor with small-town charm. Amid Gotham's iconic landmarks and towering skyscrapers, you'll experience a vibrant culture permeating each of the city's distinctive neighborhoods and boroughs. Follow trendsetters to the East Village and Brooklyn to check out indie boutiques, iconic bakeries and trendy coffee shops. Afterward, peruse the racks of the sleek shops lining Fifth Avenue, admire the cutting-edge art collections at the MoMA and the Met, catch a memorable show on Broadway or sit down for a meal at the latest "it" restaurant.

  As the most populous city in the U.S. – set at the forefront of food, fashion and the arts – NYC requires stamina. But don't let the Big Apple's frenetic sights and sounds intimidate you from soaking up its grandeur. Wander through the concrete jungle and you'll discover roaring taxis zipping down bustling blocks, fast-paced pedestrians strolling past on their way to marquee galleries and trendy cocktail bars, and Times Square's neon lights flickering at all hours. And yet, the city's twinkling lights and chaotic corners also invite you to embrace every New York minute, explore every enclave and create your own urban adventure. There are endless ways to spend your time in the city that never sleeps, but before you leave, stop and look around – what's here today will be transformed into something bigger and better tomorrow.
  <p></p>
    <h2>Top Hotels in New York City :</h2>
    <ul>
      <li><a id="hotel" href="https://www.marriott.com/hotels/travel/nycsh-springhill-suites-new-york-manhattan-times-square-south/">Springhill Suites New York Manhattan/Times Square South</a></li>
      <li><a id="hotel" href="https://www.thepodhotel.com/pod-51/">Pod 51 Hotel</a></li>
      <li><a id="hotel" href="https://hiltongardeninn3.hilton.com/en/hotels/new-york/hilton-garden-inn-times-square-NYCMWGI/index.html">Hilton Garden Inn Times Square</a></li>
      <li><a id="hotel" href="https://parklanenewyork.com/">Park Lane Hotel</a></li>
      <li><a id="hotel" href="https://www.leonhotelnyc.com/">The Leon Hotel</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in New York City :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com.au/things-to-do/top-of-the-rock-observation-deck-flexible-date-ticket.a184267.activity-details">Top of the Rock Observation Deck: Flexible Date Ticket</a></li>
      <li><a id="hotel" href="https://www.expedia.com.au/things-to-do/new-york-city-explorer-pass-90-tours-attractions.a182983.activity-details">New York City Explorer Pass: 90+ Tours & Attractions</a></li>
      <li><a id="hotel" href="https://www.expedia.com.au/things-to-do/early-access-statue-of-liberty-with-pedestal-ellis-island.a248963.activity-details">Early Access Statue of Liberty with Pedestal & Ellis Island</a></li>
      <li><a id="hotel" href="https://www.expedia.com.au/things-to-do/statue-of-liberty-ellis-island-tour-with-pedestal-access.a269114.activity-details">Statue of Liberty & Ellis Island Tour with Pedestal Access</a></li>
      <li><a id="hotel" href="https://www.expedia.com.au/things-to-do/9-11-memorial-museum-admission-skip-the-ticket-line.a266375.activity-details">9/11 Memorial & Museum Admission</a></li>
    <ul/>`
  ,
  'Dubai':
  `<h1>Why Go To Dubai ?</h1>
  Dubai and Las Vegas have a lot in common. Both cities share a love for the fantastical, with skylines that shine like beacons against barren desert backdrops. People from all over the world flock to these shimmering oases with the same goal: to play hard. But as a vacation spot, Dubai easily trumps ol' Sin City thanks to its gorgeous cream-colored Persian Gulf shoreline, international culinary scene and larger-than-life attractions. And the city's still growing; plans are underway for something bigger and better. At one point, it was estimated that a quarter of the world's construction cranes could be found here. If that's any sign, even the sky may not be able to limit Dubai's growth. 

  Dubai is a city of superlatives, home to the world's tallest tower, one of the world's largest shopping malls, and one of the world's largest man-made marinas… but on a smaller scale, this emirate is still tied to its days as a modest port town. Traditional wooden abras (boats) float past motorboats on Dubai Creek, the natural sands of Jumeirah Beach fringe the carefully sculpted Palm Islands, and the bustling Gold and Spice Souks (marketplaces) thrive amid the larger-than-life Dubai Mall. Despite constantly looking to the future, this city isn't quick to let go of its past. It's this dynamic that not only put Dubai on the tourist map but will also keep it there.
  <p></p>
    <h2>Top Hotels in Dubai :</h2>
    <ul>
      <li><a id="hotel" href="https://www.marriott.com/hotels/travel/dxbdf-four-points-downtown-dubai/">Four Points By Sheraton Downtown Dubai</a></li>
      <li><a id="hotel" href="https://www.goldensandsdubai.com/">Golden Sands Hotel Apartments</a></li>
      <li><a id="hotel" href="https://www.hotelsone.com/dubai-hotels-ae/ibis-dubai-mall-of-the-emirates-hotel.html?as=g&aid=45735230078&dsti=276191&dstt=8&akw=ibis%20mall%20the%20emirates&asrc=Search&ast=&gclid=CjwKCAjw5fzrBRASEiwAD2OSV9dx4lbb3Gt9tlZd8vomCxoLvpF76PpI1aY32zE5SxRQ3Mh5K1ES4RoC7qQQAvD_BwE">Ibis Mall Of The Emirates</a></li>
      <li><a id="hotel" href="https://hiltongardeninn3.hilton.com/en/hotels/uae/hilton-garden-inn-dubai-mall-of-the-emirates-DXBMEGI/index.html">Hilton Garden Inn Dubai Mall Of The Emirates</a></li>
      <li><a id="hotel" href="https://ibis-styles-jumeirah-dubai.hotels-in-dubai.org/en/">ibis Styles Jumeira Dubai</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Dubai :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/premium-red-dunes-camel-safari-with-bbq-at-al-khayma-camp.a456355.activity-details">Premium Red Dunes & Camel Safari with BBQ at Al Khayma Camp</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/desert-safari-bbq-dinner-belly-dance-show-free-atv-ride.a231485.activity-details">Desert Safari,BBQ Dinner,Belly Dance Show,FREE ATV Ride</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/burj-khalifa-124-125-floor-observation-deck-tickets.a167122.activity-details">Burj Khalifa 124 & 125 floor Observation Deck Tickets</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/desert-safari-at-al-maha-experience-with-bbq-dinner.a166920.activity-details">Desert Safari at Al Maha Experience with BBQ Dinner</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/dubai-hop-on-hop-off-bus-tour.a231459.activity-details">Dubai Hop-On Hop-Off Bus Tour</a></li>
    <ul/>`  
  ,
  'Machu Picchu':
  `<h1>Why Go To Machu Picchu ?</h1>
  A visit to the "lost city of Incas" is not for the faint of heart, but it is often described as life-changing (once you acclimate to the altitude). While the four-day hike along the Inca Trail is challenging, arriving at the site during sunrise is well worth it, according to past travelers. If you're not up for the trek, you can also hop on a tourist train to the mountain base.
  <p></p>
    <h2>Top Hotels in Machu Picchu :</h2>
    <ul>
      <li><a id="hotel" href="https://tierravivahoteles.com/tierra-viva-cusco-machu-picchu/">Tierra Viva Machu Picchu</a></li>
      <li><a id="hotel" href="http://www.intipunku.pe/">Inti Punku MachuPicchu Hotel & Suites</a></li>
      <li><a id="hotel" href="https://retamamachupicchu.com/">Retama Machu Picchu</a></li>
      <li><a id="hotel" href="tripadvisor.in/Hotel_Review-g304036-d2275213-Reviews-Supertramp_Eco_Hostel-Aguas_Calientes_Machu_Picchu_Sacred_Valley_Cusco_Region.html">Supertramp Eco Hostel</a></li>
      <li><a id="hotel" href="http://www.ecopackersperu.com/hostel-machu-picchu/">Ecopackers Machupicchu</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Machu Picchu :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/machu-picchu-day-trip-from-cusco-by-inca-rail-train.a318630.activity-details">Machu Picchu Day Trip from Cusco by Inca Rail Train</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/guided-tour-of-machu-picchu-from-aguas-calientes.a429432.activity-details">Guided Tour of Machu Picchu from Aguas Calientes</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/half-day-horseback-riding-mistic-tour.a474777.activity-details">Half-Day Horseback Riding Mistic Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/machu-picchu-day-tour-on-vistadome-train-with-lunch-included.a212606.activity-details">Machu Picchu Day Tour on Vistadome train with Lunch Included</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/ultimate-salkantay-trek-to-machu-picchu-5-days.a543459.activity-details">Ultimate Salkantay Trek to Machu Picchu 5 Days</a></li>
    <ul/>`  
  ,
  'Sydney':
  `<h1>Why Go To Sydney ?</h1>
  Sydney is both a laid-back beachside town and a thriving metropolis that boasts some of the Southern Hemisphere's best surf, landmarks and activities. Whether you're looking to watch a show at the iconic Opera House, take to the waves at Bondi Beach or explore trendy areas like The Rocks and Darling Harbour, Sydney features something for everyone. Even Sydneysiders have an ideal mix of both worlds: Fashion-forward attire and British-style sarcasm combine with a "no worries" attitude and relaxed coastal vibe. It's no wonder this vibrant city down under is a natural choice for first-time Aussie visitors.

  In addition to tons of beaches and top-notch restaurants and bars, Australia's most populous city features an array of things to do. Thrill-seekers can participate in heart-pounding activities like a Sydney Harbour Bridge climb, while visitors looking to unwind will appreciate a relaxing day at Coogee or Manly Beach or a peaceful stroll through the Royal Botanic Garden. There's also plenty of seasonal Sydney festivals and events to experience, such as Sculpture by the Sea, the Festival of the Winds and the Night Noodle Markets. Whether you're looking to enjoy a rugby match, hit up the city's museums or lounge along the shore, Sydney's got you covered.
  <p></p>
    <h2>Top Hotels in Sydney :</h2>
    <ul>
      <li><a id="hotel" href="https://gracehotel.com.au/">The Grace Hotel Sydney</a></li>
      <li><a id="hotel" href="https://www.amorahotels.com/hotels/amora-hotel-jamison-sydney">Amora Hotel Jamison Sydney</a></li>
      <li><a id="hotel" href="https://www.panpacific.com/en/hotels-and-resorts/pr-darling-harbour-sydney.html">PARKROYAL Darling Harbour Sydney</a></li>
      <li><a id="hotel" href="https://www.sofitelsydneydarlingharbour.com.au/">Sofitel Sydney Darling Harbour</a></li>
      <li><a id="hotel" href="https://www.meritonsuites.com.au/our-hotels/nsw/eastern-sydney/zetland/">Meriton Suites Zetland</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Sydney :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sydney-opera-house-guided-tour.a189097.activity-details">Sydney Opera House Guided Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sydney-tower-buffet-lunch-or-dinner.a476817.activity-details">Sydney Tower Buffet Lunch or Dinner</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/bridgeclimb-experience-at-sydney-harbour-bridge.a188962.activity-details">BridgeClimb Experience at Sydney Harbour Bridge</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sydney-city-highlights-day-tour.a224509.activity-details">Sydney City Highlights Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sydney-hop-on-hop-off-bus-tour.a470655.activity-details">Sydney Hop-On Hop-Off Bus Tour</a></li>
    <ul/>`  
  ,
  'Maldives':
  `<h1>Why Go To Maldives ?</h1>
  You've seen photos of the Maldives before: picture-perfect private villas suspended over striking blue waters, alabaster white sand beaches and spectacular sunsets dipping into the horizon. The scenic beauty of the Maldives is something to behold, something you can't quite understand until you're there in person.

  The island nation of the Maldives is popular with honeymooners looking for seclusion and adventurers looking to explore the depths of the sea on a scuba diving and snorkeling excursion. Travelers seeking relaxation can unwind at one of the island spas and all visitors should certainly spend a day exploring the Maldivian capital of Male'. However, getting to and staying in this tropical paradise requires patience (there are no direct flights from the United States) and plentiful cash. Located between the Arabian and Laccadive seas, roughly 500 miles southwest of Sri Lanka, the Maldives is about as isolated as you can get – and that's just another one of its many allures.
  <p></p>
    <h2>Top Hotels in Maldives :</h2>
    <ul>
      <li><a id="hotel" href="https://www.arenabeachmaldives.com/">Arena Beach Hotel</a></li>
      <li><a id="hotel" href="https://www.cinnamonhotels.com/">Ellaidhoo Maldives by Cinnamon</a></li>
      <li><a id="hotel" href="http://www.samanngrand.com/">Samann Grand</a></li>
      <li><a id="hotel" href="https://westsandsukulhas.com/">West Sands</a></li>
      <li><a id="hotel" href="http://crystalsands.mv/crystalsands/?crystalsands">Crystal Sands</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Maldives :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/wellness-at-ibrahim-nasir-international-airport-mle.a302766.activity-details">Wellness at Ibrahim Nasir International Airport (MLE)</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/premium-maldives-dream-8-days-catamaran-cruise-inc-food.a562897.activity-details">Premium Maldives dream 8 days catamaran cruise, inc. food</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/maafushi-fihalhohi-island-resort-day-trip.a666444.activity-details">MAAFUSHI: FIHALHOHI ISLAND RESORT DAY TRIP</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/maafushi-parasailing.a666453.activity-details">MAAFUSHI: PARASAILING</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/maafushi-banana-tube-ride.a666456.activity-details">MAAFUSHI: BANANA & TUBE RIDE</a></li>
    <ul/>`  
  ,
  'Amsterdam':
  `<h1>Why Go To Amsterdam ?</h1>
  Don't believe everything you hear about Amsterdam. Yes, this Netherlands city takes a lax look at women beckoning business in the Red Light District and "coffee shops" selling an unorthodox type of herb to a toking clientele, but these descriptions only scratch the surface. At some point, during an excellent Indonesian meal, a twilight canal-side rambling or a shopping excursion through the boutiques of Nine Little Streets, you'll realize – as many travelers have before you – that there's much more to Amsterdam than you might've thought.

  And although the city's loose laws on vice seem to attract a college-age, male-dominant crowd, Amsterdam is also ideal as a romantic getaway for two or an educational excursion with the kids. With attractions that range from biking along a maze of canals to remembering the Holocaust through the eyes of Anne Frank; from exploring the swirling Expressionism of Vincent van Gogh to lazing in the expansive Vondelpark, Amsterdam suits a variety of traveler tastes.
  <p></p>
    <h2>Top Hotels in Amsterdam :</h2>
    <ul>
      <li><a id="hotel" href="https://xohotels.com/hotel/xo-hotels-couture-amsterdam/">XO Hotels Couture</a></li>
      <li><a id="hotel" href="https://www.lloyd.nl/">Lloyd Hotel</a></li>
      <li><a id="hotel" href="https://hotelcasa.nl/">Hotel Casa Amsterdam</a></li>
      <li><a id="hotel" href="http://www.hotellevell.nl/">Hotel Levell</a></li>
      <li><a id="hotel" href="https://xohotels.com/hotel/xo-hotels-park-west-amsterdam/">XO Hotels Park West</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Amsterdam :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/van-gogh-museum-tickets.a487999.activity-details">Van Gogh Museum Tickets</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/skip-the-line-rijksmuseum-tickets.a487934.activity-details">Skip-the-Line Rijksmuseum Tickets</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/night-cruise-amsterdam.a168342.activity-details">NIGHT CRUISE AMSTERDAM</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/i-amsterdam-city-card.a168336.activity-details">I amsterdam City Card</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/heineken-experience-admission-ticket.a489398.activity-details">Heineken Experience Admission Ticket</a></li>
    <ul/>`  
  ,
  'San Francisco':
  `<h1>Why Go To San Francisco ?</h1>
  A jumbled collage of colorful neighborhoods and beautiful views, San Francisco draws those free-spirited types who have an eye for edgy art, a taste for imaginative cuisine and a zeal for adventure. It's really not surprising that songwriter Tony Bennett left his heart here: The city boasts jaw-dropping sights, world-class cuisine, cozy cafes and plenty of booming nightlife venues – there's no shortage of ways to stay busy here. Spend an hour or two sunning yourself alongside sea lions on the bay, admiring the views of the city from Twin Peaks, or strolling along the Marina. And for the quintessential San Franciscan experience, enjoy a ride on a cable car or hop on a boat tour for a cruise beneath the Golden Gate Bridge.

  Often described as Los Angeles' more refined northern cousin, cool and compact San Francisco takes the big-city buzz exuded by its southern counterpart and melds it with a sense of small-town charm. Here, you'll discover a patchwork of culture flourishing throughout San Francisco's many vibrant quarters. Follow the crowds to the touristy Fisherman's Wharf area (which offers spectacular views of Alcatraz) before heading along the bay to the Presidio for a glimpse of the famous Golden Gate Bridge. But don't forget to save time for the Mission District, the Haight and the Castro for exposure to all of the different varieties of the San Francisco lifestyle. And when you're ready for a break from the city, join one of San Francisco's best wine tours for a relaxing daytrip.
  <p></p>
    <h2>Top Hotels in San Francisco :</h2>
    <ul>
      <li><a id="hotel" href="https://m.fairmont.com/san-francisco/?utm_referrer=direct%2Fnot%20provided">Fairmont San Francisco</a></li>
      <li><a id="hotel" href="https://www.hotelzoesf.com/">Hotel Zoe Fisherman's Wharf</a></li>
      <li><a id="hotel" href="https://www.chancellorhotel.com/">Chancellor Hotel on Union Square</a></li>
      <li><a id="hotel" href="http://www.intercontinentalmarkhopkins.com/">InterContinental Mark Hopkins San Francisco</a></li>
      <li><a id="hotel" href="https://www.marriott.com/hotels/travel/sfodt-san-francisco-marriott-marquis/">San Francisco Marriott Marquis</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in San Francisco :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/san-francisco-double-decker-open-top-hop-on-hop-off-bus-tour.a192698.activity-details">San Francisco Double Decker Open Top Hop-On Hop-Off Bus Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/catamaran-sailing-cruise-on-the-bay.a277493.activity-details">Catamaran Sailing Cruise on the Bay</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/redwoods-wine-country-escape-to-sonoma-napa-with-optional-gourmet-lunch.a249494.activity-details">Redwoods & Wine Country Escape to Sonoma & Napa with Optional Gourmet Lunch</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/total-yosemite-experience-with-giant-sequoias.a249490.activity-details">Total Yosemite Experience with Giant Sequoias</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/napa-valley-sonoma-wine-country-tour-from-san-francisco.a239435.activity-details">Napa Valley & Sonoma - Wine Country Tour from San Francisco</a></li>
    <ul/>`  
  ,
  'Florence':
  `<h1>Why Go To Florence ?</h1>
  This little city, tucked amid the Tuscan hills, casts a long shadow through history. The wellspring of the Renaissance, Firenze (or Florence) sheltered the powerful Medici family and inspired artists like Michelangelo (David) and Brunelleschi (the Duomo). If it weren't for the fashionable Italians and chic shops lining Via Tornabuoni, you might think you had traveled back in time to the 14th century. But Renaissance art is not the only reason to come: You also visit Florence for its gorgeous sunsets, its Italian cooking and its romantic charm.
  <p></p>
    <h2>Top Hotels in Florence :</h2>
    <ul>
      <li><a id="hotel" href="http://www.cosmopolitanhotel.it/eng/index.html">Cosmopolitan Concept Hotel</a></li>
      <li><a id="hotel" href="https://www.hotelorcagnafirenze.it/en/">Hotel Orcagna</a></li>
      <li><a id="hotel" href="http://www.cosimodemedici.com/en/">Hotel Cosimo de' Medici</a></li>
      <li><a id="hotel" href="https://www.hotelfortezza.com/en/">Hotel La Fortezza</a></li>
      <li><a id="hotel" href="http://www.hoteldali.com/">Hotel Dali</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Florence :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/cinque-terre-portovenere-full-day-tour-from-florence.a234805.activity-details">Cinque Terre & Portovenere Full-Day Tour from Florence</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/full-day-tour-of-san-gimignano-siena-chianti.a321506.activity-details">Full-Day Tour of San Gimignano, Siena & Chianti</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/highlights-of-tuscany-siena-san-gimignano-pisa-with-lunch.a228515.activity-details">Highlights of Tuscany: Siena, San Gimignano & Pisa with Lunch</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/uffizi-gallery-tickets-with-skip-the-line-admission.a177478.activity-details">Uffizi Gallery Tickets with Skip-The-Line Admission</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/accademia-gallery-guided-tour-with-skip-the-line-admission.a377738.activity-details">Accademia Gallery Guided Tour with Skip-the-Line Admission</a></li>
    <ul/>`  
  ,
  'Yellowstone':
  `<h1>Why Go To Yellowstone ?</h1>
  With dramatic peaks and pristine lakes, Yellowstone National Park is an outdoor enthusiast's paradise. Multicolored pools swirl around hot springs; verdant forests weave past expansive meadows; and volatile geysers launch streams of steaming water toward the sky. With so much unspoiled natural beauty, it's no wonder why everyone suspected John Colter (a scout for explorers Lewis and Clark) was embellishing when he first described Yellowstone's geothermal curiosities in 1807. Nowadays, there's no doubt that the park is indeed extraordinary. While you traverse its 3,000-plus square miles of mountains, canyons, geysers and waterfalls, be prepared to share the trails with permanent residents like buffalo, elk and sometimes even grizzlies. 

  Although Yellowstone attracts more than 4 million visitors every year, chances are – unless you spend your entire trip at Old Faithful – you won't see much of them. Yellowstone's 2.2 million acres creep from the northwest corner of Wyoming into the edges of Idaho and Montana, offering plenty of untouched territory to explore. Carve out a day or two to take in the view at Yellowstone Lake and Mammoth Hot Springs. But save some time for the trails through lesser-known regions, like the hot springs of the West Thumb Geyser Basin and the untamed wildlife dotting the Lewis River Channel and Dogshead Loop. While the sheer number of trails and wildlife-watching opportunities may seem daunting at first, remember: You can always come back.
  <p></p>
    <h2>Top Hotels in Yellowstone :</h2>
    <ul>
      <li><a id="hotel" href="http://www.graywolfinnwestyellowstone.com/">Gray Wolf Inn and Suites</a></li>
      <li><a id="hotel" href="https://www.yellowstonevacations.com/stay/west-yellowstone/explorer-cabins-at-yellowstone">Explorer Cabins at Yellowstone</a></li>
      <li><a id="hotel" href="https://www.yellowstonekellyinn.com/">Kelly Inn West Yellowstone</a></li>
      <li><a id="hotel" href="https://www.bestwestern.com/en_US/book/hotels-in-west-yellowstone/best-western-desert-inn/propertyCode.27013.html">Best Western Desert Inn</a></li>
      <li><a id="hotel" href="https://www.brandiniron.com/">Brandin' Iron Inn</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Yellowstone :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/yellowstone-national-park-lower-loop-small-group-tour.a177387.activity-details">Yellowstone National Park Lower Loop Small-Group Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/lamar-valley-wolf-and-wildlife-safari-hike.a513111.activity-details">Lamar Valley Wolf and Wildlife Safari Hike</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/private-yellowstone-tour.a524169.activity-details">Private Yellowstone Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/yellowstone-national-park-lower-loop-tour.a177614.activity-details">Yellowstone National Park: Lower Loop Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/pioneer-tour-of-yellowstone-grand-teton.a628693.activity-details">Pioneer Tour Of Yellowstone Grand Teton</a></li>
    <ul/>`  
  ,
  'Banff':
  `<h1>Why Go To Banff ?</h1>
  If you're itching to experience the lifestyle of a Swiss skiing village, but don't want to fork over the cash for a trans-Atlantic flight, consider Banff. Thanks to its location in the heart of the Canadian Rockies near the southeastern border of Banff National Park – Canada's first national park – taking trips here will decrease not only your flight time from the U.S. but also your expenses (although only marginally). Banff caters to intrepid explorers who prefer to end the day in a nice hotel rather than roughing it at the campgrounds (though, there are plenty of those, too). Opportunities for adventure abound, so pick your sport: Ski down Mount Norquay, hike to the massive, free-standing limestone pillars known as the Hoodoos, "scramble" up the face of the Stoney Squaw Mountain or bike along Healy Creek. When you are exhausted, retreat to your cozy (and warm) resort, and replenish yourself with a hefty helping of bison meat.
  <p></p>
    <h2>Top Hotels in Banff :</h2>
    <ul>
      <li><a id="hotel" href="https://www.rimrockresort.com/">Rimrock Resort Hotel</a></li>
      <li><a id="hotel" href="http://www.banffparklodge.com/">Banff Park Lodge Resort and Conference Centre</a></li>
      <li><a id="hotel" href="https://moosehotelandsuites.com/">Moose Hotel and Suites</a></li>
      <li><a id="hotel" href="https://www.fairmont.com/banff-springs/">Fairmont Banff Springs</a></li>
      <li><a id="hotel" href="https://www.rundlestone.com/">Rundlestone Lodge</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Banff :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/mountains-lakes-waterfalls-tour.a178134.activity-details">Mountains, Lakes & Waterfalls Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/columbia-icefield-discovery-sightseeing-tour.a244903.activity-details">Columbia Icefield Discovery Sightseeing Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/banff-horseback-riding-tour.a238789.activity-details">Banff Horseback Riding Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/the-icefields-parkway-tour.a178736.activity-details">The Icefields Parkway Tour</a></li>
      <li><a id="hotel" href="Wildlife & History Tour of Banff"></a></li>
    <ul/>`  
  ,
  'Argentine Patagonia':
  `<h1>Why Go To Argentine Patagonia ?</h1>
  This region in the Andes mountains is nothing if not enchanting. Cobalt lakes, azure-tinted glaciers, emerald trees, and turquoise skies stretch as far as the eye can see. In fact, Argentine Patagonia's vistas are so sweeping that Charles Darwin once described the region as "boundless." Visit Argentina's Lake District and you'll discover villages brushing against snowy mountain peaks. Travel east and you'll find whales gliding through Peninsula Valdés' marine wildlife sanctuary. Venture to Southern Patagonia, and you'll stumble upon deserts extending into rugged estancias (cattle-ranges) and melting glaciers. And, if you continue downward to the Chilean border at Cape Horn, you'll come across an expansive horizon reaching out to Antarctica's frosty edge. Patagonia's beauty knows no bounds.

  But don't let the frontier's vastness fool you: Argentine Patagonia's rapidly developing infrastructure grants visitors easy access to all major attractions. Rustic roads lead to dramatic natural wonders like Perito Moreno Glacier and Mount Fitz Roy. Look around this beautiful landscape and discover a region buzzing with life. Magellanic penguins and albatross mingle in the Punta Tombo wildlife reserve, while history survives on the walls of the Cave of the Hands.
  <p></p>
    <h2>Top Hotels in Argentine Patagonia :</h2>
    <ul>
      <li><a id="hotel" href="https://www.loscauquenes.com/eng/">Los Cauquenes Resort & Spa</a></li>
      <li><a id="hotel" href="http://www.arakur.com/?lang=en">Arakur Ushuaia Resort & Spa</a></li>
      <li><a id="hotel" href="https://loisuites.com.ar/en/hotel/loi-suites-chapelco-hotel">Loi Suites Chapelco Hotel</a></li>
      <li><a id="hotel" href="http://www.almadellagosuites-bariloche.com/en/">Alma del Lago Suites & Spa</a></li>
      <li><a id="hotel" href="http://charming-luxury-lodge-private-spa.insancarlosdebariloche.com/en/">Charming Luxury Lodge & Private Spa</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Argentine Patagonia :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/perito-moreno-with-glacier-cruise.a304802.activity-details">Perito Moreno with Glacier Cruise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/chalten-full-day-tour.a538453.activity-details">Chalten Full-Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/perito-moreno-glacier.a304798.activity-details">Perito Moreno Glacier</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/rios-de-hielo-express-cruise.a304810.activity-details">Ríos de Hielo Express Cruise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/glaciares-gourmet-marpatag.a564416.activity-details">Glaciares Gourmet Marpatag</a></li>
    <ul/>`  
  ,
  'British Virgin Islands':
  `<h1>Why Go To British Virgin Islands ?</h1>
  The British Virgin Islands, or BVI for short, are some of the most exclusive and least developed islands of the Caribbean, but this only adds to their appeal. The resorts, villas, restaurants and other tourist attractions in this paradise are known to emphasize spare luxury over sprawling expansion, and they attract travelers with deep pockets and a love for sailing and seclusion. Many travelers who visit come by ferry boat from another Caribbean isle, especially as some find opulent exile too hard to enjoy for longer than a day or two. And some say it's better to split your time between here, the nearby U.S. Virgin Islands and Anguilla to the east.

  Others find more than enough to keep them exclusively anchored by these 60 islands and cays, which sadly were hit hard by Hurricane Irma in September 2017. Travelers will still be able to find evidence of the hurricane's handiwork, though BVI has done a valiant job of rebuilding. On Tortola, you'll find mountainous cliffs and chalk white beaches, characterized by changing tides and calm easterly winds. A brief sail away, sleepy Jost Van Dyke offers delicious Caribbean food and drink, one of the region's best New Year's Eve parties, as well as a few outdoor excursions like diving and fishing. On Virgin Gorda, you'll find The Baths, perhaps the most picturesque shore in the British Virgin Islands, and with good reason: It offers unique grottoes amidst gigantic granite boulders (just be mindful of the daytripping crowds). For supreme seclusion, try Anegada; its slow pace, flat terrain and sparkling sand lies almost overlooked in Caribbean Sea.
  <p></p>
    <h2>Top Hotels in British Virgin Islands :</h2>
    <ul>
      <li><a id="hotel" href="">Fort Recovery Beachfront Villa & Suites Hotel</a></li>
      <li><a id="hotel" href="https://www.fortrecovery.com/">Anegada Beach Club</a></li>
      <li><a id="hotel" href="https://www.jostvandyke.com/">White Bay Villas & Seaside Cottages</a></li>
      <li><a id="hotel" href="https://sebastiansbvi.com/">Sebastian's on the Beach</a></li>
      <li><a id="hotel" href="https://www.fortburt.com/en-gb">Fort Burt Hotel</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in British Virgin Islands :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/the-baths-and-jost-van-dyke-tour.a492490.activity-details">The Baths and Jost Van Dyke Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/half-day-tour-to-trunk-bay-beach-from-st-thomas.a265841.activity-details">Half-Day Tour to Trunk Bay Beach from St. Thomas</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/st-john-island-and-trunk-bay-beach-tour-from-st-thomas.a510603.activity-details">St John Island and Trunk Bay Beach Tour From St Thomas</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/premium-british-virgin-islands-catamaran-cruise-inc-food.a561719.activity-details">Premium British Virgin Islands, catamaran cruise, inc. food</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/private-day-charter-boat-in-virgin-islands.a560340.activity-details">Private Day Charter Boat in Virgin Islands</a></li>
    <ul/>`  
  ,
  'Santorini':
  `<h1>Why Go To Santorini ?</h1>
  A massive volcanic eruption around 1650 B.C. forced the center of what was then a single island to implode and succumb to the sea. Some say that this was the original home of the lost city of Atlantis, which long ago disappeared into the ocean's depths. Whatever remains of this mythological metropolis is now guarded by beautiful beaches and stately whitewashed homes. Today, Santorini consists of two inhabited islands and several islets. Most visitors spend their time on Thira (the archipelago's largest island), which is home to Santorini's major towns, including Fira and Oia. Sleepy Thirassia makes for a relaxing daytrip too. And don't count out the quieter islands: Nea Kameni and Palea Kameni are worth exploring.

  Your first order of business in Santorini is to hit the colorful beaches – the black and red sands make for a memorable visit. Next up, indulge in the archaeological delights of the impressively preserved Ancient Akrotiri or hike to Ancient Thera to see the ruins of three empires, including the Romans. From there, catch a breathtaking view of the caldera, a brilliant turquoise pool of water that serves as the nucleus for the varied isles of this archipelago. Some would say you only need a day to enjoy these islands' charms (they are a popular port of call for cruise ships), but to really drink in all Santorini has to offer, you'll need a few days to a week. Then you'll have plenty of time to learn there's more to these comely dots of the Cyclades than meets the eye.
  <p></p>
    <h2>Top Hotels in Santorini :</h2>
    <ul>
      <li><a id="hotel" href="https://www.bluedolphins.gr/">Blue Dolphins Apartments & Suites</a></li>
      <li><a id="hotel" href="https://santorinipalace.gr/">Santorini Palace</a></li>
      <li><a id="hotel" href="https://www.alexandershotel.com/">Alexander's Suites</a></li>
      <li><a id="hotel" href="http://cavobianco.com/">Cavo Bianco</a></li>
      <li><a id="hotel" href="https://www.mystboutiquehotel.com/en/">Myst Boutique Hotel</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Santorini :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/catamaran-dream-catcher-caldera-cruise-with-barbecue.a185567.activity-details">Catamaran Dream Catcher Caldera Cruise with Barbecue</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/santorini-red-sunset-cruise.a372528.activity-details">Santorini Red Sunset Cruise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/santorini-gems-cruise.a365034.activity-details">Santorini Gems Cruise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/small-group-santorini-sailing-with-barbecue.a185566.activity-details">Small-Group Santorini Sailing with Barbecue</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sunset-cruise-with-dinner.a185556.activity-details">Sunset Cruise with Dinner</a></li>
    <ul/>`  
  ,
  'St Lucia':
  `<h1>Why Go To St. Lucia ?</h1>
  Lush, unspoiled St. Lucia has a growing fan base. Some of its vacationers are music lovers, letting loose at the springtime St. Lucia Jazz & Arts Festival, or adrenaline junkies, testing their limits climbing The Pitons or zip lining through the Chassin region's rain forest. Others are honeymooners, unwinding on one of the island's chalky beaches or holing up in one of its isolated resorts.

  But what if you don't fall into any of these categories? Don't worry: St. Lucia refuses to be pigeonholed as any "type" of Caribbean vacation. Plus, you also don't have to spend a lot of money (its reputation as a luxurious hideout is only somewhat warranted). To discover some of the island's indescribable charms, you'll have to visit for yourself. Start your mornings basking in an orange-tinted Soufrière sunrise then round out your evenings at an evening "jump-up" (or dance party) along Gros Islet.
  <p></p>
    <h2>Top Hotels in St. Lucia :</h2>
    <ul>
      <li><a id="hotel" href="https://www.windjammer-landing.com/">Windjammer Landing Villa Beach Resort</a></li>
      <li><a id="hotel" href="https://www.baygardensresorts.com/">Bay Gardens Beach Resort</a></li>
      <li><a id="hotel" href="https://www.theharborclub.com/">The Harbor Club St. Lucia, Curio Collection by Hilton</a></li>
      <li><a id="hotel" href="http://www.coco-resorts.com/">Coco Palm Resort</a></li>
      <li><a id="hotel" href="https://www.baygardensresorts.com/">Bay Gardens Hotel</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in St. Lucia :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/tout-bagay-catamaran-cruise-tour-to-soufriere.a272203.activity-details">Tout Bagay Catamaran Cruise & Tour to Soufriere</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/dolphin-and-whale-watch-safari.a566749.activity-details">Dolphin and Whale Watch Safari</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/chocolate-decadence-tour.a307488.activity-details">Chocolate Decadence Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/guided-atv-sightseeing-adventure.a307338.activity-details">Guided ATV Sightseeing Adventure</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/hike-the-pitons.a308190.activity-details">Hike the Pitons</a></li>
    <ul/>`
  ,
  'Prague':
  `<h1>Why Go To Prague ?</h1>
  A prosperous and bustling city, Prague now attracts more tourists than ever. But its picturesque downtown veils both a dark legacy and a resilient past. Dating back to about A.D. 870, Prague has withstood numerous overthrows, invasions, fires and floods. It's this reputation for survival and perseverance that has made the Czech capital so fascinating. Today, its storied churches, narrow streets, daunting hilltop castle and statue-lined bridges create the scene of an urban fairy tale. Even the most jaded traveler would have trouble resisting this city's charms.

  Prague was once a hidden gem, overshadowed by its flashier neighbors to the west. But the city couldn't keep its marvels a secret for too long – now, it's a haven for travelers seeking awe-inspiring experiences at affordable prices. Even today, top attractions – including the famous Charles Bridge and the historic Prague Castle – offer free admission and many hotels offer rooms at a fraction of the cost of other European cities. But this bargain-hunting legacy has a ticking clock on it, so if you're hoping to find a fire-sale price, now's the time to do so.
  <p></p>
    <h2>Top Hotels in Prague :</h2>
    <ul>
      <li><a id="hotel" href="http://www.hotelgiovanni.cz/">Don Giovanni Hotel Prague</a></li>
      <li><a id="hotel" href="https://park-inn-hotel-prague.prague-hotels.org/en/">Park Inn Hotel Prague</a></li>
      <li><a id="hotel" href="https://www.czech-inn.com/">Czech Inn</a></li>
      <li><a id="hotel" href="http://www.hotelmetropolitan.cz/en">Metropolitan Old Town hotel</a></li>
      <li><a id="hotel" href="https://www.garzottohotels.cz/en/hotel-mala-strana-prague/">Hotel Mala Strana</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Prague :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/prague-hop-on-hop-off-bus-walking-tour-options.a221723.activity-details">Prague Hop-On Hop-Off Bus + Walking Tour Options</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/a-day-long-bohemian-saxon-switzerland-tour-from-prague.a403798.activity-details">A day-long Bohemian & Saxon Switzerland tour from Prague</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/prague-small-group-sightseeing-boat-ride-local-lunch.a221907.activity-details">Prague: Small Group Sightseeing, Boat Ride & Local Lunch</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/full-day-sightseeing-tour-with-cruise-lunch.a176272.activity-details">Full-Day Sightseeing Tour with Cruise & Lunch</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/famous-organ-concert-at-st-francis-of-assisi-church.a174282.activity-details">Famous Organ Concert at St. Francis of Assisi Church</a></li>
    <ul/>`  
  ,
  'Rio de Janeiro':
  `<h1>Why Go To Rio de Janeiro ?</h1>
  Known as the Cidade Maravilhosa (Marvelous City), this glimmering Brazilian metropolis has certainly earned its title. Resting at the mouth of a bay harbor, the city is lined with white-sand beaches, lush rainforests and surrounded by staggered green mountains. Rio de Janeiro boasts dramatic views from nearly every angle. From the slopes of Corcovado Mountain, you'll admire the striking 125-foot-tall Christ the Redeemer, who overlooks Rio's pristine beaches. And from the shores of Copacabana and Ipanema, you'll admire the picture-perfect backdrop that has attracted Cariocas (native Brazilians born in Rio de Janeiro) and visitors alike for more than 500 years.

  But there's much more to Rio than scenic vistas, tropical rainforests and cerulean seas. Here, glitz, high fashion and a laid-back attitude dominate the city's character. Stroll along Avenida Atlântica in Copa, and you'll find a city brimming with bikini-clad beachgoers. The city is also known for its love of sport. From Maracana Stadium (home of the 2014 World Cup finals and the 2016 Olympic Games) to the volleyball courts of Flamengo Park, the city is alive with activity. At night, you'll hear the soothing sounds of samba pulsating through the city streets in Lapa. And if you visit in February — just in time for Carnival — you'll witness Brazil's vibrant Portuguese masquerade that draws revelers from across the globe. 

  Note: Rio de Janeiro isn't without its share of problems. Outside of tourist areas, the city includes large shantytowns, known as favelas, where about 130,000 people live in poverty. In recent years, large efforts have been made to rid the areas of crime, but some parts remain unsafe. There are also ongoing protests and demonstrations in Rio de Janeiro. Visitors should avoid all demonstrations and consult the U.S. Department of State's website for the most up-to-date travel advisories.
  <p></p>
    <h2>Top Hotels in Rio de Janeiro :</h2>
    <ul>
      <li><a id="hotel" href="https://www.prodigyhotels.com.br/hotel-no-rio-de-janeiro/prodigy-hotel-santos-dumont-airport/">Prodigy Hotel Santos Dumont Airport</a></li>
      <li><a id="hotel" href="https://petitriohotel.com.br/">Petit Rio Hotel</a></li>
      <li><a id="hotel" href="http://www.ramadaencoreribalta.com/en/">Ramada Encore Ribalta Rio de Janeiro</a></li>
      <li><a id="hotel" href="https://www.accorhotels.com/gb/hotel-9361-ibis-copacabana-posto-5/index.shtml">Ibis Copacabana Posto 5</a></li>
      <li><a id="hotel" href="http://www.grandmercure.com/GRAND-MERCURE-RJ-RIOCENTRO">Grand Mercure Rio de Janeiro Riocentro</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Rio de Janeiro :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/sunset-experience-christ-selaron-and-sunset-at-sugarloaf.a477368.activity-details">Sunset Experience - Christ, Selarón and Sunset at Sugarloaf</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/full-day-in-rio-corcovado-sugar-loaf-city-tour-with-bbq.a442936.activity-details">Full Day in Rio - Corcovado, Sugar Loaf & City Tour with BBQ</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/pre-or-post-cruise-rio-by-night-dinner-and-samba-show.a542546.activity-details">Pre or Post Cruise - Rio By Night: Dinner and Samba Show</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/brazilian-cooking-class.a252622.activity-details">Brazilian Cooking Class</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/rio-de-janeiro-small-group-santa-teresa-discovery-tour.a172074.activity-details">Rio De Janeiro: Small-Group Santa Teresa Discovery Tour</a></li>
    <ul/>`  
  ,
  'Great Barrier Reef':
  `<h1>Why Go To Great Barrier Reef ?</h1>
  As one of the original Seven Natural Wonders of the World, the Great Barrier Reef holds a spot on every traveler's bucket list. Hugging the east coast of Queensland, Australia, the Great Barrier Reef extends from Cape York in the north all the way to Bundaberg in the south – more than 1,800 miles. With roughly 2,900 coral reefs, 600 islands and 1,500-plus species of fish, the reef leaves its 2 million annual visitors enchanted.

  But before diving in, it's important to get your bearings. The northern part of the reef runs from the Cape York Peninsula to Cairns, a popular home base for many reef visitors. Not only does Cairns provide the closest reef access from the mainland, but it also boasts a few attractions of its own, such as the Kuranda Scenic Railway and the Cairns Botanic Gardens. Other sights like Hartley's Crocodile Adventures and the Wildlife Habitat Port Douglas are also situated by the reef's northernmost section. Travel farther down the coast and you'll run into the central part of the reef, which includes Townsville and the Whitsunday Islands, where Hamilton Island and Whitehaven Beach reside. And between the Capricorn Coast (along the Tropic of Capricorn) and Fraser Island, you'll find Airlie Beach and the only section of reef that has not been impacted by severe coral bleaching events.

  Wherever you decide to hang your hat, the Great Barrier Reef is a treasure trove of once-in-a-lifetime experiences. Whether you're gazing at marine life through a scuba mask, letting the tropical breeze unfurl your sail or taking in the reef from a plane, the possibilities for exploration are nearly limitless.
  <p></p>
    <h2>Top Hotels in Great Barrier Reef :</h2>
    <ul>
      <li><a id="hotel" href="https://www.shangri-la.com/cairns/shangrila/">Shangri-La Hotel, The Marina, Cairns</a></li>
      <li><a id="hotel" href="https://www.crystalbrookcollection.com/riley">Riley, a Crystalbrook Collection Resort</a></li>
      <li><a id="hotel" href="https://www.reefcasino.com.au/">Pullman Reef Hotel Casino</a></li>
      <li><a id="hotel" href="https://www3.hilton.com/en/hotels/queensland/hilton-cairns-CRNHITW/index.html">Hilton Cairns</a></li>
      <li><a id="hotel" href="https://www.pullmanportdouglas.com.au/">Pullman Port Douglas Sea Temple Resort & Spa</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Great Barrier Reef :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com.sg/things-to-do/small-group-premium-daintree-cape-tribulation-day-tour.a229768.activity-details?srp=true&rfrr=INLX&location=Great+Barrier+Reef%2C+Wangetti%2C+Queensland%2C+Australia&latLong=-16.693421%2C145.575714&rid=6061129&pageNumber=1&expandedRegion=true">Small Group Premium Daintree & Cape Tribulation Day Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com.sg/things-to-do/kuranda-koala-gardens-birdworld-friends-in-the-rainforest.a261801.activity-details?srp=true&rfrr=INLX&location=Great+Barrier+Reef%2C+Wangetti%2C+Queensland%2C+Australia&latLong=-16.693421%2C145.575714&rid=6061129&pageNumber=1&expandedRegion=true">Kuranda Koala Gardens & Birdworld. Friends in the Rainforest</a></li>
      <li><a id="hotel" href="https://www.expedia.com.sg/things-to-do/half-day-fly-cruise-reef-tour.a184636.activity-details?srp=true&rfrr=INLX&location=Great+Barrier+Reef%2C+Wangetti%2C+Queensland%2C+Australia&latLong=-16.693421%2C145.575714&rid=6061129&pageNumber=1&expandedRegion=true">Half-Day Fly & Cruise Reef Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com.sg/things-to-do/daintree-rainforest-cape-tribulation-tour.a296905.activity-details?srp=true&rfrr=INLX&location=Great+Barrier+Reef%2C+Wangetti%2C+Queensland%2C+Australia&latLong=-16.693421%2C145.575714&rid=6061129&pageNumber=1&expandedRegion=true">Daintree Rainforest & Cape Tribulation Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com.sg/things-to-do/great-barrier-reef-snorkelling-cruise.a448215.activity-details?srp=true&rfrr=INLX&location=Great+Barrier+Reef%2C+Wangetti%2C+Queensland%2C+Australia&latLong=-16.693421%2C145.575714&rid=6061129&pageNumber=1&expandedRegion=true">Full Day Great Barrier Reef Snorkelling Cruise with Lunch</a></li>
    <ul/>`  
  ,
  'Costa Rica':
  `<h1>Why Go To Costa Rica ?</h1>
  To many, Costa Rica's charm lies in its lush rainforests, unspoiled beaches and abundance of wildlife. With breathtaking landscapes and a myriad of creatures – from toucans to monkeys to jaguars – it's easy to see why. Where else can you hike active volcanoes, zip line through cloud-covered rainforests and surf warm turquoise waters within the span of just a few days? In this compact but diverse tropical paradise, exhilarating outdoor activities are abundant. Nature-seekers will roam thick jungles while beachgoers will sprawl across the powdery sands. It's hard not to admire all the splendors this "Rich Coast" has to offer.

  However, for others, this small Latin American country has a different appeal: it's a relaxed way of life. Residents – known as Ticos – often recite the catchphrase "pura vida" (or "pure life"). This guiding philosophy can be observed from Costa Rica's central cosmopolitan capital of San José all the way to the sandy Atlantic and Pacific coasts. To truly immerse yourself in the good life, kick back and admire the awe-inspiring scenery. Surround yourself with graceful butterflies at La Paz Waterfall Gardens, hike along the monumental Arenal Volcano, mingle with locals at Puerto Viejo de Talamanca, or simply sit in a hammock under a palm tree along the Nicoya Peninsula. We have a strong feeling you'll discover the pure life, too.
  <p></p>
    <h2>Top Hotels in Costa Rica :</h2>
    <ul>
      <li><a id="hotel" href="https://www.tulemarresort.com/">Tulemar Bungalows & Villas</a></li>
      <li><a id="hotel" href="https://www.relaischateaux.com/us/costa-rica/nayara-springs-fortuna-de-san-carlos-alajuela">Nayara Springs - Relais & Chateaux</a></li>
      <li><a id="hotel" href="https://www.tulemarresort.com/">Tulemar Resort</a></li>
      <li><a id="hotel" href="http://www.arenalnayara.com/m/index.php">Nayara Resort Spa & Gardens</a></li>
      <li><a id="hotel" href="https://www.rioperdido.com/">Rio Perdido Hotel & Thermal River</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Costa Rica :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/tortuguero-national-park-cruise.a212974.activity-details">Tortuguero National Park Cruise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/day-trip-to-tortuga-island-with-world-famous-calypso-cruise.a467439.activity-details">Day Trip to Tortuga Island with world famous Calypso Cruise</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/tortuga-island-cruise-beach-day.a212970.activity-details">Tortuga Island Cruise & Beach Day</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/rainforest-aerial-tram-caribbean.a212934.activity-details">Rainforest Aerial Tram Caribbean</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/poas-volcano-doka-coffee-estate-sarchi-arts-crafts-market-tour.a212954.activity-details">Poas Volcano, Doka Coffee Estate & Sarchi Arts & Crafts Market Tour</a></li>
    <ul/>`  
  ,
  'Amalfi Coast':
  `<h1>Why Go To Amalfi Coast ?</h1>
  One look at the Amalfi Coast and you may believe that you've found heaven on earth. That's the kind of spellbinding effect this stretch of Italian coastline tends to have on the 5 million annual visitors who cross its mesmerizing paths. Located in the Campania region of Italy, this UNESCO World Heritage site covers 34 miles of majestic terrain; sky-high costal cliffs display vibrant vegetation and multicolored towns live side by side with the disarming turquoise waters of the Mediterranean, creating a scene that has the power to stop even the most seasoned of travelers dead in their tracks. 

  The coast and the 13 seaside towns that call it home are all connected via the SS163 highway, considered one of the most scenic drives in the world. Each town comes equipped with signature Amalfi topography, as well as standout attributes of its own. The pastel-colored Positano draws in the rich and famous for its luxurious cliffside resorts and fine Italian dining, while the town of Amalfi is Italy's oldest maritime republic, once serving as a big commercial and technical hub in the Mediterranean. The alpine town of Ravello may not be for the faint of heart, but its ancient villas and stunning ocean views will be etched in your memory for years to come. Praiano's secluded shorelines will appease beach lovers and Minori, home to one of the oldest pastas in the world, is a mecca for foodies. And if you plan on passing through Cetara, you can stop at an ancient Norman tower, which according to legend, was founded by Hercules himself. However you decide to explore the Amalfi Coast, its glory is guaranteed to leave you completely gaga long after you've gone.
  <p></p>
    <h2>Top Hotels in Amalfi Coast :</h2>
    <ul>
      <li><a id="hotel" href="https://hotelmargherita.info/en/">Hotel Margherita</a></li>
      <li><a id="hotel" href="http://www.plazasorrento.com/en">Plaza Hotel</a></li>
      <li><a id="hotel" href="https://hotelconcadoropositano.com/">Hotel Conca d'Oro Positano</a></li>
      <li><a id="hotel" href="http://bacco-hotel.com/">Hotel Bacco</a></li>
      <li><a id="hotel" href="https://www.villaromanahotels.com/en/villa-romana/index">Villa Romana Hotel & Spa</a></li>
    </ul>
    <p></p>
    <h2>Top things to do in Amalfi Coast :</h2>
    <ul>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/amalfi-coast-day-trip-from-rome-with-scenic-cruise-limoncello-tasting.a451718.activity-details">Amalfi Coast Day Trip from Rome with Scenic Cruise & Limoncello Tasting</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/amalfi-coast-tour-with-boat-tour.a273141.activity-details">Amalfi Coast Tour with Boat Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/amalfi-coast-experience-small-group-tour.a339418.activity-details">Amalfi Coast Experience: Small-Group Tour</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/full-day-pompeii-vesuvius-tour-from-the-amalfi-coast.a361858.activity-details">Full-Day Pompeii & Vesuvius Tour from the Amalfi Coast</a></li>
      <li><a id="hotel" href="https://www.expedia.com/things-to-do/private-transfer-from-naples-to-amalfi-door-to-door-english-speaking-driver.a700732.activity-details">Private Transfer from Naples to Amalfi: Door-to-Door, English-speaking driver</a></li>
    <ul/>`
}

  










// mongoClient.connect(mongoUrl,(err,db)=>{
//     if(err) throw err;
//     var dbo = db.db('travelCompanion');
    
//     dbo.collection('content').insertOne({'list':list},(err,res)=>{
//       if(err) throw err;
    
//     })
    
    
//   })

  // mongoClient.connect(mongoUrl,(err,db)=>{
  //   if(err) throw err;
  //   var dbo = db.db('travelCompanion');
    
  //   dbo.collection('info').insertOne({'info':info},(err,res)=>{
  //     if(err) throw err;
    
  //   })
    
    
  // })
    




app.post('/login',(req,res)=>{
  console.log("yes");
  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('travelCompanion');
    
    var pwd = crypto.SHA256(req.body.userPass).toString();
    dbo.collection("users").findOne({username : req.body.userName,password:pwd},(err,r)=>{
      if(err) throw err;
          // console.log(r.username);
     if(r==null){
      res.send({'token':'invalid'});

     }
     else{

        console.log(r.username);
        var token = new Date().getDate() + myKey;
        var token2 = crypto.SHA256(token).toString();
        console.log(token2)
        res.send({'token':token2});
      
    
            

     }
    
    })
    
    
    
    })
  
})

app.post('/signup',(req,res)=>{

  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('travelCompanion');
    
    dbo.collection('users').findOne({username:req.body.userName},(err,al)=>{
      console.log(al);
      if(al == null){
        var pwd = crypto.SHA256(req.body.userPass).toString();
        dbo.collection('users').insertOne({firstname:req.body.firstName,lastname:req.body.lastName,username:req.body.userName,password:pwd},(err,result)=>{
          res.send({'status':'loginNow'})
        })
      }
      else{
        res.send({'status':'already'});
      }
    })
    
        
    
    })
})



app.post('/verifyToken',(req,res)=>{
  var todaysToken = crypto.SHA256( new Date().getDate()+myKey );

  if(req.body.token==todaysToken){
    res.send({'status':'valid'})
  }
  else{
    res.send({'status':'invalid'})
  }

})


app.post('/sendData',(req,res)=>{
  
  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('travelCompanion');
    
    dbo.collection('info').findOne({},(err,result)=>{

      res.send(result.info[req.body.destinationName])
    
    })
    
        
    
    })

})


app.post('/list',(req,res)=>{

  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('travelCompanion');
    
    dbo.collection('content').findOne({},(err,result)=>{

      res.send(result.list.data);
    
    })
       
  })
    
})

app.post('/deleteAccount',(req,res)=>{
  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('travelCompanion');
    console.log(req.body.delUser);
    dbo.collection('users').deleteOne({username:req.body.delUser},(err,result)=>{
      res.send({'status':'deleted'});
    })
  })
})

// app.use((req,res)=>{
//   res.send("404,not found");
// })

server.listen(process.env.PORT||5000,(req,res)=>{
  console.log("server is listening to port number 5000")
})









