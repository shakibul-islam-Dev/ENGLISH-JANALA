const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((response) => response.json())
    .then((json) => dispalyLesson(json.data))
}
loadLessons()

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => dispalyLessonWord(data.data))
}
const dispalyLessonWord = (words) => {
  const wordContainer = document.getElementById('word-container')
  //   wordContainer.innerHTML = ''
  words.forEach((word) => {
    const wordDiv = document.createElement('div')
    wordDiv.innerHTML = `
                     <h1>${word.word}</h1>
                        <p>${word.pronunciation}</p>
                        <p>${word.meaning}</p>
    `
    wordContainer.appendChild(wordDiv)
  })
}
const dispalyLesson = (lessons) => {
  const lessonContainer = document.getElementById('level_contianer')
  lessonContainer.innerHTML = ''
  for (let lesson of lessons) {
    let btndiv = document.createElement('div')
    btndiv.innerHTML = `
                        <button onclick="loadLevelWord(${lesson.level_no})"class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
                        </button>`
    lessonContainer.appendChild(btndiv)
  }
}
