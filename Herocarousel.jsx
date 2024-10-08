
"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imgSrc: "/Home.webp",
      title: (
        <>
          <span className="text-[#1F2456] font-extrabold">Your Brand, </span>
          <span className="text-[#808EAB]">Our Strategy, </span> <br />
          <span className="text-[#F89522] font-extrabold mt-10 block">Ultimate Growth</span>
        </>
      ),
      description:
        "Boost your brand's online presence with our comprehensive digital marketing services. We tailor strategies to meet your business goals.",
    },
    {
      imgSrc: "/googleads.webp",
      title: (
        <>
          <span className="text-[#1F2456] font-extrabold">Google Ads </span>
          <span className="text-[#F89522]">Management</span>
        </>
      ),
      description:
        "We specialize in managing Google Ads campaigns for hotels, driving targeted traffic and increasing direct bookings. Our tailored strategies maximize ROI and enhance visibility across search and display networks.",
    },
    {
      imgSrc: "/OTA.webp",
      title: (
        <>
          <span className="text-[#1F2456] font-extrabold">OTA Listing </span>
          <span className="text-[#F89522]">Management</span>
        </>
      ),
      description:
        "We specialize in optimizing OTA (Online Travel Agency) listings to enhance visibility, increase bookings, and maximize revenue for hotels. Our targeted strategies ensure your property stands out in a competitive marketplace.",
    },
    {
      imgSrc: "/webdesign.webp",
      title: (
        <>
          <span className="text-[#1F2456] font-extrabold">Custom Web </span>
          <span className="text-[#F89522]">Design</span>
        </>
      ),
      description:
        "We create tailored web designs that reflect your brand’s unique identity, ensuring a seamless user experience. From concept to launch, we build websites that captivate and convert.",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleButtonClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval); 
  }, [currentSlide]);

  return (
    <div id="home" className="relative h-[100vh] lg:h-[100vh] overflow-hidden">
      <div className="absolute p-8 inset-0">
        <AnimatePresence>
          {slides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="h-full space-y-6 flex flex-col lg:flex-row lg:items-center"
                >
                  {/* Image for mobile on top, for desktop next to content */}
                  {slide.imgSrc && (
                    <motion.div
                      className="lg:ml-64 lg:order-2 w-full lg:w-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <Image
                        src={slide.imgSrc}
                        alt="image"
                        height={500}
                        width={500}
                        className=" w-64 h-44 mt-[4.4rem] lg:mt-1 lg:w-full lg:h-auto object-contain"
                      />
                    </motion.div>
                  )}
                  <div className="space-y-10 text-center lg:text-left lg:order-1 lg:ml-16">
                    <motion.h1
                      className="font-extrabold tracking-wider text-3xl lg:text-5xl font-sans"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      className="text-[#1F2456] text-md w-full lg:w-96"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                    >
                      {slide.description}
                    </motion.p>
                    <button
                      className="bg-[#F89522] px-5 py-2 rounded-3xl"
                      
                    >
                      Let's Start
                    </button>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Button Container for large screens */}
      <div className="hidden lg:flex w-full absolute bottom-8 justify-center">
        <button
          className="bg-[#1F2456] w-96 text-white px-4 py-4"
          onClick={() => handleButtonClick(0)}
        >
          Digital Marketing
        </button>
        <button
          className="bg-[#F89522] w-96 text-white px-4 py-4"
          onClick={() => handleButtonClick(1)}
        >
          Google Ads Campaign
        </button>
        <button
          className="bg-[#808EAB] w-96 text-white px-4 py-4"
          onClick={() => handleButtonClick(2)}
        >
          OTA Listing Management
        </button>
        <button
          className="bg-[#1F2456] w-96 text-white px-4 py-4"
          onClick={() => handleButtonClick(3)}
        >
          Custom Web Design
        </button>
      </div>

      {/* Arrows for mobile view */}
      <div className="lg:hidden absolute top-56 inset-0 flex justify-between items-center px-4">
        <button onClick={handlePrev} className="text-black text-4xl">
          &lt;
        </button>
        <button onClick={handleNext} className="text-black text-4xl">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Hero;
