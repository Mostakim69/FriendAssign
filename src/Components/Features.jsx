import React from 'react';
import Marquee from 'react-fast-marquee';
import { Typewriter } from 'react-simple-typewriter';

const steps = [
  {
    id: 1,
    title: 'Choose Your Plan',
    description:
      "Connect with others who share your passions, from painting to sports. Join groups to discuss, engage in events, and build community.",
    imageUrl: 'https://i.postimg.cc/1t6fdv1K/d8fc99427c300f4ebb3899eacec8c3fe.jpg',
  },
  {
    id: 2,
    title: 'Learn. Share. Grade. Together.',
    description:
      "A platform for group study where students learn, share assignments, and give feedback in a collaborative space.",
    imageUrl: 'https://i.postimg.cc/PqBrNbTW/fe0fb0db0df9755b58118d7f7b064243.jpg',
  },
  {
    id: 3,
    title: 'Team Up for Smarter Learning.',
    description:
      "Collaborate in groups to share knowledge, complete assignments, and stay motivated for better learning outcomes.",
    imageUrl: 'https://i.postimg.cc/VkgCSVVj/09e5217b239e3ddcb202de80f4699465.jpg',
  },
];

const Features = () => (
  <section className="py-8 sm:py-12 lg:py-16 ">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-4 ">
        <Typewriter
          words={["Here's How It Works", 'Only 3 Simple Steps', 'Get Started Now!']}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>
      <p className="text-center font-semibold mb-6 sm:mb-8 lg:mb-10 text-base sm:text-lg lg:text-xl">
        New Assignment Released Daily
      </p>
      <Marquee speed={50} pauseOnHover>
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center mx-4 sm:mx-6 lg:mx-10 w-64 sm:w-72 lg:w-80"
          >
            <img
              src={step.imageUrl}
              alt={step.title}
              className="h-40 sm:h-44 lg:h-48 w-auto object-contain rounded-xl mb-4"
            />
            <h3 className="text-lg sm:text-xl font-medium mb-2 text-base">{step.title}</h3>
            <p className="text-xs sm:text-sm text-base">{step.description}</p>
          </div>
        ))}
      </Marquee>
    </div>
  </section>
);

export default Features;