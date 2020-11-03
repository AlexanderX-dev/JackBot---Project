function getRandomNumber(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const Discord = require('discord.js');

module.exports = {
	name: 'roulette',
	description: 'Casino game Roulette 0 - 18 \nGreen: 0 \nRed: 1 - 17 Odds \nBlack: 2 - 18 Evens',
	usage: '<green/black/red>',
	args: true,
	execute(message, args) {
		const green = 0;
		const red = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
		const black = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
		const number = getRandomNumber(37);
		let color = 0;
		for (let i = 0; i < black.length; i++) {
			if ((number % 2) == (black[i] % 2) && args[0].toLowerCase() == 'black') {
				color = 1;
				break;
			}
			else if ((number % 2) == (red[i] % 2) && args[0].toLowerCase() == 'red') {
				color = 2;
				break;
			}
			else if (number == green && args[0].toLowerCase() == 'green') {
				color = 3;
				break;
			}
		}

		const Embed = new Discord.MessageEmbed()
			.setColor('#FF763B')
			.setAuthor('Roulette results', 'https://i.imgur.com/OSJbvbQ.png')
			.setThumbnail('https://i.imgur.com/OSJbvbQ.png')
			.setFooter('Thank you for playing!');
		if (color == 0) {
			Embed.addField('You Lose!', `JackBot Rolled: ${number}`);
		}
		else if (color == 1) {
			Embed.addField('You Win!', `JackBot Rolled: ${number}`);
		}
		else if (color == 2) {
			Embed.addField('You Win!', `JackBot Rolled: ${number}`);
		}
		else if (color == 3) {
			Embed.addField('You Win!', `JackBot Rolled: ${number}`);
		}
		message.channel.send(Embed);
	},
};