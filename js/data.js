// All the content for the page lives here.
// Placeholders marked TODO — replace with the real story.
window.STORY = {
  title: "Our Story",
  metOn: "2023-03-14",                // TODO: day you first met (YYYY-MM-DD)
  engagedOn: "2025-10-10",            // TODO: engagement date (YYYY-MM-DD)

  you: { name: "Omar", city: "London", latlng: [51.5074, -0.1278] },        // TODO
  her: { name: "Her Name", city: "Her City", latlng: [48.8566, 2.3522] },   // TODO

  // Shown under "Our route". {km} is replaced with the real distance.
  distanceLine: "{km} km between us — and still you're the closest person to me.",

  // Map pins, oldest first — from the day you met to today.
  // photo is optional (file in photos/). zoom: 4 = country, 13 = neighbourhood.
  pins: [
    {
      title: "The day we met",                  // TODO
      place: "London",
      date: "March 2023",
      latlng: [51.5115, -0.1160],
      text: "The first time I saw you. I had no idea yet.",
      photo: "photos/pin1.jpg",
      zoom: 13
    },
    {
      title: "Our first date",                  // TODO
      place: "London",
      date: "April 2023",
      latlng: [51.5033, -0.1196],
      text: "Two coffees, four hours, zero awkward silences.",
      photo: "photos/pin2.jpg",
      zoom: 14
    },
    {
      title: "First visit to you",              // TODO
      place: "Her City",
      date: "Winter 2023",
      latlng: [48.8584, 2.2945],
      text: "The airport hug I'd been waiting weeks for.",
      photo: "photos/pin3.jpg",
      zoom: 13
    },
    {
      title: "Engaged",                         // TODO
      place: "Her City",
      date: "10 October 2025",
      latlng: [48.8606, 2.3376],
      text: "The day we decided on forever.",
      photo: "photos/pin4.jpg",
      zoom: 13
    }
  ],

  // Final card on the map.
  next: {
    title: "Next stop: us",
    text: "Same city. Same home. No more goodbyes at airports.",
    date: "2026-12-20"                          // TODO: next meetup (YYYY-MM-DD) or null
  },

  // Polaroid wall. label = front (short), caption = back (handwritten).
  polaroids: [
    { photo: "photos/1.jpg", label: "us", caption: "My favourite photo of us. Your laugh here." },   // TODO
    { photo: "photos/2.jpg", label: "that trip", caption: "Remember getting completely lost?" },
    { photo: "photos/3.jpg", label: "video call #400", caption: "Even through a screen, you're home." },
    { photo: "photos/4.jpg", label: "airport", caption: "The best and worst place in the world." },
    { photo: "photos/5.jpg", label: "you", caption: "Just you being you. That's all it takes." },
    { photo: "photos/6.jpg", label: "dinner", caption: "Best meal of my life — because of the company." }
  ],

  // Ending. Blank line = new paragraph.
  message: `From the first day I met you, every road has led back to you.

The distance is just geography. You're with me in everything.

Happy anniversary, my love.`,                   // TODO
  signature: "— Omar"
};
