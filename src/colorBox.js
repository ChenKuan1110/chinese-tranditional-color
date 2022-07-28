import { makeVoice } from './utils'


export class ColorBox{
  constructor(name, colors) {
    this.name = name; // 颜色集名称
    this.colors = colors; // 颜色对象
    this.domElement = this.create(); // 创建 dom 元素
  }

  create () {
    const box = document.createElement('div');
    box.classList.add('color-box');
    const title = document.createElement('header');
    title.innerHTML = this.name;
    const main = document.createElement('div');
    main.classList.add('color-box-main');
    this.colors.forEach(color => {
      const item = document.createElement('div');
      // 在dom上通过设置 data-value , 在css中通过 attr() 获取值，从而设置在 伪类中
      item.setAttribute('data-value', color.value);
      item.classList.add('color-item');
      item.style.backgroundColor = color.value;
      item.innerHTML = color.name;
      item.setAttribute('title', `点击可复制颜色值`)

      // 绑定剪切事件
      this.bindClipEvent(item, color);
      // 绑定点击事件
      item.addEventListener('click', this.#handleClick);
      
      main.appendChild(item);
    });
    // 绑定点击事件
    box.append(title, main);
    return box;
  }

  bindClipEvent (item, color) {
    // 绑定点击事件 copyToClipBorad
    const clipboard = new ClipboardJS(item); // 创建复制触发源
    // 设置  data-clipboard-text 属性
    item.setAttribute('data-clipboard-text', color.value); // 设置复制值

    // clipBorad对象复制成功事件绑定
    clipboard.on('success', e => {
      // console.log(e); // {action, text,trigger, clearSelection}
      // 复制完成，切换样式显示为 copy-done
      item.classList.toggle('copy-done');
      // 移除 copy-done 样式
      setTimeout(() => {
        item.classList.remove('copy-done');
      }, 1000);

      // 增加复制成功🔊
      makeVoice();
    });
  }

  #handleClick (e) {
    const { value } = e.target.dataset; // 获取颜色值
    // 更改 body 背景颜色
    document.body.style.backgroundColor = value;
  }

}