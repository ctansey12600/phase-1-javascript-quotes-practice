//Fetching Quotes
function fetchQuotes(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(res => res.json())
    .then(quotes => quotes.forEach(singleQuote => quotesCard(singleQuote)))
}

//Building Quotes
function quotesCard(singleQuote){
   let card = document.createElement('li')
   card.className = "quote-card"
   card.innerHTML = `
   <blockquote class="blockquote">
   <p class="mb-0">${singleQuote.quote}.</p>
   <footer class="blockquote-footer">${singleQuote.author}</footer>
   <br>
   <button class="btn-success">Likes: <span>0</span></button>
   <button class="btn-danger">Delete</button>
   </blockquote>
   `

   card.querySelector(".btn-success").addEventListener("click", (e) =>{
       let num = parseInt(e.target.childNodes[1].textContent)
       num += 1
       e.target.childNodes[1].textContent = num
       addLikes(singleQuote)
   })
       
   card.querySelector(".btn-danger").addEventListener("click", () => {
       card.remove()
       deleteQuote(singleQuote.id)
   })
   document.getElementById('quote-list').append(card)
   
}

fetchQuotes()

//Adding New Quote
const newItem = document.getElementById("new-quote-form")
newItem.addEventListener('submit', handleSubmit)
function handleSubmit(e){
    e.preventDefault()
    const newQuote = e.target[0].value
    const newAuthor = e.target[1].value
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            quote: newQuote,
            author: newAuthor
        })
    })
    .then(res => res.json())
    .then(res => quotesCard(res))
    
    newItem.reset()
}

//Like Button

function addLikes(singleQuote){
    console.log(singleQuote)
   //fetch(`http://localhost:3000/likes/${singleQuote.id}`, {
     //   method: "POST",
       // headers: {
         //   "Content-Type": "application/json",
           //"accept": "application/json"
       //},
        //body: JSON.stringify({
          //  singleQuote = likes: [{
                 //   quoteId : singleQuote.id
            //    }]
            
           
       // })
   // })
    .then(res => res.json())
    .then(res => console.log(res))
}


//Delete Button

function deleteQuote(id){
    fetch(`http://localhost:3000/quotes/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            "accept": "application/json"
        }
    })
}