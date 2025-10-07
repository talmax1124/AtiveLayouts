const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const EmojiResolver = require('../utils/emoji-resolver.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Create beautiful announcement panels with your custom emojis')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of announcement panel')
                .setRequired(true)
                .addChoices(
                    { name: '✨ Elegant Panel', value: 'elegant' },
                    { name: '👑 Royal Panel', value: 'royal' },
                    { name: '🔥 Fire Panel', value: 'fire' },
                    { name: '💎 Diamond Panel', value: 'diamond' },
                    { name: '🌟 Star Panel', value: 'star' },
                    { name: '🎉 Party Panel', value: 'party' },
                    { name: '📢 Alert Panel', value: 'alert' },
                    { name: '💖 Cute Panel', value: 'cute' }
                ))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title for the announcement')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message content')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Panel color theme')
                .setRequired(false)
                .addChoices(
                    { name: '🔴 Red', value: 'red' },
                    { name: '🔵 Blue', value: 'blue' },
                    { name: '🟢 Green', value: 'green' },
                    { name: '🟡 Yellow', value: 'yellow' },
                    { name: '🟣 Purple', value: 'purple' },
                    { name: '🟠 Orange', value: 'orange' },
                    { name: '🖤 Black', value: 'black' },
                    { name: '🩷 Pink', value: 'pink' }
                )),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const title = interaction.options.getString('title');
        const message = interaction.options.getString('message') || '';
        const color = interaction.options.getString('color') || 'blue';

        // Create emoji resolver with the server's custom emojis
        const emojiResolver = new EmojiResolver(interaction.guild);

        const colors = {
            red: 0xFF0000,
            blue: 0x0099FF,
            green: 0x00FF00,
            yellow: 0xFFFF00,
            purple: 0x9900FF,
            orange: 0xFF6600,
            black: 0x2C2C2C,
            pink: 0xFF69B4
        };

        let embed;
        let decorativeHeader = '';

        switch (type) {
            case 'elegant':
                embed = createElegantPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createSparkleDecoration();
                break;
            case 'royal':
                embed = createRoyalPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createRoyalDecoration();
                break;
            case 'fire':
                embed = createFirePanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createFireDecoration();
                break;
            case 'diamond':
                embed = createDiamondPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createDiamondDecoration();
                break;
            case 'star':
                embed = createStarPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createSparkleDecoration();
                break;
            case 'party':
                embed = createPartyPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createPartyDecoration();
                break;
            case 'alert':
                embed = createAlertPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = createAlertDecoration(emojiResolver);
                break;
            case 'cute':
                embed = createCutePanel(title, message, colors[color], emojiResolver);
                decorativeHeader = createHeartDecoration(emojiResolver);
                break;
            default:
                embed = createElegantPanel(title, message, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createSparkleDecoration();
        }

        await interaction.reply({ 
            content: decorativeHeader,
            embeds: [embed] 
        });
    }
};

function createElegantPanel(title, message, color, emojiResolver) {
    const sparkleEmoji = emojiResolver.getSparkles();
    const dividerEmoji = emojiResolver.getDivider();
    const arrowEmoji = emojiResolver.getArrow();
    
    return new EmbedBuilder()
        .setTitle(`${sparkleEmoji} ${title}`)
        .setDescription(message ? `${arrowEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${sparkleEmoji} *Elegant & Professional* ${sparkleEmoji}`, inline: false }
        )
        .setFooter({ text: `${sparkleEmoji} Powered by Ative Layouts` })
        .setTimestamp();
}

function createRoyalPanel(title, message, color, emojiResolver) {
    const crownEmoji = emojiResolver.getCrown();
    const diamondEmoji = emojiResolver.getDiamond();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${crownEmoji} ${title}`)
        .setDescription(message ? `${diamondEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${crownEmoji} *Royal Announcement* ${crownEmoji}`, inline: false }
        )
        .setFooter({ text: `${crownEmoji} By Royal Decree` })
        .setTimestamp();
}

function createFirePanel(title, message, color, emojiResolver) {
    const fireEmoji = emojiResolver.getFire();
    const redFlameEmoji = emojiResolver.get('redflame') || fireEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${fireEmoji} ${title}`)
        .setDescription(message ? `${redFlameEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${fireEmoji} *Hot Announcement* ${fireEmoji}`, inline: false }
        )
        .setFooter({ text: `${fireEmoji} This is lit!` })
        .setTimestamp();
}

function createDiamondPanel(title, message, color, emojiResolver) {
    const diamondEmoji = emojiResolver.getDiamond();
    const sparkleEmoji = emojiResolver.getSparkles();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${diamondEmoji} ${title}`)
        .setDescription(message ? `${sparkleEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${diamondEmoji} *Premium Quality* ${diamondEmoji}`, inline: false }
        )
        .setFooter({ text: `${diamondEmoji} Rare & Valuable` })
        .setTimestamp();
}

function createStarPanel(title, message, color, emojiResolver) {
    const starEmoji = emojiResolver.get('stars') || emojiResolver.getSparkles();
    const sparkleEmoji = emojiResolver.getSparkles();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${starEmoji} ${title}`)
        .setDescription(message ? `${sparkleEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${starEmoji} *Stellar Announcement* ${starEmoji}`, inline: false }
        )
        .setFooter({ text: `${starEmoji} Shining Bright` })
        .setTimestamp();
}

function createPartyPanel(title, message, color, emojiResolver) {
    const partyEmoji = emojiResolver.getParty();
    const balloonsEmoji = emojiResolver.get('balloons') || partyEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${partyEmoji} ${title}`)
        .setDescription(message ? `${balloonsEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${partyEmoji} *Let's Celebrate!* ${partyEmoji}`, inline: false }
        )
        .setFooter({ text: `${partyEmoji} Party Time!` })
        .setTimestamp();
}

function createAlertPanel(title, message, color, emojiResolver) {
    const megaphoneEmoji = emojiResolver.getMegaphone();
    const bellEmoji = emojiResolver.getBell();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${megaphoneEmoji} ${title}`)
        .setDescription(message ? `${bellEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${bellEmoji} *Important Notice* ${bellEmoji}`, inline: false }
        )
        .setFooter({ text: `${megaphoneEmoji} Attention Required` })
        .setTimestamp();
}

function createCutePanel(title, message, color, emojiResolver) {
    const heartEmoji = emojiResolver.getHeart();
    const pixelHeartEmoji = emojiResolver.get('pixelheart') || heartEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${heartEmoji} ${title}`)
        .setDescription(message ? `${pixelHeartEmoji} ${message}` : null)
        .setColor(color)
        .addFields(
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${heartEmoji} *Cute & Lovely* ${heartEmoji}`, inline: false }
        )
        .setFooter({ text: `${heartEmoji} Made with Love` })
        .setTimestamp();
}

function createAlertDecoration(emojiResolver) {
    const bellEmoji = emojiResolver.getBell();
    const megaphoneEmoji = emojiResolver.getMegaphone();
    return `${bellEmoji}${megaphoneEmoji}${bellEmoji}${megaphoneEmoji}${bellEmoji}${megaphoneEmoji}${bellEmoji}${megaphoneEmoji}${bellEmoji}`;
}

function createHeartDecoration(emojiResolver) {
    const heartEmoji = emojiResolver.getHeart();
    const pixelHeartEmoji = emojiResolver.get('pixelheart') || heartEmoji;
    return `${heartEmoji}${pixelHeartEmoji}${heartEmoji}${pixelHeartEmoji}${heartEmoji}${pixelHeartEmoji}${heartEmoji}${pixelHeartEmoji}${heartEmoji}`;
}