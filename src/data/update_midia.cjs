const fs = require('fs');
const file = 'c:/Users/diogo/Desktop/personal-website/src/data/midia.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Insert 17, 50, 114, 433
data.push({
  id: 17,
  title: 'Bomtempo e a Maçonaria',
  filename: "/websites/bomtempo - 17/Bomtempo e a M.'.htm",
  type: 'website',
  cover: null
});
data.push({
  id: 50,
  title: 'Biografia de Joaquim Agostinho – RTP Arquivos',
  filename: "/websites/joaquim agostinho - 50/Biografia de Joaquim Agostinho – RTP Arquivos.htm",
  type: 'website',
  cover: null
});
data.push({
  id: 114,
  title: 'De Appelvink',
  filename: "/websites/deappelvink - 114/Home _ De Appelvink.html",
  type: 'website',
  cover: null
});
data.push({
  id: 433,
  title: 'Lino Guerreiro',
  filename: "/websites/lino guerreiro - 433/bio – Lino Guerreiro.htm",
  type: 'website',
  cover: null
});

// find 51 and replace
const album51 = data.find(i => i.id === 51);
if (album51 && Array.isArray(album51.tracks)) {
  album51.tracks.push({
    title: 'Joaquim Agostinho em fotografias e documentários',
    filename: "/websites/joaquim agostinho - 51/Joaquim Agostinho em fotografias e documentários 🚴_♂️💚💛❤️ – Torres Vedras Antiga.htm",
    type: 'website'
  });
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
