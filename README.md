# Silent Ban

## About

Silent Ban is a Discord bot that allows you to automatically kick a user, when they join a server on which this bot is running.

## How to use

Create an environment variable called "TOKEN" that contains the bot token. Then create a file in the same folder as the package.json called "config.json" and put the following JSON in it:

```json
{
	"users": ["user1's id", "user2's id", "..."]
}
```

To silently ban a user just put their user id in the "users" array. Alternatively you can also define an environment variable called "BANNED_USERS" and put a JSON array in it.
