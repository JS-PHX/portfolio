function toggleOverlay(element) {
  var overlay = element.querySelector('.overlay, .overlay1, .overlay2');
  if (overlay) {
    overlay.classList.toggle('active');
  }
}

function toggleOverlayVisibility(event) {
  event.stopPropagation();
  this.classList.remove('active');
}

var overlayElements = document.querySelectorAll('.overlay, .overlay1, .overlay2');
overlayElements.forEach(function (element) {
  element.addEventListener('click', toggleOverlayVisibility);
});

function isElementVisible(element) {
  var rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function handleScroll() {
  overlayElements.forEach(function (element) {
    if (element.classList.contains('active') && !isElementVisible(element)) {
      toggleOverlay(element.closest('.section') || element.closest('.box'));
    }
  });
}



window.addEventListener('scroll', handleScroll);

function showOverlay() {
  var overlays = document.querySelectorAll('.box .overlay, .section .overlay1, .section .overlay2');
  overlays.forEach(function (overlay) {
    overlay.classList.add('active');
  });
}

function hideOverlay() {
  var overlays = document.querySelectorAll('.box .overlay, .section .overlay1, .section .overlay2');
  overlays.forEach(function (overlay) {
    overlay.classList.remove('active');
  });
}




document.addEventListener('DOMContentLoaded', function() {
  let progressBar = document.querySelector('.progress-bar');

  window.addEventListener('scroll', function() {
    let scrollPos = window.scrollY;
    let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    let percentScrolled = (scrollPos / documentHeight) * 100;
    progressBar.style.width = percentScrolled + '%';
  });


let character = document.querySelector(".character");
let block = document.querySelector(".block");
let isGameOver = false;
let isJumping = false;
let gameStarted = false;

function startGame() {
  if (!gameStarted && !isGameOver) {
    gameStarted = true;
    reset();
    startBlockAnimation();
  }
}

function startBlockAnimation() {
  block.style.animation = "block 1s infinite linear";
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    if (character.classList != "animate") {
      character.classList.add("animate");
    }
    setTimeout(function() {
      isJumping = false;
      character.classList.remove("animate");
    }, 500);
  }
}

function reset() {
  character.style.top = "150px";
  block.style.animation = "block 1s infinite linear";
  block.style.left = "480px";
  isGameOver = false;
}

var checkDead = setInterval(function() {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var characterBottom = characterTop + character.offsetHeight;
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var blockRight = blockLeft + block.offsetWidth;

  // Check for collision
  if (blockLeft < character.offsetWidth && blockRight > 0 && characterBottom >= 250) {
    block.style.animation = "none";
    clearInterval(checkDead); // Stop the interval
    document.getElementById("lose").textContent = "REFRESH TO PLAY";
    isGameOver = true;
    gameStarted = false; // Reset gameStarted flag
  }
}, 10);

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    jump();
  }
});

document.getElementById("reset").addEventListener("click", reset);

document.getElementById("startButton").addEventListener("click", startGame);
})

function toggleOverlay(element) {
  var overlay = element.querySelector('.overlay');
  overlay.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section, .box, .gameDiv');

  function scrollToSection(event) {
    event.preventDefault();
    const target = event.currentTarget.getAttribute('href');
    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  sections.forEach(function(section) {
    section.addEventListener('click', scrollToSection);
  });

  let isScrolling = false;

  window.addEventListener('scroll', function() {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      // Add snap scrolling behavior here
      const currentPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      const targetSection = Array.from(sections).reduce(function(closestSection, section) {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;

        if (Math.abs(sectionCenter - windowHeight / 2) < Math.abs(closestSection.center - windowHeight / 2)) {
          return {
            section: section,
            center: sectionCenter
          };
        }
        return closestSection;
      }, {
        section: null,
        center: Infinity
      });

      if (targetSection.section) {
        targetSection.section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  });
});

const nightModeSwitch = document.getElementById('night-mode-switch');
const body = document.body;

let isNightMode = false;

nightModeSwitch.addEventListener('click', function() {
  isNightMode = !isNightMode;
  document.documentElement.classList.toggle('night-mode', isNightMode);
  if (isNightMode) {
    body.classList.add('night-mode');
    document.getElementById("night-mode-label").textContent = "LIGHT"
    document.getElementById("night-mode-label").style.color = "WHITE";
  } else {
    body.classList.remove('night-mode');
    document.getElementById("night-mode-label").textContent = "DARK"
    document.getElementById("night-mode-label").style.color = "BLACK";
  }
});







// let character = document.getElementById("character");
// let block = document.getElementById("block");


// function jump(event) {
//   if (event.keyCode === 32) { // Check if spacebar is pressed
//     character.classList.add("animate");
//     setTimeout(function() {
//       character.classList.remove("animate");
//     }, 500);
//   }
// }

// if (character.classList != "animate") {
//     character.classList.add("animate")
//  };

//  var checkDead = setInterval(function() {
//   var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
//   var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  
//   // Check for collision
//   if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
//     block.style.animation = "none";
//     alert("Game over!"); // Show game over message
//     clearInterval(checkDead); // Stop the interval
//   }
// }, 10);

//      function reset() {
//         character.style.top = "150px";
//         block.style.animation = "block 1s infinite linear";
//         block.style.left = "480px";
//         }

//         if(blockLeft<20 && blockLeft>0 && characterTop>=130){
//             block.style.animation = "none";
//             alert("caught");
//             reset(); // call the reset function to reset the game state
//         }
//       });




// document.addEventListener("DOMContentLoaded", function() {

//   let character = document.querySelector(".character");
//   let block = document.querySelector(".block");
  
//   function jump() {
//     let character = document.querySelector(".character");
//     character.classList.add("animate");
  
//     setTimeout(function () {
//       character.classList.remove("animate");
//     }, 500);
//   }
    
//   let checkStatus = setInterval(function(){
//     let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
//     let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
//     if(blockLeft <20 && blockLeft > 0 && characterTop >= 130){
//       block.style.animation = "none";
//       block.style.display = "none"
//       alert("lose")
//     }
//   },10)
// })  
