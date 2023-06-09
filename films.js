let URL = 'http://localhost:3000/films'
const listHolder = document.getElementById('films')
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementsByClassName('film item')[0].remove()
    fetchMovies(URL)
})
function fetchMovies(URL){
    fetch(URL)
    .then(resp => resp.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie)
        });
    })
}
function displayMovie(movie){
    const list = document.createElement('li')
    list.style.cursor="cell"
    list.textContent= (movie.title)
    listHolder.appendChild(list)
    addClickEvent()
    
}
function addClickEvent(){
    let children=listHolder.children
    for(let i=0; i<children.length; i++){
        let child=children[i]
        child.addEventListener('click',() => {
            fetch(`${URL}/${i+1}`)
            .then(res => res.json())
            .then(movie => {
                document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                setUpMovieDetails(movie)
            })
        })
    }
}
function setUpMovieDetails(funMovie){
    const preview = document.getElementById('poster')
    preview.src = funMovie.poster;
    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = funMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${funMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = funMovie.description;
    const showTime = document.querySelector('#showtime')
    showTime.textContent = funMovie.showtime;
    const tickets  = document.querySelector('#ticket-number')
    tickets.textContent = funMovie.capacity -funMovie.tickets_sold;
}
const btn = document.getElementById('buy-ticket')
        btn.addEventListener('click', function(event){
            let remainingTickets = document.querySelector('#ticket-number').textContent
            event.preventDefault()
            if(remainingTickets > 0){
                document.querySelector('#ticket-number').textContent  = remainingTickets-1
            }
            else if(parseInt(remTickets, 10)===0){
                btn.textContent = 'Sold Out'
            }
    })