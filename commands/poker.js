const suits = ['clubs', 'heart', 'spades', 'diamonds'];
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const hand = [];
const deck = [];
const locked = ['unlocked', 'unlocked', 'unlocked', 'unlocked', 'unlocked'];

function card(suit, name, value) {
	this.suit = suit;
	this.name = name;
	this.value = value;
}

function createDeck() {
	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < cards.length; j++) {
			deck.push(new card(suits[i], cards[j], j + 2));
		}
	}
}

function shuffleDeck(_deck) {
	let count = _deck.length;
	while (count) {
		_deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
		count -= 1;
	}
}

function generateHand(hands) {
	for (let i = 0; i < 5; i++) {
		hands.push(deck.pop());
	}
}

function printHand() {
	let output = '';
	for (let i = 0; i < 5; i++) {
		output = output.concat(hand[i].name + ':' + hand[i].suit + ':' + ' ');
	}
	return output;
}

function drawCards(hands) {
	for (let i = 0; i < 5; i++) {
		if (locked[i] == 'unlocked') {
			hands[i] = deck.pop();
		}
	}
}
function deleteDeck() {
	for(let i = 0; i < deck.length; i++) {
		deck.pop();
	}
}
function deleteHand() {
	for (let i = 0; i < 5; i++) {
		hand.pop();
	}
}
function resetLocked() {
	for (let i = 0; i < 5; i++) {
		locked[i] = 'unlocked';
	}
}

// selection sort algorithm
function sortHandSuits(hands) {
	let i, j, min;
	for (i = 0; i < hands.length; i++) {
		min = i;
		for (j = i + 1; j < hands.length; j++) {
			if (hands[j].suit < hands[min].suit) {
				min = j;
			}
		}
		const temp = hands[i];
		hands[i] = hands[min];
		hands[min] = temp;
	}
}
function sortHandValues(hands) {
	let i, j, min;
	for (i = 0; i < hands.length; i++) {
		min = i;
		for (j = i + 1; j < hands.length; j++) {
			if (hands[j].value < hands[min].value) {
				min = j;
			}
		}
		const temp = hands[i];
		hands[i] = hands[min];
		hands[min] = temp;
	}
}

function has_Flush(hands) {
	sortHandSuits(hands);
	return (hands[0].suit == hands[4].suit);
}

function has_Straight(hands) {
	sortHandValues(hands);
	if (hands[4] == 14) {
		const lowStraight = hands[0].value == 2 && hands[1].value == 3 && hands[2].value == 4 && hands[3].value == 5;
		const hiStraight = hands[0].value = 10 && hands[1].value == 11 && hands[2].value == 12 && hands[3].value == 13;
		return (lowStraight || hiStraight);
	}
	else {
		let temp = hands[0].value + 1;
		for (let i = 1; i < 5; i++) {
			if (hands[i].value != temp) {
				return false;
			}
			temp++;
		}
	}
	return true;
}

function getMax(hands) {
	let max = hands[0].value;
	for (let i = 1; i < hands.length; i++) {
		if (max < hands[i].value) {
			max = hands[i].value;
		}
	}
	return max;
}

function has_FourKind(hands) {
	sortHandValues(hands);
	const firstCase = hands[0].value == hands[1].value && hands[1].value == hands[2].value && hands[2].value == hands[3].value;
	const secondCase = hands[1].value == hands[2].value && hands[2].value == hands[3].value && hands[3].value == hands[4].value;
	return (firstCase || secondCase);
}

function has_FullHouse(hands) {
	sortHandValues(hands);
	const firstCase = hands[0].value == hands[1].value && hands[1].value == hands[2].value && hands[3].value == hands[4].value;
	const secondCase = hands[0].value == hands[1].value && hands[2].value == hands[3].value && hands[3].value == hands[4].value;
	return (firstCase || secondCase);
}

function has_ThreeKind(hands) {
	if (has_FourKind(hands) || has_FullHouse(hands)) {
		return false;
	}
	sortHandValues(hands);
	const firstCase = hands[0].value == hands[1].value && hands[1].value == hands[2].value;
	const secondCase = hands[1].value == hands[2].value && hands[2].value == hands[3].value;
	const thirdCase = hands[2].value == hands[3].value && hands[3].value == hands[4].value;
	return (firstCase || secondCase || thirdCase);
}
function has_TwoPair(hands) {
	if (has_FourKind(hands) || has_FullHouse(hands) || has_ThreeKind(hands)) {
		return false;
	}
	sortHandValues(hands);
	const firstCase = hands[0].value == hands[1].value && hands[2].value == hands[3].value;
	const secondCase = hands[0].value == hands[1].value && hands[3].value == hands[4].value;
	const thirdCase = hands[1].value == hands[2].value && hands[3].value == hands[4].value;
	return (firstCase || secondCase || thirdCase);
}
function has_OnePair(hands) {
	if (has_FourKind(hands) || has_FullHouse(hands) || has_ThreeKind(hands) || has_TwoPair(hands)) {
		return false;
	}
	sortHandValues(hands);
	const firstCase = hands[0].value == hands[1].value;
	const secondCase = hands[1].value == hands[2].value;
	const thirdCase = hands[2].value == hands[3].value;
	const fourthCase = hands[3].value == hands[4].value;
	return (firstCase || secondCase || thirdCase || fourthCase);
}

