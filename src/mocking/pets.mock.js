const names = ['Lola', 'Milo', 'Nala', 'Rocky', 'Luna', 'Toby', 'Kira', 'Simba'];
const species = ['dog', 'cat', 'hamster', 'rabbit'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generatePets(count = 100) {
  return Array.from({ length: Number(count) || 0 }, () => ({
    name: pick(names),
    specie: pick(species),
    adopted: false,
  }));
}

module.exports = { generatePets };

