

document.addEventListener("mousemove", particleEffects)

function particleEffects( e){
  const particle = document.createElement("span") 
  particle.classList.add("particle");

  document.body.append(particle);
  let x = e.pageX;
  let y = e.pageY;

  particle.style.top = y + "px";
  particle.style.left = x + "px";


  let sizes = Math.floor(Math.random() * 300);

  particle.style.width = `${sizes + 50}px`;
  particle.style.height = `${sizes + 50}px`;

  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  particle.style.borderColor = `rgb(${red}, ${green}, ${blue})`


  setTimeout(function(e){
    particle.remove();
  }, 800)


}

