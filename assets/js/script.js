document.addEventListener('DOMContentLoaded', () => {
  const run = document.querySelector('.run')
  const scoreCounter = document.querySelector('span')
  const screen = document.querySelectorAll('.screen div')

  const width = 10
  let position = 0 
  let applePosition = 0 
  let player = [2,1,0] 
  let direction = 1
  let score = 0
  let speed = 1
  let intervalTime = 0
  let interval = 0

  function startGame() {
    player.forEach(index => screen[index].classList.remove('snake'))
    screen[applePosition].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreCounter.innerText = score
    intervalTime = 1000
    player = [2,1,0]
    position = 0
    player.forEach(index => screen[index].classList.add('snake'))
    interval = setInterval(movements, intervalTime)
  }

  function movements() {

    if (
      (player[0] - width < 0 && direction === -width) ||  //top
      (player[0] + width >= (width * width) && direction === width ) || //bottom
      (player[0] % width === width -1 && direction === 1) || //right wall
      (player[0] % width === 0 && direction === -1) || //left wall
      screen[player[0] + direction].classList.contains('snake') //if you hits yourself
    ) {
      return clearInterval(interval)
    }

    const tail = player.pop()
    screen[tail].classList.remove('snake')
    player.unshift(player[0] + direction)

    if(screen[player[0]].classList.contains('apple')) {
      screen[player[0]].classList.remove('apple')
      screen[tail].classList.add('snake')
      player.push(tail)
      randomApple()
      score++
      scoreCounter.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(movements, intervalTime)
    }
    screen[player[0]].classList.add('snake')
  }
  function randomApple() {
    do{
      applePosition = Math.floor(Math.random() * screen.length)
    } while(screen[applePosition].classList.contains('snake'))
    screen[applePosition].classList.add('apple')
  }
  function control(e) {
    screen[position].classList.remove('snake')
    if(e.keyCode === 39) {
      direction = 1 
    } else if (e.keyCode === 38) {
      direction = -width 
    } else if (e.keyCode === 37) {
      direction = -1 
    } else if (e.keyCode === 40) {
      direction = +width 
    }
  }
  document.addEventListener('keyup', control)
  run.addEventListener('click', startGame)
})
