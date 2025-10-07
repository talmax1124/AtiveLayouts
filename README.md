# Discord Emoji Layouts Bot

A powerful Discord bot for creating beautiful emoji layouts for announcements, games, giveaways, and custom designs.

## Features

### 🎯 Commands Available

#### `/announcement` - Create announcement layouts
- **Banner**: Clean horizontal banner style
- **Box**: Framed box layout
- **Star Frame**: Sparkly star-bordered design
- **Arrow Point**: Dynamic arrow-pointed layout
- **Crown Header**: Royal crown-themed header
- **Fire Border**: Eye-catching fire-bordered design

Options:
- `title` (required): Title for the announcement
- `message` (optional): Additional message content
- `color` (optional): Color theme (red, blue, green, yellow, purple, orange)

#### `/game` - Create game-themed layouts
- **Tic Tac Toe Board**: Interactive game board
- **Casino Night**: Casino-themed layout with cards and dice
- **Tournament Bracket**: Tournament organization layout
- **Game Night Banner**: General gaming event layout
- **Dice Roll**: Dice rolling display
- **Card Game**: Playing card themed layout
- **Leaderboard**: Winner ranking display

Options:
- `title` (optional): Title for the game layout
- `players` (optional): Comma-separated player names
- `details` (optional): Additional rules or information

#### `/giveaway` - Create giveaway layouts
- **Classic Giveaway**: Traditional giveaway format
- **Gift Box**: Present-themed design
- **Sparkle Frame**: Glittery frame layout
- **Crown Prize**: Royal prize theme
- **Fire Drop**: Hot giveaway design
- **Trophy Winner**: Championship theme
- **Mega Giveaway**: Extra large announcement

Options:
- `prize` (required): What's being given away
- `duration` (optional): How long the giveaway lasts
- `requirements` (optional): How to enter
- `winners` (optional): Number of winners

#### `/custom` - Create custom layouts
- **Text Banner**: Various text banner styles
- **Progress Bar**: Animated progress displays
- **Countdown Timer**: Countdown sequences
- **Mood Board**: Mood-based emoji layouts
- **Weather Display**: Weather information layout
- **Music Player**: Now playing displays
- **Status Board**: System status layouts
- **Decorative Border**: Fancy borders for text

Options:
- `text` (required): Main content
- `style` (optional): minimal, bold, fancy, elegant
- `percentage` (optional): For progress bars (0-100)

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or higher)
- Discord Developer Account
- Discord Server with Administrator permissions

### 2. Discord Bot Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a New Application
3. Go to "Bot" section and create a bot
4. Copy the Bot Token
5. Go to "OAuth2" > "URL Generator"
6. Select "bot" and "applications.commands" scopes
7. Select necessary bot permissions (Send Messages, Use Slash Commands)
8. Invite the bot to your server using the generated URL

### 3. Installation
1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (copy from `.env.example`):
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   ```

### 4. Deploy Slash Commands
```bash
node deploy-commands.js
```

### 5. Start the Bot
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Customization

### Adding Custom Emojis
1. Upload your custom emojis to your Discord server
2. Edit `config/emojis.js`
3. Replace the default emojis with your custom emoji IDs:
   ```javascript
   // Example:
   customSquareBlue: '<:square_blue:1234567890>',
   ```

### Adding New Layouts
1. Edit the respective command files in the `commands/` folder
2. Add new layout functions
3. Update the command choices
4. Redeploy commands with `node deploy-commands.js`

## File Structure
```
discord-emoji-layouts/
├── commands/
│   ├── announcement.js    # Announcement layouts
│   ├── game.js           # Game-themed layouts
│   ├── giveaway.js       # Giveaway layouts
│   └── custom.js         # Custom layouts
├── config/
│   └── emojis.js         # Emoji configuration
├── index.js              # Main bot file
├── deploy-commands.js    # Command deployment script
├── package.json          # Dependencies and scripts
└── .env.example          # Environment variables template
```

## Usage Examples

### Creating an Announcement
```
/announcement type:banner title:Server Update message:We've added new features! color:blue
```

### Setting up a Giveaway
```
/giveaway type:classic prize:Discord Nitro duration:48 hours requirements:React with 🎉 winners:2
```

### Creating a Game Board
```
/game type:tictactoe title:Tic Tac Toe Championship
```

### Custom Progress Bar
```
/custom type:progress text:Server Migration percentage:75 style:fancy
```

## Support

If you need help or want to contribute:
1. Check existing commands and layouts for examples
2. Modify the emoji configuration for your server's custom emojis
3. Add new layout types by following the existing patterns

## License

MIT License - feel free to modify and distribute!