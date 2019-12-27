type Time = {
  signed: string;
  h?: string;
  m: string;
  s: string;
  ms: string;
};

export const convertToMMSSMS = (seconds: number): Time => {
  let m: number = Math.floor(Math.abs(seconds) / 60);
  seconds %= 60;
  let s: number = Math.floor(seconds);
  let ms: number = Math.floor(seconds * 1000) % 1000;
  ms = Math.abs(ms);

  return {
    signed: s < 0 ? `-` : ``,
    m: m < 10 ? `0${Math.abs(m)}` : `${m}`,
    s: Math.abs(s) < 10 ? `0${Math.abs(s)}` : `${Math.abs(s)}`,
    ms: ms < 100 ? (ms < 10 ? `00${ms}` : `0${ms}`) : `${ms}`
  };
};
