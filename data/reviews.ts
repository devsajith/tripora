export interface ReviewItem {
  id: string;
  authorName: string;
  authorCity: string;
  authorAvatar?: string;
  rating: number; // 1 to 5
  packageTitle: string;
  packageId?: string;
  travelDate?: string;
  comment: string;
  photos?: string[];
  verifiedBooking?: boolean;
  likes: number;
  createdAt: string;
  ownerReply?: {
    text: string;
    repliedAt: string;
  };
}

export const AVAILABLE_PACKAGES = [
  "7 Days of Kerala (Signature Package)",
  "Munnar Escape (2N / 3D)",
  "5 Days / 4 Nights Kerala Tour",
  "Custom Kerala Tour Itinerary",
];

export const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    authorName: "Kavitha & Rajesh Menon",
    authorCity: "Bengaluru, Karnataka",
    rating: 5,
    packageTitle: "7 Days of Kerala (Signature Package)",
    packageId: "7-days-kerala",
    travelDate: "September 2026",
    comment:
      "We were traveling with our 6-year-old and 72-year-old mother, so comfort and smooth pacing were paramount. Tripora arranged an Innova Crysta with driver Praveen, who was exceptionally patient and polite. The houseboat in Alleppey was pristine, with delicious authentic Kerala meals cooked fresh on board. Munnar tea estate resort had breathtaking sunrise views. Zero hidden costs and constant WhatsApp check-ins made us feel completely secure.",
    photos: [
      "/locations/AllepyBackwater.webp",
      "/locations/Munnarteagarden.webp",
      "/locations/houseboat.webp",
    ],
    verifiedBooking: true,
    likes: 28,
    createdAt: "2 weeks ago",
    ownerReply: {
      text: "Warmest thanks Kavitha & Rajesh! Praveen was thrilled to hear your kind words. Hosting three generations on one memorable trip is our greatest joy. We hope to welcome you all back to Wayanad soon!",
      repliedAt: "1 week ago",
    },
  },
  {
    id: "rev-2",
    authorName: "Aditya & Shweta Sharma",
    authorCity: "Mumbai, Maharashtra",
    rating: 5,
    packageTitle: "Munnar Escape (2N / 3D)",
    packageId: "munnar-escape",
    travelDate: "August 2026",
    comment:
      "Booked the 3-day Munnar getaway for our honeymoon. The candle-light dinner setup and flower arrangement at the tea plantation resort were surreal! Special shoutout to our coordinator Basil for recommending Top Station at 6 AM—the mist moving over the hills was once in a lifetime. No rush, no forced shopping stops, pure luxury and peace.",
    photos: [
      "/locations/MunnarSunrise.webp",
      "/locations/topstation.webp",
    ],
    verifiedBooking: true,
    likes: 19,
    createdAt: "1 month ago",
    ownerReply: {
      text: "Congratulations once again Aditya & Shweta! So glad you caught the morning cloud sea at Top Station. Wishing you both a lifetime of adventures together!",
      repliedAt: "3 weeks ago",
    },
  },
  {
    id: "rev-3",
    authorName: "Vikram Rathore",
    authorCity: "Hyderabad, Telangana",
    rating: 5,
    packageTitle: "5 Days / 4 Nights Kerala Tour",
    packageId: "5-days-kerala",
    travelDate: "July 2026",
    comment:
      "Four college buddies on a reunion trip. We wanted a mix of nature, authentic food, and relaxed evenings. The spice plantation walk in Thekkady and bamboo boating were top highlights. Everything from airport pickup at Cochin to hotel check-ins went off without a hitch. Honest pricing and transparent communication throughout.",
    photos: [
      "/locations/ThekkadyBoating.webp",
      "/locations/spiceplantations.webp",
    ],
    verifiedBooking: true,
    likes: 14,
    createdAt: "2 months ago",
  },
  {
    id: "rev-4",
    authorName: "Dr. Ananya Sen",
    authorCity: "Kolkata, West Bengal",
    rating: 5,
    packageTitle: "7 Days of Kerala (Signature Package)",
    packageId: "7-days-kerala",
    travelDate: "June 2026",
    comment:
      "Since Tripora doesn't operate a physical commercial storefront, I was initially cautious about booking online. However, after speaking directly with their travel planner and reviewing their clear day-by-day itinerary with exact hotel names, all doubts vanished. The Ayurvedic rejuvenation session in Kumarakom and Kathakali cultural show in Kochi were memorable. Real hospitality with zero gimmicks.",
    photos: [
      "/locations/vembanad.webp",
      "/locations/Jewtown.webp",
    ],
    verifiedBooking: true,
    likes: 31,
    createdAt: "3 months ago",
    ownerReply: {
      text: "Dr. Sen, we appreciate your candid review! As an agile, remote-first boutique agency, we pour every rupee directly into top vehicles and handpicked boutique properties instead of hefty office overhead. Thank you for placing your trust in us!",
      repliedAt: "3 months ago",
    },
  },
  {
    id: "rev-5",
    authorName: "Rohan & Megha Kulkarni",
    authorCity: "Pune, Maharashtra",
    rating: 4,
    packageTitle: "Munnar Escape (2N / 3D)",
    packageId: "munnar-escape",
    travelDate: "May 2026",
    comment:
      "Overall a 4.5/5 experience. The tea gardens in Munnar and Cheeyappara waterfalls were overflowing with monsoon beauty. Our chauffeur Arun was superb and drove safely along winding ghat roads. Only minor hiccup was sudden monsoon rains that closed Mattupetty dam boating for 2 hours, but Arun quickly pivoted and took us to a fantastic spice garden instead.",
    photos: [
      "/locations/cheeyappara.webp",
      "/locations/valarafalls.webp",
    ],
    verifiedBooking: true,
    likes: 9,
    createdAt: "4 months ago",
    ownerReply: {
      text: "Thank you Rohan & Megha! Monsoon in Kerala is pure poetry, but rain can occasionally shuffle boat schedules. We're glad Arun was able to adjust seamlessly so you didn't miss a beat!",
      repliedAt: "4 months ago",
    },
  },
  {
    id: "rev-6",
    authorName: "Siddharth Nambiar",
    authorCity: "Chennai, Tamil Nadu",
    rating: 5,
    packageTitle: "7 Days of Kerala (Signature Package)",
    packageId: "7-days-kerala",
    travelDate: "April 2026",
    comment:
      "Tripora arranged a 1-bedroom private premium houseboat on Vembanad Lake just for my wife and me. Chef on the boat cooked Karimeen Pollichathu (pearl spot fish) and duck roast that tasted better than 5-star hotels. Outstanding coordination from start to end.",
    photos: [
      "/locations/AllepyBackwater.webp",
    ],
    verifiedBooking: true,
    likes: 22,
    createdAt: "5 months ago",
  },
];
