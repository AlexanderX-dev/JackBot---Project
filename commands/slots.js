const symbols = ['coin', 'dollar', 'money_with_wings', 'moneybag'];
const roll = [];
const animation = [];

function prob(symbol, value) {
	this.symbol = symbol;
	this.value = value;
}

function generateRoll() {
	for (let i = 0; i < 3; i++) {
		const number = getRandomNumber(101);
		if (number <= 49) {
			roll.push(new prob('coin', 1));
		}
		else if (number >= 50 && number <= 84) {
			roll.push(new prob('dollar', 2));
		}
		else if (number >= 85 && number <= 94) {
			roll.push(new prob('money_with_wings', 3));
		}
		else if (number >= 95) {
			roll.push(new prob('moneybag', 4));
		}
	}
}
function cycleSlotMachine() {
	while (true ) {
		
	}
}
function getRandomNumber(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const Discord = require('discord.js');

module.exports = {
	name: 'slots',
	description: 'Casino game slots',
	usage: '',
	execute(message) {
		generateRoll();

		const Embed = new Discord.MessageEmbed()
			.setColor('#FF763B')
			.setAuthor('Slot results', 'https://i.imgur.com/OSJbvbQ.png')
			.setThumbnail('https://i.imgur.com/OSJbvbQ.png')
			.setFooter('Thank you for playing!');
		message.channel.send(Embed);
	},
};