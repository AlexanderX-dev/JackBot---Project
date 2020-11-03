function getRandomNumber(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const Discord = require('discord.js');

module.exports = {
	name: 'coinflip',
	description: 'coinflip - heads or tails',
	usage: '<tails/heads>',
	args: true,
	execute(message, args) {
		const number = getRandomNumber(2);
		const coin = ['Heads', 'Tails'];
		let win = 2;
		if (number == 1 && args[0].toLowerCase() == 'tails') {
			win = 1;
		}
		if (number == 0 && args[0].toLowerCase() == 'heads') {
			win = 0;
		}

		const Embed = new Discord.MessageEmbed()
			.setColor('#FF763B')
			.setAuthor('Coinflip results', 'https://i.imgur.com/OSJbvbQ.png')
			.setThumbnail('https://i.imgur.com/OSJbvbQ.png')
			.setFooter('Thank you for playing!');
		if (win == 2) {
			Embed.addField('You Lose!', `JackBot Rolled: ${coin[number]}`);
		}
		else if (win == 0) {
			Embed.addField('You Win!', `JackBot Rolled: ${coin[number]}`);
		}
		else if (win == 1) {
			Embed.addField('You Win!', `JackBot Rolled: ${coin[number]}`);
		}

		message.channel.send(Embed);
	},
};