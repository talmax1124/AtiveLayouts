const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emoji-layouts')
        .setDescription('Create layouts using your server\'s custom emojis')
        .addStringOption(option =>
            option.setName('pattern')
                .setDescription('Layout pattern to create')
                .setRequired(true)
                .addChoices(
                    { name: 'Grid 3x3', value: 'grid3x3' },
                    { name: 'Grid 4x4', value: 'grid4x4' },
                    { name: 'Diamond Shape', value: 'diamond' },
                    { name: 'Heart Shape', value: 'heart' },
                    { name: 'Star Shape', value: 'star' },
                    { name: 'Wave Pattern', value: 'wave' },
                    { name: 'Border Frame', value: 'border' },
                    { name: 'Alternating Pattern', value: 'alternating' }
                ))
        .addStringOption(option =>
            option.setName('emoji1')
                .setDescription('First emoji to use (type emoji name or use actual emoji)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('emoji2')
                .setDescription('Second emoji to use (optional, for alternating patterns)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to include in the center (for border patterns)')
                .setRequired(false)),

    async execute(interaction) {
        const pattern = interaction.options.getString('pattern');
        const emoji1Input = interaction.options.getString('emoji1');
        const emoji2Input = interaction.options.getString('emoji2');
        const text = interaction.options.getString('text');

        try {
            // Get server emojis
            const serverEmojis = interaction.guild.emojis.cache;
            
            // Resolve emojis (can be custom emoji name or actual emoji)
            const emoji1 = resolveEmoji(emoji1Input, serverEmojis);
            const emoji2 = emoji2Input ? resolveEmoji(emoji2Input, serverEmojis) : null;

            if (!emoji1) {
                await interaction.reply({ 
                    content: `❌ Could not find emoji "${emoji1Input}". Try using the actual emoji or check the name.`, 
                    ephemeral: true 
                });
                return;
            }

            let layout = '';

            switch (pattern) {
                case 'grid3x3':
                    layout = createGrid(emoji1, emoji2, 3, 3);
                    break;
                case 'grid4x4':
                    layout = createGrid(emoji1, emoji2, 4, 4);
                    break;
                case 'diamond':
                    layout = createDiamond(emoji1, emoji2);
                    break;
                case 'heart':
                    layout = createHeart(emoji1, emoji2);
                    break;
                case 'star':
                    layout = createStar(emoji1, emoji2);
                    break;
                case 'wave':
                    layout = createWave(emoji1, emoji2);
                    break;
                case 'border':
                    layout = createBorder(emoji1, text || 'TEXT');
                    break;
                case 'alternating':
                    layout = createAlternating(emoji1, emoji2 || emoji1);
                    break;
                default:
                    layout = createGrid(emoji1, emoji2, 3, 3);
            }

            await interaction.reply({ content: layout });

        } catch (error) {
            console.error('Error in emoji-layouts command:', error);
            await interaction.reply({ 
                content: '❌ An error occurred while creating the layout.', 
                ephemeral: true 
            });
        }
    }
};

function resolveEmoji(input, serverEmojis) {
    // If it's already an emoji (Unicode or Discord custom emoji), return as is
    if (input.includes('<:') || input.includes('<a:') || /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(input)) {
        return input;
    }

    // Try to find custom emoji by name
    const customEmoji = serverEmojis.find(emoji => 
        emoji.name.toLowerCase() === input.toLowerCase()
    );
    
    if (customEmoji) {
        return `<:${customEmoji.name}:${customEmoji.id}>`;
    }

    // Return the input as-is if we can't resolve it
    return input;
}

function createGrid(emoji1, emoji2, width, height) {
    let grid = '';
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (emoji2 && (row + col) % 2 === 1) {
                grid += emoji2;
            } else {
                grid += emoji1;
            }
        }
        if (row < height - 1) grid += '\n';
    }
    return grid;
}

function createDiamond(emoji1, emoji2) {
    const space = '⠀';
    const e1 = emoji1;
    const e2 = emoji2 || emoji1;
    
    return `${space}${space}${e1}${space}${space}\n${space}${e2}${e1}${e2}${space}\n${e1}${e2}${e1}${e2}${e1}\n${space}${e2}${e1}${e2}${space}\n${space}${space}${e1}${space}${space}`;
}

function createHeart(emoji1, emoji2) {
    const space = '⠀';
    const e1 = emoji1;
    const e2 = emoji2 || emoji1;
    
    return `${e2}${e1}${space}${e1}${e2}\n${e1}${e2}${e1}${e2}${e1}\n${e1}${e2}${e2}${e2}${e1}\n${space}${e1}${e2}${e1}${space}\n${space}${space}${e1}${space}${space}`;
}

function createStar(emoji1, emoji2) {
    const space = '⠀';
    const e1 = emoji1;
    const e2 = emoji2 || emoji1;
    
    return `${space}${space}${e1}${space}${space}\n${space}${e2}${e1}${e2}${space}\n${e1}${e2}${e1}${e2}${e1}\n${space}${e2}${space}${e2}${space}\n${e2}${space}${space}${space}${e2}`;
}

function createWave(emoji1, emoji2) {
    const e1 = emoji1;
    const e2 = emoji2 || emoji1;
    const space = '⠀';
    
    return `${e1}${space}${e2}${space}${e1}${space}${e2}\n${space}${e2}${space}${e1}${space}${e2}${space}\n${e2}${space}${e1}${space}${e2}${space}${e1}\n${space}${e1}${space}${e2}${space}${e1}${space}`;
}

function createBorder(emoji1, text) {
    const border = emoji1.repeat(8);
    const sideBorder = emoji1;
    const space = '⠀';
    
    return `${border}\n${sideBorder}${space}**${text}**${space}${sideBorder}\n${border}`;
}

function createAlternating(emoji1, emoji2) {
    const pattern = [];
    for (let i = 0; i < 5; i++) {
        let row = '';
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
                row += emoji1;
            } else {
                row += emoji2;
            }
        }
        pattern.push(row);
    }
    return pattern.join('\n');
}