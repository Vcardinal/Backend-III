const names = ['Luna', 'Max', 'Toby', 'Simba', 'Milo', 'Nala', 'Rocky', 'Kira'];
const speciesList = ['dog', 'cat', 'rabbit', 'hamster'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generatePets(count = 50) {
  const total = Number(count) || 0;

  const pets = Array.from({ length: total }, (_, i) => {
    return {
      name: `${pick(names)}-${i}`,
      species: pick(speciesList),
      age: Math.floor(Math.random() * 15),
      owner: null,
    };
  });

  console.log(`🐶 Mock pets generados: ${pets.length}`);
  if (pets.length > 0) {
    console.log('🧪 Ejemplo pet mock:', pets[0]);
  }

  return pets;
}

module.exports = { generatePets };

