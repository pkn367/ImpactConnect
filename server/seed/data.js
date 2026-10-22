// ImpactConnect seed data: 30 NGOs and 30 events.
// Events link to NGOs through organizerId.
exports.ngos = [
  {
    "id": "hope-foundation",
    "name": "Hope Foundation",
    "category": "Education",
    "verified": true,
    "location": "Anna Nagar, Chennai",
    "founded": 2011,
    "volunteers": 1240,
    "image": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    "tagline": "Providing education, mentorship and learning materials to children in underserved communities.",
    "about": "Hope Foundation runs after-school learning centres and mentorship programmes across Chennai, helping first-generation learners stay in school and build the confidence to pursue higher education.",
    "needs": [
      "Weekend tutors",
      "Book donations",
      "Career-mentorship volunteers"
    ]
  },
  {
    "id": "green-earth-initiative",
    "name": "Green Earth Initiative",
    "category": "Environment",
    "verified": true,
    "location": "ECR, Chennai",
    "founded": 2016,
    "volunteers": 860,
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    "tagline": "Restoring coastlines and green cover through community-led conservation work.",
    "about": "Green Earth Initiative organises coastal clean-ups, mangrove restoration and urban tree-planting drives, working with local fishing communities to protect the ecosystems they depend on.",
    "needs": [
      "Weekend clean-up crews",
      "Sapling sponsors",
      "Field-photography volunteers"
    ]
  },
  {
    "id": "carebridge-foundation",
    "name": "CareBridge Foundation",
    "category": "Healthcare",
    "verified": true,
    "location": "Vellore",
    "founded": 2009,
    "volunteers": 640,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "tagline": "Bringing free health check-ups and telemedicine access to rural households.",
    "about": "CareBridge Foundation runs mobile health camps and a telemedicine helpline connecting rural patients with volunteer doctors, focused on maternal health and chronic-disease screening.",
    "needs": [
      "Volunteer doctors & nurses",
      "Camp logistics support",
      "Medicine donations"
    ]
  },
  {
    "id": "second-chance-shelter",
    "name": "Second Chance Shelter",
    "category": "Animal Welfare",
    "verified": true,
    "location": "Besant Nagar, Chennai",
    "founded": 2014,
    "volunteers": 410,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "tagline": "Rescuing, treating and rehoming street animals across the city.",
    "about": "Second Chance Shelter runs a no-kill rescue and rehabilitation centre, plus a low-cost sterilisation programme that has helped stabilise street-animal populations across three zones of the city.",
    "needs": [
      "Foster homes",
      "Weekend shelter volunteers",
      "Vet-transport drivers"
    ]
  },
  {
    "id": "youth-rise-collective",
    "name": "Youth Rise Collective",
    "category": "Youth Empowerment",
    "verified": false,
    "location": "T Nagar, Chennai",
    "founded": 2019,
    "volunteers": 305,
    "image": "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    "tagline": "Skill-building and job-readiness workshops for young adults.",
    "about": "Youth Rise Collective runs weekend workshops on digital skills, spoken English and interview readiness for young adults transitioning from school into the workforce.",
    "needs": [
      "Workshop facilitators",
      "Laptop donations",
      "Mock-interview volunteers"
    ]
  },
  {
    "id": "bright-futures-trust",
    "name": "Bright Futures Trust",
    "category": "Education",
    "verified": true,
    "location": "Vellore",
    "founded": 2013,
    "volunteers": 520,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "tagline": "Scholarships and school supplies for children from low-income families.",
    "about": "Bright Futures Trust funds school fees, uniforms and supplies for over 900 children each year, and runs a volunteer-led reading programme during term breaks.",
    "needs": [
      "Reading-programme volunteers",
      "Scholarship donors",
      "Supply drives"
    ]
  },
  {
    "id": "learn-together-trust",
    "name": "Learn Together Trust",
    "category": "Education",
    "verified": true,
    "location": "Coimbatore",
    "founded": 2008,
    "volunteers": 150,
    "image": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    "tagline": "Peer-learning centres that help school students catch up and keep going.",
    "about": "Learn Together Trust runs learning centres and mentoring programmes in Coimbatore, helping students from low-income families stay in school and build confidence for the future.",
    "needs": [
      "Weekend tutors",
      "Book and stationery donations",
      "Career-mentorship volunteers"
    ]
  },
  {
    "id": "vidya-deepam-society",
    "name": "Vidya Deepam Society",
    "category": "Education",
    "verified": true,
    "location": "Madurai",
    "founded": 2015,
    "volunteers": 287,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "tagline": "Free evening classes and scholarships for first-generation learners.",
    "about": "Vidya Deepam Society runs learning centres and mentoring programmes in Madurai, helping students from low-income families stay in school and build confidence for the future.",
    "needs": [
      "Book and stationery donations",
      "Career-mentorship volunteers",
      "Exam-prep coaches"
    ]
  },
  {
    "id": "open-books-chennai",
    "name": "Open Books Chennai",
    "category": "Education",
    "verified": true,
    "location": "Adyar, Chennai",
    "founded": 2022,
    "volunteers": 424,
    "image": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    "tagline": "Community libraries and reading programmes for children.",
    "about": "Open Books Chennai runs learning centres and mentoring programmes in Chennai, helping students from low-income families stay in school and build confidence for the future.",
    "needs": [
      "Career-mentorship volunteers",
      "Exam-prep coaches",
      "Reading-circle leaders"
    ]
  },
  {
    "id": "digital-classroom-project",
    "name": "Digital Classroom Project",
    "category": "Education",
    "verified": true,
    "location": "Trichy",
    "founded": 2014,
    "volunteers": 561,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "tagline": "Bringing computers and digital skills into government schools.",
    "about": "Digital Classroom Project runs learning centres and mentoring programmes in Trichy, helping students from low-income families stay in school and build confidence for the future.",
    "needs": [
      "Exam-prep coaches",
      "Reading-circle leaders",
      "Weekend tutors"
    ]
  },
  {
    "id": "first-generation-scholars",
    "name": "First Generation Scholars",
    "category": "Education",
    "verified": true,
    "location": "Salem",
    "founded": 2021,
    "volunteers": 698,
    "image": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    "tagline": "Mentoring for students who are the first in their family to attend college.",
    "about": "First Generation Scholars runs learning centres and mentoring programmes in Salem, helping students from low-income families stay in school and build confidence for the future.",
    "needs": [
      "Reading-circle leaders",
      "Weekend tutors",
      "Book and stationery donations"
    ]
  },
  {
    "id": "clean-cauvery-collective",
    "name": "Clean Cauvery Collective",
    "category": "Environment",
    "verified": false,
    "location": "Trichy",
    "founded": 2013,
    "volunteers": 835,
    "image": "https://images.unsplash.com/photo-1552799446-159ba9523315?w=800&q=80",
    "tagline": "Riverbank clean-ups and awareness drives along the Cauvery.",
    "about": "Clean Cauvery Collective organises clean-ups, plantation drives and awareness campaigns in Trichy, working with residents to protect local water, air and green cover.",
    "needs": [
      "Weekend clean-up crews",
      "Sapling sponsors",
      "Field-photography volunteers"
    ]
  },
  {
    "id": "urban-forest-chennai",
    "name": "Urban Forest Chennai",
    "category": "Environment",
    "verified": true,
    "location": "Velachery, Chennai",
    "founded": 2020,
    "volunteers": 972,
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    "tagline": "Creating small native forests in unused urban plots.",
    "about": "Urban Forest Chennai organises clean-ups, plantation drives and awareness campaigns in Chennai, working with residents to protect local water, air and green cover.",
    "needs": [
      "Sapling sponsors",
      "Field-photography volunteers",
      "Water-testing helpers"
    ]
  },
  {
    "id": "lake-revival-network",
    "name": "Lake Revival Network",
    "category": "Environment",
    "verified": true,
    "location": "Madurai",
    "founded": 2012,
    "volunteers": 1109,
    "image": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "tagline": "Restoring neglected lakes and tanks with local communities.",
    "about": "Lake Revival Network organises clean-ups, plantation drives and awareness campaigns in Madurai, working with residents to protect local water, air and green cover.",
    "needs": [
      "Field-photography volunteers",
      "Water-testing helpers",
      "Awareness-campaign volunteers"
    ]
  },
  {
    "id": "zero-waste-vellore",
    "name": "Zero Waste Vellore",
    "category": "Environment",
    "verified": true,
    "location": "Vellore",
    "founded": 2019,
    "volunteers": 1246,
    "image": "https://images.unsplash.com/photo-1552799446-159ba9523315?w=800&q=80",
    "tagline": "Waste segregation and composting programmes for neighbourhoods.",
    "about": "Zero Waste Vellore organises clean-ups, plantation drives and awareness campaigns in Vellore, working with residents to protect local water, air and green cover.",
    "needs": [
      "Water-testing helpers",
      "Awareness-campaign volunteers",
      "Weekend clean-up crews"
    ]
  },
  {
    "id": "solar-villages-trust",
    "name": "Solar Villages Trust",
    "category": "Environment",
    "verified": true,
    "location": "Coimbatore",
    "founded": 2011,
    "volunteers": 283,
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    "tagline": "Bringing solar lighting to villages without reliable power.",
    "about": "Solar Villages Trust organises clean-ups, plantation drives and awareness campaigns in Coimbatore, working with residents to protect local water, air and green cover.",
    "needs": [
      "Awareness-campaign volunteers",
      "Weekend clean-up crews",
      "Sapling sponsors"
    ]
  },
  {
    "id": "swasth-clinic-network",
    "name": "Swasth Clinic Network",
    "category": "Healthcare",
    "verified": true,
    "location": "Madurai",
    "founded": 2018,
    "volunteers": 420,
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    "tagline": "Low-cost community clinics and monthly screening camps.",
    "about": "Swasth Clinic Network provides free check-ups, screening camps and patient support in Madurai, working with volunteer doctors and local hospitals.",
    "needs": [
      "Volunteer doctors and nurses",
      "Camp logistics support",
      "Medicine donations"
    ]
  },
  {
    "id": "mind-matters-foundation",
    "name": "Mind Matters Foundation",
    "category": "Healthcare",
    "verified": false,
    "location": "Adyar, Chennai",
    "founded": 2010,
    "volunteers": 557,
    "image": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
    "tagline": "Mental-health awareness and free counselling for students.",
    "about": "Mind Matters Foundation provides free check-ups, screening camps and patient support in Chennai, working with volunteer doctors and local hospitals.",
    "needs": [
      "Camp logistics support",
      "Medicine donations",
      "Patient-transport drivers"
    ]
  },
  {
    "id": "mother-child-care-trust",
    "name": "Mother & Child Care Trust",
    "category": "Healthcare",
    "verified": true,
    "location": "Salem",
    "founded": 2017,
    "volunteers": 694,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "tagline": "Nutrition and check-up support for mothers and young children.",
    "about": "Mother & Child Care Trust provides free check-ups, screening camps and patient support in Salem, working with volunteer doctors and local hospitals.",
    "needs": [
      "Medicine donations",
      "Patient-transport drivers",
      "Health-awareness speakers"
    ]
  },
  {
    "id": "vision-for-all",
    "name": "Vision for All",
    "category": "Healthcare",
    "verified": true,
    "location": "Coimbatore",
    "founded": 2009,
    "volunteers": 831,
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    "tagline": "Free eye tests and affordable spectacles for low-income families.",
    "about": "Vision for All provides free check-ups, screening camps and patient support in Coimbatore, working with volunteer doctors and local hospitals.",
    "needs": [
      "Patient-transport drivers",
      "Health-awareness speakers",
      "Volunteer doctors and nurses"
    ]
  },
  {
    "id": "dialysis-aid-society",
    "name": "Dialysis Aid Society",
    "category": "Healthcare",
    "verified": true,
    "location": "Vellore",
    "founded": 2016,
    "volunteers": 968,
    "image": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
    "tagline": "Helping patients afford regular dialysis treatment.",
    "about": "Dialysis Aid Society provides free check-ups, screening camps and patient support in Vellore, working with volunteer doctors and local hospitals.",
    "needs": [
      "Health-awareness speakers",
      "Volunteer doctors and nurses",
      "Camp logistics support"
    ]
  },
  {
    "id": "paws-and-care-chennai",
    "name": "Paws & Care Chennai",
    "category": "Animal Welfare",
    "verified": true,
    "location": "Mylapore, Chennai",
    "founded": 2008,
    "volunteers": 1105,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "tagline": "Street-animal vaccination, treatment and adoption.",
    "about": "Paws & Care Chennai rescues, treats and rehomes street animals in Chennai, and runs community programmes on vaccination and responsible pet care.",
    "needs": [
      "Foster homes",
      "Weekend shelter volunteers",
      "Vet-transport drivers"
    ]
  },
  {
    "id": "stray-heroes-coimbatore",
    "name": "Stray Heroes Coimbatore",
    "category": "Animal Welfare",
    "verified": true,
    "location": "Coimbatore",
    "founded": 2015,
    "volunteers": 1242,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "tagline": "Volunteer network feeding and rescuing street dogs.",
    "about": "Stray Heroes Coimbatore rescues, treats and rehomes street animals in Coimbatore, and runs community programmes on vaccination and responsible pet care.",
    "needs": [
      "Weekend shelter volunteers",
      "Vet-transport drivers",
      "Feeding-drive volunteers"
    ]
  },
  {
    "id": "cattle-care-trust",
    "name": "Cattle Care Trust",
    "category": "Animal Welfare",
    "verified": false,
    "location": "Madurai",
    "founded": 2022,
    "volunteers": 279,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "tagline": "A shelter and treatment centre for abandoned cattle.",
    "about": "Cattle Care Trust rescues, treats and rehomes street animals in Madurai, and runs community programmes on vaccination and responsible pet care.",
    "needs": [
      "Vet-transport drivers",
      "Feeding-drive volunteers",
      "Adoption-event helpers"
    ]
  },
  {
    "id": "wings-bird-rescue",
    "name": "Wings Bird Rescue",
    "category": "Animal Welfare",
    "verified": true,
    "location": "Trichy",
    "founded": 2014,
    "volunteers": 416,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "tagline": "Rescue and release of injured birds.",
    "about": "Wings Bird Rescue rescues, treats and rehomes street animals in Trichy, and runs community programmes on vaccination and responsible pet care.",
    "needs": [
      "Feeding-drive volunteers",
      "Adoption-event helpers",
      "Foster homes"
    ]
  },
  {
    "id": "vellore-animal-aid",
    "name": "Vellore Animal Aid",
    "category": "Animal Welfare",
    "verified": true,
    "location": "Vellore",
    "founded": 2021,
    "volunteers": 553,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "tagline": "Low-cost sterilisation and adoption drives.",
    "about": "Vellore Animal Aid rescues, treats and rehomes street animals in Vellore, and runs community programmes on vaccination and responsible pet care.",
    "needs": [
      "Adoption-event helpers",
      "Foster homes",
      "Weekend shelter volunteers"
    ]
  },
  {
    "id": "skill-bridge-academy",
    "name": "Skill Bridge Academy",
    "category": "Youth Empowerment",
    "verified": true,
    "location": "Guindy, Chennai",
    "founded": 2013,
    "volunteers": 690,
    "image": "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    "tagline": "Job-readiness training for young adults.",
    "about": "Skill Bridge Academy runs skill-building workshops and mentoring in Chennai, preparing young people for jobs, entrepreneurship and leadership.",
    "needs": [
      "Workshop facilitators",
      "Laptop donations",
      "Mock-interview volunteers"
    ]
  },
  {
    "id": "women-rise-network",
    "name": "Women Rise Network",
    "category": "Youth Empowerment",
    "verified": true,
    "location": "Coimbatore",
    "founded": 2020,
    "volunteers": 827,
    "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "tagline": "Skills and micro-business training for young women.",
    "about": "Women Rise Network runs skill-building workshops and mentoring in Coimbatore, preparing young people for jobs, entrepreneurship and leadership.",
    "needs": [
      "Laptop donations",
      "Mock-interview volunteers",
      "Sports coaches"
    ]
  },
  {
    "id": "sports-for-change",
    "name": "Sports for Change",
    "category": "Youth Empowerment",
    "verified": true,
    "location": "Salem",
    "founded": 2012,
    "volunteers": 964,
    "image": "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    "tagline": "Using sport to build teamwork and leadership in teenagers.",
    "about": "Sports for Change runs skill-building workshops and mentoring in Salem, preparing young people for jobs, entrepreneurship and leadership.",
    "needs": [
      "Mock-interview volunteers",
      "Sports coaches",
      "Industry mentors"
    ]
  },
  {
    "id": "career-compass-trust",
    "name": "Career Compass Youth Trust",
    "category": "Youth Empowerment",
    "verified": false,
    "location": "Vellore",
    "founded": 2019,
    "volunteers": 1101,
    "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "tagline": "Career guidance for rural students and graduates.",
    "about": "Career Compass Youth Trust runs skill-building workshops and mentoring in Vellore, preparing young people for jobs, entrepreneurship and leadership.",
    "needs": [
      "Sports coaches",
      "Industry mentors",
      "Workshop facilitators"
    ]
  }
]

