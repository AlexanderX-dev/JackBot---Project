const symbols = ['coin', 'dollar', 'money_with_wings', 'moneybag'];
const roll = [];

function prob(symbol, value) {
	this.symbol = symbol;
	this.value = value;
}

function generateRoll() {
	for (let i = 0; i < 3; i++) {
		const number = getRandomNumber(101);
		if (number <= 49) {
			roll.push(new prob('coin', 1.5));
		}
		else if (number >= 50 && number <= 74) {
			roll.push(new prob('dollar', 1.75));
		}
		else if (number >= 75 && number <= 89) {
			roll.push(new prob('money_with_wings', 1.95));
		}
		else if (number >= 90) {
			roll.push(new prob('moneybag', 2.25));
		}
	}
}
function cycleSlotMachine() {
	while (true) {
		setTimeout(firstRoll(), 1500);
		setTimeout(secondRoll(), 3000);
		setTimeout(thirdRoll(), 4500);
	}
}
function firstRoll() {

}
function secondRoll() {

}
function thirdRoll() {

}
function printTopandBot() {
	const output = '-----------------';
	return output;
}
function printRoll() {
	let output = '';
	for (let i = 0; i < 3; i++) {
		output = output.concat(' | ' + ':' + roll[i].symbol + ': ');
	}
	output = output.concat('| ');
	return output;
}
function resetRoll() {
	for (let i = 0; i < 3; i++) {
		roll.pop();
	}
}
function evaluateScore() {
	let finalScore = 0;
	if (roll[0].symbol == roll[1].symbol) {
		if (roll[1].symbol == roll[2].symbol) {
			finalScore = roll[0].value * roll[1].value * roll[2].value;
			return Math.round(finalScore);
		}
		finalScore = roll[0].value * roll[1].value;
	}
	return Math.round(finalScore);
}
function getRandomNumber(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const Discord = require('discord.js');

module.exports = {
	name: 'slots',
	description: 'Casino Slots Simulations',
	usage: '',
	execute(message) {
		generateRoll();

		const Embed = new Discord.MessageEmbed()
			.setColor('#FF763B')
			.setAuthor('Slot results', 'https://i.imgur.com/OSJbvbQ.png')
			.setDescription(printTopandBot() + '\n' + printRoll() + '\n' + printTopandBot())
			.addField('If there were currency system, Profit would be: ', evaluateScore() + 'x', true)
			.setThumbnail('https://i.imgur.com/OSJbvbQ.png')
			.setFooter('Thank you for playing!');
		message.channel.send(Embed);
		resetRoll();
	},
};