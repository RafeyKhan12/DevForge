import React from "react";
import { Link } from "react-router";

function Home() {
  return (
    <div className="space-y-20 px-6 md:px-16 py-10">

      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
         Welcome to DevForge
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Where ideas are forged into code
        </p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Let’s Work Together
        </Link>
      </section>

      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Why Work With Me
        </h2>
        <p className="text-gray-600">
          I deliver full-stack solutions with modern frameworks like React, Next.js, and Tailwind CSS.  
          You get fast development, clean design, and reliable code — all done personally by me.
        </p>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Frontend Development</h3>
            <p className="text-gray-600 text-sm">
              Clean, responsive UIs with React and Tailwind CSS.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Full-Stack Applications</h3>
            <p className="text-gray-600 text-sm">
              Next.js + Node.js + MongoDB for complete web solutions.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Custom Projects</h3>
            <p className="text-gray-600 text-sm">
              Tailored applications and automation tools to fit your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Recent Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Netflix Clone</h3>
            <p className="text-gray-600 text-sm">HTML + CSS. Complete UI.</p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">To-Do App</h3>
            <p className="text-gray-600 text-sm">Full CRUD with modern styling.</p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600 text-sm">Full CRUD dashboard with Redux + Tailwind integration.</p>
          </div>
        </div>
      </section>
      
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to Build Something?
        </h2>
        <Link
          to="/contact"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Contact Me
        </Link>
      </section>

    </div>
  );
}

export default Home;
