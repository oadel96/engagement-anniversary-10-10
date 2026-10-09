// All the content for the page lives here.
window.STORY = {
  title: "The Story of Us",
  metOn: "2024-10-25",
  engagedOn: "2025-10-10",

  you: { name: "Omar", city: "Cairo", latlng: [30.0444, 31.2357] },
  her: { name: "Anuja", city: "Dubai", latlng: [25.2048, 55.2708] },

  // Shown under "Our route". {km} is replaced with the real distance.
  distanceLine: "{km} km between Cairo and Dubai — and still you're the closest person to me.",

  // Map pins, oldest first. Home locations are rounded to ~1 km on purpose (site is public).
  pins: [
    { title: "We met for the first time", text: "Aquaman 2024", place: "Soma Bay / S. Cape Beach", date: "25 October 2024", latlng: [26.85534, 33.97771], photo: "img/soma-bay-aq-2024.jpg", zoom: 14 },
    { title: "First Half Marathon", text: "", place: "Cairo Pyramids", date: "14 December 2024", latlng: [29.9773, 31.1325], photo: "img/hf-mrthon-2024.jpg", zoom: 14 },
    { title: "First Date", text: "Yummy Hot Chocolate", place: "District 5", date: "7 January 2025", latlng: [29.95629, 31.4506], photo: null, zoom: 14 },
    { title: "Anuja's 24th Birthday — Karaoke", text: "", place: "Room Art Space", date: "9 January 2025", latlng: [30.03539, 31.23133], photo: "img/room-art.jpg", zoom: 14 },
    { title: "Sushi Date", text: "Our relationship started", place: "Joia Sushi - Park Mall", date: "25 January 2025", latlng: [30.02643, 31.49746], photo: "img/joia-sushi-date.jpg", zoom: 14 },
    { title: "Carb loading before second Half Marathon", text: "", place: "Papa Johns - CFC", date: "13 February 2025", latlng: [30.03451, 31.40508], photo: "img/papa-johns-cfc.jpg", zoom: 14 },
    { title: "Second Half Marathon", text: "", place: "Merryland - Heliopolis", date: "14 February 2025", latlng: [30.09661, 31.3169], photo: "img/hf-mrthon-2025.jpg", zoom: 14 },
    { title: "First Valentine's Date", text: "", place: "Villa Belle Epoque Maadi", date: "15 February 2025", latlng: [29.95954, 31.26314], photo: "img/villa-belle.jpg", zoom: 14 },
    { title: "My 29th Birthday Date", text: "", place: "SKAS Venue - Obour", date: "21 March 2025", latlng: [30.20885, 31.49918], photo: "img/skas-venue.jpg", zoom: 14 },
    { title: "First Family Gathering", text: "", place: "Anuja's Home", date: "2 May 2025", latlng: [30.0, 31.4], photo: "img/family-gathering.jpg", zoom: 13 },
    { title: "Omar Khayrat Concert", text: "", place: "El-Qubbah Presidential Palace", date: "9 May 2025", latlng: [30.09888, 31.30207], photo: "img/omar-khayrat.jpg", zoom: 14 },
    { title: "Proud Moment #1", text: "Anuja's on fire in New Giza", place: "New Giza Club", date: "31 May 2025", latlng: [30.00453, 31.06616], photo: "img/proud-1.jpg", zoom: 14, proud: true },
    { title: "We got the engagement rings", text: "", place: "Aram Korba", date: "17 June 2025", latlng: [30.08908, 31.32128], photo: "img/engagement-rings.jpg", zoom: 14 },
    { title: "Erayet Fat7a", text: "Talbees Debal", place: "Anuja's Home", date: "26 June 2025", latlng: [30.0, 31.4], photo: "img/erayet-fat7a.jpg", zoom: 13 },
    { title: "Alafty's Wedding", text: "", place: "Nut Orabi", date: "27 June 2025", latlng: [30.2075, 31.54962], photo: "img/alafty-wedding.jpg", zoom: 14 },
    { title: "Proud Moment #2", text: "Anuja's killing it in Ghazala Bay", place: "Ghazala Bay Sa7el", date: "26 July 2025", latlng: [31.02775, 28.59406], photo: "img/proud-2.jpg", zoom: 14, proud: true },
    { title: "Karim Ayman's Katb Ketab", text: "", place: "Police Mosque", date: "29 August 2025", latlng: [30.03028, 31.42309], photo: "img/karim-aymans.jpg", zoom: 14 },
    { title: "Proud Moment #3", text: "Anuja's smashing Heliopolis Sherouk", place: "Heliopolis Club el Sherouk", date: "5 September 2025", latlng: [30.13295, 31.61443], photo: "img/proud-3.jpg", zoom: 14, proud: true },
    { title: "Proud Moment #4", text: "Anuja's slaying Oceanman 2025", place: "Gouna", date: "19 September 2025", latlng: [27.40248, 33.65114], photo: "img/proud-4.jpg", zoom: 13, proud: true },
    { title: "Proud Moment #5", text: "Anuja's setting the standard in Sporting Club", place: "Sporting Club Alex", date: "3 October 2025", latlng: [31.21677, 29.93385], photo: "img/proud-5.jpg", zoom: 14, proud: true },
    { title: "The Big Day — Our Engagement", text: "", place: "Flora Garden El Sherouk", date: "10 October 2025", latlng: [30.17974, 31.60466], photo: "img/engagement.jpg", zoom: 14 },
    { title: "Relived the first day we met in the same place one year later", text: "Aquaman 2025", place: "Soma Bay / S. Cape Beach", date: "24 October 2025", latlng: [26.85534, 33.97771], photo: "img/soma-bay-aq-2025.jpg", zoom: 14 },
    { title: "Proud Moment #6", text: "Anuja's nailing Aquaman 2025", place: "Soma Bay / S. Cape Beach", date: "25 October 2025", latlng: [26.85534, 33.97771], photo: "img/proud-6.jpg", zoom: 14, proud: true },
    { title: "Ceramic Shopping", text: "", place: "Sallab - Teseen", date: "12 November 2025", latlng: [30.02585, 31.48704], photo: "img/sallab.jpg", zoom: 14 },
    { title: "Go Karting", text: "", place: "AutoVroom - Obour", date: "21 November 2025", latlng: [30.20093, 31.45527], photo: "img/go-cart.jpg", zoom: 14 },
    { title: "Proud Moment #7", text: "Anuja's nailing Oceanman World Final 2025 Dubai", place: "Kite Beach - Dubai", date: "7 December 2025", latlng: [25.16476, 55.20762], photo: "img/proud-7.jpg", zoom: 14, proud: true },
    { title: "Anuja's 25th Birthday Date", text: "", place: "Eleve - Mokattam", date: "31 December 2025", latlng: [30.01661, 31.27504], photo: "img/anuja-25th.jpg", zoom: 14 },
    { title: "Grand Museum Visit", text: "", place: "Egyptian Grand Museum", date: "9 January 2026", latlng: [29.9932, 31.12444], photo: "img/museum.jpg", zoom: 14 },
    { title: "Second Valentine's Date", text: "Perfume Making", place: "District 5", date: "13 February 2026", latlng: [29.95629, 31.4506], photo: "img/perfume.jpg", zoom: 14 },
    { title: "My 30th Birthday Date", text: "", place: "Garden 8", date: "13 March 2026", latlng: [30.04682, 31.48424], photo: "img/bd-30.jpg", zoom: 14 },
    { title: "Babe's last day at her first job", text: "", place: "Smart Village", date: "29 April 2026", latlng: [30.07444, 31.02417], photo: "img/last-work-day.jpg", zoom: 14 },
    { title: "Gomgom x Nouran Wedding", text: "", place: "Casa Novelle - Orabi", date: "15 May 2026", latlng: [30.19984, 31.49853], photo: "img/gomgom.jpg", zoom: 14 },
    { title: "Sewaify's Katb Ketab", text: "", place: "El Aley El Azeem Mosque", date: "25 May 2026", latlng: [30.08907, 31.34892], photo: "img/sewaifys.jpg", zoom: 14 },
    { title: "Sa7el day with babe", text: "", place: "Blumar North Coast", date: "31 May 2026", latlng: [30.99434, 28.67086], photo: "img/sahel.jpg", zoom: 14 },
    { title: "Elissa's Party", text: "", place: "AUC", date: "6 June 2026", latlng: [30.02281, 31.49734], photo: "img/elissa.jpg", zoom: 14 },
    { title: "Last Date before Anuja's move", text: "", place: "Lavender Restaurant", date: "12 June 2026", latlng: [30.05119, 31.50777], photo: "img/last-date.jpg", zoom: 14 },
    { title: "Anuja's Move to Dubai", text: "", place: "Cairo Airport", date: "19 June 2026", latlng: [30.1095, 31.38918], photo: "img/anuja-move-day.jpg", zoom: 14 },
    { title: "Remote Katb Ketab Anniversary", text: "", place: "Home", date: "26 June 2026", latlng: [30.1, 31.34], photo: "img/erayet-fat7a-anni.jpg", zoom: 13 },
    { title: "Proud Moment #8", text: "Anuja's going up and beyond with the Tower", place: "Dubai", date: "2 October 2026", latlng: [25.20485, 55.27078], photo: "img/proud-8.jpg", zoom: 11, proud: true }
  ],

  // Final card on the map, with a countdown.
  next: {
    title: "When we meet again, Inshallah",
    text: "The best hug of my life, loading…",
    place: "Cairo Airport",
    latlng: [30.1095, 31.38918],
    zoom: 13,
    date: "2026-10-16"
  },

  // Polaroid wall. label = front (short), caption = back (handwritten).
  polaroids: [
    { photo: "img/bf77a92b-705c-48af-b8f8-408ca157a23a.jpg", label: "", caption: "I miss you" },
    { photo: "img/c2de8818-2e60-4d48-afdf-b976f5791a69.jpg", label: "", caption: "I adore you" },
    { photo: "img/c6746a87-3cd2-4ffb-8f43-91cca5d5ddde.jpg", label: "", caption: "I love you" },
    { photo: "img/b2c94a77-88d6-401b-9442-bc2a7cd570f5.jpg", label: "", caption: "I cherish you" },
    { photo: "img/fb27602d-8409-4c5b-8184-ee24ddb962b2.jpg", label: "", caption: "I choose you" },
    { photo: "img/378820c8-d3f3-44b9-ae1b-3e73fb8a4852.jpg", label: "", caption: "I'm so lucky to have you" }
  ],

  // Ending. Blank line = new paragraph.
  message: `It has been one hell of a year since our engagement day — ups and downs, from events, parties and home renovation to distance, miscommunication and fights. But the most important part is that we go through it all together.

I can't fully express how I feel about you, about us, but all I know is that I want us to be together forever. In a million lifetimes, I would still choose to be with you.

You're so precious to me, and I love you in ways you can't imagine. You're my present and my future — there isn't a single point in time where I can imagine you not being in it. I will live for us, fight for us, and do everything for us to be together, my love.

I thank God every day for having you. I'm really, really grateful for you, habebty. I love you, always and forever.

I miss you.`,
  signature: "— Omar"
};
