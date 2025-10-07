const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-emoji-files')
        .setDescription('List all emoji files in /emojis folder and show how to use them')
        .addStringOption(option =>
            option.setName('filter')
                .setDescription('Filter by type or name')
                .setRequired(false)
                .addChoices(
                    { name: 'Animated Only (.gif)', value: 'gif' },
                    { name: 'Static Only (.png)', value: 'png' },
                    { name: 'Letters', value: 'letter' },
                    { name: 'Numbers', value: 'number' },
                    { name: 'Fire Effects', value: 'fire' },
                    { name: 'Hearts', value: 'heart' },
                    { name: 'Arrows', value: 'arrow' }
                )),

    async execute(interaction) {
        const filter = interaction.options.getString('filter');
        const emojisPath = '/Users/carlosdiazplaza/AtiveLayouts/emojis';
        
        try {
            // Read all files from emojis directory
            const files = fs.readdirSync(emojisPath);
            
            // Filter files based on criteria
            let filteredFiles = files;
            if (filter) {
                switch (filter) {
                    case 'gif':
                        filteredFiles = files.filter(f => f.toLowerCase().endsWith('.gif'));
                        break;
                    case 'png':
                        filteredFiles = files.filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg'));
                        break;
                    case 'letter':
                        filteredFiles = files.filter(f => f.toLowerCase().includes('letter'));
                        break;
                    case 'number':
                        filteredFiles = files.filter(f => /\d/.test(f) || f.toLowerCase().includes('one') || f.toLowerCase().includes('two'));
                        break;
                    case 'fire':
                        filteredFiles = files.filter(f => f.toLowerCase().includes('fire') || f.toLowerCase().includes('flame'));
                        break;
                    case 'heart':
                        filteredFiles = files.filter(f => f.toLowerCase().includes('heart') || f.toLowerCase().includes('love'));
                        break;
                    case 'arrow':
                        filteredFiles = files.filter(f => f.toLowerCase().includes('arrow'));
                        break;
                }
            }
            
            // Sort files
            filteredFiles.sort();
            
            // Get current server emojis for comparison
            const guild = interaction.guild;
            const serverEmojis = guild ? Array.from(guild.emojis.cache.values()) : [];
            
            // Create embed response
            const embed = new EmbedBuilder()
                .setTitle(`📁 Emoji Files (${filteredFiles.length}/${files.length})`)
                .setColor(0x0099FF)
                .setDescription(`Files in \`/emojis\` folder${filter ? ` (filtered: ${filter})` : ''}`);
            
            // Group files by type
            const animated = filteredFiles.filter(f => f.toLowerCase().endsWith('.gif'));
            const static_ = filteredFiles.filter(f => !f.toLowerCase().endsWith('.gif'));
            
            // Add statistics field
            embed.addFields({
                name: '📊 Statistics',
                value: `Total Files: **${files.length}**\n` +
                       `Animated (.gif): **${animated.length}**\n` +
                       `Static (.png/.jpg): **${static_.length}**\n` +
                       `Server Emojis: **${serverEmojis.length}**`,
                inline: true
            });
            
            // Show sample files
            if (filteredFiles.length > 0) {
                const sampleFiles = filteredFiles.slice(0, 15);
                const fileList = sampleFiles.map(f => {
                    // Check if this emoji exists on the server
                    const cleanName = f.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
                    const serverEmoji = serverEmojis.find(e => 
                        e.name.toLowerCase() === cleanName.toLowerCase() ||
                        e.name.toLowerCase().includes(cleanName.toLowerCase())
                    );
                    
                    if (serverEmoji) {
                        const emojiString = serverEmoji.animated ? 
                            `<a:${serverEmoji.name}:${serverEmoji.id}>` : 
                            `<:${serverEmoji.name}:${serverEmoji.id}>`;
                        return `${emojiString} \`${f}\``;
                    } else {
                        return `❌ \`${f}\``;
                    }
                }).join('\n');
                
                embed.addFields({
                    name: '🎨 Sample Files',
                    value: fileList || 'No files found',
                    inline: false
                });
                
                if (filteredFiles.length > 15) {
                    embed.addFields({
                        name: '➕ More',
                        value: `...and ${filteredFiles.length - 15} more files`,
                        inline: false
                    });
                }
            }
            
            // Add instructions
            embed.addFields({
                name: '📝 How to Use These Emojis',
                value: '1. Upload files to a Discord server (Server Settings → Emoji)\n' +
                       '2. Keep the same names (without extension)\n' +
                       '3. Bot will automatically detect and use them\n' +
                       '4. ✅ = Already uploaded, ❌ = Not uploaded yet',
                inline: false
            });
            
            await interaction.reply({ embeds: [embed] });
            
        } catch (error) {
            console.error('Error reading emoji files:', error);
            await interaction.reply({
                content: '❌ Error reading emoji files. Make sure the `/emojis` folder exists.',
                ephemeral: true
            });
        }
    }
};