exports.events = [
  {
    "id": "beach-cleanup-drive",
    "title": "Beach Cleanup Drive",
    "category": "Environment",
    "organizer": "Green Earth Initiative",
    "organizerId": "green-earth-initiative",
    "date": "2026-10-18",
    "time": "6:30 AM",
    "location": "Marina Beach, Chennai",
    "capacity": 100,
    "baseRegistered": 45,
    "image": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "description": "Join a two-hour morning clean-up along Marina Beach, followed by a short briefing on marine-plastic impact. Gloves, bags and refreshments provided."
  },
  {
    "id": "teaching-for-change",
    "title": "Teaching for Change",
    "category": "Education",
    "organizer": "Hope Foundation",
    "organizerId": "hope-foundation",
    "date": "2026-10-21",
    "time": "10:00 AM",
    "location": "Vellore",
    "capacity": 50,
    "baseRegistered": 28,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "description": "A single-day teaching workshop for volunteers to lead small-group learning sessions with children aged 8-14. No prior teaching experience required."
  },
  {
    "id": "community-health-camp",
    "title": "Community Health Camp",
    "category": "Healthcare",
    "organizer": "CareBridge Foundation",
    "organizerId": "carebridge-foundation",
    "date": "2026-10-24",
    "time": "9:00 AM",
    "location": "Vellore",
    "capacity": 75,
    "baseRegistered": 32,
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    "description": "Free general health check-ups, eye screening and basic health-education sessions for rural households, run with volunteer doctors and nursing students."
  },
  {
    "id": "tree-plantation-marathon",
    "title": "Tree Plantation Marathon",
    "category": "Environment",
    "organizer": "Green Earth Initiative",
    "organizerId": "green-earth-initiative",
    "date": "2026-10-28",
    "time": "7:00 AM",
    "location": "Anna Nagar, Chennai",
    "capacity": 120,
    "baseRegistered": 71,
    "image": "https://images.unsplash.com/photo-1552799446-159ba9523315?w=800&q=80",
    "description": "A city-wide push to plant 1,000 native saplings in a single morning across five neighbourhood parks. Tools and saplings provided."
  },
  {
    "id": "winter-clothing-drive",
    "title": "Winter Clothing Drive",
    "category": "Youth Empowerment",
    "organizer": "Youth Rise Collective",
    "organizerId": "youth-rise-collective",
    "date": "2026-11-02",
    "time": "11:00 AM",
    "location": "T Nagar, Chennai",
    "capacity": 60,
    "baseRegistered": 19,
    "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "description": "Sort and pack donated clothing for distribution to shelters and low-income families ahead of the winter season."
  },
  {
    "id": "blood-donation-camp",
    "title": "Blood Donation Camp",
    "category": "Healthcare",
    "organizer": "CareBridge Foundation",
    "organizerId": "carebridge-foundation",
    "date": "2026-11-06",
    "time": "9:30 AM",
    "location": "Besant Nagar, Chennai",
    "capacity": 90,
    "baseRegistered": 54,
    "image": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
    "description": "A one-day blood donation camp run with the regional blood bank. Donors are asked to eat beforehand and bring a valid photo ID."
  },
  {
    "id": "maths-made-easy-camp",
    "title": "Maths Made Easy Camp",
    "category": "Education",
    "organizer": "Learn Together Trust",
    "organizerId": "learn-together-trust",
    "date": "2026-11-08",
    "time": "6:30 AM",
    "location": "RS Puram, Coimbatore",
    "capacity": 40,
    "baseRegistered": 8,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "description": "Maths Made Easy Camp: a volunteer-led learning session where you work with small groups of students. Training and materials are provided on the day."
  },
  {
    "id": "scholarship-awareness-day",
    "title": "Scholarship Awareness Day",
    "category": "Education",
    "organizer": "Vidya Deepam Society",
    "organizerId": "vidya-deepam-society",
    "date": "2026-11-12",
    "time": "7:30 AM",
    "location": "Anna Nagar, Madurai",
    "capacity": 80,
    "baseRegistered": 29,
    "image": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    "description": "Scholarship Awareness Day: a volunteer-led learning session where you work with small groups of students. Training and materials are provided on the day."
  },
  {
    "id": "story-hour-volunteer-meet",
    "title": "Story Hour Volunteer Meet",
    "category": "Education",
    "organizer": "Open Books Chennai",
    "organizerId": "open-books-chennai",
    "date": "2026-11-16",
    "time": "9:00 AM",
    "location": "Adyar, Chennai",
    "capacity": 120,
    "baseRegistered": 64,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "description": "Story Hour Volunteer Meet: a volunteer-led learning session where you work with small groups of students. Training and materials are provided on the day."
  },
  {
    "id": "digital-skills-saturday",
    "title": "Digital Skills Saturday",
    "category": "Education",
    "organizer": "Digital Classroom Project",
    "organizerId": "digital-classroom-project",
    "date": "2026-11-20",
    "time": "10:00 AM",
    "location": "Srirangam, Trichy",
    "capacity": 70,
    "baseRegistered": 14,
    "image": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    "description": "Digital Skills Saturday: a volunteer-led learning session where you work with small groups of students. Training and materials are provided on the day."
  },
  {
    "id": "college-readiness-workshop",
    "title": "College Readiness Workshop",
    "category": "Education",
    "organizer": "First Generation Scholars",
    "organizerId": "first-generation-scholars",
    "date": "2026-11-24",
    "time": "11:00 AM",
    "location": "Fairlands, Salem",
    "capacity": 110,
    "baseRegistered": 41,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "description": "College Readiness Workshop: a volunteer-led learning session where you work with small groups of students. Training and materials are provided on the day."
  },
  {
    "id": "riverbank-cleanup-morning",
    "title": "Riverbank Cleanup Morning",
    "category": "Environment",
    "organizer": "Clean Cauvery Collective",
    "organizerId": "clean-cauvery-collective",
    "date": "2026-11-28",
    "time": "3:00 PM",
    "location": "Cauvery Bridge, Trichy",
    "capacity": 60,
    "baseRegistered": 33,
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    "description": "Riverbank Cleanup Morning: a hands-on outdoor drive with tools and refreshments provided. Wear comfortable clothes and bring a water bottle."
  },
  {
    "id": "miyawaki-mini-forest-planting",
    "title": "Miyawaki Mini-Forest Planting",
    "category": "Environment",
    "organizer": "Urban Forest Chennai",
    "organizerId": "urban-forest-chennai",
    "date": "2026-12-02",
    "time": "4:30 PM",
    "location": "Velachery, Chennai",
    "capacity": 100,
    "baseRegistered": 22,
    "image": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "description": "Miyawaki Mini-Forest Planting: a hands-on outdoor drive with tools and refreshments provided. Wear comfortable clothes and bring a water bottle."
  },
  {
    "id": "lake-desilting-day",
    "title": "Lake Desilting Day",
    "category": "Environment",
    "organizer": "Lake Revival Network",
    "organizerId": "lake-revival-network",
    "date": "2026-12-06",
    "time": "6:30 AM",
    "location": "Vandiyur Tank, Madurai",
    "capacity": 50,
    "baseRegistered": 19,
    "image": "https://images.unsplash.com/photo-1552799446-159ba9523315?w=800&q=80",
    "description": "Lake Desilting Day: a hands-on outdoor drive with tools and refreshments provided. Wear comfortable clothes and bring a water bottle."
  },
  {
    "id": "compost-workshop-for-residents",
    "title": "Compost Workshop for Residents",
    "category": "Environment",
    "organizer": "Zero Waste Vellore",
    "organizerId": "zero-waste-vellore",
    "date": "2026-12-10",
    "time": "7:30 AM",
    "location": "Katpadi, Vellore",
    "capacity": 90,
    "baseRegistered": 50,
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    "description": "Compost Workshop for Residents: a hands-on outdoor drive with tools and refreshments provided. Wear comfortable clothes and bring a water bottle."
  },
  {
    "id": "solar-lantern-assembly-day",
    "title": "Solar Lantern Assembly Day",
    "category": "Environment",
    "organizer": "Solar Villages Trust",
    "organizerId": "solar-villages-trust",
    "date": "2026-12-14",
    "time": "9:00 AM",
    "location": "Peelamedu, Coimbatore",
    "capacity": 40,
    "baseRegistered": 9,
    "image": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "description": "Solar Lantern Assembly Day: a hands-on outdoor drive with tools and refreshments provided. Wear comfortable clothes and bring a water bottle."
  },
  {
    "id": "diabetes-screening-camp",
    "title": "Diabetes Screening Camp",
    "category": "Healthcare",
    "organizer": "Swasth Clinic Network",
    "organizerId": "swasth-clinic-network",
    "date": "2026-12-18",
    "time": "10:00 AM",
    "location": "Simmakkal, Madurai",
    "capacity": 80,
    "baseRegistered": 32,
    "image": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
    "description": "Diabetes Screening Camp: a community health event supported by volunteer medical staff. Volunteers help with registration, queues and patient guidance."
  },
  {
    "id": "mental-health-awareness-walk",
    "title": "Mental Health Awareness Walk",
    "category": "Healthcare",
    "organizer": "Mind Matters Foundation",
    "organizerId": "mind-matters-foundation",
    "date": "2026-12-22",
    "time": "11:00 AM",
    "location": "Besant Nagar Beach, Chennai",
    "capacity": 120,
    "baseRegistered": 68,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "description": "Mental Health Awareness Walk: a community health event supported by volunteer medical staff. Volunteers help with registration, queues and patient guidance."
  },
  {
    "id": "nutrition-camp-for-mothers",
    "title": "Nutrition Camp for Mothers",
    "category": "Healthcare",
    "organizer": "Mother & Child Care Trust",
    "organizerId": "mother-child-care-trust",
    "date": "2026-12-26",
    "time": "3:00 PM",
    "location": "Hasthampatti, Salem",
    "capacity": 70,
    "baseRegistered": 16,
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    "description": "Nutrition Camp for Mothers: a community health event supported by volunteer medical staff. Volunteers help with registration, queues and patient guidance."
  },
  {
    "id": "free-eye-check-up-camp",
    "title": "Free Eye Check-up Camp",
    "category": "Healthcare",
    "organizer": "Vision for All",
    "organizerId": "vision-for-all",
    "date": "2026-12-30",
    "time": "4:30 PM",
    "location": "Gandhipuram, Coimbatore",
    "capacity": 110,
    "baseRegistered": 45,
    "image": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
    "description": "Free Eye Check-up Camp: a community health event supported by volunteer medical staff. Volunteers help with registration, queues and patient guidance."
  },
  {
    "id": "patient-support-volunteer-day",
    "title": "Patient Support Volunteer Day",
    "category": "Healthcare",
    "organizer": "Dialysis Aid Society",
    "organizerId": "dialysis-aid-society",
    "date": "2027-01-03",
    "time": "6:30 AM",
    "location": "Bagayam, Vellore",
    "capacity": 60,
    "baseRegistered": 34,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "description": "Patient Support Volunteer Day: a community health event supported by volunteer medical staff. Volunteers help with registration, queues and patient guidance."
  },
  {
    "id": "vaccination-drive-for-strays",
    "title": "Vaccination Drive for Strays",
    "category": "Animal Welfare",
    "organizer": "Paws & Care Chennai",
    "organizerId": "paws-and-care-chennai",
    "date": "2027-01-07",
    "time": "7:30 AM",
    "location": "Mylapore, Chennai",
    "capacity": 100,
    "baseRegistered": 25,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "description": "Vaccination Drive for Strays: a day of care and awareness at the shelter. No experience needed; the team will show you what to do."
  },
  {
    "id": "weekend-feeding-drive",
    "title": "Weekend Feeding Drive",
    "category": "Animal Welfare",
    "organizer": "Stray Heroes Coimbatore",
    "organizerId": "stray-heroes-coimbatore",
    "date": "2027-01-11",
    "time": "9:00 AM",
    "location": "Race Course, Coimbatore",
    "capacity": 50,
    "baseRegistered": 21,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "description": "Weekend Feeding Drive: a day of care and awareness at the shelter. No experience needed; the team will show you what to do."
  },
  {
    "id": "shelter-clean-up-and-care-day",
    "title": "Shelter Clean-up and Care Day",
    "category": "Animal Welfare",
    "organizer": "Cattle Care Trust",
    "organizerId": "cattle-care-trust",
    "date": "2027-01-15",
    "time": "10:00 AM",
    "location": "Thiruparankundram, Madurai",
    "capacity": 90,
    "baseRegistered": 53,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "description": "Shelter Clean-up and Care Day: a day of care and awareness at the shelter. No experience needed; the team will show you what to do."
  },
  {
    "id": "bird-rescue-training",
    "title": "Bird Rescue Training",
    "category": "Animal Welfare",
    "organizer": "Wings Bird Rescue",
    "organizerId": "wings-bird-rescue",
    "date": "2027-01-19",
    "time": "11:00 AM",
    "location": "Woraiyur, Trichy",
    "capacity": 40,
    "baseRegistered": 10,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "description": "Bird Rescue Training: a day of care and awareness at the shelter. No experience needed; the team will show you what to do."
  },
  {
    "id": "adoption-mela",
    "title": "Adoption Mela",
    "category": "Animal Welfare",
    "organizer": "Vellore Animal Aid",
    "organizerId": "vellore-animal-aid",
    "date": "2027-01-23",
    "time": "3:00 PM",
    "location": "Gandhi Nagar, Vellore",
    "capacity": 80,
    "baseRegistered": 34,
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "description": "Adoption Mela: a day of care and awareness at the shelter. No experience needed; the team will show you what to do."
  },
  {
    "id": "resume-and-interview-clinic",
    "title": "Resume and Interview Clinic",
    "category": "Youth Empowerment",
    "organizer": "Skill Bridge Academy",
    "organizerId": "skill-bridge-academy",
    "date": "2027-01-27",
    "time": "4:30 PM",
    "location": "Guindy, Chennai",
    "capacity": 120,
    "baseRegistered": 72,
    "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "description": "Resume and Interview Clinic: a workshop for young adults on practical skills. Volunteers help mentor, coordinate and run activities."
  },
  {
    "id": "micro-business-starter-workshop",
    "title": "Micro-Business Starter Workshop",
    "category": "Youth Empowerment",
    "organizer": "Women Rise Network",
    "organizerId": "women-rise-network",
    "date": "2027-01-31",
    "time": "6:30 AM",
    "location": "Saibaba Colony, Coimbatore",
    "capacity": 70,
    "baseRegistered": 18,
    "image": "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    "description": "Micro-Business Starter Workshop: a workshop for young adults on practical skills. Volunteers help mentor, coordinate and run activities."
  },
  {
    "id": "community-sports-day",
    "title": "Community Sports Day",
    "category": "Youth Empowerment",
    "organizer": "Sports for Change",
    "organizerId": "sports-for-change",
    "date": "2027-02-04",
    "time": "7:30 AM",
    "location": "Salem Stadium, Salem",
    "capacity": 110,
    "baseRegistered": 48,
    "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "description": "Community Sports Day: a workshop for young adults on practical skills. Volunteers help mentor, coordinate and run activities."
  },
  {
    "id": "career-guidance-fair",
    "title": "Career Guidance Fair",
    "category": "Youth Empowerment",
    "organizer": "Career Compass Youth Trust",
    "organizerId": "career-compass-trust",
    "date": "2027-02-08",
    "time": "9:00 AM",
    "location": "VIT Road, Vellore",
    "capacity": 60,
    "baseRegistered": 36,
    "image": "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    "description": "Career Guidance Fair: a workshop for young adults on practical skills. Volunteers help mentor, coordinate and run activities."
  }
]
