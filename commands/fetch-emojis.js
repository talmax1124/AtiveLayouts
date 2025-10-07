const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch-emojis')
        .setDescription('Fetch and configure server emojis for layouts')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('What to do with the emojis')
                .setRequired(true)
                .addChoices(
                    { name: 'List All Emojis', value: 'list' },
                    { name: 'Update Config File', value: 'update' },
                    { name: 'Show Current Config', value: 'show' },
                    { name: 'Generate Config Code', value: 'generate' }
                ))
        .addStringOption(option =>
            option.setName('filter')
                .setDescription('Filter emojis by name (optional)')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const filter = interaction.options.getString('filter');

        try {
            const guild = interaction.guild;
            const emojis = guild.emojis.cache;

            switch (action) {
                case 'list':
                    await listEmojis(interaction, emojis, filter);
                    break;
                case 'update':
                    await updateConfig(interaction, emojis);
                    break;
                case 'show':
                    await showCurrentConfig(interaction);
                    break;
                case 'generate':
                    await generateConfig(interaction, emojis, filter);
                    break;
                default:
                    await interaction.reply({ content: 'Invalid action selected.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error in fetch-emojis command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing emojis. Make sure the bot has proper permissions.', 
                ephemeral: true 
            });
        }
    }
};

async function listEmojis(interaction, emojis, filter) {
    let emojiList = Array.from(emojis.values());
    
    if (filter) {
        emojiList = emojiList.filter(emoji => 
            emoji.name.toLowerCase().includes(filter.toLowerCase())
        );
    }

    if (emojiList.length === 0) {
        await interaction.reply({ 
            content: filter ? `No emojis found matching "${filter}".` : 'No custom emojis found in this server.', 
            ephemeral: true 
        });
        return;
    }

    const chunks = [];
    let currentChunk = '';
    const maxLength = 1900; // Discord message limit buffer

    emojiList.forEach((emoji, index) => {
        const emojiInfo = `${emoji} \`:${emoji.name}:\` - \`<:${emoji.name}:${emoji.id}>\`\n`;
        
        if (currentChunk.length + emojiInfo.length > maxLength) {
            chunks.push(currentChunk);
            currentChunk = emojiInfo;
        } else {
            currentChunk += emojiInfo;
        }
    });
    
    if (currentChunk) {
        chunks.push(currentChunk);
    }

    // Send first chunk as reply
    await interaction.reply({
        content: `**Server Emojis (${emojiList.length} found):**\n\n${chunks[0]}`,
        ephemeral: true
    });

    // Send additional chunks as follow-ups
    for (let i = 1; i < chunks.length; i++) {
        await interaction.followUp({
            content: chunks[i],
            ephemeral: true
        });
    }
}

async function updateConfig(interaction, emojis) {
    const configPath = path.join(__dirname, '..', 'config', 'emojis.js');
    
    try {
        // Read current config
        const currentConfig = require(configPath);
        
        // Create new custom emojis object
        const customEmojis = {};
        
        emojis.forEach(emoji => {
            // Create a safe property name
            const safeName = emoji.name.replace(/[^a-zA-Z0-9]/g, '');
            customEmojis[safeName] = `<:${emoji.name}:${emoji.id}>`;
        });

        // Create updated config content
        const updatedConfig = `const emojis = {
    // Basic geometric shapes
    square: '⬛',
    whiteSquare: '⬜',
    largeBlueSquare: '🟦',
    largeOrangeSquare: '🟧',
    largeYellowSquare: '🟨',
    largeGreenSquare: '🟩',
    largePurpleSquare: '🟪',
    largeRedSquare: '🟥',
    largeBrownSquare: '🟫',
    
    // Circles and dots
    blackCircle: '⭕',
    whiteCircle: '⚪',
    redCircle: '🔴',
    blueCircle: '🔵',
    yellowCircle: '🟡',
    greenCircle: '🟢',
    purpleCircle: '🟣',
    orangeCircle: '🟠',
    brownCircle: '🟤',
    
    // Arrows and symbols
    upArrow: '⬆️',
    downArrow: '⬇️',
    leftArrow: '⬅️',
    rightArrow: '➡️',
    star: '⭐',
    sparkles: '✨',
    fire: '🔥',
    gem: '💎',
    crown: '👑',
    trophy: '🏆',
    
    // Game symbols
    dice: '🎲',
    spadesSuit: '♠️',
    heartsSuit: '♥️',
    diamondsSuit: '♦️',
    clubsSuit: '♣️',
    joker: '🃏',
    gameDie: '🎮',
    
    // Event symbols
    party: '🎉',
    confetti: '🎊',
    gift: '🎁',
    bell: '🔔',
    megaphone: '📢',
    speaker: '🔊',
    microphone: '🎤',
    
    // Numbers
    zero: '0️⃣',
    one: '1️⃣',
    two: '2️⃣',
    three: '3️⃣',
    four: '4️⃣',
    five: '5️⃣',
    six: '6️⃣',
    seven: '7️⃣',
    eight: '8️⃣',
    nine: '9️⃣',
    
    // Letters
    letterA: '🇦',
    letterB: '🇧',
    letterC: '🇨',
    letterD: '🇩',
    letterE: '🇪',
    letterF: '🇫',
    letterG: '🇬',
    letterH: '🇭',
    letterI: '🇮',
    letterJ: '🇯',
    letterK: '🇰',
    letterL: '🇱',
    letterM: '🇲',
    letterN: '🇳',
    letterO: '🇴',
    letterP: '🇵',
    letterQ: '🇶',
    letterR: '🇷',
    letterS: '🇸',
    letterT: '🇹',
    letterU: '🇺',
    letterV: '🇻',
    letterW: '🇼',
    letterX: '🇽',
    letterY: '🇾',
    letterZ: '🇿',
    
    // Special characters
    space: '⠀',
    invisible: '⠀⠀⠀',
};

// Server Custom Emojis (Auto-generated on ${new Date().toISOString()})
const customEmojiPatterns = ${JSON.stringify(customEmojis, null, 4)};

module.exports = { emojis, customEmojiPatterns };`;

        // Write to file
        fs.writeFileSync(configPath, updatedConfig);

        await interaction.reply({
            content: `✅ **Config Updated Successfully!**\n\n` +
                    `• **${emojis.size}** custom emojis added to config\n` +
                    `• Updated file: \`config/emojis.js\`\n` +
                    `• You can now use these emojis in your layouts!\n\n` +
                    `**Note:** Restart the bot for changes to take effect.`,
            ephemeral: true
        });

    } catch (error) {
        console.error('Error updating config:', error);
        await interaction.reply({
            content: '❌ Failed to update config file. Check bot permissions and file system access.',
            ephemeral: true
        });
    }
}

