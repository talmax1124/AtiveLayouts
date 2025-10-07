const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { customEmojis, updateEmojiIds } = require('../config/custom-emojis.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-emojis')
        .setDescription('Automatically setup your server emojis for layouts')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('What to do')
                .setRequired(true)
                .addChoices(
                    { name: '🔍 Scan & Match Emojis', value: 'scan' },
                    { name: '⚡ Auto Setup All', value: 'auto' },
                    { name: '📋 Show Current Setup', value: 'show' },
                    { name: '🔄 Update Config File', value: 'update' }
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const guild = interaction.guild;
        const serverEmojis = Array.from(guild.emojis.cache.values());

        try {
            switch (action) {
                case 'scan':
                    await scanAndMatchEmojis(interaction, serverEmojis);
                    break;
                case 'auto':
                    await autoSetupEmojis(interaction, serverEmojis);
                    break;
                case 'show':
                    await showCurrentSetup(interaction, serverEmojis);
                    break;
                case 'update':
                    await updateConfigFile(interaction, serverEmojis);
                    break;
                default:
                    await interaction.reply({ content: 'Invalid action!', ephemeral: true });
            }
        } catch (error) {
            console.error('Error in setup-emojis:', error);
            await interaction.reply({ 
                content: 'An error occurred while setting up emojis!', 
                ephemeral: true 
            });
        }
    }
};

async function scanAndMatchEmojis(interaction, serverEmojis) {
    const matches = [];
    const emojiKeys = Object.keys(customEmojis);
    
    for (const emojiKey of emojiKeys) {
        const serverEmoji = findBestMatch(emojiKey, serverEmojis);
        if (serverEmoji) {
            matches.push({
                key: emojiKey,
                serverEmoji: serverEmoji,
                match: `${emojiKey} → ${serverEmoji.name} (${serverEmoji.id})`
            });
        }
    }

    if (matches.length === 0) {
        await interaction.reply({
            content: '❌ **No matching emojis found!**\\n\\nMake sure your custom emojis are uploaded to this server.',
            ephemeral: true
        });
        return;
    }

    // Create response in chunks
    let response = `🔍 **Emoji Scan Results:**\\n\\n**Found ${matches.length} matches:**\\n\\n`;
    
    const displayMatches = matches.slice(0, 20); // Show first 20
    for (const match of displayMatches) {
        response += `${match.serverEmoji} \`${match.match}\`\\n`;
    }
    
    if (matches.length > 20) {
        response += `\\n*...and ${matches.length - 20} more matches*`;
    }
    
    response += `\\n\\n💡 **Use \`/setup-emojis action:auto\` to automatically configure all matches!**`;

    await interaction.reply({ content: response, ephemeral: true });
}

async function autoSetupEmojis(interaction, serverEmojis) {
    await interaction.deferReply({ ephemeral: true });

    const updatedEmojis = updateEmojiIds(serverEmojis);
    const successCount = Object.values(updatedEmojis).filter(emoji => !emoji.includes(':ID>')).length;
    
    // Update the config file
    const configPath = path.join(__dirname, '..', 'config', 'emojis.js');
    
    try {
        // Read current config
        let configContent = fs.readFileSync(configPath, 'utf8');
        
        // Create the updated custom emoji patterns section
        let customEmojiPatternsCode = 'const customEmojiPatterns = {\\n';
        
        for (const [key, value] of Object.entries(updatedEmojis)) {
            customEmojiPatternsCode += `    ${key}: '${value}',\\n`;
        }
        
        customEmojiPatternsCode += '};';
        
        // Replace the customEmojiPatterns section
        const customPatternRegex = /const customEmojiPatterns = \\{[\\s\\S]*?\\};/;
        
        if (customPatternRegex.test(configContent)) {
            configContent = configContent.replace(customPatternRegex, customEmojiPatternsCode);
        } else {
            // If not found, append it
            configContent += '\\n\\n' + customEmojiPatternsCode;
        }
        
        // Write back to file
        fs.writeFileSync(configPath, configContent);
        
        await interaction.editReply({
            content: `✅ **Auto Setup Complete!**\\n\\n` +
                    `📊 **Results:**\\n` +
                    `• **${successCount}** emojis successfully configured\\n` +
                    `• **${Object.keys(updatedEmojis).length - successCount}** emojis need manual setup\\n` +
                    `• Updated: \`config/emojis.js\`\\n\\n` +
                    `🔄 **Please restart the bot for changes to take effect!**\\n\\n` +
                    `✨ Your layouts will now use your custom server emojis!`
        });
        
    } catch (error) {
        await interaction.editReply({
            content: '❌ **Failed to update config file!**\\n\\nPlease check file permissions and try again.'
        });
    }
}

async function showCurrentSetup(interaction, serverEmojis) {
    const configPath = path.join(__dirname, '..', 'config', 'emojis.js');
    
    try {
        // Clear require cache
        delete require.cache[require.resolve(configPath)];
        const { customEmojiPatterns } = require(configPath);
        
        const totalCustom = Object.keys(customEmojiPatterns).length;
        const configured = Object.values(customEmojiPatterns).filter(emoji => 
            !emoji.includes(':ID>')
        ).length;
        
        let response = `📋 **Current Emoji Setup:**\\n\\n`;
        response += `📊 **Statistics:**\\n`;
        response += `• Total custom emoji slots: ${totalCustom}\\n`;
        response += `• Configured with real IDs: ${configured}\\n`;
        response += `• Needs configuration: ${totalCustom - configured}\\n`;
        response += `• Server emojis available: ${serverEmojis.length}\\n\\n`;
        
        if (configured > 0) {
            response += `✅ **Sample configured emojis:**\\n`;
            const configuredEntries = Object.entries(customEmojiPatterns)
                .filter(([key, value]) => !value.includes(':ID>'))
                .slice(0, 10);
                
            for (const [key, value] of configuredEntries) {
                response += `\`${key}\`: ${value}\\n`;
            }
            
            if (configured > 10) {
                response += `*...and ${configured - 10} more*\\n`;
            }
        }
        
        if (totalCustom - configured > 0) {
            response += `\\n⚠️ **Run \`/setup-emojis action:auto\` to configure remaining emojis!**`;
        }
        
        await interaction.reply({ content: response, ephemeral: true });
        
    } catch (error) {
        await interaction.reply({
            content: '❌ Error reading current setup. Make sure config file exists.',
            ephemeral: true
        });
    }
}

async function updateConfigFile(interaction, serverEmojis) {
    await interaction.deferReply({ ephemeral: true });
    
    // This is the same as auto setup but with different messaging
    await autoSetupEmojis(interaction, serverEmojis);
}

function findBestMatch(emojiKey, serverEmojis) {
    // Direct name match (case insensitive)
    let match = serverEmojis.find(emoji => 
        emoji.name.toLowerCase() === emojiKey.toLowerCase()
    );
    
    if (match) return match;
    
    // Partial name match
    match = serverEmojis.find(emoji => 
        emoji.name.toLowerCase().includes(emojiKey.toLowerCase()) ||
        emojiKey.toLowerCase().includes(emoji.name.toLowerCase())
    );
    
    if (match) return match;
    
    // Remove numbers and try again
    const cleanKey = emojiKey.replace(/\\d+/g, '');
    match = serverEmojis.find(emoji => {
        const cleanEmojiName = emoji.name.replace(/\\d+/g, '');
        return cleanEmojiName.toLowerCase().includes(cleanKey.toLowerCase()) ||
               cleanKey.toLowerCase().includes(cleanEmojiName.toLowerCase());
    });
    
    return match;
}