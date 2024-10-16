const Discord = require('discord.js')
const {botname, version, prefix} = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(`${prefix}`))return;  


    let embed = new Discord.MessageEmbed()
    .setTitle(`${botname} - Help Menu:`)
    .setDescription(`\n**Prefix:** \`${prefix}\`\n\n**About Server:**\n> -introduce\n> -fitur\n> -donate\n\n**Play Game:**\n> __**• Economy Commands:**__\n> -bal\n> -beg\n> -daily\n> -weekly\n> -deposit\n> -profile\n> -work\n> -rob\n> -roulette\n> -slots\n> __**• Shop Commands:**__\n> -buy\n> -sell\n> -pay\n> -store\n> __**• Owner:**__\n> -add\n> -remove`)
    .setColor("#00FFFA")
    .setFooter(`${botname}`)
    message.channel.send(embed)




}

module.exports.help = {
  name:"cmd",
  aliases: ["help"]
}