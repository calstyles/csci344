/**
 * Your logic here (do it however you want).
 * 
 * The things you have to have:
 *    1. A function (i.e., "Event Handler") to initiate the search.
 *    2. Logic to take the user inputs to build the search query.
 *    3. Logic to send the search query to the relevant server.
 *    4. Logic to display the results to the screen.
 * 
 * Provider-specific instructions:
 *    1. If you choose Yelp, allow your user to input both a search term
 *       and a location.
 *    2. If you choose Spotify, allow your user to specify both a search term 
 *       and a resource type (album, artist, or track).
 *    3. If you choose Twitter, allow your user to specify both a search term
 *       and a result_type (mixed, recent, or popular).
 */

async function search(){
    const searchTerm = document.querySelector('#search_term').value;
    const location = document.querySelector('#location').value;
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    const headers = new Headers({'Authorization': `Bearer ${"9p7JReQH-5tKdfRvIl4SGfqujuGPT3NC5OlzK7IzOAkpgUoB-R80UuxyZXLcyX04VyWolM3bwktzD101Xck7UvJtcMqlVQcsY_5bRXv1Mln3yXeQdC9VYh5y-3PtY3Yx"}`});
    const params = new URLSearchParams({'location': 'Asheville, NC'});

    // fetch(`${url}?${params}`, {headers})
    // .then(response => {
    //     if (response.ok) {
    //     return response.json();
    //     } else {
    //     throw new Error(`Error: ${response.status}`);
    //     }
    // })
    // .then(data => {
    //     const businesses = data.businesses;
    //     for (const business of businesses) {
    //     console.log(`${business.name} ${business.rating} ${business.location.address1}`);
    //     }
    // })
    // .catch(error => console.error(error));
    
    const response = await fetch(`${url}?${params}`, {headers});
    const data = await response.json();
  
    // console.log(data);
    // console.log(businesses);
    const results = data.businesses.map((business) => {
      const categories = business.categories.map((category) => category.title).join(', ');
      return `
        <div class="result">
          <h2><a href="${business.url}" target="_blank">${business.name}</a></h2>
          <p>${categories}</p>
          <p>${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}</p>
        </div>
      `;
    }).join('');
  
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results;
}
