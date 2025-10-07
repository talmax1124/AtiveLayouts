const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PRIORITY_STATIC, PRIORITY_ANIMATED } = require('../config/priority-emojis.js');
const SmartEmojiManager = require('../utils/smart-emoji-manager.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emoji-guide')
        .setDescription('Guide for setting up emojis with Discord\'s 100 emoji limit')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('What to show')
                .setRequired(true)
                .addChoices(
                    { name: '📋 Priority List', value: 'priority' },
                    { name: '🎨 Test Smart Layouts', value: 'test' },
                    { name: '📊 Current Status', value: 'status' }
                )),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const emojiManager = new SmartEmojiManager(interaction.guild);
        
        switch (action) {
            case 'priority':
                await showPriorityList(interaction);
                break;
            case 'test':
                await testSmartLayouts(interaction, emojiManager);
                break;
            case 'status':
                await showStatus(interaction, emojiManager);
                break;
        }
    }
};

async function showPriorityList(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('📋 Emoji Priority Guide (100 Slot Limit)')
        .setColor(0x0099FF)
        .setDescription('Upload these emojis to maximize your layouts with Discord\'s 50+50 limit')
        .addFields(
            { 
                name: '🖼️ Priority Static Emojis (50)', 
                value: '**Essential (15):**\n' +
                       '`crown` `diamond` `trophy` `star` `pixelheart`\n' +
                       '`heart` `cash` `coin` `bell` `megaphone`\n' +
                       '`arrow` `line` `borders` `gift` `check`\n\n' +
                       '**Letters (26):** A-Z for custom text\n\n' +
                       '**Numbers (9):** 1-9 for countdowns',
                inline: false 
            },
            { 
                name: '🎬 Priority Animated Emojis (50)', 
                value: '**Effects (20):**\n' +
                       '`giveaway` `fire` `fireblue` `goldenfire` `redflame`\n' +
                       '`pinkflame` `sparkles` `stars` `boost` `rocket`\n' +
                       '`levelup` `cash` `coin` `celebrate` `party`\n' +
                       '`balloons` `hbd` `clapping` `nice` `alert`\n\n' +
                       '**Dividers (10):** Various animated dividers\n\n' +
                       '**Hearts (10):** Animated heart variations\n\n' +
                       '**Gaming (10):** Dice, dancing, music, etc.',
                inline: false 
            },
            {
                name: '💡 Smart Tips',
                value: '• Upload emojis to a dedicated "emoji server"\n' +
                       '• Bot can use them in ALL servers\n' +
                       '• Focus on versatile, reusable emojis\n' +
                       '• Animated emojis have more impact\n' +
                       '• Letters allow custom text creation',
                inline: false
            }
        )
        .setFooter({ text: 'Upload these to maximize your 100 emoji slots!' });
    
    await interaction.reply({ embeds: [embed] });
}

async function testSmartLayouts(interaction, emojiManager) {
    let response = '**🎨 SMART LAYOUT TESTS**\n\n';
    
    // Test Elegant Layout
    response += '**✨ Elegant Style:**\n';
    response += emojiManager.createElegantLayout('Server News', 'Welcome to our community!');
    response += '\n\n';
    
    // Test Giveaway Layout
    response += '**🎁 Giveaway Style:**\n';
    response += emojiManager.createGiveawayLayout('Discord Nitro', '24 hours', '3 winners');
    response += '\n\n';
    
    // Test Royal Layout
    response += '**👑 Royal Style:**\n';
    response += emojiManager.createRoyalLayout('Royal Announcement', 'By decree of the crown');
    response += '\n\n';
    
    // Test Fire Layout
    response += '**🔥 Fire Style:**\n';
    response += emojiManager.createFireLayout('HOT NEWS', 'This is on fire!');
    response += '\n\n';
    
    // Test Game Layout
    response += '**🎮 Gaming Style:**\n';
    response += emojiManager.createGameLayout('Tournament', ['Player1', 'Player2', 'Player3']);
    
    await interaction.reply({ content: response });
}

async function showStatus(interaction, emojiManager) {
    const stats = emojiManager.getEmojiStats();
    
    const embed = new EmbedBuilder()
        .setTitle('📊 Current Emoji Status')
        .setColor(0x00FF00)
        .addFields(
            { name: '📈 Statistics', 
              value: `Total Emojis: **${stats.total}**\n` +
                     `Static: **${stats.static}**/50\n` +
                     `Animated: **${stats.animated}**/50`,
              inline: true 
            },
            { name: '🎯 Coverage', 
              value: `Essential: ${stats.total >= 30 ? '✅' : '⚠️'}\n` +
                     `Letters: ${stats.total >= 26 ? '✅' : '⚠️'}\n` +
                     `Effects: ${stats.animated >= 20 ? '✅' : '⚠️'}`,
              inline: true 
            }
        );
    
    if (stats.total < 50) {
        embed.addFields({
            name: '💡 Recommendation',
            value: `Upload ${50 - stats.total} more emojis to reach optimal coverage!`,
            inline: false
        });
    }
    
    // Show sample of available emojis
    if (stats.total > 0) {
        const sample = stats.available.slice(0, 20).join(', ');
        embed.addFields({
            name: '🎨 Available Emojis (sample)',
            value: `\`${sample}\`...`,
            inline: false
        });
    }
    
    await interaction.reply({ embeds: [embed] });
}