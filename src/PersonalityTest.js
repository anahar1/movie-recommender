import React, { useState } from "react";
import PersonalityTestResults from "./PersonalityTestResults";

const PersonalityTest = ({ onSubmit }) => {
  const questions = [
    {
      question: "How comfortable are you with taking risks in life?",
      options: [
        {
          value: "risk-taking",
          label: "I love taking risks and embracing new challenges.",
        },
        {
          value: "cautious",
          label: "I prefer playing it safe and being cautious.",
        },
        { value: "balanced", label: "Both, in a balanced way." },
      ],
    },
    {
      question:
        "Do you find solace in nature or feel more connected to the advancements of technology?",
      options: [
        { value: "nature", label: "Nature" },
        { value: "technology", label: "Technology" },
        { value: "both nature and technology", label: "Both, in a balanced way." },
      ],
    },
    {
      question:
        'When it comes to adventurous activities, do you prefer engaging in them with a group of people or by yourself?',
      options: [
        {
          value: 'extrovert',
          label:
            'I love the thrill of group adventures and enjoy the company of others.',
        },
        {
          value: 'introvert',
          label:
            'I prefer solo adventures where I can immerse myself in the experience and reflect.',
        },
        { value: 'ambivert', label: 'Either one is fine.' },
      ],
    },
    {
      question: 'Which of these is the most interesting to you?',
      options: [
        { value: 'family', label: 'Spending time with family' },
        { value: 'adventure', label: 'Finding new things to do' },
        { value: 'friends', label: 'Creating new relationships' },
      ],
    },
    {
      question:
        'Which celebrity would you want to be stranded on a desert island with?',
      options: [
        { value: 'action', label: 'Jason Statham' },
        { value: 'comedy', label: 'Tom Hanks' },
        { value: 'family', label: 'Robin Williams' },
      ],
    },
    {
      question: 'Are you a bike person, or a porch person?',
      options: [
        { value: 'action', label: 'Bikes all the way' },
        { value: 'comedy', label: "Chillin' on the porch" },
        {
          value: 'friends',
          label: "Depends on what everyone else is doin' that day!",
        },
      ],
    },
    {
      question: 'Which houseplant are you?',
      options: [
        { value: 'family', label: 'Golden Pothos' },
        { value: 'action', label: 'Monstera' },
        { value: 'drama', label: 'Fiddle Leaf' },
      ],
    },
    {
      question: 'If you had to pick a city to live in, where would it be?',
      options: [
        { value: 'action', label: 'New York City' },
        { value: 'romance', label: 'San Diego' },
        { value: 'drama', label: 'Chicago' },
      ],
    },
    {
      question: 'If you found a mysterious old book, what would you do?',
      options: [
        { value: 'horror', label: 'I would read it eagerly, even if it contains dark and forbidden knowledge.' },
        { value: 'mystery', label: 'I would hesitate but eventually delve into its secrets, risking the unknown.' },
        { value: 'adventure', label: 'I would leave it untouched, knowing that some things are better left undiscovered' },
      ],
    },
    {
      question: 'If you could participate in a thrilling heist, what role would you take on?',
      options: [
        { value: 'thriller', label: 'The mastermind strategist who plans and orchestrates the entire operation.' },
        { value: 'mystery', label: 'The nimble and agile thief who excels at acrobatics and escapes.' },
        { value: 'drama', label: 'The charismatic con artist who manipulates others to achieve their goals.' },
      ],
    },
    {
      question: 'If you had the power to manipulate dreams, how would you use it?',
      options: [
        { value: 'thriller', label: 'To uncover hidden truths and delve into the depths of the subconscious.' },
        { value: 'fantasy', label: 'To create fantastical and surreal dreamscapes limited only by your imagination.' },
        { value: 'comedy', label: 'To prank friends and have hilarious, absurd dream scenarios together.' },
      ],
    },
    {
      question: 'If you could have a secret hideout, where would it be located?',
      options: [
        { value: 'adventure', label: 'A hidden cave deep within a dense forest, sheltered from prying eyes.' },
        { value: 'fantasy', label: 'An underwater lair beneath the ocean\'s depths, accessible only to the chosen few.' },
        { value: 'sci-fi', label: 'A high-tech skyscraper penthouse, equipped with state-of-the-art security and luxurious amenities.' },
      ],
    },
    {
      question: 'If you could have a secret pocket dimension, what would you keep inside?',
      options: [
        { value: 'fantasy', label: 'A whimsical and ever-expanding library with books that come to life.' },
        { value: 'horror', label: 'A dark and mysterious labyrinth with hidden treasures and menacing creatures.' },
        { value: 'family', label: 'A serene and tranquil garden with exotic plants and talking animals.' },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [completedTest, setCompletedTest] = useState(false);
  const [movieRecommendations, setMovieRecommendations] = useState(null);

  // Genre IDs
  const genreMap = {
    "action": 28,
    "adventure": 12,
    "comedy": 35,
    "drama": 18,
    "family": 10751,
    "fantasy": 14,
    "horror": 27,
    "mystery": 9648,
    "romance": 10749,
    "sci-fi": 878,
    "thriller": 53,
    "risk-taking": 53,
    "cautious": 9648,
    "balanced": 12,
    "nature": 14,
    "technology": 28,
    "both nature and technology": 12,
    "extrovert": 28,
    "introvert": 14,
    "ambivert": 12,
  };
  

  const handleResponse = (question, answer) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[question] = answer;
      // console.log("newResponses", newResponses)
      return newResponses;
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCompletedTest(true);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1500);

        const responseMap = new Map();
      responses.forEach((response) => {
        const count = responseMap.get(response) || 0;
        responseMap.set(response, count + 1);
      });

      let mostSelectedGenre = '';
      let secondMostSelectedGenre = '';
      let maxCount = 0;
      let secondMaxCount = 0;

      responseMap.forEach((count, genre) => {
        if (count > maxCount) {
          secondMostSelectedGenre = mostSelectedGenre;
          secondMaxCount = maxCount;
          mostSelectedGenre = genre;
          maxCount = count;
        } else if (count === maxCount) {
          secondMostSelectedGenre = genre;
          secondMaxCount = count;
        } else if (count > secondMaxCount) {
          secondMostSelectedGenre = genre;
          secondMaxCount = count;
        }
      });

      fetchMovies(mostSelectedGenre, secondMostSelectedGenre)
    }
    }, 350); // delay
  };


