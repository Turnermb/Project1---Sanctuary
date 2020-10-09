
const hero = {
    name: 'Hero',
    title: 'The Hero',
    hp: 120,
    backStory: "The young hero of our story. Blessed by The Goddess with both a sharp mind and healthy body, player.name has been tasked with defeating the orcish warlord Urlak Redmaw.",
    weapon: "Hammer of Light's Wrath",
    attackValue: "6 - 10",
    // specialAbility: ''
  }

  function heroAttack() {
    let heroHit = Math.floor(Math.random() * (11 - 6) + 6)
    redMaw.hp -= heroHit
    console.log(`The Hero attacks with the Hammer of Light's Wrath, dealing ${heroHit} damage! The enemy has ${redMaw.hp} HP.`)

}


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
    let gamblerHit = Math.floor(Math.random()* (14 - 2) + 2)
    let promptAnswer = prompt(`You rolled ${gamblerHit}, Double or Nothing? Yes/No`)
    if (promptAnswer.toUpperCase() === 'YES'){
    let doubleUp = Math.floor(Math.random()* (14 - 2) + 2)
    if (doubleUp > gamblerHit) {
      redMaw.hp -= doubleUp
      console.log(`The luck of the draw is with you, you deal ${doubleUp} damage instead of ${gamblerHit}.`)
      console.log(redMaw.hp)
    }else{
      gambler.hp -= gamblerHit
      console.log(`Know when to hold em, know when to fold em. You deal ${gamblerHit} damage to yourself.`)
      console.log(gambler.hp)
    }

  }else if (promptAnswer.toUpperCase() === 'NO'){
    redMaw.hp -= gamblerHit
    console.log(redMaw.hp)
  }else{
    console.log("Not a valid command, please enter yes or no.")
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
     redMaw.hp -= 5
     console.log(redMaw.hp)
     if (hero.hp < 120 && hero.hp + 5 < 120) {
       hero.hp += 5
       console.log(hero.hp)
     }
     if (gambler.hp < 120 && gambler.hp + 5 < 120) {
       gambler.hp += 5
       console.log(gambler.hp)
     }
     if (priest.hp < 120 && priest.hp + 5 < 120) {
       priest.hp += 5
       console.log(priest.hp)
     }

  }


class Enemy {
  constructor(name, hp, high, low){
    this.name = name
    this.hp = hp
    this.low = low
    this.high = high
  }
  generateAttack() {
      let enemyHit = Math.floor(Math.random() * (this.high - this.low) + this.low)
      console.log(`The enemy winds up a swing, hitting /target/ for ${enemyHit} damage!`)
  }
  damageCalc(heroDamage) {
    this.hp -= heroDamage
    console.log(this.hp)
  }
  isDead() {
    if (this.hp <= 0) {
      console.log('true')
        return true
      }else{
        console.log('false')
        return false
      }

  }

}

function get_lowest_player_hp(hero, gambler, priest) {
	const player_array = [hero, gambler, priest]
	if (player_array[0].hp <= player_array[1].hp && player_array[0].hp <= player_array[2].hp) {
		return player_array[0].name
	}
	if (player_array[1].hp <= player_array[0].hp && player_array[1].hp <= player_array[2].hp) {
		return player_array[1].name
	}
	if (player_array[2].hp <= player_array[1].hp && player_array[2].hp <= player_array[0].hp) {
		return player_array[2].name
	}
}

const orc = new Enemy('Orc', 200, 14, 10)
const orcBerserker = new Enemy('Orc Berserker', 180, 17, 13)
const ogre = new Enemy('Ogre', 215, 18, 15)
const redMaw = new Enemy('Urlak Redmaw', 285, 21, 10)
const lineup = [orc, orcBerserker, ogre, redMaw]
let currentEnemy = lineup[0]

let enemiesDead = false

const enemyLogic = () => {    //infinite loop, do not run.
  while(enemiesDead == false){
    console.log('hello')
    currentEnemy.hp -= heroAttack
      if (currentEnemy.hp <= 0) {
        currentEnemy = lineup++
      }else if (lineup[3].hp <= 0){
        enemiesDead = true
      }
    }
  }
  // if enemy is dead, switch enemy.
  // enemy attack if not
  // if (lineup[0].isDead()) {
  // index+=1
// }else{
//   Enemy.isDead()
  // }
// make sure you have a div with a specific ID
//select that id with jquery and assign it to a variable
//create a ul element
//loop through inventory and list li elements
//append those to the ul in the loop
//append the ul to the inventory div
let inventory = [
  'minor potion',
  'minor potion',
  'minor potion',
]

let $inventory = $('#inventory')
$inventory.html('<ul></ul>')
for (let i = 0; i < $inventory.length; i++) {
 
}

// const prompts = document.getElementByID('promptsContainer')
// function browserAlert(message) {
//   prompts.push(message)
// }

const commands = document.getElementById('commands')
const submit = document.getElementById('submit')

  commands.addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
      event.preventDefault()
      document.getElementById('submit').click()
    }
})

  submit.addEventListener('click', function(event){
    if (commands.value.toUpperCase() === 'ATTACK'){
      const heroDamage = heroAttack()
      const priestDamage = priestAttack()
      const gamblerDamage = gamblerAttack()
      const enemyAttack = redMaw.generateAttack()
      const lowest_hp_player_name = get_lowest_player_hp(hero.name, gambler.name, priest.name)
      const players = {
        priest, hero, gambler
      }
      players[lowest_hp_player_name]-=enemyAttack
      orc.damageCalc()
      enemyLogic()//calling a function that would be rotating through enemies.
      console.log(players[lowest_hp_player_name])
    }else if (commands.value.toUpperCase() === 'ITEM') {
    let potionPrompt = prompt(`You have ${inventory[0]}, ${inventory[1]}, ${inventory[2]}. Which one would you like to use?`)
    }else{
      console.log('Not a valid command, please try again.')
    }
})
