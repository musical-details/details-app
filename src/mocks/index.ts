const randomWave = (): Array<number> => {
  let wave: Array<number> = [];
  let min: number = Math.ceil(30);
  let max: number = Math.floor(90);

  for (let i = 0; i < 200; ++i) {
    wave.push(Math.floor(Math.random() * (max - min)) + min);
  }

  return wave;
};

export default {
  randomWave
};
