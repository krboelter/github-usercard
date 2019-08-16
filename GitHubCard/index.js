/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const followersArray = [];
const followingArray = [];
let myFollowers;
let peopleFollowing;

const cardsSection = document.querySelector('.cards');
axios.get('https://api.github.com/users/krboelter')
  .then(userData => {
    let followersArray = [];
    axios.get('https://api.github.com/users/krboelter/followers')
      .then(followers => {
        followersArray = followers.data.map(follower => follower.login)

        followersArray.forEach(followerLogin => {
          axios.get(`https://api.github.com/users/${followerLogin}`)
            .then(followerData => {
              cardsSection.appendChild(createCard(followerData.data))
            })
            .catch(error => console.error(error))
        })
      })
      .catch(error => console.error(error))
    cardsSection.appendChild(createCard(userData.data));
  })
  .catch(error => {
    console.error(error)
  })


function createCard(obj, followers) {
  let div = document.createElement('div');
  div.classList.add('card')

  let img = document.createElement('img');
  img.src = obj.avatar_url
  div.appendChild(img)

  let cardInfoDiv = document.createElement('div');
  cardInfoDiv.classList.add('card-info')
  div.appendChild(cardInfoDiv)

  let h3 = document.createElement('h3');
  h3.classList.add('name')
  h3.textContent = `${obj.name}`
  cardInfoDiv.appendChild(h3)

  let userNameP = document.createElement('p');
  userNameP.classList.add('username')
  userNameP.textContent = `${obj.login}`
  cardInfoDiv.appendChild(userNameP)

  let locationP = document.createElement('p');
  locationP.textContent = `Location: ${obj.location}`
  cardInfoDiv.appendChild(locationP)

  let profileP = document.createElement('p');
  let a = document.createElement('a');
  a.href = `${obj.html_url}`
  a.textContent = `Profile: ${obj.html_url}`
  profileP.appendChild(a)
  cardInfoDiv.appendChild(profileP)

  let followersP = document.createElement('p');
  followersP.textContent = `Followers: ${obj.followers}`
  cardInfoDiv.appendChild(followersP)

  let followingP = document.createElement('p');
  followingP.textContent = `Following: ${obj.following}`
  cardInfoDiv.appendChild(followingP)

  let bioP = document.createElement('p');
  bioP.textContent = `${obj.bio}`
  cardInfoDiv.appendChild(bioP)

  return div
}
