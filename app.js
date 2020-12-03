const postContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

let page = 1

const getPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
  return response.json()
}

//{id, title, body}

const addPostsIntoDOM = async () =>{
  const posts = await getPosts()
  const postsTemplate = posts.map((item) => {
    return (`<div class="post">
      <div class="number">${item.id}</div>
      <div class="post-info">
        <h2 class="post-title">${item.title}</h2>
        <p class="post-body">${item.body}</p>
      </div>
    </div>`)
  }).join('')

  postContainer.innerHTML += postsTemplate
}

addPostsIntoDOM()

const getMorePosts = () => {
  setTimeout(()=>{
    page++
    addPostsIntoDOM()

  }, 300)

}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show')
    getMorePosts()
  }, 1000)
}

const showLoader = () =>{
  loaderContainer.classList.add('show')
  removeLoader()
}

window.addEventListener('scroll', () =>{
  console.log('scroll')
  const {clientHeight, scrollHeight, scrollTop} = document.documentElement
  const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
  if (isPageBottomAlmostReached){
    showLoader()
  }
})

filterInput.addEventListener('input', event =>{
  const inputValue = event.target.value.toLowerCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach(post => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()

    if (postTitle.includes(inputValue) || postBody.includes(inputValue)){
      post.style.display = 'flex'
      return
    }
    post.style.display = 'none'
  })
})