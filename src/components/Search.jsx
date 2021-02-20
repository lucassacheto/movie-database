import React, { useState } from "react";
//import movies from "../movies";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import MovieInfo from "./MovieInfo";


function Search(props){
    
    const [data, setData] = useState([]);
   
    function changeState(event){
        
        let userInput = event.target.value;
        
        if(userInput.length >= 3) { 

            try {
                fetch("https://www.omdbapi.com/?apikey="+process.env.REACT_APP_API_KEY+"&s="+userInput).then((response) => response.json() ).then( data => setData(data.Search));

                const filtered = data.filter( function ( f ) {
                    return f.Title.toLowerCase().includes(userInput.toLowerCase());
                })    
                props.setState({
                    filtered: filtered, 
                    show: true,
                    userInput: userInput
                })
            } catch (error) {
                console.log("whoops")
            }
            
        }else{
            props.setState({
                filtered: [], 
                show: false,
                userInput: ""
            })
        }
        
    }

    const [movieID, setMovieID] = useState("");

    function showMovie(event){
        setMovieID(event.target.id);
        //console.log(event.target.id)
        props.setState({
            filtered: [], 
            show: false,
            userInput: ""
        })
        document.getElementById("search").value = "";
    }
    
    window.onload = function() {
        document.getElementById("search").focus();
    }

    return (
        <div>
            <div className="omdb"><img src="./assets/popcorn.png" alt="Movies Database" />Movies Database</div>
            <div className="byomdb"><a href="http://www.omdbapi.com/">by OMDb</a> - The Open Movie Database</div>
            <form>
                <div className="boxSearch">
                    <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                    <input className="omdbAutoComplete" id="search" onChange={changeState} placeholder="Start typing to search for movies" autoComplete="off" />
                </div>
            </form>
        
            { props.state.show && (
                <div className="auto-complete">
                    { props.state.filtered.map( m => <div className="item" key={m.imdbID} onClick={showMovie} id={m.imdbID}>{m.Title}</div> )}
                </div>
            )}
            
            { movieID !== "" && (
                <MovieInfo movieID={movieID} state={props.state} />
            )}

            <footer>Lucas Sacheto</footer>

        </div>
    )

}


export default Search;