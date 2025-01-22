import React from "react";

const About = () => {
  return (
    <div className="w-full h-auto bg-orange-100 mt-24">
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl text-orange-600 font-bold mb-4">About Us</h2>
        <p className="m-6">
          Welcome to Kookies Kitchen! We are dedicated to delivering the best culinary experience.
        </p>
        <div className="m-6">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum magni obcaecati mollitia cupiditate.</p>
          <p>Quo dolores voluptates voluptate aspernatur laborum dolorum, fuga sit numquam autem temporibus iusto maiores nisi minus aut nemo, quaerat consequatur!</p>
        </div>
        <p className="m-6">
          Meet our team:{" "}
          <a
            href="https://example.com/our-team"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            Top Management Team
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
