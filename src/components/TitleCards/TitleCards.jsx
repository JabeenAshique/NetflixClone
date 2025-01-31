import {useRef, useState,} from 'react'
import "./TitleCards.css"
import { useEffect } from 'react';
import{Link} from 'react-router-dom'
// import PropTypes from "prop-types";


const TitleCards = ({title,category}) => {
  const [apiData,setApiData]=useState([])
  const cardsRef = useRef();
  //api data
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGY2ZWY5OGY0YTc1ODJlOGNjNjIwZWRhNDAyN2ZlZCIsIm5iZiI6MTczNDM3NjE2MS41NTAwMDAyLCJzdWIiOiI2NzYwN2FlMWFlODFhM2U0MzQ3ODMwZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Nsnos8MrI8M3PLQ35lwdwv_G2UU5mhurrIANH5X8K9Q'
    }
  };
  
  
  const handleWheel = (event)=>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    const cardList = cardsRef.current;
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing?"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardList.addEventListener('wheel', handleWheel);
    console.log(cardList);
}, []);


  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
      {apiData.map((card,index)=>{
        return <Link to={`/player/${card.id}`} className="card" key={index}>
         <img  src={`https://image.tmdb.org/t/p/w500${card?.backdrop_path}`}
              alt={card.original_title || 'Movie Image'}
              onError={(e) => (e.target.style.display = 'none')}  />
          <p>{card.original_title}</p>
        </Link>
      })}
    </div>
    </div>
  )

}


export default TitleCards
