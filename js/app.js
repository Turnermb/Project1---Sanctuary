const gambler = {
    name: "Penelope Claremont",
    title: 'The Gambler',
    hp: 120,
    backStory: "'Gotta steal to eat, gotta eat to live.' Truer words were never spoken for the broken and downtrodden living in The Empire’s capital city Sanctuary. Among those forgotten masses there was one girl who found her calling in the back alley gambling dens that littered her corner of the world. After being bailed out of an unfortunate run in with a guard. Penelope joined player.name on their quest to repay their debt and to 're-appropriate' Urlak Redmaw’s vast fortune.",
    weapon: 'Aces High (Enchanted Playing Cards)',
    attackValue: "2 - 13",
    specialAbility: 'Double or Nothing - Penelope can elect to re-roll her attack roll in favor of a higher one, however, if the second roll does not exceed the value of the first she takes that amount of damage instead.'
}

gamblerAttack = () => {
    let gamblerHit = Math.floor(Math.random() * (14 - 2) + 2)
    let promptAnswer = prompt(`${gambler.name} rolled ${gamblerHit}, Double or Nothing? Yes/No`)
    if (promptAnswer.toUpperCase() === 'YES') {
        let doubleUp = Math.floor(Math.random() * (14 - 2) + 2)
        let doubleUpSuccess = $('<p></p>').text(`The luck of the draw is with ${gambler.name}, she deals ${doubleUp} damage instead of ${gamblerHit}. The enemy has ${currentEnemy.hp}hp remaining.`)
        if (doubleUp > gamblerHit) {
            currentEnemy.hp -= doubleUp
            // $('#prompts').empty()
            $('#prompts').append(doubleUpSuccess).css('color', 'white').css('font-size', '24px')
        } else {
            let doubleUpFail = $('<p></p>').text(`Know when to hold em, know when to fold em. ${gambler.name} deals ${gamblerHit} damage to herself.`)
            gambler.hp -= gamblerHit
            // $('#prompts').empty()
            $('#prompts').append(doubleUpFail).css('color', 'white').css('font-size', '24px')
            partyUpdate()
        }
    } else if (promptAnswer.toUpperCase() === 'NO') {
        let gamblerHitSuccess = $('<p></p>').text(`${gambler.name} deals ${gamblerHit} damage, leaving the enemy with ${currentEnemy.hp}hp remaining.`)
        currentEnemy.hp -= gamblerHit
        // $('#prompts').empty()
        $('#prompts').append(gamblerHitSuccess)
    } else {
        let wrongInput = $('<p></p>').text('Not a valid command, please enter yes or no.')
        // $('#prompts').empty()
        $('#prompts').append(wrongInput)
        prompt(`You rolled ${gamblerHit}, Double or Nothing? Yes/No`)
    }
}

const priest = {
    name: "Cylas Goldveil",
    hp: 120,
    backStory: "There are those who choose to walk in the path of the light, and there are those who are chosen. Salas Goldveil being the latter. His father being an archbishop in Sanctuary lead to Cylas being indoctrinated into the church at a very young age. Recently however, with the rise of the orcs, Cylas has found his faith tested. Joining player.name on their journey as a recommendation from his father, Cylas sees this as his opportunity to renew his devotion to The Goddess.",
    weapon: "Staff of Ancient Wisdom",
    attackValue: 5,
    specialAbility: "Aura of Mercy - Cylas carries with him a powerful artifact passed down in the church from the first archbishop of Sanctuary; The Tears of the Goddess. The Goddess’s mercy flows from it and grants any damage Cylas deals back to the party as healing."
}

priestAttack = () => {
    let priestHitSuccess = $('<p></p>').text(`${priest.name} attacks and deals 5 damage, leaving the enemy with ${currentEnemy.hp}hp.`)
    let heroHpUp = $('<p></p>').text(`Aura of Mercy heals ${hero.name} for 5 hp. They have ${hero.hp}hp remaining.`)
    let priestHpUp = $('<p></p>').text(`Aura of Mercy heals ${priest.name} for 5 hp. They have ${priest.hp}hp remaining.`)
    let gamblerHpUp = $('<p></p>').text(`Aura of Mercy heals ${gambler.name} for 5 hp. They have ${gambler.hp}hp remaining.`)
    currentEnemy.hp -= 5
    // $('#prompts').empty()
    $('#prompts').append(priestHitSuccess).css('color', 'white').css('font-size', '24px')
    if (hero.hp < 120 && hero.hp + 5 < 120 && hero.hp > 0) {
        hero.hp += 5
        $('#prompts').append(heroHpUp)
        partyUpdate()
    }
    if (gambler.hp < 120 && gambler.hp + 5 < 120 && gambler.hp > 0) {
        gambler.hp += 5
        $('#prompts').append(gamblerHpUp)
        partyUpdate()
    }
    if (priest.hp < 120 && priest.hp + 5 < 120 && priest.hp > 0) {
        priest.hp += 5
        $('#prompts').append(heroHpUp)
        partyUpdate()
    }
}

