'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Star,
  ShoppingCart,
  CreditCard,
  MapPin,
  CheckCircle,
  FileText,
  Building,
  Clock,
  Users,
  Play,
  Eye,
  Download
} from 'lucide-react';

// Enhanced Card Components
const Card = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    className={`bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Enhanced Button Component
const Button = ({ 
  children, 
  className = '', 
  size = 'md', 
  variant = 'default',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
  };

  return (
    <button 
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Intersection Observer Hook
const useIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};

// Template Preview Components
const FormField = ({ icon: Icon, placeholder, type = "text", width = "full" }: {
  icon?: any;
  placeholder: string;
  type?: string;
  width?: string;
}) => (
  <div className={`relative ${width === 'half' ? 'w-1/2' : 'w-full'}`}>
    {Icon && <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />}
    <div className={`h-10 bg-gray-50 rounded-lg border border-gray-200 ${Icon ? 'pl-10' : 'pl-3'} pr-3 flex items-center text-sm text-gray-500`}>
      {placeholder}
    </div>
  </div>
);

const SelectField = ({ placeholder }: { placeholder: string }) => (
  <div className="relative w-full">
    <div className="h-10 bg-gray-50 rounded-lg border border-gray-200 pl-3 pr-8 flex items-center text-sm text-gray-500">
      {placeholder}
    </div>
    <div className="absolute right-3 top-3 pointer-events-none">
      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

// Template designs
const templateDesigns = {
  "Contact Form": (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <FormField icon={User} placeholder="First Name" width="half" />
        <FormField icon={User} placeholder="Last Name" width="half" />
      </div>
      <FormField icon={Mail} placeholder="Email Address" />
      <FormField icon={Phone} placeholder="Phone Number" />
      <div className="relative">
        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <div className="h-20 bg-gray-50 rounded-lg border border-gray-200 pl-10 pr-3 pt-3 text-sm text-gray-500">
          Your message...
        </div>
      </div>
      <Button className="w-full">Send Message</Button>
    </div>
  ),
  "Survey": (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Rate your experience</div>
      <div className="flex space-x-1">
        {[1,2,3,4,5].map(i => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <div className="text-sm font-medium text-gray-700 mb-2">Additional feedback</div>
      <div className="h-16 bg-gray-50 rounded-lg border border-gray-200 pl-3 pr-3 pt-3 text-sm text-gray-500">
        Tell us more...
      </div>
      <Button className="w-full">Submit Survey</Button>
    </div>
  ),
  "Registration": (
    <div className="space-y-4">
      <FormField icon={User} placeholder="Full Name" />
      <FormField icon={Mail} placeholder="Email Address" />
      <SelectField placeholder="Select Event" />
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 bg-blue-600 rounded"></div>
        <span className="text-sm text-gray-600">Standard - $99</span>
      </div>
      <Button className="w-full">Register Now</Button>
    </div>
  ),
  "Order Form": (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Product Selection</div>
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm font-medium text-gray-900">Premium Plan - $29/month</div>
      </div>
      <FormField icon={CreditCard} placeholder="Card Number" />
      <div className="flex space-x-3">
        <FormField placeholder="MM/YY" width="half" />
        <FormField placeholder="CVV" width="half" />
      </div>
      <Button className="w-full">Complete Order</Button>
    </div>
  ),
  "Newsletter": (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <div className="text-lg font-semibold text-gray-900">Stay Updated</div>
      </div>
      <FormField icon={User} placeholder="Your Name" />
      <FormField icon={Mail} placeholder="Email Address" />
      <Button className="w-full">Subscribe Now</Button>
    </div>
  ),
  "Booking": (
    <div className="space-y-4">
      <SelectField placeholder="Select Service" />
      <div className="flex space-x-3">
        <FormField icon={Calendar} placeholder="Select Date" width="half" />
        <FormField icon={Clock} placeholder="Select Time" width="half" />
      </div>
      <FormField icon={User} placeholder="Your Name" />
      <FormField icon={Phone} placeholder="Phone Number" />
      <Button className="w-full">Book Appointment</Button>
    </div>
  ),
};

const ProfessionalTemplatesSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set());

  const templates = [
    { 
      name: "Contact Form", 
      category: "Business", 
      color: "from-blue-500 to-blue-600", 
      icon: Mail,
      description: "Professional contact forms for lead generation",
      usage: "12.3k"
    },
    { 
      name: "Survey", 
      category: "Research", 
      color: "from-emerald-500 to-emerald-600", 
      icon: FileText,
      description: "Comprehensive survey forms with analytics",
      usage: "8.7k"
    },
    { 
      name: "Registration", 
      category: "Events", 
      color: "from-purple-500 to-purple-600", 
      icon: Calendar,
      description: "Event registration with payment integration",
      usage: "15.2k"
    },
    { 
      name: "Order Form", 
      category: "E-commerce", 
      color: "from-orange-500 to-orange-600", 
      icon: ShoppingCart,
      description: "Secure order forms with payment processing",
      usage: "9.8k"
    },
    { 
      name: "Newsletter", 
      category: "Marketing", 
      color: "from-pink-500 to-pink-600", 
      icon: Mail,
      description: "Newsletter subscription with automation",
      usage: "21.1k"
    },
    { 
      name: "Booking", 
      category: "Service", 
      color: "from-teal-500 to-teal-600", 
      icon: Calendar,
      description: "Appointment booking with calendar sync",
      usage: "11.4k"
    },
  ];

  // Animation callback
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.template-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            setAnimatedCards(prev => new Set(prev).add(index));
          }, index * 150);
        });
      }
    });
  };

  const templatesRef = useIntersectionObserver(handleIntersection);

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4 mr-2" />
            200+ Professional Templates
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose from our template library
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with professionally designed templates and customize them to match your brand
          </p>
        </div>

        {/* Templates Grid */}
        <div ref={templatesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <div 
              key={index} 
              className={`template-card transition-all duration-700 ${
                animatedCards.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card 
                className="group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                onClick={() => setSelectedTemplate(template.name)}
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className={`h-48 bg-gradient-to-br ${template.color} rounded-t-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors">
                      <div className="p-6 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <template.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-white/80" />
                            <span className="text-xs text-white/80">{template.usage}</span>
                          </div>
                        </div>
                        
                        {/* Form Elements Preview */}
                        <div className="flex-1 space-y-3">
                          <div className="h-2 bg-white/30 rounded-full w-3/4"></div>
                          <div className="h-8 bg-white/20 rounded-lg"></div>
                          <div className="h-2 bg-white/30 rounded-full w-1/2"></div>
                          <div className="h-8 bg-white/20 rounded-lg"></div>
                          <div className="h-10 bg-white/40 rounded-lg mt-4 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">Submit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{template.usage} users</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                          e?.stopPropagation();
                          setSelectedTemplate(template.name);
                        }}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedTemplate}</h3>
                  <button 
                    onClick={() => setSelectedTemplate(null)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {templateDesigns[selectedTemplate as keyof typeof templateDesigns]}
              </div>
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Button className="flex-1">
                    Use This Template
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-4">
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => console.log('Browse all templates')}
            >
              Browse All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => console.log('Create custom template')}
            >
              Create Custom Template
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Over 200 templates available • New templates added weekly
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplatesSection;