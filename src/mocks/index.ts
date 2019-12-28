import {
  Rating,
  Moment
} from "../core/state/ducks/viewed-track/viewed-track.state";

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomWave = (): Array<number> => {
  let wave: Array<number> = [];
  let min: number = Math.ceil(30);
  let max: number = Math.floor(90);

  for (let i = 0; i < 200; ++i) {
    wave.push(random(min, max));
  }

  return wave;
};

const randomRatings = (trackDuration: number): Array<Rating> => {
  let ratings: Array<Rating> = [];
  for (let i = 0; i < 5; ++i) {
    ratings.push(randomRating(trackDuration, i + 1));
  }
  return ratings;
};

const randomRating = (trackDuration: number, ratingId: number): Rating => {
  let moments: Array<Moment> = [];

  for (let i = 0; i < random(2, 10); ++i) {
    moments.push(randomMoment(trackDuration));
  }

  return {
    ratingId: ratingId,
    user: {
      userId: random(1, 300),
      nickname: `user-${random(1000, 9999)}`,
      avatar: ""
    },
    moments: moments
  };
};

const momentsName: Array<string> = [
  "Bass",
  "Drums",
  "Kick",
  "Pads",
  "Synth",
  "Vocal",
  "Melody",
  "Deep bass",
  "Groove",
  "Background",
  "FX",
  "Chords",
  "Piano",
  "Hi-Hats",
  "Buildup",
  "Drop",
  "All sounds",
  "Keys",
  "Claps",
  "Snare",
  "Chill",
  "GrossBeat effect",
  "Fade effect",
  "Guitar"
];
const momentsColors: Array<string> = [
  "#9C27BD",
  "#00bcd4",
  "#e91e63",
  "#bc209b",
  "#f94922",
  "#56e042",
  "#e0d942",
  "#4292e0",
  "#c36fda",
  "#755e7b",
  "#ffeb70",
  "#ff8870",
  "#95ff70"
];

const randomMoment = (trackDuration: number): Moment => {
  let momentStart = random(0, Math.floor(trackDuration) - 16);
  let momentDuration = random(1, 16);
  let momentEnd = momentStart + momentDuration;
  return {
    name: momentsName[random(0, momentsName.length)],
    description: "",
    color: momentsColors[random(0, momentsColors.length)],
    start: momentStart,
    end: momentEnd,
    timelineSection: random(1, 5)
  };
};

export default {
  randomWave,
  randomRatings
};
