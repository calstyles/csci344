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
    const headers = new Headers({'Authorization': `Bearer ${"tmUoQOPdO6WqBnNTs6XGtWnBz0jOOAuigdAy_-jfqC92VPqb0w1gYgQ8_6en6DyhAmkTrrC0HfXdoL3NtdEP_t02TSPP8z2GdzQpjzC0_8Q3KTS5c9Nx-9XFNwHvY3Yx"}`});
    const params = new URLSearchParams({'term': searchTerm, 'location': location});

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
