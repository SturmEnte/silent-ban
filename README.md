# Silent Ban

## About

Silent ban is a Discord bot that allows you to automaticly kick a user, when they join a server on which this bot is running

## How to use

- Create a environment variable called "TOKEN" that contains the bot token
- Create a file in the same folder as the package.json called "config.json"
- Put following JSON in it:

```json
{
	"users": ["user1's id", "user2's id", "..."]
}
```

- To silently ban a user just put their user id in the "users" array
