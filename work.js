const prompt= require('readline-sync');

// Cria o novo personagem com as caracteristicas da classe escolhida
function createCharacter (name, age, clazz) {
    return {name, age, ...clazz};
}

// Escolhe um inimigo aleatorio
function generateEnemy (enemies) {
    const enemiesRandom = randomNumber(0, enemies.length - 1)// Gera um indice aleatorio entre 0 e o ultimo indice da lista;
    const enemy = enemies[enemiesRandom];// Pega o indice gerado e acessa minha lista 
    enemies.splice(enemiesRandom, 1); //Splice vai pegar o indice gerado e remover ele da lista
    console.log(`A new enemy has been chosen | Name: ${enemy.name} - Health: ${enemy.health}\n`);
    return enemy;
};

// Realiza o ataque de fato de ambos os lados
function attack(attacker, defender) {
    const damage = defender.defenderMode ? (attacker.attack() / 2) : attacker.attack(); // SE meu defender for true. Ataque divido por 2. SE NAO ataque normal
    defender.health = defender.health - damage;
    console.log(`${attacker.name} attacks ${defender.name} with ${damage} damage`);
    console.log(`${defender.name} -${damage} damage`);
    console.log(`${defender.name} health is ${defender.health}`);
};

// Ativa/Desativa o modo defesa
function enableDisableDefenderMode(defender, enable) {
    defender.defenderMode = enable;
    console.log(`${defender.name} ${enable ? 'activated' : 'disabled'} defense mode`);
}

// Usa a poção
function usePotion (character) {
    if (character.potions === 0) {
        console.log('No more potions');
        return;
    }

    character.health = character.health + 15;
    character.potions = character.potions - 1;
    console.log(`${character.name} +15 health - Total health: ${character.health} | Total potions: ${character.potions}`)
}

// Menu de combate
function combatMenu() {
    console.log(`===============\n⚔️ COMBAT TURN ⚔️\n===============\n1 - Attack\n2 - Defend\n3 - Use Potion\n`);
    return prompt.question('Select an option: ');
};

// Jogada randomica do inimigo
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

// Faz um ataque do personagem no inimigo, e desativa o modo defesa do inimigo caso esteja ativo
function characterAttack(character, enemy) {
    attack(character, enemy);
    if (enemy.defenderMode) enableDisableDefenderMode(enemy, false);
}

// Função que controla o fluxo do combate
function startCombat(character, enemy) {
    const actions = [
        { option: '1', exec: () => characterAttack(character, enemy) },
        { option: '2', exec: () => enableDisableDefenderMode(character, true) },
        { option: '3', exec: () => usePotion(character) },
    ];

    while (true) {
        const option = combatMenu();
        const action = actions.find(a => a.option === option);

        // Se não encontrou uma ação valida, volta ao menu
        if (!action) {
            console.log('Invalid option, select again.');
            continue;
        }

        action.exec();

        // caso o inimigo seja morto, faz um break para voltar para o loop principal
        if (enemy.health <= 0) {
            console.log(`${enemy.name} is dead!`);
            break;
        }

        // executa jogada randomica do inimigo
        randomPlayEnemy(character, enemy);

        // caso o personagem seja morto, faz um break para voltar para o loop principal
        if (character.health <= 0) {
            console.log(`${character.name} is dead!`);
            break;
        }
    }
};

// Ataque randomico da classe do personagem
function attackClass() {
    return randomNumber(15, 30);

} 

// Ataque randomico do inimigo com valor entre minimo e maximo de dano
function attackEnemy() {
    return randomNumber(this.minDamage, this.maxDamage)
};

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Lista de classes
const typesClass = [
    { className: 'Warrior', health: 150, potions: 3, attack: attackClass, defenserMode: false },
    { className: 'Ranger', health: 120, potions: 3, attack: attackClass, defenserMode: false },
    { className: 'Warrior', health: 140, potions: 3, attack: attackClass, defenserMode: false },
];

// Lista de inimigos
const enemies = [
    { name: 'Gorak', health: 80, minDamage: 15, maxDamage: 23, attack: attackEnemy, defenserMode: false },
    { name: 'Morthis', health: 90, minDamage: 10, maxDamage: 25, attack: attackEnemy, defenserMode: false },
    { name: 'Zargul', health: 50, minDamage: 20, maxDamage: 28, attack: attackEnemy, defenserMode: false },
    { name: 'Velkan', health: 100, minDamage: 10, maxDamage: 15, attack: attackEnemy, defenserMode: false },
    { name: 'Nyrax', health: 45, minDamage: 25, maxDamage: 33, attack: attackEnemy, defenserMode: false },
];

// Escolha do personagem no início
function chooseCharacter() {
    const name = question('Type your name: ');
    const age = question('Type your age: ');
    const chooses = typesClass.map((type, i) => `${i+1} - ${type.className}`);

    // Loop para escolher a classe correta, pois o usuario pode digitar algo errado
    while (true) {
        const typeClass = Number(question('Type your class: \n' + chooses.join('\n') + '\n'));
        const characterClass = typesClass[typeClass - 1];
        if (characterClass) return createCharacter(name, age, characterClass);
        console.log('Invalid class, select again.');
    }
};


//Início do jogo
console.log('Welcome to the game, the best game ever!\n');
console.log('Create your character!\n');
const character = chooseCharacter();
console.log(`Character has been created!\nName: ${character.name} | Health: ${character.health}`);

// Se o personagem tem vida e ainda tem inimigo vivo, continua o jogo
while (character.health > 0 && enemies.length > 0) {
    const enemy = generateEnemy(enemies)
    console.log('Start a new combat!\n');
    startCombat(character, enemy)
}

console.log(character.health > 0 ? 'You won!' : 'You lost!');
console.log('End game!\n');

// cenários a serem testados
// 1 - O personagem derrota todos os inimigos e vence
// 2 - O personagem perde toda sua vida e morre
// 3 - Escolher uma classe errada do personagem deve exibir a mensagem 'Invalid class, select again.' e repetir a escolha novamente
// 4 - Escolher uma ação de combate deve exibir a mensagem 'Invalid option, select again.' e repetir a escolha novamente
// 5 - Quando o modo de defesa estiver ativo o dano do ataque deve ser a metade do valor original
// 6 - Após acontecer um ataque o modo de defesa deve ser desativado caso esteja ativo
// 7 - Após acontecer um ataque o modo de defesa deve ser desativado caso esteja ativo
// 8 - Usar uma poção deve aumentar a vida do personagem em 15 pontos em subtrair uma poção do número total de pocoes
// 8 - Usar uma poção sem ter poções restantes deve exibir a mensagem 'No more potions'
