<template>
    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex img-magnifier-container">
  <img id="myimage" src="/images/boleto_small.png" alt="mockup">
</div>
</template>

<style>
/* Add your existing styles here */
.img-magnifier-container {
  position: relative;
}

.img-magnifier-glass {
  position: absolute;
  bottom: 100px;
  left: 150px;
  border: 4px solid #999;
  border-radius: 50%;
  cursor: none;
  width: 150px;
  height: 150px;
}
</style>

<script>
export default {
  mounted() {
    this.magnify("myimage", 4); // Adjust the zoom level as needed
  },
  methods: {
    magnify(imgID, zoom) {
      var img = document.getElementById(imgID);
      var glass, w, h, bw;

// Create magnifier glass
glass = document.createElement("DIV");
      glass.setAttribute("class", "img-magnifier-glass");
      img.parentElement.insertBefore(glass, img);


      // Set background properties for the magnifier glass
      glass.style.backgroundImage = "url('" + img.src + "')";
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;

      // Event listeners for moving the magnifier
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);


  // Function to move magnifier glass
  function moveMagnifier(e) {
        var pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}

    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

  // Trigger the move at initial position
  if (img.complete) {
        triggerInitialMove();
      } else {
        img.addEventListener('load', triggerInitialMove);
      }

      function triggerInitialMove() {
        var e = new MouseEvent("mousemove", {
          clientX: img.getBoundingClientRect().left + window.pageXOffset + 230,
          clientY: img.getBoundingClientRect().top + window.pageYOffset + 515
        });
        glass.dispatchEvent(e);
      }
      // img.addEventListener('mouseenter', () => {
      //   this.mouseInImage = true;
      // });

      // img.addEventListener('mouseleave', () => {
      //   this.mouseInImage = false;
      //   setTimeout(() => {
      //     if (!this.mouseInImage) {
      //       returnToStart();
      //     }
      //   }, 1500); // Delay to ensure no conflicting mousemove event
      // });

      // function returnToStart() {
      //   var e = new MouseEvent("mousemove", {
      //     clientX: img.getBoundingClientRect().left + window.pageXOffset + 250,
      //     clientY: img.getBoundingClientRect().top + window.pageYOffset + 480
      //   });
      //   glass.dispatchEvent(e);
      // }
}
  }
}
</script>