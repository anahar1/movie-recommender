import React, { useState, useEffect } from "react";

const PersonalityTestResults = ({
  responses,
  onSubmit,
  movieRecommendations,
}) => {
  const [genreCount, setGenreCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState("");

  const getGenreCount = () => {
    let counts = {};
    for (let i = 3; i < responses.length; i++) {
      let item = responses[i];
      if (counts[item]) {
        counts[item] += 1;
      } else {
        counts[item] = 1;
      }
    }
    setGenreCount(counts);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);

    setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
      getGenreCount();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <h3 className="text-xl text-white text-center">
          Based on your responses, you are{dots}
        </h3>
      </div>
    );
  }

  return (
    <div className="relative p-7">
      <p className="text-center font-bold text-2xl text-white mx-10 mt-4">
        A {responses[0]} {responses[2]} that finds solace in {responses[1]}.
      </p>
      <div className="container backdrop-blur rounded-lg max-w-[85%] p-10 mx-auto my-14 border-solid border-2 border-white">
        <p className="text-lg text-white mb-5">
          Each of your answers corresponded with a movie genre:
          <br></br>
        </p>
        <div className="grid grid-cols-2 gap-4 text-lg">
          {Object.keys(genreCount).map((genre) => (
            <div key={genre}>
              <div className="flex items-center">
                <span className="text-white mr-2">
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}:
                </span>
                <div className="bg-white h-2 w-20 rounded-lg">
                  <div
                    className="bg-black h-2 rounded-lg"
                    style={{ width: `${(genreCount[genre] / responses.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white ml-2">{genreCount[genre]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-0 mb-10 text-white text-lg text-center">
        <p>Now, let's find movies for you based on your favorite genres.</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => onSubmit(movieRecommendations)}
          className="bg-white rounded-lg p-3 hover:bg-slate-200"
        >
          Show movie recommendations
        </button>
      </div>
    </div>
  );
};

export default PersonalityTestResults;
