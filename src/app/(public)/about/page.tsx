// app/about/page.tsx

import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
      <p className="text-lg text-center">
        Welcome to our website! We are a passionate team dedicated to delivering high-quality content and services to our users.
      </p>
      <p className="text-lg text-center mt-4">
        Our goal is to make information easily accessible and offer valuable resources to help you succeed in your journey.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-lg mt-2">
          We aim to provide the best user experience with cutting-edge technology and a user-centric approach.
        </p>
      </div>
    </div>
  );
};

export default About;
