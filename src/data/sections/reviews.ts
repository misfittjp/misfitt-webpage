// src/data/sections/reviews.ts

export interface Review {
    id: string;
    name: string;
    location: string;
    date: string;
    text: string;
    image: string;
    duration: "8h" | "7h" | "6h";
}

// Social Proof統計情報
export const reviewStats = {
    badge: {
        en: "The Highest Rated Experience.",
        ja: "最高評価の体験"
    },
    tagline: {
        en: "Uncompromised Quality. 100% Five-Star Experiences.",
        ja: "妥協なき品質。100%五つ星体験。"
    },
    acclaim: {
        title: {
            en: "Kind Words",
            ja: "Kind Words"
        },
        sub: {
            en: "6000+ Happy Guests. From all over the world.",
            ja: "世界中から6,000人以上のゲストをお迎えしました。"
        }
    }
};

// Hero Quote（Tonyの象徴的な引用）
export const heroQuote = {
    en: {
        text: "He is Tokyo. Don't second think this experience. Do it!",
        author: "Tony, USA"
    },
    ja: {
        text: "彼は東京そのものだ。迷う必要はない、体験すべきだ。",
        author: "Tony, USA"
    },
    image: "https://a0.muscache.com/im/pictures/user/106691456/original/b34336c5-412e-4402-9844-399042236e76.jpg?im_w=profile_large"
};

