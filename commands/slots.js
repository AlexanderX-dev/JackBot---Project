function getRandomNumber(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const Discord = require('discord.js');

module.exports = {
	name: 'slots',
	description: 'Casino game slots',
	usage: '',
	execute(message) {
		const number = getRandomNumber(101);

		const Embed = new Discord.MessageEmbed()
			.setColor('#FF763B')
			.setAuthor('Slot results', 'https://i.imgur.com/OSJbvbQ.png')
			.setThumbnail('https://i.imgur.com/OSJbvbQ.png')
			.setFooter('Thank you for playing!');
		message.channel.send(Embed);
	},
};