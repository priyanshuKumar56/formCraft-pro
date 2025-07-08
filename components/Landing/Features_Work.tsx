'use client';

import React, { useEffect, useRef } from 'react';
import { 
  MousePointer, 
  Palette, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Zap, 
  FileText, 
  Target, 
  ChevronRight 
} from 'lucide-react';

// Card component
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>
    {children}
  </div>
);

// Intersection Observer Hook
const useIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};

const AnimatedFeaturesComponent = () => {
  const features = [
    {
      icon: MousePointer,
      title: "Drag & Drop Builder",
      description: "Create forms visually with our intuitive drag-and-drop interface. No coding required.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Palette,
      title: "Beautiful Templates",
      description: "Start with professionally designed templates or create your own from scratch.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights into form performance and user behavior with built-in analytics.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "All forms are automatically optimized for mobile devices and tablets.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SSL encryption, GDPR compliance, and data protection.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Zap,
      title: "Smart Integrations",
      description: "Connect with 1000+ apps including Slack, Google Sheets, Mailchimp, and more.",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Choose a Template",
      description: "Start with one of our beautiful templates or create from scratch",
      icon: FileText,
    },
    {
      step: "02",
      title: "Customize & Design",
      description: "Drag and drop elements, customize colors, and add your branding",
      icon: Palette,
    },
    {
      step: "03",
      title: "Share & Collect",
      description: "Publish your form and start collecting responses instantly",
      icon: Target,
    },
  ];

  // Animation callback for features
  const handleFeaturesIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-slide-up');
          }, index * 150);
        });
      }
    });
  };

  // Animation callback for steps
  const handleStepsIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const steps = entry.target.querySelectorAll('.step-card');
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add('animate-slide-in');
          }, index * 300);
        });
      }
    });
  };

  const featuresRef = useIntersectionObserver(handleFeaturesIntersection);
  const stepsRef = useIntersectionObserver(handleStepsIntersection);

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .feature-card {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.3s ease;
        }

        .step-card {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .step-card:hover {
          transform: translateX(0) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .icon-container {
          transition: transform 0.3s ease;
        }

        .icon-container:hover {
          animation: wiggle 0.5s ease-in-out;
        }

        .step-number {
          animation: pulse 2s infinite;
        }

        .step-number:hover {
          animation: none;
          transform: rotate(360deg);
          transition: transform 0.6s ease;
        }

        .arrow-animate {
          animation: bounce 2s infinite;
        }

        .title-animate {
          animation: fadeInUp 1s ease-out;
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }

        .feature-card:nth-child(odd) .floating-icon {
          animation-delay: -1s;
        }

        .feature-card:nth-child(even) .floating-icon {
          animation-delay: -2s;
        }
      `}</style>

      {/* Features Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 title-animate">
              Everything you need to create amazing forms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto title-animate" style={{ animationDelay: '0.2s' }}>
              From simple contact forms to complex multi-step surveys, FormCraft Pro has all the tools you need to
              collect data and grow your business.
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="p-8">
                    <div className={`p-3 rounded-lg ${feature.color} w-fit mb-4 icon-container floating-icon`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 title-animate">
              How it works
            </h2>
            <p className="text-xl text-gray-600 title-animate" style={{ animationDelay: '0.2s' }}>
              Create professional forms in just 3 simple steps
            </p>
          </div>

          <div ref={stepsRef} className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative step-card">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold step-number">
                    {step.step}
                  </div>
                  
                  <div className={`bg-blue-100 text-blue-600 p-3 rounded-lg w-fit mx-auto mb-4 icon-container floating-icon`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 arrow-animate">
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AnimatedFeaturesComponent;