function evaluateHand(hands) {
	const temp = getMax(hands);
	if (has_Flush(hands) && has_Straight(hands) && (temp == 14)) {
		return 'Royal Flush';
	}
	else if (has_Flush(hands) && has_Straight(hands)) {
		return 'Straight Flush';
	}
	else if (has_FourKind(hands)) {
		return 'Four of a Kind';
	}
	else if (has_FullHouse(hands)) {
		return 'Full House';
	}
	else if (has_Flush(hands)) {
		return 'Flush';
	}
	else if (has_Straight(hands)) {
		return 'Straight';
	}
	else if (has_ThreeKind(hands)) {
		return 'Three of a Kind';
	}
	else if (has_TwoPair(hands)) {
		return 'Two Pair';
	}
	else if (has_OnePair(hands)) {
		return 'One Pair';
	}
	else {
		return 'High Card';
	}
}
const Discord = require('discord.js');
/*
	BUG: Multiple Users playing at once, will give same initial cards
	BUG: Same user can spam the command while in an existince instance.
*/
module.exports = {
	name: 'poker',
	description: 'Casino game poker - 5 card',
	usage: '',
	execute(message) {
		resetLocked();
		createDeck();
		shuffleDeck(deck);
		generateHand(hand);

		const handEmbed = new Discord.MessageEmbed()
			.setColor('#A6DAE8')
			.setAuthor('You Hand', 'https://i.imgur.com/OSJbvbQ.png')
			.setDescription(printHand())
			.addField('**Instructions:**', 'React 1 - 5 locks the corresponding card\nReact OK to draw new cards for non-locked cards')
			.setFooter('JackBot will time out in 30 seconds');

		message.channel.send(handEmbed).then(async msg => {
			await msg.react('1️⃣');
			await msg.react('2️⃣');
			await msg.react('3️⃣');
			await msg.react('4️⃣');
			await msg.react('5️⃣');
			await msg.react('🆗');

			const onefilter = (reaction, user) => {
				return reaction.emoji.name === '1️⃣' && user.id === message.author.id;
			};
			const twofilter = (reaction, user) => {
				return reaction.emoji.name === '2️⃣' && user.id === message.author.id;
			};
			const threefilter = (reaction, user) => {
				return reaction.emoji.name === '3️⃣' && user.id === message.author.id;
			};
			const fourfilter = (reaction, user) => {
				return reaction.emoji.name === '4️⃣' && user.id === message.author.id;
			};
			const fivefilter = (reaction, user) => {
				return reaction.emoji.name === '5️⃣' && user.id === message.author.id;
			};
			const okfilter = (reaction, user) => {
				return reaction.emoji.name === '🆗' && user.id === message.author.id;
			};

			const one = msg.createReactionCollector(onefilter, { time: 30000, errors: ['time'] });
			const two = msg.createReactionCollector(twofilter, { time: 30000, errors: ['time'] });
			const three = msg.createReactionCollector(threefilter, { time: 30000, errors: ['time'] });
			const four = msg.createReactionCollector(fourfilter, { time: 30000, errors: ['time'] });
			const five = msg.createReactionCollector(fivefilter, { time: 30000, errors: ['time'] });

			one.once('collect', reaction => {
				if (reaction.emoji.name === '1️⃣') {
					locked[0] = 'locked';
				}
			});
			two.once('collect', reaction => {
				if (reaction.emoji.name === '2️⃣') {
					locked[1] = 'locked';
				}
			});
			three.once('collect', reaction => {
				if (reaction.emoji.name === '3️⃣') {
					locked[2] = 'locked';
				}
			});
			four.once('collect', reaction => {
				if (reaction.emoji.name === '4️⃣') {
					locked[3] = 'locked';
				}
			});
			five.once('collect', reaction => {
				if (reaction.emoji.name === '5️⃣') {
					locked[4] = 'locked';
				}
			});
			msg.awaitReactions(okfilter, { max: 1, time: 30000, errors: ['time'] })
				.then(collected => {
					if (collected.first().emoji.name === '🆗') {
						drawCards(hand);
						const resultsEmbed = new Discord.MessageEmbed()
							.setColor('#FF763B')
							.setAuthor('Poker results', 'https://i.imgur.com/OSJbvbQ.png')
							.setDescription(printHand())
							.addField('Your resulting hand was:', evaluateHand(hand), true)
							.setThumbnail('https://i.imgur.com/OSJbvbQ.png')
							.setFooter('Thank you for playing!');
						message.channel.send(resultsEmbed);
						deleteHand();
						deleteDeck();
					}
				})
				.catch(() => {
					message.reply('You failed to react in time.');
				});
		});
	},
};