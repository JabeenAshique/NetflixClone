import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Player = () => {
  const {id} = useParams()
  const navigate = useNavigate();
   const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
   })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGY2ZWY5OGY0YTc1ODJlOGNjNjIwZWRhNDAyN2ZlZCIsIm5iZiI6MTczNDM3NjE2MS41NTAwMDAyLCJzdWIiOiI2NzYwN2FlMWFlODFhM2U0MzQ3ODMwZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Nsnos8MrI8M3PLQ35lwdwv_G2UU5mhurrIANH5X8K9Q'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
 
  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=>navigate(-2)} />
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title="trailer" frameBorder='0' allowFullScreen></iframe>
    <div className="player-info">
      <p>{apiData.published_at.slice(0,10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.typeof}</p>
    </div>
    </div>
  )
}

export default Player
