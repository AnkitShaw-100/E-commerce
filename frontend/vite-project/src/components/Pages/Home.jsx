import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones, FiStar } from "react-icons/fi";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/shop');
  };

  const slides = [
    {
      title: "Elite Electronics",
      subtitle: "Latest Tech & Innovation",
      desc: "Discover cutting-edge technology and premium electronics for the modern lifestyle.",
      cta: "Shop Electronics",
      bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80", // Electronics store interior
      preview: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" // Electronics devices
    },
    {
      title: "Fashion Studio",
      subtitle: "Trendy Apparel & Style",
      desc: "Elevate your wardrobe with our curated collection of contemporary fashion pieces.",
      cta: "Explore Fashion",
      bg: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1920&q=80", // Fashion boutique
      preview: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80" // Fashion clothing
    },
    {
      title: "Home Essentials",
      subtitle: "Comfort & Living",
      desc: "Transform your living space with our premium home and lifestyle collection.",
      cta: "Shop Home",
      bg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80", // Modern home interior
      preview: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" // Home decor
    }
  ];

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      desc: "Free delivery on orders over ₹999"
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      desc: "100% secure payment methods"
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      desc: "Dedicated customer support"
    },
    {
      icon: FiShoppingBag,
      title: "Easy Returns",
      desc: "30-day return policy"
    }
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80",
      count: "150+ Products"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
      count: "200+ Products"
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
      count: "100+ Products"
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
      count: "80+ Products"
    }
  ];

  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 4s with pause functionality
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [slides.length, isPaused]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden pt-16 sm:pt-20 md:pt-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${
              current === index 
                ? "opacity-100" 
                : "opacity-0"
            }`}
          >
            <img
              src={slide.bg}
              alt={slide.title}
              className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(50vh-6rem)] sm:min-h-[calc(55vh-6rem)] lg:min-h-[calc(60vh-6rem)]">
              {/* Text Content */}
              <div className="text-center lg:text-left text-white space-y-4">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ease-out ${
                      current === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8 absolute inset-0"
                    }`}
                  >
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:bg-transparent lg:backdrop-blur-none lg:p-0">
                      <h2 
                        className={`text-sm sm:text-base lg:text-lg font-semibold text-emerald-300 mb-2 transition-all duration-600 ease-out ${
                          current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                        }`}
                        style={{ transitionDelay: current === index ? '200ms' : '0ms' }}
                      >
                        {slide.subtitle}
                      </h2>
                      <h1 
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight transition-all duration-600 ease-out ${
                          current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: current === index ? '300ms' : '0ms' }}
                      >
                        {slide.title}
                      </h1>
                      <p 
                        className={`text-xs sm:text-sm lg:text-base text-gray-200 mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0 transition-all duration-600 ease-out ${
                          current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                        }`}
                        style={{ transitionDelay: current === index ? '400ms' : '0ms' }}
                      >
                        {slide.desc}
                      </p>
                      <button
                        onClick={handleShopClick}
                        className={`bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-600 ease-out text-xs sm:text-sm lg:text-base ${
                          current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: current === index ? '500ms' : '0ms' }}
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hero Image Preview */}
              <div className="relative hidden lg:flex items-center justify-center">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-800 ease-out ${
                      current === index
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-6 scale-95 absolute"
                    }`}
                    style={{ transitionDelay: current === index ? '400ms' : '0ms' }}
                  >
                    <div className="relative group">
                      <img
                        src={slide.preview}
                        alt={slide.title}
                        className="rounded-2xl shadow-2xl w-[350px] h-[250px] lg:w-[400px] lg:h-[280px] object-cover border-4 border-white/40 transform transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index ? "bg-emerald-400 scale-125" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of products across different categories</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={() => navigate('/shop')}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-emerald-600 text-sm font-medium">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
