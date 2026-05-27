const prompt = require('readline-sync');


function createCharacter (name, age, clazz) {
    return {name, age, ...clazz};
}


function generateEnemy (enemies) {
    const enemiesRandom = randomNumber(0, enemies.length -1)
    const enemy = enemies[enemiesRandom]; 
    enemies.splice(enemiesRandom, 1);
    console.log(`A new enemy has been chosen | Name: ${enemy.name} - Health: ${enemy.health}\n`);
    return enemy;
};


function attack(attacker, defender) {
    const damage = defender.defenderMode ? (attacker.attack() / 2) : attacker.attack(); 
    defender.health = defender.health - damage;
    console.log(`${attacker.name} attacks ${defender.name} with ${damage} damage`);
    console.log(`${defender.name} -${damage} damage`);
    console.log(`${defender.name} health is ${defender.health}`);
};


function enableDisableDefenderMode(defender, enable) {
    defender.defenderMode = enable;
    console.log(`${defender.name} ${enable ? 'activated' : 'disabled'} defense mode`);
}


function usePotion (character) {
    if (character.potions === 0) {
        console.log('No more potions');
        return;
    }
    character.health = character.health + 15;
    character.potions = character.potions - 1;
    console.log(`${character.name} +15 health - Total health: ${character.health} | Total potions: ${character.potions}`)
}


function combatMenu() {
    console.log(`===============\n⚔️ COMBAT TURN ⚔️\n===============\n1 - Attack\n2 - Defend\n3 - Use Potion\n`);
    return prompt.question('Select an option: ');
};


function randomPlayEnemy(character, enemy) {
    const randomOption = randomNumber(1, 2);

    if (randomOption === 1) {
        enableDisableDefenderMode(enemy, true);
        return;
    }

    attack(enemy, character);
    if (character.defenderMode) {
        enableDisableDefenderMode(character, false);
    }
};


function characterAttack(character, enemy) {
    attack(character, enemy);
    if (enemy.defenderMode) { 
        enableDisableDefenderMode(enemy, false)
    };
}


function startCombat(character, enemy) {
    const actions = [
        { option: '1', exec: () => characterAttack(character, enemy) }, 
        { option: '2', exec: () => enableDisableDefenderMode(character, true) },
        { option: '3', exec: () => usePotion(character) },
    ];

    while (true) {
        const option = combatMenu();
        const action = actions.find(a => a.option === option);

       
        if (!action) {
            console.log('Invalid option, select again.');
            continue;
        }

        action.exec();

        
        if (enemy.health <= 0) {
            console.log(`${enemy.name} is dead!`);
            break;
        }

        
        randomPlayEnemy(character, enemy);

        
        if (character.health <= 0) {
            console.log(`${character.name} is dead!`);
            break;
        }
    }
};


function attackClass() {
    return randomNumber(15, 30);

} 


function attackEnemy() {
    return randomNumber(this.minDamage, this.maxDamage)
};

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function chooseCharacter() {
    const name = prompt.question('Type your name: ');
    const age = prompt.question('Type your age: ');
    const chooses = typesClass.map((type, i) => `${i+1} - ${type.className}`);
    

    
    while (true) {
        const typeClass = Number(prompt.question('Type your class: \n' + chooses.join('\n') + '\n'));
        const characterClass = typesClass[typeClass - 1];
        if (characterClass) { 
            return createCharacter(name, age, characterClass)
        };
        console.log('Invalid class, select again.');
    }
};


const typesClass = [
    { className: 'Warrior', health: 150, potions: 3, attack: attackClass, defenserMode: false },
    { className: 'Ranger', health: 120, potions: 3, attack: attackClass, defenserMode: false },
    { className: 'Wizard', health: 140, potions: 3, attack: attackClass, defenserMode: false },
];


const enemies = [
    { name: 'Gorak', health: 80, minDamage: 15, maxDamage: 23, attack: attackEnemy, defenserMode: false },
    { name: 'Morthis', health: 90, minDamage: 10, maxDamage: 25, attack: attackEnemy, defenserMode: false },
    { name: 'Zargul', health: 50, minDamage: 20, maxDamage: 28, attack: attackEnemy, defenserMode: false },
    { name: 'Velkan', health: 100, minDamage: 10, maxDamage: 15, attack: attackEnemy, defenserMode: false },
    { name: 'Nyrax', health: 45, minDamage: 25, maxDamage: 33, attack: attackEnemy, defenserMode: false },
];


console.log('Welcome to the game, the best game ever!\n');
console.log('Create your character!\n');
const character = chooseCharacter();
console.log(`Character has been created!\nName: ${character.name} | Health: ${character.health}`);


while (character.health > 0 && enemies.length > 0) {
    const enemy = generateEnemy(enemies)
    console.log('Start a new combat!\n');
    startCombat(character, enemy)
}

console.log(character.health > 0 ? 'You won!' : 'You lost!');
console.log('End game!\n');
