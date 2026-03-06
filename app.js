const createArray = (arr) => {
  const sapnElement = arr.map(
    (el) => `<span class="syno btn gap-1">${el}</span>`,
  )
  return sapnElement.join('')
}

const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((response) => response.json())
    .then((json) => dispalyLesson(json.data))
}
loadLessons()

const loadLevelWord = (id) => {
  managesping(true)
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
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url)
  const detail = await res.json()
  dispalyWordDetails(detail.data)
  // const detials_container = document.getElementById('detials_container')
  // document.getElementById('my_modal_5').showModal()
}

const managesping = (status) => {
  if (status == true) {
    document.getElementById('spiner').classList.remove('hidden')
    document.getElementById('word-container').classList.remove('hidden')
  } else {
    document.getElementById('word-container').classList.remove('hidden')
    document.getElementById('spiner').classList.add('hidden')
  }
}

const dispalyWordDetails = (word) => {
  const detials_container = document.getElementById('detials_container')
  document.getElementById('my_modal_5').showModal()
  detials_container.innerHTML = `
    <h2 class="text-2xl font-bold">
            ${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
          </h2>
          <div class="">
            <h2 class="text-xl font-medium">Meaning</h2>
            <p class="text-xl">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="text-xl font-medium">Example</h2>
            <p class="text-xl">${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="text-xl font-medium">সমার্থক শব্দ গুলো</h2>
            
              ${createArray(word.synonyms)}
          </div>`
  console.log(word)
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
    managesping(false)
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
          <button onclick="loadWordDetails(${word.id})" class="btn hover:bg-sky-400">
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
  managesping(false)
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
