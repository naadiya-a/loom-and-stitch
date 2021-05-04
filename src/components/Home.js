import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen bg-gray-200 grid-rows-3 grid-cols-1 md:bg-cover md:bg-yarn grid md:grid-cols-2">
      <div
        id="home-desc"
        className="col-start-1 col-span-1 row-start-2 row-span-1"
      >
        <p class="p-8">Track your crochet and knit projects</p>
        <Link className="button-colour py-4 px-6 rounded-full" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