// Function to fetch movies
const fetchMovies = async (mostSelectedGenre, secondMostSelectedGenre) => {
  const apiKey = process.env.REACT_APP_API; // Replace with your TMDb API key
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreMap[mostSelectedGenre]},${genreMap[secondMostSelectedGenre]}`
    );
    const data = await response.json();
    // Process the movie results
    if (data.results && data.results.length > 0) {
      const movies = data.results.slice(0, 5).map((movie) => 
        {
          return {
            title: movie.title,
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview,
            rating: movie.vote_average,
            id: movie.id,
          }
          
        }); // Top 5 movies
      // console.log('Movies:', movies);
      setMovieRecommendations(movies);
    } else {
      // console.log('No movies found.');
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 py-8 px-4 rounded-lg shadow-xl m-10">
      {!completedTest ? (
        <div className="max-w-lg mx-auto p-5">
          <h3 className="text-2xl font-bold mb-6 text-white">
            {questions[currentQuestionIndex].question}
          </h3>
          {questions[currentQuestionIndex].options.map((option) => (
            <label
              key={option.value}
              className="block py-2 px-4 rounded-md bg-white text-lg text-gray-800 mb-2 cursor-pointer hover:bg-gray-200"
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option.value}
                onChange={(e) =>
                  handleResponse(currentQuestionIndex, e.target.value)
                }
                className="form-radio h-4 w-4 text-indigo-600"
                checked={responses[currentQuestionIndex] === option.value}
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}
        </div>
      ) : 
      // loading ? (
      //   <p className="text-2xl font-bold text-white">
      //     Test completed. Submitting your responses...
      //   </p>
      // ) : 
      (
        <PersonalityTestResults responses={responses} onSubmit={onSubmit} movieRecommendations={movieRecommendations}/>
      )}
      {/* Render movie recommendations */}
    </div>
  );
};

export default PersonalityTest;
