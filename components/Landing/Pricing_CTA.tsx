import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Pricing_CTA = () => {
  return (
    <>
        <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that's right for your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                description: "Perfect for individuals and small projects",
                features: ["Up to 3 forms", "100 responses/month", "Basic templates", "Email support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Professional",
                price: "$29",
                period: "per month",
                description: "Best for growing businesses and teams",
                features: [
                  "Unlimited forms",
                  "10,000 responses/month",
                  "Advanced analytics",
                  "Custom branding",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "per month",
                description: "For large organizations with advanced needs",
                features: [
                  "Everything in Professional",
                  "Unlimited responses",
                  "Advanced integrations",
                  "Custom domains",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 ${plan.popular ? "border-blue-500 shadow-xl" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup">
                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using FormCraft Pro to create better forms and collect more data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricing_CTA