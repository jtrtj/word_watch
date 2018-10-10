import $ from 'jquery'
const topWordUrl = 'https://wordwatch-api.herokuapp.com'

$(document).ready(() => {
  getTopWord()
})

const handleResponse = (response) => {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        };
        return Promise.reject(error)
      }
      return json
    })
}

const getTopWord = () => {
  fetch(`${topWordUrl}/api/v1/top_word`)
  .then(handleResponse)
  .then(word => appendTopWord(word["word"]))
}

const appendTopWord = word => {
  let topWord = Object.keys(word).pop()
  let topWordCount = word[`${topWord}`]
  $(".word-count").html(
    `<h2>${topWord}</h2>
    <p>has appeared ${topWordCount} times.</p>
    `
  )
}

const getUserWords = () => {
  let userWords = $("#user-input").val()
  let splitUserWords = userWords.split(" ")
  return splitUserWords
}

const postUserWords = () => {
  let words = getUserWords()
  words.forEach(function(word) {
    postAWord(word)
  })
  getTopWord()
}


const postAWord = word => {
  fetch(`${topWordUrl}/api/v1/words`, newWordPayload(word))
  .then(handleResponse)
  .then(response => console.log(response))
}

const newWordPayload = word => {
  let wordHash = { word: { value: `${word}` } }
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wordHash)
  }
}

$("#break-down-btn").click( function() {
  postUserWords()
})