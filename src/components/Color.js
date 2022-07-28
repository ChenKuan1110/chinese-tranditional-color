export class ColorBaox {
  constructor({title, desc, tag, colors}) {
    this.title = title;
    this.desc = desc;
    this.tag = tag;
    this.colors = colors;
  }


  // 初始化组件
  #init () {
    this.#create();
  }

  // 创建 dom
  #create () {
    const container = document.createElement('div');
    container.classList.add('color-container');
    // title
    const title = document.createElement('h1');
    title.classList.add('color-title');
    title.innerText = this.title;
    // desc
    const desc = document.createElement('div');
    desc.classList.add('color-desc');
    desc.innerText = this.desc;
    // colors
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-container')
  }

  // 绑定事件
  #bindEvent () {
    
  }
}