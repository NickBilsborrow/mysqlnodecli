require("./db/connection");
const yargs = require("yargs");
const { addUser, addMovie, removeMovie, removeUser, movieByUser, movieByGenre, updateMovie } = require("./utils");
const command = process.argv[2]
const user = yargs.argv.user;
const password = yargs.argv.password;
const title= yargs.argv.title;
const rating = yargs.argv.rating;
const watched = yargs.argv.watched;
const genre = yargs.argv.genre;
const sortBy= yargs.argv.sortby
const titleUpdate = yargs.argv.titleUpdate

const app = () =>{
    if (command === 'add user'){
        console.log(1)
        //add user function from utils
        addUser(user,password)
    }else if(command === 'remove user'){
        removeUser(user,password)
    }else if(command === "add movie") {
        //add movie command from utils
        addMovie(title,user,password,genre,rating,watched)
    } else if (command === "remove movie"){
        removeMovie(title,user,password);
    }else if(command ==="update movie"){
            updateMovie(title,user,password,genre,rating,watched,titleUpdate)
    } else if (command === "movies by user"){
        movieByUser(user,sortBy)
    } else if(command ==="movies by genre"){
        movieByGenre(genre,sortBy)

    }


}
app()
