require("dotenv/config");
const { Client } = require("discord.js");

const config = require("../config.json");

const client = new Client({
	intents: ["GuildMembers", "GuildModeration"],
});

client.on("ready", () => {
	console.log("Logged in as", client.user.tag);
});

client.on("guildMemberAdd", (member) => {
	if (config.users.includes(member.id)) {
		member.kick();
		console.log("Kicked user", member.id, member.user.tag);
	}
});

client.login(process.env.TOKEN);
