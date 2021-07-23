const sql = require("../db/connection");

exports.addUser = (username, password) => {
  try {
    const queryCommands = {
      username: username,
      pass: password,
    };
    sql.query("INSERT INTO users SET ?", queryCommands);

    console.log(`new user added.`);
    console.log(`username:${username}`);
    console.log(`password:${password}`);
  } catch (error) {
    console.log(error);
  }
};

exports.removeUser = (username, password) => {
  try {
    const queryCommands = [username, password];
    sql.query(
      "DELETE FROM movies where userID = (select id from users where username = ? and pass = ?)",
      queryCommands
    );
    sql.query("DELETE FROM users WHERE username = ? AND pass = ?", user);

    console.log(`User: ${username} has been removed.`);
    console.log(`All movies link to this user have been removed.`);
  } catch (error) {
    console.log(error);
  }
};

// exports.updateUser = (username, password,updateUsername,updatePassword) => {
//   try {
//     const queryCommands = [updateUsername,username, password];
//     sql.query(
//       "UPDATE users set username = ? where ID = (select ID from users where username = ? and pass = ?)",
//       queryCommands
//     );

//     console.log(`User: ${username} has been removed.`);
//     console.log(`All movies link to this user have been removed.`);
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.addMovie = (title, username, password, genre, rating, watched) => {
  try {
    const queryCommands = [title, username, password, rating, genre, watched];
    sql.query(
      "insert into movies set title = ?, userID = (select id from users where username = ? and pass = ?),rating = ?, genreID = (select genreId from genres where genre = ?),watched=?;",
      queryCommands
    );

    console.log(`new movie added by ${username}`);
    console.log(`Title: ${title}`);
    console.log(`genre: ${genre}`);
    console.log(`rating: ${rating}`);
    console.log(`watched: ${watched}`);
  } catch (error) {
    console.log(error);
  }
};

exports.removeMovie = (title, username, password) => {
  try {
    const queryCommands = [title, username, password];
    sql.query(
      "DELETE FROM movies WHERE title = ? AND userID = (SELECT id FROM users WHERE username = ? AND pass = ?);",
      queryCommands
    );

    console.log(`Movie remove by ${username}`);
    console.log(`Title: ${title}`);
  } catch (error) {
    console.log(error);
  }
};

