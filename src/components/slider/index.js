import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import leftArrow from '../../assets/icon/arrow-left.png';
import rightArrow from '../../assets/icon/arrow-right.png';
import circle from '../../assets/icon/circle.png';
import Rating from "../rating";

function Slider({movieList, navButtons, indicators, autoplay, slides, stars, margin}) {
  const [x, setX] = useState(0);
  const interval = useRef(null)

  const goLeft = () => {
    x === 0 ? setX(-100 * (movieList.length - 1)) : setX(x + 100);
    console.log(x)
  };
  const goRight = () => {
    x === -100 * (movieList.length - 1) ? setX(0) : setX(x - 100);
    console.log(x)
  };

  useEffect(() => {
    if (autoplay) {
      interval.current = setInterval(() => {
        x === -100 * (movieList.length - 1) ? setX(0) : setX(x - 100);
      }, 5000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
    return () => clearInterval(interval.current);
  }, [x]);

  return (
    <div id="carouselExampleIndicators" className="carousel slide relative">
      <div className="flex relative w-full overflow-hidden h-80">
        {movieList.map((movie) => (
          <div key={movie.id} style={{ transform: `translateX(${x}%)`, transition: '1s', minWidth: slides ? `${slides}vw` : '100%', margin : margin ? '0vh 1.5vh' : null }}>
            <Link className="group relative rounded-xl flex" to={`/details?movieID=${movie.id}`}>
              <div className="h-80 overflow-hidden aspect-w-1 aspect-h-1 w-full rounded-xl bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-full object-cover object-top lg:h-full lg:w-full"
                />
              </div>
              <div className="absolute mb-6 items-center bottom-0 w-full flex justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-primary-50">{movie.original_title}</h1>
                  <h1 className="text-md text-secondary-200">{movie.release_date}</h1>
                </div>
                {stars && (
                  <div>
                    <div className="flex">
                      <Rating rating={movie.vote_average/2} maxStars={5} />
                    </div>
                    <h1 className="text-secondary-200">from {movie.vote_count} users</h1>
                  </div>
                  )}
              </div>
            </Link>
          </div>
          ))}
      </div>
      {navButtons && (
        <>
          <button
            className="absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            onClick={goLeft}
            >
            <img className="w-12" src={leftArrow} alt='left-arrow Flecha iconos creados por Handicon - Flaticon' />
          </button>
          <button
            className="absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            onClick={goRight}
          >
            <img className="w-12" src={rightArrow} alt='right-arrow Flecha iconos creados por Handicon - Flaticon' />
          </button>
        </>
      )}
      {indicators && (
        <div className='absolute right-0 bottom-0 left-0 flex justify-center p-0'>
          {movieList.map((image, index) => (
            <button
              key={index}
              className='bg-primary-200 m-1 rounded-lg'
              onClick={() => setX(index * -100)}
              >
              <img className={"w-4 rounded-lg"} style={{ backgroundColor: x === index*-100 ? `cornflowerblue` : '' }} src={circle} alt='circle' />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Slider;