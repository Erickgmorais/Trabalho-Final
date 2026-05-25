const prompt = require("readline-sync");

function createCharacter(name, age, yourClass) {
    const character = {
        name: name,
        age: age,
        class: yourClass,
    };
    return character;
}

function generateEnemy(enemies) {
    while (enemies.length > 0) {
        let enemiesRandom = Math.floor(Math.random() * enemies.length);
        let enemyDelete = enemies[enemiesRandom];
        enemies.splice(enemiesRandom, 1);
        return enemyDelete;
  }
}

function attack(character, enemy) {
    let damage = character.attack();
    enemy[1].health - damage;
    if (damage === 0) {
        return "morto";
    } else {
        return damage;
    }
}

function defend(character) {

}

function usePotion(character) {
    if (character.potions > 0) {
        character.health = character.health + 15
        character.potions = character.potions - 1
        return character.potions
    } else {
        return 'No potions'
    }
    return character
}

function combatMenu() {

}

function startCombat(character, enemy) {

}
//creating classes with objects
let warrior = {
    className: "Warrior",
    health: 140,
    defense: 12,
    potions: 3,
    attack: function () {
        console.log("⚒️ The warrior strikes with a powerful attack!");

        let damage = Math.floor(Math.random() * 15) + 15;

        return damage;
    },
};
let ranger = {
    className: "Ranger",
    health: 120,
    defense: 10,
    potions: 3,
    attack: function () {
        console.log("🏹 The ranger strikes with a powerful attack!");

        let damage = Math.floor(Math.random() * 15) + 20;

        return damage;
    },
};

let wizzard = {
    className: "Ranger",
    health: 110,
    defense: 8,
    potions: 3,
    attack: function () {
        console.log("🪄 The wizzard strikes with a powerful attack!");

        let damage = Math.floor(Math.random() * 15) + 30;

        return damage;
    },
};
//Creating enemies with objects
let enemies = [
  {
    name: "Gorak",
    health: 65,
    minDamage: 15,
    maxDamage: 23,
  },
  {
    name: "Morthis",
    health: 75,
    minDamage: 10,
    maxDamage: 18,
  },
  {
    name: "Zargul",
    health: 50,
    minDamage: 20,
    maxDamage: 28,
  },
  {
    name: "Velkan",
    health: 100,
    minDamage: 10,
    maxDamage: 15,
  },
  {
    name: "Nyrax",
    health: 45,
    minDamage: 25,
    maxDamage: 33,
  },
];

console.log(attack(wizzard, enemies));
console.log(generateEnemy(enemies));
console.log(usePotion(wizzard))