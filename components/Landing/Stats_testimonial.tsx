import { FileText, Star, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '../ui/card'

const Stats_testimonial = () => {
  return (
   <>
    <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Active Users", icon: Users },
              { number: "2M+", label: "Forms Created", icon: FileText },
              { number: "99.9%", label: "Uptime", icon: TrendingUp },
              { number: "4.9/5", label: "User Rating", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="bg-white/10 p-3 rounded-lg w-fit mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What our customers say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "FormCraft Pro has revolutionized how we collect customer feedback. The analytics are incredible!",
                author: "Sarah Johnson",
                role: "Marketing Director",
                company: "TechCorp",
                avatar: "SJ",
              },
              {
                quote: "The drag-and-drop builder is so intuitive. We created our entire onboarding flow in minutes.",
                author: "Mike Chen",
                role: "Product Manager",
                company: "StartupXYZ",
                avatar: "MC",
              },
              {
                quote: "Best form builder we've used. The integrations with our existing tools work flawlessly.",
                author: "Emily Davis",
                role: "Operations Lead",
                company: "GrowthCo",
                avatar: "ED",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
   </>
  )
}

export default Stats_testimonial