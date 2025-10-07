const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test-app-emojis')
        .setDescription('Test application emojis and create beautiful layouts'),

    async execute(interaction) {
        // Get the bot client
        const client = interaction.client;
        
        // Try to access application emojis
        await interaction.deferReply();
        
        try {
            // Fetch the application
            const application = await client.application.fetch();
            
            // Get all available emojis from the guild where the bot is
            const guild = interaction.guild;
            const guildEmojis = guild ? Array.from(guild.emojis.cache.values()) : [];
            
            // Also check if there are emojis in other guilds the bot is in
            let allEmojis = [];
            client.guilds.cache.forEach(g => {
                g.emojis.cache.forEach(emoji => {
                    allEmojis.push(emoji);
                });
            });
            
            // Create a test layout with beautiful formatting
            let response = '**🎨 EMOJI LAYOUT TEST**\n\n';
            
            // Try to find specific emojis from your collection
            const emojiNames = [
                'crown', 'fire', 'sparkles', 'diamond', 'heart', 
                'giveaway', 'arrow', 'rocket', 'party', 'cash',
                'pixelheart', 'angelwingheart', 'redflame', 'pinkflame',
                'balloons', 'celebrate', 'trophy', 'bell', 'megaphone'
            ];
            
            response += '**📊 Available Emojis:**\n';
            response += `• Guild Emojis: ${guildEmojis.length}\n`;
            response += `• Total Bot Emojis: ${allEmojis.length}\n\n`;
            
            // Try to create a beautiful layout
            response += '**✨ ELEGANT ANNOUNCEMENT ✨**\n';
            
            // Find and use specific emojis
            const crown = findEmoji(allEmojis, 'crown') || '👑';
            const fire = findEmoji(allEmojis, 'fire') || '🔥';
            const sparkles = findEmoji(allEmojis, 'sparkles') || '✨';
            const diamond = findEmoji(allEmojis, 'diamond') || '💎';
            const heart = findEmoji(allEmojis, 'heart') || '❤️';
            const gift = findEmoji(allEmojis, 'giveaway') || findEmoji(allEmojis, 'gift') || '🎁';
            const arrow = findEmoji(allEmojis, 'arrow') || '➡️';
            const party = findEmoji(allEmojis, 'party') || findEmoji(allEmojis, 'celebrate') || '🎉';
            
            // Create decorative header
            response += `${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}\n\n`;
            
            // Create content with emojis
            response += `${fire} **FIRE ANNOUNCEMENT** ${fire}\n`;
            response += `${sparkles} This layout uses your custom emojis! ${sparkles}\n\n`;
            
            response += `${arrow} Welcome to the server!\n`;
            response += `${arrow} Check out our rules\n`;
            response += `${arrow} Have fun gaming!\n\n`;
            
            // Create giveaway style
            response += `${gift}${party}${gift}${party}${gift}${party}${gift}${party}${gift}\n`;
            response += `${gift} **GIVEAWAY TIME!** ${gift}\n`;
            response += `${heart} Prize: Discord Nitro ${heart}\n`;
            response += `${sparkles} React to enter! ${sparkles}\n`;
            response += `${gift}${party}${gift}${party}${gift}${party}${gift}${party}${gift}\n\n`;
            
            // Show first 10 available emojis
            if (allEmojis.length > 0) {
                response += '**🎨 Sample Emojis:**\n';
                const sampleEmojis = allEmojis.slice(0, 10);
                for (const emoji of sampleEmojis) {
                    const emojiString = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
                    response += `${emojiString} `;
                }
                response += '\n';
            }
            
            await interaction.editReply({ content: response });
            
        } catch (error) {
            console.error('Error fetching emojis:', error);
            await interaction.editReply({ 
                content: '❌ Error accessing emojis. Make sure emojis are uploaded to a server where the bot is present.' 
            });
        }
    }
};

function findEmoji(emojis, name) {
    const emoji = emojis.find(e => 
        e.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(e.name.toLowerCase())
    );
    
    if (emoji) {
        return emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
    }
    return null;
}