const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('debug-emojis')
        .setDescription('Debug: Show all server emojis and test layouts')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('What to do')
                .setRequired(true)
                .addChoices(
                    { name: 'List All Server Emojis', value: 'list' },
                    { name: 'Test Layout with Real Emojis', value: 'test' },
                    { name: 'Show First 20 Emojis', value: 'preview' }
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const guild = interaction.guild;
        const serverEmojis = Array.from(guild.emojis.cache.values());

        switch (action) {
            case 'list':
                await listAllEmojis(interaction, serverEmojis);
                break;
            case 'test':
                await testLayout(interaction, serverEmojis);
                break;
            case 'preview':
                await previewEmojis(interaction, serverEmojis);
                break;
        }
    }
};

async function listAllEmojis(interaction, serverEmojis) {
    if (serverEmojis.length === 0) {
        await interaction.reply({
            content: '❌ **No custom emojis found on this server!**\n\nPlease upload your emojis from the `/emojis` folder to your Discord server.',
            ephemeral: true
        });
        return;
    }

    let response = `📊 **Server has ${serverEmojis.length} custom emojis:**\n\n`;
    
    // Show first 10 emojis with their actual Discord format
    const displayEmojis = serverEmojis.slice(0, 10);
    
    for (const emoji of displayEmojis) {
        const emojiString = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
        response += `${emojiString} \`:${emoji.name}:\` (ID: ${emoji.id})\n`;
    }
    
    if (serverEmojis.length > 10) {
        response += `\n*...and ${serverEmojis.length - 10} more emojis*\n`;
    }
    
    response += `\n✅ **These emojis can now be used in your layouts!**`;
    
    await interaction.reply({ content: response, ephemeral: true });
}

async function testLayout(interaction, serverEmojis) {
    if (serverEmojis.length === 0) {
        await interaction.reply({
            content: '❌ No custom emojis found! Upload emojis to your server first.',
            ephemeral: true
        });
        return;
    }

    // Get various emoji types
    const crown = findEmoji(serverEmojis, ['crown', 'accorona', 'crownlightblue']) || '👑';
    const fire = findEmoji(serverEmojis, ['fire', 'redflame', 'pinkflame', 'goldenfire']) || '🔥';
    const diamond = findEmoji(serverEmojis, ['diamond', 'diamond18', 'elmas', 'cypherelmas']) || '💎';
    const sparkles = findEmoji(serverEmojis, ['sparkles', 'stars', 'aastarblue']) || '✨';
    const arrow = findEmoji(serverEmojis, ['arrow', 'arrow1', 'arrowblue', 'right']) || '➡️';
    const gift = findEmoji(serverEmojis, ['giveaway', 'regalo', 'gift', 'sgiveaway']) || '🎁';
    const heart = findEmoji(serverEmojis, ['heart', 'pixelheart', 'angelwingheart']) || '❤️';
    const party = findEmoji(serverEmojis, ['celebrate', 'party', 'balloons', 'hbd']) || '🎉';
    const divider = findEmoji(serverEmojis, ['divider8', 'divider65', 'line', 'rainbowlines']) || '━';
    const rocket = findEmoji(serverEmojis, ['rocket', 'rocket61']) || '🚀';

    // Create a test layout with actual custom emojis
    let testLayout = `**🎨 CUSTOM EMOJI TEST LAYOUT**\n\n`;
    
    testLayout += `${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}\n`;
    testLayout += `${fire} **FIRE HEADER** ${fire}\n`;
    testLayout += `${sparkles} Using your actual custom emojis! ${sparkles}\n\n`;
    
    testLayout += `${arrow} Crown: ${crown}\n`;
    testLayout += `${arrow} Fire: ${fire}\n`;
    testLayout += `${arrow} Diamond: ${diamond}\n`;
    testLayout += `${arrow} Sparkles: ${sparkles}\n`;
    testLayout += `${arrow} Gift: ${gift}\n`;
    testLayout += `${arrow} Heart: ${heart}\n`;
    testLayout += `${arrow} Party: ${party}\n`;
    testLayout += `${arrow} Rocket: ${rocket}\n\n`;
    
    testLayout += `${divider}${divider}${divider}${divider}${divider}${divider}${divider}${divider}${divider}${divider}\n`;
    testLayout += `${party}${gift} **GIVEAWAY STYLE** ${gift}${party}\n`;
    testLayout += `${heart}${sparkles}${heart}${sparkles}${heart}${sparkles}${heart}${sparkles}${heart}\n`;
    
    await interaction.reply({ content: testLayout });
}

async function previewEmojis(interaction, serverEmojis) {
    if (serverEmojis.length === 0) {
        await interaction.reply({
            content: '❌ No custom emojis found on this server!',
            ephemeral: true
        });
        return;
    }

    let response = '**🎨 Custom Emoji Preview (First 20):**\n\n';
    
    const displayEmojis = serverEmojis.slice(0, 20);
    let emojiLine = '';
    
    for (let i = 0; i < displayEmojis.length; i++) {
        const emoji = displayEmojis[i];
        const emojiString = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
        emojiLine += emojiString;
        
        // Add line break every 10 emojis
        if ((i + 1) % 10 === 0) {
            emojiLine += '\n';
        }
    }
    
    response += emojiLine;
    response += `\n\n📊 Total: ${serverEmojis.length} custom emojis available`;
    
    await interaction.reply({ content: response });
}

function findEmoji(serverEmojis, nameVariations) {
    for (const variation of nameVariations) {
        const emoji = serverEmojis.find(e => 
            e.name.toLowerCase().includes(variation.toLowerCase()) ||
            variation.toLowerCase().includes(e.name.toLowerCase())
        );
        
        if (emoji) {
            return emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
        }
    }
    return null;
}