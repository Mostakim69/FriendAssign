const Testimonials = () => {
    const cardsData = [
        {
            image: 'https://i.postimg.cc/Jzst9X1j/IMG-20241224-232711.jpg',
            name: 'Md Mostakim Hosen',
            handle: '@mostakim35',
            date: 'July 20, 2025',
            testimonial: 'This website’s Friend Assignment feature is absolutely fantastic! It made teamwork so much smoother and more enjoyable. Truly a game changer for our group projects.'
        },
        {
            image: 'https://i.postimg.cc/TYL6xJD2/c41ba2dada54a3fda672d9b5a377b7a5.jpg',
            name: 'Md Atikur Rahman',
            handle: '@atikurrahman8',
            date: 'June 10, 2025',
            testimonial: 'I’m really impressed with how intuitive and powerful the Friend Assignment tool is. It helped our team stay organized and collaborate effortlessly. Highly recommend it!'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Md Mahir Faisal',
            handle: '@faisal09',
            date: 'Septembar 5, 2025',
            testimonial: 'Assigning tasks to friends on this website has never been easier. The feature is so well designed and improved our project workflow dramatically! I love it!'
        },
        {
            image: 'https://i.postimg.cc/2jWsXSR3/36af73ef3cd451d1e60d45899ee15043.jpg',
            name: 'Sohana Tabbasum Mow',
            handle: '@sohana_mow',
            date: 'July 15, 2025',
            testimonial: 'I absolutely love the Friend Assignment feature! It made coordinating with my friends simple and efficient. Highly recommend this for any group work.'
        },
    ];

    const CreateCard = ({ card }) => (
        <div
            className="p-6 rounded-xl mx-4 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-80 shrink-0 flex flex-col"
            role="article"
            aria-label={`Testimonial by ${card.name}`}
        >
            <div className="flex items-center gap-3">
                <img
                    className="size-12 rounded-full object-cover border-2 border-indigo-100"
                    src={card.image}
                    alt={`${card.name}'s profile`}
                    
                />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-gray-900">{card.name}</p>
                        <svg
                            className="text-indigo-600"
                            width="14"
                            height="14"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <span className="text-sm text-gray-500">{card.handle}</span>
                </div>
            </div>
            <p className="text-base text-gray-700 py-4 leading-relaxed">{card.testimonial}</p>
            <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-1.5">
                    <span>Posted on</span>
                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                        aria-label="View post on X"
                    >
                        <svg width="12" height="11" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z"
                                fill="currentColor"
                            />
                        </svg>
                    </a>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-row {
                    position: relative;
                    overflow: hidden;
                }

                .marquee-inner {
                    animation: marqueeScroll 30s linear infinite;
                    display: flex;
                    min-width: 200%;
                    will-change: transform;
                }

                .marquee-inner:hover {
                    animation-play-state: paused;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }

                @media (max-width: 640px) {
                    .marquee-inner {
                        animation-duration: 20s;
                    }
                    .w-80 {
                        width: 70vw;
                    }
                }
            `}</style>

            <section className="py-12 ">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 bg-clip-text drop-shadow-xl animate-pulse">What Our Users Say</h2>
                    <div className="marquee-row">
                        <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
                        <div className="marquee-inner pt-6 pb-4">
                            {[...cardsData, ...cardsData].map((card, index) => (
                                <CreateCard key={`${card.handle}-${index}`} card={card} />
                            ))}
                        </div>
                        <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
                    </div>
                    <div className="marquee-row mt-8">
                        <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
                        <div className="marquee-inner marquee-reverse pt-6 pb-4">
                            {[...cardsData, ...cardsData].map((card, index) => (
                                <CreateCard key={`${card.handle}-${index}-reverse`} card={card} />
                            ))}
                        </div>
                        <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;