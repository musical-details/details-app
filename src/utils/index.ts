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

export const fetchFromApi = async (
  endpoint: string,
  data: {
    method: "GET" | "POST" | "DELETE" | "PUT";
    token?: string;
    body?: {};
  }
): Promise<any> => {
  const apiUrl: string = "https://localhost:8080/";
  const response: Response = await fetch(`${apiUrl}${endpoint}`, {
    method: data.method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data.body)
  });
  return await response.json();
};
