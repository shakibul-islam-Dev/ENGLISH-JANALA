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
    .then((data) => {
      removeActive()
      const clickBtn = document.getElementById(`lesson-btn-${id}`)
      clickBtn.classList.add('active')

      dispalyLessonWord(data.data)
    })
}
const removeActive = () => {
  const lessonButton = document.querySelectorAll('.lesson-btn')
  lessonButton.forEach((btn) => btn.classList.remove('active'))
}

const dispalyLessonWord = (words) => {
  const wordContainer = document.getElementById('word-container')
  wordContainer.innerHTML = ''

  if (words.length == 0) {
    wordContainer.innerHTML = ` <div
        class="text-center col-span-full space-y-4 rounded-xl py-20"
      >
         <img class="mx-auto" src="./assets/alert-error.png" alt="" />
        <p class="hind-siliguri font-medium text-xl text-gray-500">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="hind-siliguri font-bold text-5xl">
          নেক্সট Lesson এ যান
        </h2>
      </div>`

    return
  }
  words.forEach((word) => {
    const wordDiv = document.createElement('div')
    wordDiv.innerHTML = `
                       <div
        class="bg-gray-100 rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="hind-siliguri font-bold text-3xl">${word.word ? word.word : 'কোন শব্দ পাওয়া যায় নি'}</h2>
        <p class="hind-siliguri font-semibold text-xl">
          Meaning /Pronounciation
        </p>
        <p class="hind-siliguri font-semibold text-3xl"> ${word.meaning ? word.meaning : 'কোন অর্থ পাওয়া যায় নি'} / ${word.pronunciation ? word.pronunciation : 'কোন উচ্চারণ পাওয়া যায় নি'}</p>
        <div class="flex justify-between items-center">
          <button class="btn hover:bg-sky-400">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn hover:bg-sky-400">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
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
                        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})
                        "class="btn lesson-btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
                        </button>`
    lessonContainer.appendChild(btndiv)
  }
}
