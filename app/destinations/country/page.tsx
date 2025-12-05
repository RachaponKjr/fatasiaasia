"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeroLayout from "../../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import ListTour from "./_components/list-tour";
import { useSearchParams } from "next/navigation";
import api from "@/server";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";
const page = () => {
  const param = useSearchParams();
  const country = param.get("country");
  const [countryItem, setCountryItem] = useState<Tour[]>()
  const content: Record<string, { title: string; description: string }> = {
    Thailand: {
      title: "Explore Thailand famous places",
      description: `Thailand, known as the "Land of Smiles," offers a captivating
      blend of rich cultural heritage, historical landmarks, and vibrant tourism.
      Bangkok features attractions like the Grand Palace and Wat Pho, alongside
      lively markets, street food, and nightlife. Chiang Mai is famous for its ancient
      temples, traditional crafts, and Wat Phra That Doi Suthep. Phuket and Krabi offer
      stunning beaches ideal for snorkeling and diving.`,
    },
    Brunei: {
      title: "Explore Brunei famous places",
      description: `Brunei is a small sultanate on the island of Borneo, known for its wealth, history, and deep
religious devotion that permeates every aspect of daily life. Despite its modest size, the country
holds cultural treasures and natural landscapes that surprise travelers: from lush rainforests to
calm rivers winding through traditional stilted villages.
Brunei’s history is rooted in centuries of sultans’ dynasties, evidenced by royal palaces and
lavish mosques, particularly the Sultan Omar Ali Saifuddien Mosque, an architectural jewel
embodying the country’s spirituality and prestige. Local markets and riverside villages tell the
story of a simple yet tradition-rich life, where ancient customs coexist harmoniously with modern
progress.
But Brunei is not only about history and culture: it is also about pristine nature. The tropical
forests of Ulu Temburong National Park offer trekking routes immersed in a silent green world,
home to rare animals and ancient plants. Rivers and coastal waters reveal rich and diverse
ecosystems, offering unforgettable wildlife observation and diving experiences.
Tourism in Brunei thrives on the combination of authenticity and hospitality: visitors can
experience the tranquility of traditional villages, admire Islamic art and architecture, explore
untouched forests and quiet rivers, all accompanied by discreet and refined hospitality. Visiting
Brunei means discovering a country that, though often off the beaten path, manages to enchant
and surprise with its elegance, spirituality, and the richness of its natural and cultural heritage.
`,
    },
    Cambodia: {
      title: "Explore Cambodia hidden gems",
      description: `Cambodia is a land that seems to hold the breath of time, where history intertwines with
spirituality and nature offers scenes of rare intensity. It is a country that strikes the heart with the
strength of its contrasts: the grandeur of Angkor’s ruins, which still recount the ancient
magnificence of the Khmer Empire, and the simplicity of rural life flowing slowly along rice fields
and rivers.
Angkor Wat, with its towers rising against the dawn sky, is more than an archaeological site: it is
a symbol of identity, a bridge between gods and humans, between past and present. Alongside
it, the temples enveloped by the centuries-old roots of Ta Prohm or the bas-reliefs of Bayon,
with their enigmatic faces, seem to still speak to those who pause to listen.
But Cambodia is not only the majesty of Angkor. It is the vibrancy of Phnom Penh, a city that
mixes sparkling pagodas with the painful memories of its recent history. It is the slow rhythm of
Tonlé Sap, a lake that nourishes and sustains millions of people with its floating villages. It is the
serenity of southern beaches, from Sihanoukville to still-pristine islands, where the sea blends
with the tranquility of nature.
Tourism in Cambodia offers intense and authentic experiences: from contact with Buddhist
spirituality in monasteries to local traditions preserved in villages, and to the energy of colorful
markets where a smile remains the sincerest gift. Despite the hardships of its history, the
Cambodian people have maintained an extraordinary capacity for resilience, hospitality, and
hope.
Visiting Cambodia means stepping into a story of ancient glory and renewal, of millennial
temples and smiling faces. A land that invites one to look beyond appearances, to discover the
hidden beauty in stones, landscapes, and in the soul of those who live there.
`,
    },
    India: {
      title: "Explore India famous places",
      description: `India is a land of contrasts and wonders, where the past coexists with the present in a unique
and captivating blend. A land of millennia-old empires, from the majestic Rajputs to the
Mughals, it preserves monuments that are true masterpieces of architecture and history: the Taj
Mahal in Agra, with its marble perfection, embodies eternal love, while the forts and palaces of
Rajasthan tell stories of wars, courts, and royal splendor.
But India is not just history: it is a kaleidoscope of landscapes that alternate between the snow-
capped Himalayas, the plains of the Ganges, the tropical forests of Kerala, and the desolate
beauty of the Thar Desert. Each region offers unique experiences: from the temples of
Khajuraho and Varanasi, where ancient religious ceremonies still mark the passage of time, to
the golden beaches of Goa, the coasts of Tamil Nadu, or the backwaters of Kerala, every corner
of India has its own rhythm and color.
Indian culture is a mosaic of traditions, languages, music, and dance. Festivals such as Diwali,
Holi, and Durga Puja transform cities and villages into explosions of light, sound, and color,
offering visitors an immersive and unforgettable experience. Its rich and varied cuisine is also
part of the journey: from the spicy curries of the north to the delicate rice and fish dishes of the
south, each bite tells stories of peoples and centuries of exchange.
Tourism in India draws its strength from its ability to surprise: from walks through the crowded
and lively alleys of historic cities, to excursions among mountains and sacred rivers, from
encounters with elephants in nature reserves to meditation in Buddhist monasteries. India is a
land that leaves a deep impression, capable of moving and fascinating anyone who ventures
there, always inviting the discovery of a new detail, a new face, a new secret hidden behind
every curve of its millennia-old history.
`,
    },
    Indonesia: {
      title: "Explore Indonesia famous places",
      description: `Indonesia stretches like an endless archipelago between Asia and Oceania, with over 17,000
islands that hold an unparalleled natural and cultural wealth. Each island tells a different story:
Bali, with its temples perched between rice fields and volcanoes, enchants visitors with ancient
rituals and artistic traditions passed down through generations; Java, the pulsating heart of
Indonesian history, hosts Borobudur and Prambanan, extraordinary witnesses of the Buddhist
and Hindu past, evoking the grandeur of civilizations that flourished centuries ago.
Indonesia is not just history, but a kaleidoscope of landscapes ranging from the golden beaches
of Lombok and the Gili Islands to the smoking volcanoes of Komodo, and the rainforests of
Sumatra, home to orangutans and rare tigers. Every corner of the country offers unique
experiences: diving among coral reefs of incomparable beauty, trekking through traditional
villages, and exploring vibrant markets where the colors and aromas of spices tell stories of
ancient trade.
Indonesian culture is equally fascinating: ritual dances, hand-carved masks, ikat and batik
textiles that tell local legends and ancestral identities. This heritage makes Indonesia a place
where the past coexists harmoniously with the modernity of cities like Jakarta and Surabaya,
offering travelers a variety of experiences ranging from adventure to contemplation.
Tourism in Indonesia thrives on its diversity: within a few hours, one can move from the spiritual
calm of Hindu temples to the adrenaline of an active volcano hike, from diving with giant manta
rays to relaxing on pristine beaches. It is precisely this combination of history, nature, and
culture that makes Indonesia a destination capable of surprising and captivating every visitor,
leaving an indelible impression that invites return, again and again.
`,
    },
    Laos: {
      title: "Explore Laos famous places",
      description: `Laos is like a river flowing slowly, silently, and deeply, far from the frenzy that characterizes
much of Southeast Asia. It is a country that seems to live outside of time, where Buddhist
spirituality permeates daily life and the rhythms of nature still dictate the pace of the days.
Its history is tied to the ancient Kingdom of Lan Xang, “the Land of a Million Elephants,” which
between the 14th and 18th centuries brought splendor and prosperity to these lands. Today,
traces of that past survive in the golden temples of Luang Prabang, a UNESCO heritage city
that enchants with its French colonial architecture, night markets, and monks in procession at
dawn. It is a place where tradition and memory intertwine harmoniously, telling the story of a
people who have preserved their identity.
But Laos is not only history. It is also unspoiled nature, with the Kuang Si waterfalls cascading
into turquoise pools, the mysterious caves of Vang Vieng, and sunsets over the Mekong that
offer rare tranquility. In the countryside, ethnic villages welcome travelers with simple and
authentic smiles, offering a direct glimpse into rural life and ancestral customs.
Tourism in Laos is a slow and intimate experience: here there are no crowded resorts or chaotic
cities, but atmospheres that invite contemplation. Its strength lies in the ability to provide an
inner journey, an authentic encounter with spirituality and nature. For this reason, Laos
captivates those seeking a different kind of travel, made of subtle emotions, silences that speak,
and landscapes that remain engraved in the heart.
In the end, Laos is a place where time does not run: it stretches, it is savored, and it
accompanies every step of those who choose to explore it.
`,
    },
    Malaysia: {
      title: "Explore Malaysia famous places",
      description: `Malaysia is a fascinating mosaic of cultures, landscapes, and traditions coexisting in harmony,
creating a country with a unique character. It is a land that unites modernity and authenticity: on
one hand, the sparkling skyscrapers of Kuala Lumpur, dominated by the iconic Petronas Twin
Towers; on the other, rural villages, ancient rainforests, and dreamlike islands kissed by crystal-
clear waters.
Its history is intertwined with trade routes that for centuries connected East and West. Ports
such as Malacca and Penang welcomed Arab, Chinese, and Indian merchants, leaving a legacy
of influences visible in architecture, cuisine, and customs. Even today, Malaysia is a cultural
crossroads where Muslims, Buddhists, Hindus, and Christians live side by side, making the
country an example of diversity and tolerance.
From a natural perspective, Malaysia offers scenes of rare beauty. Malaysian Borneo hosts
some of the oldest forests on the planet, home to orangutans, proboscis monkeys, and rare
species, while Mount Kinabalu rises as a symbol of adventure and spirituality. On the west
coast, Langkawi’s white beaches invite relaxation, while to the east, the Perhentian and Redang
islands attract sea lovers and divers.
Tourism in Malaysia finds the perfect balance: the modernity of its cities, pristine nature, the
charm of traditions, and the richness of a cuisine that blends Chinese, Indian, and Malay flavors.
Whether exploring a jungle, visiting an ancient temple, strolling through colorful markets, or
experiencing futuristic metropolises, every journey in Malaysia is intense and unforgettable.
Ultimately, Malaysia is a country that surprises because it contains multiple worlds: modern and
ancient, urban and natural, sacred and profane. A destination capable of offering each traveler a
different, yet always authentic and captivating, experience.
`,
    },
    Uzbekistan: {
      title: "Explore Uzbekistan famous places",
      description: `Uzbekistan is a land that tells ancient stories, where each city seems to guard the secrets of a
grand past. At the heart of the Silk Road, this land has seen empires, merchants, and cultures
flourish, intertwining East and West. Samarkand, with its legendary Registan Square and the
blue domes of its madrasahs, enchants with a perfect balance of art, architecture, and
spirituality. Bukhara, with its mosques, ancient bazaars, and quiet courtyards, transports visitors
to a suspended time, where caravanserais and merchants once traversed the same streets.
But Uzbekistan is not only history: it is a land of contrasts and stunning landscapes, from the
vast Kyzylkum steppes to rocky canyons, from tranquil lakes to the mountains of the Fergana
Valley. Each region offers unique experiences: strolling through colorful bazaars, tasting
traditional dishes such as plov, and meeting artisans who still work wood, ceramics, and textiles
as if time had never passed.
Uzbek culture is profound and welcoming: music, dance, poetry, and folk legends recount a
millennia-old tradition, while the spirituality of sacred sites, from mausoleums to minarets,
conveys a sense of respect and wonder. Local festivals and celebrations, with their colors,
sounds, and aromas, provide an authentic glimpse into daily life and ancient customs.
Tourism in Uzbekistan fascinates for its ability to unite past and present, adventure and
contemplation. Here, one walks the same streets as centuries of history, tastes flavors that tell
of distant journeys, and watches sunsets illuminate the domes of Samarkand and Bukhara with
golden reflections. Visiting Uzbekistan means immersing oneself in a world that preserves its
ancient soul, capable of moving anyone wishing to discover the hidden treasures along the Silk
Road.
`,
    },
    Vietnam: {
      title: "Explore Vietnam famous places",
      description: `Vietnam is a country that surprises with its vital energy and the contrasts that define it. It is a
long and narrow land, suspended between the South China Sea and the mountain ranges,
revealing itself as a mosaic of landscapes, cultures, and traditions. From the cosmopolitan
charm of Hanoi and Ho Chi Minh City, with their bustling streets full of motorbikes, markets, and
historic cafés, to rural villages where time seems to flow more slowly, Vietnam offers a journey
of diverse emotions.
Its history is made of conquests and resistance, royal dynasties, and struggles for
independence that have shaped a strong and proud identity. From the imperial remains of Hué,
an ancient and refined capital, to the pagodas and temples dotting its cities, the past coexists
with a dynamic present looking confidently toward the future.
Vietnam's nature provides spectacular scenery: Ha Long Bay, with its thousands of limestone
karsts rising from emerald waters, seems like a dream suspended between legend and reality.
The terraced rice fields of Sapa, cultivated for centuries by ethnic minorities, create a landscape
that speaks of harmony between man and nature. Along the Mekong Delta, life moves slowly
among canals, floating markets, and villages perched on the water.
Tourism in Vietnam thrives on the richness of these experiences: the genuine hospitality of its
people, the variety of a cuisine considered among the finest in Asia, and the constant
intertwining of tradition and modernity. Here, one can experience the intensity of a major city as
well as the tranquility of a fishing village, explore ancient temples, or lose oneself in the natural
wonders that make the country one of Southeast Asia's most complete destinations.
Vietnam is, ultimately, a journey of continuous discovery—a place that fascinates and captivates
because it contains, in a single land, the power of history, the beauty of nature, and the vitality
of a people who never cease to renew themselves.
`,
    },
    Singapore: {
      title: "Explore Singapore famous places",
      description: `Singapore is a dazzling city-state where modernity meets tradition in perfect harmony. Known as 
the "Lion City," this island nation has transformed from a humble fishing village into one of the 
world's most dynamic financial and cultural hubs. Its skyline, dominated by the iconic Marina Bay 
Sands and the futuristic Gardens by the Bay, showcases cutting-edge architecture that seems to 
defy imagination.
Yet beneath its gleaming surface, Singapore preserves a rich tapestry of heritage. Chinatown's 
ornate temples and bustling markets, Little India's vibrant colors and aromatic spice shops, and 
Kampong Glam's historic mosques tell stories of the diverse communities that have shaped this 
nation. The Peranakan culture, a unique blend of Chinese and Malay traditions, adds another 
layer of cultural richness evident in architecture, cuisine, and customs.
Singapore's culinary scene is legendary. From world-renowned hawker centers serving 
affordable local delicacies like Hainanese chicken rice and laksa, to Michelin-starred restaurants 
offering innovative fusion cuisine, the city caters to every palate. Food is more than sustenance 
here—it's a national passion and a unifying cultural force.
Nature lovers will find unexpected treasures: Sentosa Island's beaches, the lush greenery of 
Botanic Gardens (a UNESCO World Heritage Site), and the otherworldly Supertree Grove that 
comes alive at night with spectacular light shows. The Singapore Zoo and Night Safari offer 
world-class wildlife experiences.
Tourism in Singapore thrives on this unique combination: world-class shopping on Orchard Road, 
family entertainment at Universal Studios, serene walks through heritage neighborhoods, and 
endless culinary adventures. Clean, safe, and efficiently connected, Singapore welcomes visitors 
with warmth and delivers experiences that blend the best of East and West.
`,
    },
  };
  const getCountry = useCallback(async () => {
    try {
      if (!country) {
        return
      }
      const countryRes = await api.tour.getTour({ country })
      if (countryRes.code === 2000) {
        setCountryItem(countryRes.data)
      }
    } catch (err) {
      console.error(err)
    }
  }, [country])

  useEffect(() => {
    void getCountry()
  }, [getCountry])
  const data = country ? content[country] : null;
  return (
    <div>
      <HeroLayout className="!bg-[left_0px_top_-130px]" />
      <div className="container mx-auto px-4 py-8 md:px-0 md:pt-24 md:pb-32 flex h-max flex-col items-center gap-32">
        {data ? (
          <>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl md:text-4xl mb-9">{data.title}</h3>
              <p className="font-light text-2xl text-[#585858] leading-relaxed">
                {data.description}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-28">
              {countryItem && countryItem.length > 0 ? (
                countryItem.map((item, i) => (
                  <TourCard wishlist={item} key={i} />
                ))
              ) : (
                <p className="col-span-3">No tours available.</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-3xl mb-6 text-gray-600">
              Select a country to explore
            </h3>
          </div>
        )}
      </div>
      <JoinNewSletter />
    </div>
  );
};

export default page;
