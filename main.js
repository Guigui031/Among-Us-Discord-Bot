const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '/';
var on_mute = false;
var member_dead = {};
var first_dead = null;
const file_location = 'C:\Users\guill\OneDrive\Bureau\DiscordBot';
const discordBotToken = "enter token here";

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

client.once('ready', () => {
    console.log('Among Us bot is online');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // decompose le message recu
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    // les deux voice channels
    const channelVivant = message.guild.channels.cache.get('789595948275859486');
    const channelMorts = message.guild.channels.cache.get('789598881226162227');

    // les commandes--------------------------------------

    // reset chaque membre vivant
    if (command === 'reset'){
        // assigne à chaque membre un False dead
        if (message.member.voice.channel){
            //let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channelMorts.members){
                if (memberID !== '791399085210861578'){
                    member.voice.setChannel(channelVivant);
                    message.channel.send(`${member} is ${member_dead[member]}`);
                }
            }
            for (const [memberID, member] of channelVivant.members){
                member.voice.setMute(false);
                member_dead[member] = "alive";
            }
        } else {
            message.reply('You need to join a voice channel first!');
        }
    // le membre est dead et reste mute
    } else if (command == 'dead') {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
        

        try {
            for (const [memberID, member] of channelVivant.members) {
                if (memberID === taggedUser.id){
                    member.voice.setChannel(channelMorts);
                    member.voice.setMute(false);
                    message.channel.send(`${taggedUser.username} is dead`);
                    member_dead[member] = "dead";
                }
            }
        } catch {   // trouver comment catch fonctionne pour faire apparaitre le message
            message.channel.send("Il manque l'utilisateur!");
        }

    // mute ou demute tous les membres sauf les dead
    } else if (command == 'mute'){
        // code ajouté par moi-meme, permet de switch true et false de mute (vrm pas optimisé)
        if (on_mute == false){
            on_mute = true;
            //message.channel.send('false-->true');
            message.channel.send('Chuuuut!');
        } else if (on_mute === true){
            on_mute = false;
            //message.channel.send('true-->false');
            message.channel.send('Vous pouvez parler!');
        }
        // loop à travers chaque membre du salon VIVANT et les unmute 
        for (const [memberID, member] of channelVivant.members) {
            // This single line however, nested inside the for loop, should mute everyone in the channel:
            //             excepté le bot Listening
            if (memberID !== '791372426419372084'){
                //member.voice.setMute(on_mute);
                //if (member_dead[member] === "dead"){
                    //member.voice.setMute(true);
                //} else {
                 member.voice.setMute(on_mute);
                //}
            }
        }
    }
});

// code de mute ou pas provient de https://stackoverflow.com/questions/62887805/muting-an-entire-discord-voice-channel-js
// reste du code provient de https://www.youtube.com/watch?v=nTGtiCC3iQM
// le guide ultime de discordjs pour les bot https://discordjs.guide/
// le github où j'ai pris le truc pour le transfert d'audio https://github.com/BinkanSalaryman/Discord-Audio-Stream-Bot
// le virtual cable qui agit comme un fil entre les deux salons https://vb-audio.com/Cable/index.htm

// pour activer le bot, command prompt dans le fichier de DiscordBot => node .
client.login(discordBotToken);

// anciennes lignes de codes qui ne servent pas pour le moment
/*
if (memberID.startsWith('<@') && memberID.endsWith('>')) {
    memberID = memberID.slice(2, -1);
    if (memberID.startsWith('!')) {
        memberID = memberID.slice(1);
    }
}
if (member_dead) {
                    //message.channel.send(`${message.member} is ${member_dead[member]}`);
                }
                
                if (member_dead[member] === "dead"){
        message.channel.send(member_dead[member.toString()])
    member.voice.setMute(true);
}

        
        // Your invokation here, for example your switch/case hook for some command (i.e. '!muteall')
        //let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        // I added the following if statement to mute everyone but the invoker:
            // if (member != message.member)
//message.channel.send(`channel : ${channel.name}`);
                    //message.channel.send(`username : ${taggedUser.username}`);
                    //message.channel.send(`member : ${member.toString()}`);
                    //message.channel.send(`ID : ${memberID}`);
                    //message.channel.send(taggedUser.id)
                    //message.channel.send(message.member);
                    //message.channel.send(taggedUser);
*/