const nameAnswer = prompt('What is the name of our hero?')

const hero = {
    name: nameAnswer,
    title: 'The Hero',
    hp: 120,
    backStory: "The young hero of our story. Blessed by The Goddess with both a sharp mind and healthy body, player.name has been tasked with defeating the orcish warlord Urlak Redmaw.",
    weapon: "Hammer of Light's Wrath",
    attackValue: "6 - 10",
}

function heroAttack() {
    let heroHit = Math.floor(Math.random() * (11 - 6) + 6)
    let heroHitSuccess = $('<p></p>').text(`${hero.name} attacks with the Hammer of Light's Wrath, dealing ${heroHit} damage! The enemy has ${currentEnemy.hp}hp remaining.`)
    currentEnemy.hp -= heroHit
    // $('#prompts').empty()
    $('#prompts').append(heroHitSuccess).css('color', 'white').css('font-size', '24px')
}

const partyUpdate = () => {
    $('#party').empty()
    let heroUI = [hero.name, hero.hp, hero.attackValue]
    let priestUI = [priest.name, priest.hp, priest.attackValue]
    let gamblerUI = [gambler.name, gambler.hp, gambler.attackValue]
    let partyArray = [heroUI.join(", "), priestUI.join(", "), gamblerUI.join(", ")]
    let partyIndex = 0
    for (let i = 0; i < partyArray.length; i++) {
        let partyContainer = document.createElement('p')
        let partyText = document.createTextNode(partyArray[partyIndex])
        partyIndex++
        partyContainer.appendChild(partyText)
        document.getElementById('party').appendChild(partyContainer)
    }
}

partyUpdate()

class Enemy {
    constructor(name, hp, high, low) {
        this.name = name
        this.hp = hp
        this.low = low
        this.high = high
    }

    generateAttack() {
        if (this.hp > 0) {
            let enemyHit = Math.floor(Math.random() * (this.high - this.low) + this.low)
            lowest_hp_player_name.hp -= enemyHit
            let enemyAttackSuccess = $('<p></p>').text(`The enemy winds up a swing, hitting ${lowest_hp_player_name.name} for ${enemyHit} damage!`)
            // $('#prompts').empty()
            $('#prompts').append(enemyAttackSuccess)
            partyUpdate()
        }
    }

    isDead() {
        if (this.hp <= 0) {
            return true
        } else {
            return false
        }
    }
}

const orc = new Enemy('Orc', 200, 14, 10)
const orcBerserker = new Enemy('Orc Berserker', 175, 17, 15)
const ogre = new Enemy('Ogre', 225, 18, 16)
const redMaw = new Enemy('Urlak Redmaw', 255, 21, 10)
let lineup = [orcBerserker, orc, ogre, redMaw]
let index = 0
let currentEnemy = lineup[index]

let victoryHeader = $('<h2></h2>').text('Urlak Redmaw is defeated!')
let victoryBody = $('<p></p>').text('The orcish hordes, now leaderless, will be easy prey for the knights of Sanctuary. Ushering in an uneasy, but long lasting peace. The party scatters to the winds, their deeds becoming legend.')
const rotateEnemies = () => {
    if (currentEnemy.isDead() && currentEnemy != redMaw) {
        index += 1
        currentEnemy = lineup[index]
        lootRound()
        longRest()
        partyUpdate()
    } else if (redMaw.isDead()) {
        $('body').empty()
        $('body').append(victoryHeader).css('color', 'white').css('text-align', 'center').css('font-size', '33px').css('margin', '100px')
        $('body').append(victoryBody).css('color', 'white').css('text-algin', 'center').css('font-size', '27px')
    }

}

let restPush = $('<p></p>').text('The party takes a long rest between battles, restoring their hp.')
let maxHp = 120
const longRest = () => {
    hero.hp = maxHp
    priest.hp = maxHp
    gambler.hp = maxHp
    // $('#prompts').empty()
    $('#prompts').append(restPush).css('color', 'white').css('font-size', '24px')
}

