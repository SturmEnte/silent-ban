require("dotenv/config");
const { Client } = require("discord.js");

const config = require("../config.json");

const client = new Client({
	intents: ["GuildMembers", "GuildModeration"],
});

client.on("ready", () => {
	console.log("Logged in as", client.user.tag);

	client.guilds.fetch().then((guilds) => {
		guilds.forEach(async (guild) => {
			guild.fetch().then((guild) => {
				guild.members.fetch().then((members) => {
					members.forEach((member) => {
						if (config.users.includes(member.id)) {
							kickMember(member);
						}
					});
				});
			});
		});
	});
});

client.on("guildMemberAdd", (member) => {
	if (config.users.includes(member.id)) {
		kickMember(member);
	}
});

client.login(process.env.TOKEN);

function kickMember(member) {
	member.kick();
	console.log("Kicked user", member.id, `${member.user.tag}`, "from server", member.guild.id, `"${member.guild.name}"`);
}