async function showCurrentConfig(interaction) {
    try {
        const configPath = path.join(__dirname, '..', 'config', 'emojis.js');
        delete require.cache[require.resolve(configPath)]; // Clear cache
        const { emojis, customEmojiPatterns } = require(configPath);
        
        const standardCount = Object.keys(emojis).length;
        const customCount = Object.keys(customEmojiPatterns).length;
        
        let response = `**Current Emoji Configuration:**\n\n`;
        response += `📊 **Standard Emojis:** ${standardCount}\n`;
        response += `🎨 **Custom Emojis:** ${customCount}\n\n`;
        
        if (customCount > 0) {
            response += `**Custom Emojis Preview:**\n`;
            const customEntries = Object.entries(customEmojiPatterns).slice(0, 10);
            
            for (const [name, value] of customEntries) {
                response += `\`${name}\`: ${value}\n`;
            }
            
            if (customCount > 10) {
                response += `*...and ${customCount - 10} more*\n`;
            }
        } else {
            response += `*No custom emojis configured. Use \`/fetch-emojis action:update\` to add server emojis.*`;
        }

        await interaction.reply({ content: response, ephemeral: true });
        
    } catch (error) {
        await interaction.reply({ 
            content: '❌ Error reading current configuration.', 
            ephemeral: true 
        });
    }
}

async function generateConfig(interaction, emojis, filter) {
    let emojiList = Array.from(emojis.values());
    
    if (filter) {
        emojiList = emojiList.filter(emoji => 
            emoji.name.toLowerCase().includes(filter.toLowerCase())
        );
    }

    if (emojiList.length === 0) {
        await interaction.reply({ 
            content: 'No emojis found to generate config for.', 
            ephemeral: true 
        });
        return;
    }

    let configCode = `// Generated Custom Emoji Config\nconst customEmojiPatterns = {\n`;
    
    emojiList.forEach(emoji => {
        const safeName = emoji.name.replace(/[^a-zA-Z0-9]/g, '');
        configCode += `    ${safeName}: '<:${emoji.name}:${emoji.id}>',\n`;
    });
    
    configCode += `};\n\nmodule.exports = { customEmojiPatterns };`;

    // Split into chunks if too long
    const maxLength = 1900;
    if (configCode.length > maxLength) {
        const chunks = [];
        for (let i = 0; i < configCode.length; i += maxLength) {
            chunks.push(configCode.slice(i, i + maxLength));
        }

        await interaction.reply({
            content: `**Generated Config Code (${emojiList.length} emojis):**\n\`\`\`javascript\n${chunks[0]}\n\`\`\``,
            ephemeral: true
        });

        for (let i = 1; i < chunks.length; i++) {
            await interaction.followUp({
                content: `\`\`\`javascript\n${chunks[i]}\n\`\`\``,
                ephemeral: true
            });
        }
    } else {
        await interaction.reply({
            content: `**Generated Config Code (${emojiList.length} emojis):**\n\`\`\`javascript\n${configCode}\n\`\`\``,
            ephemeral: true
        });
    }
}