let inventory = ['minor potion', 'minor potion', 'minor potion']
const inventoryUpdate = () => {
    let inventoryIndex = 0
    $('#inventory').empty()
    let backPack = $('#inventory').text('Back Pack')
    for (let i = 0; i < inventory.length; i++) {
        let inventoryContainer = document.createElement('LI')
        let inventoryText = document.createTextNode(inventory[inventoryIndex])
        inventoryIndex++
        inventoryContainer.appendChild(inventoryText)
        document.getElementById("inventory").appendChild(inventoryContainer)
    }
}
inventoryUpdate()

const lootRound = () => {
    if (inventory.length <= 3) {
        let potionDrop = Math.floor(Math.random() * (1001 - 1) + 1)
        if (potionDrop < 700) {
            console.log("You find 2 minor potions and put them into your backpack.")
            inventory.push('minor potion', 'minor potion')
            inventoryUpdate()
        } else if (potionDrop > 700 && potionDrop < 900) {
            console.log("You find 2 potions and put them into your backpack.")
            inventory.push('potion', 'potion')
            inventoryUpdate()
        } else {
            console.log("You strike gold and find 2 mega potions, putting them carefully into your backpack.")
            inventory.push('mega potion', 'mega potion')
            inventoryUpdate()
        }
    } else if (inventory.length === 4) {
        let potionDrop = Math.floor(Math.random() * (1001 - 1) + 1)
        if (potionDrop < 700) {
            console.log("You find 2 minor potions, but only have space in your bag for one.")
            inventory.push('minor potion', 'minor potion')
            inventoryUpdate()
        } else if (potionDrop > 700 && potionDrop < 900) {
            console.log("You find 2 potions, but only have space in your bag for one.")
            inventory.push('potion', 'potion')
            inventoryUpdate()
        } else {
            console.log("You strike gold and find 2 mega potions, but only have space in your bag for one.")
            inventory.push('mega potion', 'mega potion')
            inventoryUpdate()
        }

    } else {
        console.log('Your inventory is too full to hold any more potions.')
        inventoryUpdate()
    }
}


const lowestHpPlayer = () => {
    if (gambler.hp < priest.hp && gambler.hp < hero.hp) {
        return gambler
    } else if (priest.hp < hero.hp && priest.hp < gambler.hp) {
        return priest
    } else {
        return hero
    }
}


const commands = document.getElementById('commands')
const submit = document.getElementById('submit')

commands.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        document.getElementById('submit').click()
    }
})
let lowest_hp_player_name = lowestHpPlayer()
submit.addEventListener('click', function(event) {
    if (commands.value.toUpperCase() === 'ATTACK') {
        $('#prompts').empty()
        const heroDamage = heroAttack()
        const priestDamage = setTimeout(priestAttack(), 5000)
        const gamblerDamage = gamblerAttack()
        const enemyAttack = currentEnemy.generateAttack()
        currentEnemy.isDead()
        rotateEnemies()
    } else if (commands.value.toUpperCase() === 'ITEM') {
        let potionPrompt = prompt(`You currently have ${inventory.join(', ')}. Which one would you like to use?`)
        if (potionPrompt.toUpperCase() === 'MINOR POTION') {
            if (lowest_hp_player_name.hp < 120 && lowest_hp_player_name.hp + 10 < 120) {
                lowest_hp_player_name.hp += 10
                console.log(`You use the minor potion and heal for 10 hp. You now have ${lowest_hp_player_name.hp}.`)
                inventory.pop('minor potion')
                inventoryUpdate()
                partyUpdate()
            } else {
                console.log('')
            }
        } else if (potionPrompt.toUpperCase() === 'POTION') {
            if (lowest_hp_player_name.hp < 120 && lowest_hp_player_name.hp + 15 < 120) {
                lowest_hp_player_name.hp += 15
                console.log(`You use the minor potion and heal for 15 hp. You now have ${lowest_hp_player_name.hp}.`)
                inventory.pop('potion')
                inventoryUpdate()
                partyUpdate()
            }
        } else if (potionPrompt.toUpperCase() === 'MEGA POTION') {
            if (lowest_hp_player_name.hp < 120 && lowest_hp_player_name.hp + 20 < 120) {
                lowest_hp_player_name.hp += 20
                console.log(`You use the minor potion and heal for 20 hp. You now have ${lowest_hp_player_name.hp}.`)
                inventory.pop('mega potion')
                inventoryUpdate()
                partyUpdate()
            }
        } else {
            console.log('Not a valid command, please try again.')
        }
    }
    $('#commands').val('')
})
