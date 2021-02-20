import { useState, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';

function MovieInfo(props){
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://www.omdbapi.com/?apikey=956a2093&i="+props.movieID);
                const newData = await response.json();
                setData(newData);
            } catch (error) {
                console.log("whoops")
            }
        };
          getData();
    }, [props.movieID]);
    
    return (
        <CSSTransition in={true} timeout={500} classNames="my-node" appear>
            <div className="info">
                <div className="thumb"><img src={data.Poster} alt={data.Title} /></div>
                <div className="title">{data.Title} </div>
                <div className="year">{data.Year}</div>
                <div className="director">{data.Director}</div>
                <div className="metascore">
     
                <meter max="100" value={data.Metascore} ></meter>
                <div className="metascore">{ data.Metascore }%</div>
                    
                </div>
            </div>
        </CSSTransition>
    )
}

export default MovieInfo;