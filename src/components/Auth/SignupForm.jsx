import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common';
import { Card, Container } from '../ui';
import SignupFormFields from './forms/SignupFormFields';
import SocialButtons from './forms/SocialButtons';

const SignupForm = () => {
  return (
    <Container>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 py-12 px-4 sm:px-6 lg:px-8">
        {/* Left side - Value Proposition */}
        <div className="lg:w-1/2 max-w-xl">
          <Logo className="mb-8" />
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
            Your Journey,{' '}
            <span className="text-[#2A4B8C]">Simplified</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Experience the future of travel planning with our AI-powered platform. Create unforgettable journeys without the complexity.
          </p>

          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Why Choose TravelEase?
            </h2>
            <div className="grid gap-6">
              <Feature
                icon="🤖"
                title="AI Travel Assistant"
                description="Get personalized recommendations and real-time travel insights powered by AI"
              />
              <Feature
                icon="📍"
                title="Smart Itinerary Planning"
                description="Create perfect itineraries with our intelligent planning algorithm"
              />
              <Feature
                icon="💰"
                title="Budget Management"
                description="Track expenses and get cost-saving recommendations for your trips"
              />
              <Feature
                icon="🌍"
                title="Travel Community"
                description="Connect with fellow travelers and share experiences worldwide"
              />
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <Card className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-display font-bold text-gray-900">
                Start Your Journey
              </h2>
              <p className="text-gray-600">
                Join thousands of happy travelers today
              </p>
            </div>

            <div className="space-y-6">
              <SocialButtons />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    or sign up with email
                  </span>
                </div>
              </div>
              <SignupFormFields />
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-gray-900 hover:text-gray-700 font-medium">
                Log in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </Container>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-[#2A4B8C]/10 text-2xl">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default SignupForm;