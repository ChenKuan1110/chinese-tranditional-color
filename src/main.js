// 全局样式
import './style.css';

import tranditionalColors from './colors'
import { ColorBox } from './colorBox';

// 颜色数据
import colors from './data/colors.json';

for(let month in colors){
  const monthColorArray = colors[month];
  monthColorArray.forEach(colorObj => {
    // console.log(colorObj);
    const {title, colors, desc, tag} = colorObj;
  });
}




for(let key in tranditionalColors){
  const colorBox = new ColorBox(key, tranditionalColors[key])
  // console.log(colorBox)
  document.querySelector('#app').appendChild(colorBox.domElement);
}
