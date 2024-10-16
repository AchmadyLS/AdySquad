const express = require('express');
const app = express();
const port = 3000;
const {activityType, activityName, Status} = require("./botconfig.json")

app.get('/', (req, res) => res.send(`Alive.`));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

require("http").createServer((_, r) => r.end(``)).listen(8080)

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }


  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);

  });
});
})

bot.on("ready", () => {
  bot.user.setPresence({
    activity : {
      name: `${activityName}`, 

      type: `${activityType}`
    },

    status : `${Status}`
  })

})

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }

      if (!message.content.startsWith(prefix)) return;


    try {
    commandfile.run(bot, message, args);

  } catch (e) {
  }}
  )})


bot.login(process.env.DISCORD_TOKEN);