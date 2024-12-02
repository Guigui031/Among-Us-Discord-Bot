# Among-Us-Discord-Bot
Auteur : Guillaume Genois
Date : 27-01-2023


Code de mute ou pas provient de https://stackoverflow.com/questions/62887805/muting-an-entire-discord-voice-channel-js
Reste du code provient de https://www.youtube.com/watch?v=nTGtiCC3iQM
Le guide de discordjs pour les bot https://discordjs.guide/
Le github où j'ai pris le truc pour le transfert d'audio https://github.com/BinkanSalaryman/Discord-Audio-Stream-Bot
Le virtual cable qui agit comme un fil entre les deux salons https://vb-audio.com/Cable/index.htm
Le lien pour les développeurs de bot Discord https://discord.com/developers/applications/


Comment initialiser:
1) Avec un shell, dans le répertoire de DiscordBot, écrire "node .". "Among Us bot is online" devrait afficher dans le shell.
2) Exécuter le VB-Audio Virtual Cable programme si pas déjà activé.
3) Exécuter deux fois "run win64.bat"
	a) Dans la 1ère exécution, mettre le token du bot Transmitting et lui donner le droit de speak avec le recording device "CABLE Output (VB-Audio Virtual Cable)
	b) Dans la 2e exécution, mettre le token du bot Listening et lui donner le droit de listen avec le recording device "CABLE Input (VB-Audio Virtual Cable)
4) Déplacer le bot Listening au salon VIVANTS et le bot Transmitting au salon MORTS
5) Vous êtes prêts à jouer!


Commandes:
/reset  -- assigne chaque membre comme étant vivant (tout le monde est déplacé au salon VIVANTS)
/dead @user  -- assigne le user comme étant mort (le déplace au salon MORTS)
/mute  -- tous les joueurs vivants ne peuvent plus parler (dans le salon VIVANTS)


Notes:
Il existe du code en commentaires dans le main.js qui permet de jouer sans le virtual cable, mais les joueurs morts ne peuvent pas parler entre eux.
