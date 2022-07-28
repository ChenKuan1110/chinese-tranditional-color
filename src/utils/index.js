// 利用 AudioContext 对象发声
export function makeVoice () {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!window.AudioContext) return;

  // 声音频率数组
  const arrFrequency = [523.25, 587.33, 659.25, 698.46, 783.99];
  let start = 0,
    direction = 1;
  for (let i = 0; i < 54000; i++) {
    if (i % 30000 === 0) {
      // 创建音频上下文
      const audioCtx = new AudioContext();
      let frequency = arrFrequency[start];
      if (!frequency) {
        direction = -1 * direction;
        start = start * 2 * direction;
        frequency = arrFrequency[start];
      }
      start = start + direction; // 改变索引
      // 创建振荡器波形， （创建一个音调）
      const oscillator = audioCtx.createOscillator();
      // 创建 gainNode, 可以控制音频的总音量
      const gainNode = audioCtx.createGain();
      // 把音高、音调和终点进行关联
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      // 指定音调类型
      oscillator.type = "sine"; // 正弦
      // 设置当前音调频率
      oscillator.frequency.value = frequency;
      // 当前时间设置音量为0
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      // 0.01 s 后音量为1
      gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      // 从当前时间播放音量
      oscillator.start(audioCtx.currentTime);
      // 1 s 内声音慢慢降低
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + 1
      );
      // 1 s后声音完成停止
      oscillator.stop(audioCtx.currentTime + 1);
    }
  }
}


