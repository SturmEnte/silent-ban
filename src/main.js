require("dotenv/config");
const { Client } = require("discord.js");

let config = { users: [] };

try {
	config = require("../config.json");
} catch (err) {
	console.log("Failed to load config from file\n", err);
}

if (process.env.BANNED_USERS) {
	try {
		if (!config.users) {
			config.users = [];
		}

		JSON.parse(process.env.BANNED_USERS).forEach((id) => {
			config.users.push(id);
		});
	} catch (err) {
		console.log("Failed to load banned users from the environment variable\n", err);
	}
}

const client = new Client({
	intents: ["GuildMembers", "GuildModeration"],
});

client.on("ready", () => {
	console.log("Logged in as", client.user.tag);

	console.log("--- Banned users ---");
	config.users.forEach((user) => console.log(user));
	console.log("--------------------");

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
	console.log("Kicked user", member.id, `"${member.user.tag}"`, "from server", member.guild.id, `"${member.guild.name}"`);
}
