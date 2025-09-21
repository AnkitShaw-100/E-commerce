import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/shop');
  };

  const slides = [
    {
      title: "Shop Premium Brands",
      subtitle: "Luxury Shopping Experience",
      desc: "Discover exclusive collections from top brands with unmatched quality and style.",
      cta: "Browse Brands",
      bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Fashion Forward",
      subtitle: "Latest Trends & Styles",
      desc: "Step into the world of fashion with our curated collection of trendy outfits.",
      cta: "Shop Fashion",
      bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Smart Shopping",
      subtitle: "Convenient & Easy",
      desc: "Shop from the comfort of your home with our seamless online experience.",
      cta: "Start Shopping",
      bg: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Auto slide every 5s (~30% faster)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${current === index ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.bg}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="relative h-[500px] flex flex-col justify-center space-y-4">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-[1400ms] ease-out ${current === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                      }`}
                  >
                    <h2 className="text-2xl font-bold text-emerald-600 mb-2">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-700 mb-6 max-w-lg">
                      {slide.desc}
                    </p>
                    <button 
                      onClick={handleShopClick}
                      className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {slide.cta}
                    </button>
                  </div>
                ))}
              </div>

              {/* Hero Image Preview */}
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-[1400ms] ease-out ${current === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                      }`}
                  >
                    <img
                      src={slide.bg}
                      alt={slide.title}
                      className="rounded-3xl shadow-2xl w-[550px] h-[400px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
