const Discord = require('discord.js')
const {botname, version, prefix} = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(`${prefix}`))return;  


    let embed = new Discord.MessageEmbed()
    .setTitle(`${botname} - Introduction:`)
    .setDescription(`\n__**ENGLISH**__\nA discord community that provides a platform for you to trade, chat, promote your social media, and play some games with your friend\n\n__**INDONESIA**__\nSebuah komunitas discord yang menyediakan platform bagi kalian untuk berdagang, mengobrol, promosi media sosial, dan bermain beberapa game dengan teman-teman kalian`)
    .setColor("GRAY")
    message.channel.send(embed)




}

module.exports.help = {
  name:"introduce",
  aliases: ["intro"]
}