export const guestReviews: Review[] = [
    {
        id: "8h_1",
        name: "Tony",
        location: "Miami, FL",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/106691456/original/b34336c5-412e-4402-9844-399042236e76.jpg?im_w=profile_large",
        duration: "8h",
        text: "Fantastic experience, really really amazing. He is Tokyo. Don’t second think this experience. Do it!"
    },
    {
        id: "8h_2",
        name: "Julia",
        location: "Indonesia",
        date: "Oct 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Our private tour w/ Yuichi was an absolute highlight of our trip. He is not ur average tour guide; his passion and expertise made our day truly special. Yuichi's knowledge is incredible, effortlessly spanning from ancient history to modern pop culture and even the latest trending snacks! The conversation nvr stopped flowing, especially since we shared a mutual love for movies and anime. He took us to amazing local spots and hidden gems we never would have found on our own, happily and patiently answering all of our questions. What truly sets Yuichi apart is his exceptional kindness and flexibility. When a member of our group had shoe trouble, slowing us down, Yuichi didn't just adjust the pace; he graciously extended our tour by an extra hour to ensure we saw everything on our itinerary. He even went above and beyond to help us purchase new sandals. This level of service is rare and was so deeply appreciated. He is the most well-prepared and thoughtful guide I have ever met. Thank you!"
    },
    {
        id: "8h_3",
        name: "Chanel",
        location: "USA",
        date: "Aug 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Stop what you’re doing. Book Yuichi right away before someone else does! I absolutely loved his experience. I loved it so much I booked it twice in the same week so I could keep exploring. Yuichi is an extremely talented, knowledgeable, unique and thoughtful tour guide. He listens to your interests, he curates a unique experience based on your feedback and will continue to refine until he’s found all the unique customized gems for you to explore. He also is extremely hospitable and thinks about everything you need. My tour was on the hottest day recorded in Japan history. Yuichi had handheld ice packs, portable fans with an AC feature, electrolytes and towels. I was ambitious about what I wanted to see. Yuichi curated a day full of deep history, dashes of pop culture and stops that were tailored to my favorites (candles, merchant shops). What a rich experience filled with culture, kindness and creativity. Yuichi is incredible. This trip changed my life."
    },
    {
        id: "8h_4",
        name: "Nicholas",
        location: "Charlotte, NC",
        date: "Nov 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Spending the day in Tokyo with Yuichi was amazing. It felt like exploring the city with a friend who knows every hidden gem. We walked nearly 28,000 steps but never felt rushed — he planned everything perfectly so we could see and experience as much as possible. Yuichi picked incredible food stops: tender Wagyu beef, top-grade bluefin sashimi, one of the best bowls of ramen I’ve ever had, and even sorbet tucked away in a cool department store. He’s so knowledgeable about Tokyo’s history and both Shinto and Buddhism, and he explained everything in a way that really stuck. Everywhere we went, people greeted him with warmth and respect. He even taught me how to use the Suica card and subways. It was the perfect mix of culture, food, and real connection. 10/10 — Yuichi was fantastic. Truly hope our paths cross again one day."
    },
    {
        id: "8h_5",
        name: "Stephan",
        location: "Germany",
        date: "Aug 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Our Tokyo tour with Yuichi was absolutely unforgettable! From the moment we met, it was clear we were in great hands. He was incredibly knowledgeable about Tokyo’s history, culture, and hidden gems, and shared everything with such passion and attention to detail. Every stop felt thoughtfully chosen and perfectly timed. What stood out the most was how friendly and patient Yuichi was especially with our 8-year-old twins. He went out of his way to make sure my child felt included, engaged, and entertained throughout the entire experience. As a parent, I deeply appreciated the care and kindness he showed. Yuichi was also extremely well-prepared, organized, and always on time, which made the whole day run smoothly and stress-free. We learned so much and had a fantastic time it truly felt like exploring Tokyo with a local friend who genuinely cared. Highly, highly recommend this experience to anyone visiting Tokyo. Thank you, Yuichi, for making our trip so special!"
    },
    {
        id: "8h_6",
        name: "Doug",
        location: "Los Angeles, CA",
        date: "Aug 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Yuichi did a great job giving me, my wife and 15yo son a tour of some highlights of Tokyo. He asked lots of great questions before the tour to help customize it to our interests. Yuichi not only showed us the major landmarks but also showed us some of his favorite spots, like great Kobe beef and tuna stalls and an amazing donut shop. He also came well prepared for the heat with a handy fan for us to use and candy to keep our energy up. Yuichi has a wealth of knowledge about the history of Japan and Tokyo and provided a good balance of information with the tour. Overall a really great experience and a perfect introduction to Tokyo on my first visit."
    },
    {
        id: "8h_7",
        name: "Gregg",
        location: "Washington, DC",
        date: "Mar 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Couldn’t have found a better guide. Tokyo is a huge place and overwhelming. Yuichi helped us plan several key places to visit that was a great mix of kid and adult interests. He was amazing to talk to and his overall insights throughout the trip on cultural and historical things from as simple as why there’s no trash can’s everywhere in public, to the cultural significance of Japanese modernization/struggles during the Meeiji period were awesome. He also helped moderate the pace as our kids (7 and 10) began to fade at the end of the day, and ensured we got to the right train home. I only wish I could afford to have him every day. He felt like part of the family by the end of the day. Would highly recommend to everyone for day one to get comfortable and explore more than you would on your own with such great context. Too many great things to say!"
    },
    {
        id: "8h_8",
        name: "Tammy",
        location: "Pleasanton, CA",
        date: "Mar 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Truly the best guide in Tokyo!! Yuichi was amazing and I can’t imagine a better first day in Tokyo. He taught us how to use the subway, showed us so much delicious food, created a detailed and unique itinerary tailored to our very specific interests, helped us learn Japanese phrases and customs and SO much more. He really listens and understands his guests and goes above and beyond to give them the best experience possible. He is so thoughtful and helpful and we felt completely taken care of. We would absolutely book this again and we recommend Yuichi to everyone!! Don’t miss out on this opportunity! Thank you so much Yuichi, we so appreciate all of your hard work to make our day perfect. Wish I could give more than 5 stars!"
    },
    {
        id: "8h_9",
        name: "Lara",
        location: "Pleasanton, CA",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Our family of four had our best day with Yuichi in Tokyo. He met us at our hotel and took us throughout the east side of Tokyo. We visited the fish market and tried unbelievable waygu beef and delectable tuna sashimi. We visited a nearby shrine, the Imperial Palace and its gardens, we visited a samurai grave in the middle of the city that is over 1,000 years old, and made it to Roppongi Hills skyscraper in time for the sunset. Throughout the day, Yuichi taught us about Japan’s history, stories of faith, lore, and Samurai culture, the first Shogun and his descendants, all while answering our questions and taking us throughout the Tokyo subway system. Yuichi is an incredibly kind and knowledgeable guide whose love of his country and its rich history is evident in his enthusiasm to share it. We would highly recommend Yuichi and his guided tour to anyone interested in seeing Tokyo through a local’s eyes and perspective. Thank you, Yuichi!"
    },
    {
        id: "8h_10",
        name: "Meghan",
        location: "USA",
        date: "Jun 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Book the tour! Our family had the most wonderful day with Yuichi with our teen proclaiming it the “best day of [their] life”. Yuichi went above and beyond in every sense. He was so knowledgeable about historic sites and showed us the hidden details you won’t get by reading a book, but he was also well versed on fashion and pop culture. He showed us real life spots from our favorite anime, found our teen great spots for fashion and anime shopping, and brought us to hidden spots for delicious food. He was so patient and friendly and spent way beyond the expected end time of our tour. He thought about little details like having a towel to dry our hands, a bag for trash, and shared his expertise on navigating public transit. Yuichi is a truly outstanding guide and person and will create an unforgettable experience for your family. I know he did for ours! We are so grateful to him for this one of a kind day!"
    },
    {
        id: "8h_11",
        name: "Esther",
        location: "Modesto, CA",
        date: "Jun 2025",
        image: "https://a0.muscache.com/im/pictures/user/user/9371759b-134d-4467-979a-167825838048.jpg?im_w=profile_large",
        duration: "8h",
        text: "Yuichi was wonderful! We had a blast seeing all the sights. Yuichi built in lots of spots that were featured in JJK for our kids and they were amazed. Yuichi was super patient as we were traveling with young children and he really made our trip special. He was helped us buy items, helped us learn the customs and thought of everything to give us a unique and personal experience. Our kids loved him and really appreciated the time he spent with us. We have friends visiting next year and we will highly encourage them to book time with Yuichi!"
    },
    {
        id: "8h_12",
        name: "Riley",
        location: "Calgary, Canada",
        date: "Jun 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        text: "We were on a guys trip and booked Yuichi for our first day in Tokyo to show us around. At first we didn’t think we would get value out of the reservation as we could navigate the city already. But he was very adaptable and took us to parts of the city we would have never experienced and we really appreciated everything he showed us. Totally worth the price of admission! Great guide and great host. Highly recommended."
    },
    {
        id: "8h_13",
        name: "Erica",
        location: "Berkeley, CA",
        date: "May 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        text: "Having Yuichi guide me and my 16-year old nephew on our first full day in Tokyo was the best decision! First Yuichi got us set up with a subway pass that we used for the rest of our trip. I would have never figured that out on my own. Number 1 on my nephew’s list was visiting spots from his favorite anime and video games. Yuichi knew everything about them and it was so great to see my nephew engaged and interested. Yuichi is passionate about Japanese history and culture, and sharing it with others. We stopped at a number of places throughout the day that have historical significance. At the end of our time, Yuichi sent links to restaurants and other places to go on our own. Definitely experience Tokyo with Yuichi!!!"
    },
    {
        id: "8h_14",
        name: "Erin",
        location: "Denver, CO",
        date: "May 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        text: "We spent our first day in Japan with Yuichi—and we are so happy we did! Our family loved our day with Yuichi! He not only took us on a great guided tour of the city, he also helped us learn and understand important logistical and cultural aspects. He made Japan come alive for us and made us feel more comfortable (and even more excited) for our next two weeks here. From a fantastic food experience in Tsukiji market, to shrines (and shrine etiquette!) and history/culture to Harajuku and more, we couldn’t have been happier. We also really appreciated him recommending restaurants and fun things to do (and where). Thank you Yuichi! PS He was also great with our two kids (7 and 12)."
    },
    {
        id: "8h_15",
        name: "Dana",
        location: "Greeley, CO",
        date: "May 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        text: "Yuichi was a wonderful guide and quick formed friend. We are a family of six from the United States with two parents and four teenagers. He really catered to our needs and was extremely patient throughout the entirety of the tour. He never rushed us, he answered questions, he was always attentive to our needs and helpful. We scheduled our tour on the morning after having arrived just the night before and it was a great way to introduce ourselves to such a massive city that we knew very little about. Yuichi also left us with multiple recommendations of things to do in the following days, all of which were helpful and worthwhile. Thank you, Yuichi!"
    },
    {
        id: "8h_16",
        name: "Alan",
        location: "Casas Grandes, Mexico",
        date: "May 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        text: "\"Our experience with Yuichi was truly wonderful. Right from the start, he took us to enjoy the best sashimi of our entire trip in Japan, along with unforgettable yakiniku and oysters that blew us away. The kids had so much fun at the arcades, and we left Akihabara thrilled with everything we found. Yuichi is someone who genuinely cares, he listened to what we wanted and crafted a tour that felt just right for us."
    },
    {
        id: "8h_17",
        name: "Maggie",
        location: "Cape Town, SA",
        date: "Apr 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        text: "Do this! You will have a tailor-made experience, at your pace and in the style that you prefer. Yuichi is an experienced, educated and enthusiastic tour guide. He never stops giving you information (think history, current events, social norms, etiquette). We emerged tired, but more confident about interacting with Japanese society in a respectful manner. I cannot recommend this tour and guide enough. If there was an option for more starts, I would give it."
    },
    {
        id: "8h_18",
        name: "Amy",
        location: "Charlotte, NC",
        date: "Apr 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        text: "I have taken other individualized tours in other cities but none compares to Yuichi's diligence, professionalism and hospitality. He went above and beyond in customizing a full day for us and hosting our party of 4 including two teenagers. Every stop was  His communication before and during the trip was awesome and he even provided recommendations for our remaining time in Tokyo. Truly beyond five stars!!"
    },
    {
        id: "8h_19",
        name: "Natalie",
        location: "San Antonio, TX",
        date: "Apr 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        text: "Our day in Tokyo with Yuichi was incredible. He helped us plan out a day according to what we wanted to see, but filled with his recommendations. Yuichi had tons of connections everywhere we went and he used those to help us have a great experience. He was very knowledgeable and when our plan got messed up, he was super flexible and helped us find the best audibles - he even hung out with us an extra hour before heading off to his next tour."
    },
    {
        id: "8h_20",
        name: "Jennie",
        location: "USA",
        date: "Apr 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        text: "we loved our tour! he made a fun and family friendly itinerary. looking back on our trip, we would've hired him for more than one day. we learned a lot about Japanese culture and ate some fantastic food. all his recommendations were delicious. he even recommended additional restaurants for us to visit after the tour. we were also impressed by his excellent photography skills. this tour was a highlight of our trip!"
    },
    {
        id: "8h_21",
        name: "Halli",
        location: "Camarillo, CA",
        date: "Feb 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        text: "We had an amazing experience with Yuishi-san on our guided tour! He tailored the itinerary to our specific interests and needs, making the day both informative and fun. His deep knowledge of Tokyo and its culture added so much to our experience, and he even provided us with a wealth of recommendations and links for places to visit during the rest of our trip. Whether it’s your first time in Tokyo or your tenth, we highly recommend Yuishi-san for an insightful and personalized tour. A fantastic guide who truly enhances your travel experience!"
    },
    {
        id: "8h_22",
        name: "Josh",
        location: "USA",
        date: "Jan 2025",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        text: "We had the pleasure of experiencing a guided walking tour in Tokyo with Yuichi and it was phenomenal. Yuichi’s warmth, professionalism and deep knowledge made the day unforgettable. The tour included breathtaking views from the Tokyo Metropolitan Government Building, exploring Shinjuku’s hidden gems and a visit to Sensō-ji in Asakusa, where Yuichi’s storytelling brought the temple’s history to life. Lunch at his favorite ramen spot was a highlight—definitely try the soy sauce base! We also explored Akihabara Electric Town, tailored perfectly to our interests in anime, gaming and tech. Yuichi’s friendliness and excellent communication ensured everyone felt included. He went above and beyond, customizing the tour to our preferences. If you’re looking for a passionate, knowledgeable guide who truly cares about your experience, Yuichi is the one. This tour was a highlight of our trip to Japan and we highly recommend it!"
    },
    {
        id: "8h_23",
        name: "Julianna",
        location: "USA",
        date: "Dec 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        text: "My family is of 5 had an amazing personalized tour with Yuichi for our first day in Tokyo. Weeks before the trip, Yuichi worked with me to plan an itinerary that would meet all of the interests of our diverse group. He is well versed in ancient and modern Japanese history, religion , current events as well as food, youth culture, and fashion. We were able to see many more sites on and off the beaten path with Yuichi than we would have on our own. Would definitely recommend Yuichi - the tour is a great value and experience!"
    },
    {
        id: "8h_24",
        name: "Erin",
        location: "USA",
        date: "Dec 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        text: "Yuichi took my somewhat chaotic requests for things we wanted to see/do in Tokyo and turned it into an incredible day with sooo many different experiences, things I never would have known to see or look for, gave us so many recommendations as well. He also combined it with his deep personal knowledge of Tokyo and fantastic story telling, and we got so much more out of seeing major historical and cultural sites than we would have otherwise. He even incorporated anime/manga related sites I never would have known to go to on my own. He also took great photos of us to boot! I highly highly recommend booking him for a personalized tour. Book him for your first day in Tokyo to get the most out of his additional recommendations, but even if you can’t, I still highly recommend doing a tour with him at any point in your Tokyo travels."
    },
    {
        id: "8h_25",
        name: "Clayton",
        location: "Toronto, Canada",
        date: "Dec 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        text: "Yuichi was amazing!! We had the pleasure of experiencing a personalized guided tour in Tokyo and it was outstanding. Yuichi was very personable, knowledgeable and was a wonderful host. Yuichi worked with me in advance to plan an itinerary that was specific to our interests. This experience was a highlight of our trip to Japan including my (2) young children enjoying the entire day!"
    },
    {
        id: "8h_26",
        name: "Asher",
        location: "Victoria, Canada",
        date: "Dec 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        text: "We had a wonderful day with Yuichi! He was super knowledgeable and took us to many spots we liked in Tokyo. I'd highly recommending hiring him. He went above and beyond, even making a couple phone calls for us over lunch to places/people we had been trying to contact but couldn't because of the language barrier. Having an expert take us through the city he grew up in made our time in Tokyo much better. And he had great recommendations for our days without him."
    },
    {
        id: "8h_27",
        name: "Stacy",
        location: "Austin, TX",
        date: "Nov 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        text: "Yuichi is probably among the very best tour guides in the city. He created a plan based on what we wanted to see and avoided those we had already visited. He pointed out historic sites, shared cultural insights, recommended various restaurants, and immersed us in them Tokyo he knows. It was a wonderful experience from end to end starting with helping us get cost-effective train passes to personally bringing us back by rail and on foot to the door of our hotel. We cannot recommend Yuichi enough. A truly extraordinary experience!"
    },
    {
        id: "8h_28",
        name: "Laurel And Sokhyon",
        location: "Long Beach, CA",
        date: "Nov 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        text: "Yuichi is the BEST! I write this as someone who did zero planning. My wife, parents, and my six year old son went to Tokyo with less than a month’s planning just cause we wanted to squeeze it in before heading to Seoul. We knew NOTHING! First thing he did was meet us at our Hotel and helped us get subway passes and we were off and running. We had two days and one evening tour with Yuichi and we covered so much ground. We saw all the things we wanted on our list and some. Yuichi is extremely knowledgeable and a master of the subway system in Tokyo along with all the sights and understanding of the history of everything that is Japan and Tokyo. He went above and beyond in many aspects of the day like stopping for us to buy a Nintendo Switch in the middle of the day and setting it up for our son. Also when he didn’t have a night tour booked the same day he spent extra time with us."
    },
    {
        id: "8h_29",
        name: "Andrew",
        location: "Washington, DC",
        date: "Oct 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        text: "Yuichi's walking tour was absolutely outstanding. It is impossible to think of a way to improve. He messaged weeks before asking what we liked and then tailored a PERFECT tour based on things that interested us. He was very thoughtful and knew a ton about all the topics that were of interest to us. He took us to famous sites as well as sites off the beaten path that we would have never found. We felt like we saw so much of Tokyo (but also only a fraction) in just one day. Even throughout the tour and afterwards, he sent us so many suggestions of places we could go back to and visit that we just didn't have time to visit. Yuichi is the best and it is a mistake to look elsewhere!"
    },
    {
        id: "8h_30",
        name: "Ingmar",
        location: "Amsterdam, Netherlands",
        date: "Sep 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        text: "Our day with Yuichi was everything we hoped it would be and more. Yuichi is thoughtful, friendly, energetic and accommodating. He personalized the day for us, so we got everything out of it that we wanted. I highly recommend Yuichi if you’re looking to get more out of your time in Tokyo than you could on your own - whatever that means to you."
    },
    {
        id: "8h_31",
        name: "Kristin",
        location: "Mineola, NY",
        date: "Aug 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        text: "Yuichi was an amazing tour guide and left us feeling like we had accomplished so much when seeing the sights in Tokyo. His knowledge and personalization knows no bounds and he kept the tour tailored to our interests. If you are traveling to Tokyo and considering booking a tour, look no further than Yuichi. He will exceed your expectations, as he did for my husband and I."
    },
    {
        id: "8h_32",
        name: "Catherine",
        location: "Beaverton, OR",
        date: "Aug 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        text: "I cannot recommend this experience enough. We did this on our first full day in Tokyo. Yuichi planned a perfect itinerary and made adjustments for the heat. He shared a lot of the local history as well as more recent fun facts. The vibe was perfect, relaxed and fun but fitting in everything we had wanted to see. He took extra time to help us learn the different train/metro system and went past the time to help us get to our station. He helped us gain the confidence to navigate Tokyo on our own. In addition, he helped point out spots we could visit later on our trip. This experience is one hundred percent worth it. Yuichi’s passion for Tokyo is contagious and it is evident how much work he has put in to be a top notch guide. Thank you so much!!!"
    },
    {
        id: "8h_33",
        name: "Laura",
        location: "Birmingham, AL",
        date: "Jul 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        text: "Yuichi is a terrific and very professional guide. He was very accommodating and is becoming an expert at leading tours in the intense summer heat, with thoughtful stops for cooling off. He even was handing us electrolytes lozenges, which was so helpful. If you head out in summer I advise bringing umbrellas like the locals- you will have a much better time. Yuichi is excellent and highly recommended by my family- we spent 2 full days with him, one on either end of our trip. Many thanks for sharing your city with us, Yuichi!"
    },
    {
        id: "8h_34",
        name: "Soo",
        location: "Cedar Park, TX",
        date: "Jul 2024",
        duration: "8h",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        text: "Yuichi-San is a Tokyo native and it showed in his tailored tour of Tokyo. He was very careful to make sure he knew our group before meeting us to tailor our tour to our interests. He was very upfront with what we needed to be prepared for in terms of how much walking we would be doing in the summer heat of Tokyo. He was very engaging and had wealth of information about Tokyo! He took us to eat at wonderful places which was important to us and we learned a lot about the history of Tokyo and got a good layout of the various neighborhoods of Tokyo so that the remainder of our time in Tokyo was really enjoyable. He is professional and yet very personable."
    },
    {
        id: "8h_35",
        name: "Hwee Ngoh",
        location: "Singapore",
        date: "Nov 2023",
        image: "https://a0.muscache.com/im/pictures/user/user/9371759b-134d-4467-979a-167825838048.jpg?im_w=profile_large",
        duration: "8h",
        text: "Yuichi is a great tour guide and that is the best thing I did for our first trip to Tokyo. If you want a good tour guide in Tokyo, don't look any further other than Yuichi. You won't regret it. He knows the local sh!t and vibed right of the bat."
    },
    {
        id: "8h_Guillermo",
        name: "Guillermo",
        location: "Miami, FL",
        date: "Oct 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        duration: "8h",
        text: "Fantastic experience, really really amazing. He is Tokyo. Don’t second think this experience. Do it!"
    },

    // ==========================================
    // --- 7-HOUR EXTENDED SESSION (Converted from 6h) ---
    // ==========================================
    {
        id: "7h_1",
        name: "Kelvin",
        location: "San Francisco, CA",
        date: "Jan 2026",
        image: "https://a0.muscache.com/im/pictures/user/b63295c5-2529-4941-980b-68233e0a9726.jpg?im_w=profile_large",
        duration: "7h",
        text: "We had an amazing experience with Yuichi and could not have asked for a better guide in Tokyo. He created a custom plan for our day and made sure we saw everything we wanted plus much more we never would have found on our own. The tour genuinely made our trip. Yuichi has a deep connection with Tokyo and it really shows. He gave us real local insight and helped us understand how to get around, which felt daunting before we met him but became easy thanks to his guidance. He also saved us from making classic tourist mistakes and helped us make much better choices for the rest of our trip, which added real value."
    },
    {
        id: "7h_2",
        name: "Joseph",
        location: "Long Beach, CA",
        date: "Jun 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Best decision of our Tokyo trip! Yuichi is fun, smart, and thoughtful—like exploring with a local friend who knows all the coolest spots. Don’t miss it! He’s incredibly fun, knowledgeable, and thoughtful — the kind of guide you wish existed in every city. He planned a perfect day mixing culture, food, pop culture, and hidden gems. Every detail was dialed in, from timing and train routes to local customs and small touches that made the experience smooth and unforgettable. It felt like being shown around by a local friend who just happens to be an expert. A big WOW experience. Highly recommend. 100 out of 10. 🤩"
    },
    {
        id: "7h_3",
        name: "Christoph",
        location: "Park City, UT",
        date: "Jun 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        duration: "7h",
        text: "What a great day! Yuichi was such a great guide and he was having as much fun as we were. He took us to a ton of insider spots all over Tokyo. Highly recommend this as a way to get oriented in this city. He knows all the cool spots that only locals go to."
    },
    {
        id: "7h_4",
        name: "Stephanie",
        location: "Seattle, WA",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        duration: "7h",
        text: "We really enjoyed our tour! It was well paced and we appreciated getting the history of Tokyo and relevant cultural insights to help us navigate during our entire trip. Thanks also for the great food recommendations!"
    },
    {
        id: "7h_5",
        name: "Hunter",
        location: "Atlanta, GA",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Yuichi is an excellent tour guide. He knows and loves Tokyo and was great for suggesting an itinerary and also letting us adjust it as we went. He also stayed late with us to make sure we made it to the end of the journey."
    },
    {
        id: "7h_6",
        name: "Katie",
        location: "Detroit, MI",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Yuichi gave us an awesome tour! He led us to the best sashimi and wagyu we have ever had, indulged my newfound love of gachapon, and customized the end of our tour by taking us directly to our dinner reservation. Communication was effortless!"
    },
    {
        id: "7h_7",
        name: "Vivek",
        location: "San Francisco, CA",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Our family had a great time on the tour with Yuichi. It was a great way to kick off our stay in Tokyo. He is knowledgeable and friendly and customized the tour to suit us well."
    },
    {
        id: "7h_8",
        name: "Greg",
        location: "Bellingham, WA",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Yuichi was great! We covered everywhere we wanted to see, he gave us great stories and history. Well worth the money and highly recommend him for a tour!"
    },
    {
        id: "7h_9",
        name: "Michael",
        location: "San Francisco, CA",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        duration: "7h",
        text: "He is amazing and fabulous tour! His knowledge about Tokyo and food places is bar none. Fabulous day and book him!"
    },
    {
        id: "7h_10",
        name: "Lana",
        location: "Boulder, CO",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Yuichi skillfully navigated the elements on a rainy day and created a wonderful day that we could not have had without him. We left with multiple recommendations for restaurants, shops and neighborhoods to explore."
    },
    {
        id: "7h_11",
        name: "Christopher",
        location: "Denver, CO",
        date: "Dec 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        duration: "7h",
        text: "This was an amazing tour! We were only in Tokyo for one night and Yuichi gave us a personalized tour specific to our interests. He was knowledgeable and provided so much insight to the city."
    },
    {
        id: "7h_12",
        name: "Michele",
        location: "Houston, TX",
        date: "Nov 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        duration: "7h",
        text: "Yuichi was an absolutely amazing tour guide! He made our first day in Tokyo unforgettable. His knowledge of the city was impressive, and he even helped us navigate the subway system and make dinner reservations."
    },

    // ==========================================
    // --- 6-HOUR STANDARD SESSION (Remaining) ---
    // ==========================================
    {
        id: "6h_3",
        name: "Rachel",
        location: "USA",
        date: "Oct 2025",
        image: "",
        duration: "6h",
        text: "Great start to our trip! Yuichi had lots of knowledge and we got a lot of steps! He showed us how to navigate the complicated metro system early in our trip which was a life saver."
    },
    {
        id: "6h_4",
        name: "Amanda",
        location: "Emsworth, UK",
        date: "Oct 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        duration: "6h",
        text: "We loved our day with Yuishi. He was interesting, knowledgeable and fun to be with. He had geared the tour around our various interests and took us to unusual places which only a local would know. His English was excellent and it helped no end that he had also spent a year living in the US. Nothing was too much trouble for him and we would do it all again. Thank you Yuishi"
    },
    {
        id: "6h_6",
        name: "Riley",
        location: "Calgary, Canada",
        date: "Jun 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "6h",
        text: "We were on a guys trip and booked Yuichi for our first day in Tokyo. At first we didn’t think we would get value as we could navigate already. But he was very adaptable and took us to parts of the city we would have never experienced. Totally worth it!"
    },
    {
        id: "6h_7",
        name: "Erica",
        location: "Berkeley, CA",
        date: "May 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Number 1 on my nephew’s list was visiting spots from his favorite anime. Yuichi knew everything about them. He is passionate about Japanese history and culture. Definitely experience Tokyo with Yuichi!!!"
    },
    {
        id: "6h_8",
        name: "Phil",
        location: "Orlando, FL",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/0d9a0937-4e2d-4ae8-826d-72fe828ae399.jpeg?im_w=profile_large",
        duration: "6h",
        text: "We had a great time with Yuichi! He really customized the day around our desires, and it was great to learn about the city as we toured. Definitely recommend!"
    },
    {
        id: "6h_9",
        name: "Colton",
        location: "Greensboro, NC",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi provides a great tour with intimate knowledge of each stop. This was our second time in Japan and we learned so much more on this trip because of this experience. Thanks Yuichi!"
    },

    {
        id: "6h_11",
        name: "Cyrus",
        location: "San Antonio, TX",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Amazing tour with Yuichi. He met us at the closest station to us and was very knowledgeable. He told us stories about each areas we went to and these stories will stay with me forever. Very informative and personable."
    },

    {
        id: "6h_13",
        name: "Tiffany",
        location: "New Orleans, LA",
        date: "Apr 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "6h",
        text: "We booked this tour for our first day in Tokyo! Yu showed us the best spots and taught us how to navigate the city! It was the best day and so helpful for the rest of our trip! Thank you Yu!"
    },


    {
        id: "6h_16",
        name: "Spencer",
        location: "Orlando, FL",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuchi went above and beyond to make our first day in Japan amazing. He has a wealth of historic knowledge as well as an awareness of what’s going on in the city day to day. Highly, highly recommend."
    },
    {
        id: "6h_17",
        name: "Candice",
        location: "Las Vegas, NV",
        date: "Mar 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Our guide, Yuichi, was fantastic. His storytelling and historical insights were top notch. We did this on the last day of our rather short trip, and he filled in as much of as our must see spots as he could. This was the highlight of our trip."
    },



    {
        id: "6h_21",
        name: "Olivia",
        location: "Menlo Park, CA",
        date: "Feb 2025",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        duration: "6h",
        text: "What a terrific guide! Yuichi was fantastic and we could not have had a better day in Tokyo! His deep knowledge of Tokyo and its culture added so much to our experience."
    },

    {
        id: "6h_23",
        name: "Michelle",
        location: "Nashville, TN",
        date: "Nov 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        duration: "6h",
        text: "We did a tour with our 4 teenage children, he was super patient and flexible and kept them engaged. He’s also a great photographer so we got a lot of great photos out of it too! So glad we booked this!"
    },
    {
        id: "6h_24",
        name: "Keston",
        location: "Houston, TX",
        date: "Nov 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi was amazing. My friends absolutely loved this walking tour as he was very helpful and did a great job showing what Tokyo is all about. 100% recommend it!"
    },

    {
        id: "6h_26",
        name: "Tomas",
        location: "Vilnius, Lithuania",
        date: "Oct 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi is the perfect guide to explore Tokyo. He's incredibly adaptable, customizing tours to suit your specific needs and preferences. An unforgettable experience!"
    },
    {
        id: "6h_27",
        name: "Melissa",
        location: "Grand Rapids, MI",
        date: "Oct 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi provided a fantastic tour of Tokyo. He showed us an excellent mix of iconic Tokyo sights but also some lesser known gems, complete with interesting history and context."
    },
    {
        id: "6h_28",
        name: "Justin",
        location: "Mill Valley, CA",
        date: "Oct 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi was prompt and professional. He was able to tailor a full day tour with very little input from us, and we were able to see a few off-the-beaten path parts of Tokyo."
    },

    {
        id: "6h_30",
        name: "Tony",
        location: "Oak Ridge, TN",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/e3e9ffd0-bb80-4a47-929a-c4a0535a6743.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Awesome experience! Tailored tour for my children since they like Anime. Had excellent recommendations for food and transportation. Couldn’t have asked for more!"
    },
    {
        id: "6h_31",
        name: "Jake",
        location: "Washington, DC",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/4eddb8ee-4555-440e-8457-a21afb788324.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi is thoughtful, friendly, energetic and accommodating. He personalized the day for us, so we got everything out of it that we wanted. I highly recommend him!"
    },
    {
        id: "6h_32",
        name: "Shelley",
        location: "Walnut Creek, CA",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/6c934375-7b56-429a-8a03-9d045d4c9826.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi was an extraordinary host. He personalized every detail of our tour and shared a wealth of knowledge. He has fabulous stories to bring Tokyo to life!"
    },
    {
        id: "6h_33",
        name: "Vivian",
        location: "Atlanta, GA",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/879e64f0-781e-4509-9189-9a67450e1811.jpeg?im_w=profile_large",
        duration: "6h",
        text: "We spent a great day here with Yuichi. He shared Japanese history, customs, the sights and even food recommendations. Fantastic start to our Tokyo experience."
    },
    {
        id: "6h_34",
        name: "Valentin",
        location: "Germany",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/71e05d03-e62e-4b68-8777-628d68969792.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Jeder Ort, den wir besucht haben, wurde mit viel Leidenschaft und Fachkenntnis präsentiert. Beeindruckt hat uns die Auswahl an authentischen Erlebnissen abseits der typischen Touristenpfade."
    },
    {
        id: "6h_35",
        name: "Brandon",
        location: "Jericho, NY",
        date: "Sep 2024",
        image: "https://a0.muscache.com/im/pictures/user/User/original/366e6c28-912b-478a-bb09-1786968d6978.jpeg?im_w=profile_large",
        duration: "6h",
        text: "Yuichi is an amazing tour guide! He went above and beyond to ensure we saw what was on our list. He provided us a list of recommendations for after our tour."
    }
];
// フィルター用エクスポート
export const highEndReviews = guestReviews.filter(r => r.duration === "8h");
export const extendedReviews = guestReviews.filter(r => r.duration === "7h");
export const standardReviews = guestReviews.filter(r => r.duration === "6h");
