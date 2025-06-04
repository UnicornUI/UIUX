
// 获取父元素
const list = document.querySelector(".list");

let sourceNode;
let flipper;
list.ondragstart = (e) => {
  setTimeout(() => {
    e.target.classList.add('moving')
  },0);
  sourceNode = e.target;
  e.dataTransfer.effectAllowed = "move";

  // 给那些对象添加动画监控，动画持续时间
  flipper = new Flip(list.children, 0.3);

}

list.ondragover = (e) => {
  e.preventDefault();
}

list.ondragenter = (e) =>  {
  e.preventDefault();
  if (e.target === list || e.target === sourceNode) {
    return;
  }

  const children = Array.from(list.children)
  const sourceIndex = children.indexOf(sourceNode)
  const targetIndex = children.indexOf(e.target)
  if (sourceIndex < targetIndex) {
    console.log("向下移动")
    list.insertBefore(sourceNode, e.target.nextElementSibling);
  }else {
    list.insertBefore(sourceNode, e.target);
    console.log("向上移动");
  }
  // 每次拖动进入另一个元素开始的时候开始执行动画
  flipper.play()
}

list.ondragend = (e) => {
  e.target.classList.remove("moving")
}






