import Palette from './models/palette';

export default function createFakeData() {
  const palettes = [...Array(40).keys()].map((i) => ({
    nick: `FakeData${i}`,
    colors: ['#000000', '#010101', '#ffffff'],
    tags: ['FakeTag', 'tag2'],
  }));

  Palette.insertMany(palettes, (err, docs) => {
    console.log(docs);
  });
}
