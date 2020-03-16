// Instantiate the Parse SDK for Javascript NodeJS
const Parse = require('parse/node')

// Configures the ParseURL to Back4app's API
Parse.serverURL = 'https://parseapi.back4app.com/'

// Initialize Parse with the AppID and Javascript Key
Parse.initialize("w2uAmnikTRYOYXtnPW0RDuzpT7EHmZB61IkTZ2Xy", "AswAQrJur3jHsEe1bJYC1nXG9sHmzSiZMs5HiEzE");

// Async function so we can use Async/Await
async function retrieveMovieSarredByBradPitt(){
    // Extends the class Moviesdatabase_Star, where we will be making queries
    const Star = Parse.Object.extend("Moviesdatabase_Star");    
    // Creates a query object, to query on the Star object created above
    const queryStar = new Parse.Query(Star);
    // Let's find the star which the property name is what we are looking for
    queryStar.equalTo("name", "Brad Pitt");

    // Executes the first method, which retrieves the first object to match the query and holds the result in a variable
    const bradPitt = await queryStar.first();

    // Extends the class Moviesdatabase_Movie, where we will be making queries
    const Movie = Parse.Object.extend("Moviesdatabase_Movie");
    // Creates a query object, to query on the Country object created above
    const query = new Parse.Query(Movie);

    // Let's find the country which the property city is what we are looking for
    query.equalTo("stars", bradPitt);
    
    // We are going to print only the movie name and year, so let's tell Parse we only want this data to avoid overquerying
    query.select('title', 'year')

    // Executes the first method, which retrieves the first object to match the query and holds the result in a variable
    const result = await query.first();

    // Get the properties we are looking for
    let movieTitle = result.get('title')
    let movieYear = result.get('year')
    
    console.log('\tMovie: ' + movieTitle)
    console.log('\t\tMovie Year: ' + movieYear)
}

// Run the method above
retrieveMovieSarredByBradPitt()