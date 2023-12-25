'use client'
import React from 'react'; // If using React
// Other necessary imports

// Landing page component
const LandingPage = () => {
  return (
    <>
      <main className="container mx-auto py-8">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Databases 601.315 Final Project!</h2>
          <p className="text-lg text-gray-700 mb-8">Discover statistics about the top 25 MLB pitchers from the past 20 years.</p>
          <a href="/vs" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full inline-block transition duration-300 mr-4">Basic Head to Head</a>
          <a href="/custom" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full inline-block transition duration-300">Custom Head to Head</a>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 MLB Top Pitchers. All rights reserved.</p>
        </div>
      </footer>
      </>
  );
};

export default LandingPage;

