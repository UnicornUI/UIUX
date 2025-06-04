document.addEventListener("DOMContentLoaded", function () {
  const c = document.getElementById("wrapper");
  const o = document.getElementById("v-1");
  const m = document.getElementById("v-2");

  m.addEventListener("mousemove", function (e) {
    const { left, top, width, height } = this.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const offsetx = x / width;
    const offsety = y / height;

    m.style.backgroundPositionX = offsetx * 100 - 9 + "%";
    m.style.backgroundPositionY = offsety * 100 - 9 + "%";
    m.style.left = x - 180 + "%";
    m.style.top = y - 180 + "%";
  });
});
