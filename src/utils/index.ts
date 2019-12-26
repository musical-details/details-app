export const convertTimeFormat = (seconds: number):string => {
    let s = Math.floor(seconds);
    let ms = (seconds * 1000) - (Math.floor(seconds) * 1000);
    let date = new Date(0,0,0,0,0, s, ms);
    return '' + ('0' + date.getMinutes()).slice(-2) + 
      ':' + ('0' + date.getSeconds()).slice(-2) + 
      ':' + ('0000' + date.getMilliseconds()).slice(-3);
  }