exports.updateMovie = (
  title,
  username,
  password,
  genre,
  rating,
  watched,
  titleUpdate
) => {
  try {
    if (titleUpdate !== undefined) {
      const queryCommands = [titleUpdate, title, username, password];
      sql.query(
        "UPDATE Movies set title=? WHERE title = ? AND userID = (SELECT id FROM users WHERE username = ? AND pass = ?);",
        queryCommands
      );
      title = titleUpdate;
      console.log(`Title updated`);
      console.log(`title: ${title}`);
    } else {
      console.log(`Title: ${title}`);
    }

    if (genre !== undefined) {
      const queryCommands = [genre, title, username, password];
      sql.query(
        "UPDATE Movies set genreID = (SELECT genreID FROM genres WHERE genre = ?) WHERE title = ? AND userID = (SELECT id FROM users WHERE username = ? AND pass = ?);",
        queryCommands
      );
      console.log(`Genre updated`);
      console.log(`Genre: ${genre}`);
    }
    if (rating !== undefined) {
      const queryCommands = [rating, title, username, password];
      sql.query(
        "UPDATE Movies set rating =  ? WHERE title = ? AND userID = (SELECT id FROM users WHERE username = ? AND pass = ?);",
        queryCommands
      );
      console.log(`Rating updated.`);
      console.log(`Rating: ${rating}`);
    }
    if (watched !== undefined) {
      const queryCommands = [watched, title, username, password];
      sql.query(
        "UPDATE Movies set watched =  ? WHERE title = ? AND userID = (SELECT id FROM users WHERE username = ? AND pass = ?);",
        queryCommands
      );
      console.log(`Watched updated.`);
      console.log(`Watched: ${watched}`);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.movieByUser = (user, sortBy) => {
  if (sortBy === undefined) {
    sortBY = "movieID";
  }
  const queryCommands = [user, sortBy];
  sql.query(
    "select movies.title , movies.watched , movies.rating , genres.genre FROM movies Inner JOIN genres ON genres.genreID = movies.genreID WHERE userID = (SELECT ID FROM users WHERE username = ?) ORDER BY ?; ",
    queryCommands,
    (err, results, feild) => {
      if (results !== undefined) {
        console.log("");
        results.map((result) => {
          console.log(`Title: ${result.title}`);
          console.log(`Watched: ${result.watched}`);
          console.log(`Rating: ${result.rating}`);
          console.log(`Genre: ${result.genre}`);
          console.log("");
        });
      } else {
        console.log("There are no movies that fit your search requirment.");
      }
    }
  );
};

exports.movieByGenre = (genre, sortBy) => {
  if (sortBy === undefined) {
    sortBY = "movieID";
  }
  const queryCommands = [genre, sortBy];
  sql.query(
    "select movies.title , movies.watched , movies.rating , users.username FROM movies Inner JOIN users ON users.ID = movies.UserID WHERE genreID = (SELECT genreID FROM genres WHERE genre = ?) ORDER BY ?; ",
    queryCommands,
    (err, results, feild) => {
      console.log(err);

      if (results !== undefined) {
        console.log("");
        results.map((result) => {
          console.log(`User: ${result.username}`);
          console.log(`Title: ${result.title}`);
          console.log(`Watched: ${result.watched}`);
          console.log(`Rating: ${result.rating}`);

          console.log("");
        });
      } else {
        console.log("There are no movies that fit your search requirment.");
      }
    }
  );
};

exports.movieByRating = (rating, sortBy, inequality) => {
  if (sortBy === undefined) {
    sortBY = "movieID";
  }
  const queryCommands = [rating, sortBy];
 if(inequality === "<"){
  sql.query(
    "select movies.title , movies.watched , movies.rating , users.username, genres.genre FROM movies Inner JOIN users ON users.ID = movies.UserID Inner JOIN genres ON genres.genreID = movies.genreID  WHERE rating < ?  ORDER BY ?; ",
    queryCommands,
    (err, results, feild) => {
      if (err !== null) {
        console.log(err);
      }

      if (results !== undefined) {
        console.log("");
        results.map((result) => {
          console.log(`User: ${result.username}`);
          console.log(`Title: ${result.title}`);
          console.log(`Watched: ${result.watched}`);
          console.log(`Rating: ${result.rating}`);
          console.log(`Genre: ${result.genre}`);
          console.log("");
        }) } else {
        console.log("There are no movies that fit your search requirment.");
      }})
}else if (inequality === "<="){
  sql.query(
    "select movies.title , movies.watched , movies.rating , users.username, genres.genre FROM movies Inner JOIN users ON users.ID = movies.UserID Inner JOIN genres ON genres.genreID = movies.genreID  WHERE rating <= ?  ORDER BY ?; ",
    queryCommands,
    (err, results, feild) => {
      if (err !== null) {
        console.log(err);
      }

      if (results !== undefined) {
        console.log("");
        results.map((result) => {
          console.log(`User: ${result.username}`);
          console.log(`Title: ${result.title}`);
          console.log(`Watched: ${result.watched}`);
          console.log(`Rating: ${result.rating}`);
          console.log(`Genre: ${result.genre}`);
          console.log("");
        }) } else {
        console.log("There are no movies that fit your search requirment.");
      }})

        }else if (inequality === "="){
          sql.query(
            "select movies.title , movies.watched , movies.rating , users.username, genres.genre FROM movies Inner JOIN users ON users.ID = movies.UserID Inner JOIN genres ON genres.genreID = movies.genreID  WHERE rating = ?  ORDER BY ?; ",
            queryCommands,
            (err, results, feild) => {
              if (err !== null) {
                console.log(err);
              }
        
              if (results !== undefined) {
                console.log("");
                results.map((result) => {
                  console.log(`User: ${result.username}`);
                  console.log(`Title: ${result.title}`);
                  console.log(`Watched: ${result.watched}`);
                  console.log(`Rating: ${result.rating}`);
                  console.log(`Genre: ${result.genre}`);
                  console.log("");
                }) } else {
                console.log("There are no movies that fit your search requirment.");
              }})

        }else if (inequality === ">="){
          sql.query(
            "select movies.title , movies.watched , movies.rating , users.username, genres.genre FROM movies Inner JOIN users ON users.ID = movies.UserID Inner JOIN genres ON genres.genreID = movies.genreID  WHERE rating >= ?  ORDER BY ?; ",
            queryCommands,
            (err, results, feild) => {
              if (err !== null) {
                console.log(err);
              }
        
              if (results !== undefined) {
                console.log("");
                results.map((result) => {
                  console.log(`User: ${result.username}`);
                  console.log(`Title: ${result.title}`);
                  console.log(`Watched: ${result.watched}`);
                  console.log(`Rating: ${result.rating}`);
                  console.log(`Genre: ${result.genre}`);
                  console.log("");
                }) } else {
                console.log("There are no movies that fit your search requirment.");
              }})

        }else if (inequality === ">"){
          sql.query(
            "select movies.title , movies.watched , movies.rating , users.username, genres.genre FROM movies Inner JOIN users ON users.ID = movies.UserID Inner JOIN genres ON genres.genreID = movies.genreID  WHERE rating > ?  ORDER BY ?; ",
            queryCommands,
            (err, results, feild) => {
              if (err !== null) {
                console.log(err);
              }
        
              if (results !== undefined) {
                console.log("");
                results.map((result) => {
                  console.log(`User: ${result.username}`);
                  console.log(`Title: ${result.title}`);
                  console.log(`Watched: ${result.watched}`);
                  console.log(`Rating: ${result.rating}`);
                  console.log(`Genre: ${result.genre}`);
                  console.log("");
                }) } else {
                console.log("There are no movies that fit your search requirment.");
              }})

        }else{
          console.log("the inequality provided is not recognised please us <=, <, =, >, =>")
        }
     
    }
 

