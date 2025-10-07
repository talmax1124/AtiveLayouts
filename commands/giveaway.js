const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const EmojiResolver = require('../utils/emoji-resolver.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Create stunning giveaway panels with your custom emojis')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of giveaway panel')
                .setRequired(true)
                .addChoices(
                    { name: '🎁 Classic Gift Panel', value: 'classic' },
                    { name: '💎 Premium Panel', value: 'premium' },
                    { name: '🎉 Party Panel', value: 'party' },
                    { name: '👑 Royal Panel', value: 'royal' },
                    { name: '🔥 Hot Panel', value: 'hot' },
                    { name: '🌟 Star Panel', value: 'star' },
                    { name: '🚀 Mega Panel', value: 'mega' },
                    { name: '💖 Cute Panel', value: 'cute' }
                ))
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('What is being given away')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('How long the giveaway lasts')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('requirements')
                .setDescription('Requirements to enter')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('winners')
                .setDescription('Number of winners')
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
                    { name: '🩷 Pink', value: 'pink' }
                )),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const prize = interaction.options.getString('prize');
        const duration = interaction.options.getString('duration') || '24 hours';
        const requirements = interaction.options.getString('requirements') || 'React with 🎉';
        const winners = interaction.options.getString('winners') || '1';
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
            pink: 0xFF69B4
        };

        let embed;
        let decorativeHeader = '';

        switch (type) {
            case 'classic':
                embed = createClassicPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createGiveawayDecoration();
                break;
            case 'premium':
                embed = createPremiumPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createDiamondDecoration();
                break;
            case 'party':
                embed = createPartyPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createPartyDecoration();
                break;
            case 'royal':
                embed = createRoyalPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createRoyalDecoration();
                break;
            case 'hot':
                embed = createHotPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createFireDecoration();
                break;
            case 'star':
                embed = createStarPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createSparkleDecoration();
                break;
            case 'mega':
                embed = createMegaPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = createMegaDecoration(emojiResolver);
                break;
            case 'cute':
                embed = createCutePanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = createHeartDecoration(emojiResolver);
                break;
            default:
                embed = createClassicPanel(prize, duration, requirements, winners, colors[color], emojiResolver);
                decorativeHeader = emojiResolver.createGiveawayDecoration();
        }

        await interaction.reply({ 
            content: decorativeHeader,
            embeds: [embed] 
        });
    }
};

function createClassicPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const giftEmoji = emojiResolver.getGift();
    const bellEmoji = emojiResolver.getBell();
    const trophyEmoji = emojiResolver.getTrophy();
    const arrowEmoji = emojiResolver.getArrow();
    const sparkleEmoji = emojiResolver.getSparkles();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${giftEmoji} GIVEAWAY TIME!`)
        .setDescription(`**Prize:** ${giftEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${bellEmoji} Duration`, value: `${bellEmoji} ${duration}`, inline: true },
            { name: `${trophyEmoji} Winners`, value: `${trophyEmoji} ${winners}`, inline: true },
            { name: `${arrowEmoji} Requirements`, value: `${arrowEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${sparkleEmoji} Good luck everyone! ${sparkleEmoji}`, inline: false }
        )
        .setFooter({ text: `${giftEmoji} Giveaway • React to enter!` })
        .setTimestamp();
}

function createPremiumPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const diamondEmoji = emojiResolver.getDiamond();
    const sparkleEmoji = emojiResolver.getSparkles();
    const bellEmoji = emojiResolver.getBell();
    const crownEmoji = emojiResolver.getCrown();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${diamondEmoji} PREMIUM GIVEAWAY`)
        .setDescription(`**Exclusive Prize:** ${diamondEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${bellEmoji} Time Remaining`, value: `${bellEmoji} ${duration}`, inline: true },
            { name: `${crownEmoji} Lucky Winners`, value: `${crownEmoji} ${winners}`, inline: true },
            { name: `${sparkleEmoji} Entry Requirements`, value: `${diamondEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${diamondEmoji} *Premium Quality Guaranteed* ${diamondEmoji}`, inline: false }
        )
        .setFooter({ text: `${diamondEmoji} Premium Giveaway • Exclusive & Rare` })
        .setTimestamp();
}

function createPartyPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const partyEmoji = emojiResolver.getParty();
    const balloonsEmoji = emojiResolver.get('balloons') || partyEmoji;
    const celebrateEmoji = emojiResolver.get('celebrate') || partyEmoji;
    const hbdEmoji = emojiResolver.get('hbd') || partyEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${partyEmoji} PARTY GIVEAWAY!`)
        .setDescription(`**Celebration Prize:** ${celebrateEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${balloonsEmoji} Party Duration`, value: `${balloonsEmoji} ${duration}`, inline: true },
            { name: `${hbdEmoji} Party Winners`, value: `${partyEmoji} ${winners}`, inline: true },
            { name: `${celebrateEmoji} How to Join`, value: `${partyEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${partyEmoji} *Let's Celebrate Together!* ${partyEmoji}`, inline: false }
        )
        .setFooter({ text: `${partyEmoji} Party Time • Join the Fun!` })
        .setTimestamp();
}

function createRoyalPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const crownEmoji = emojiResolver.getCrown();
    const diamondEmoji = emojiResolver.getDiamond();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${crownEmoji} ROYAL GIVEAWAY`)
        .setDescription(`**Royal Prize:** ${crownEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${crownEmoji} Royal Duration`, value: `${crownEmoji} ${duration}`, inline: true },
            { name: `${diamondEmoji} Chosen Ones`, value: `${diamondEmoji} ${winners}`, inline: true },
            { name: `${crownEmoji} Royal Decree`, value: `${crownEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${crownEmoji} *By Royal Command* ${crownEmoji}`, inline: false }
        )
        .setFooter({ text: `${crownEmoji} Royal Giveaway • Fit for Royalty` })
        .setTimestamp();
}

function createHotPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const fireEmoji = emojiResolver.getFire();
    const redFlameEmoji = emojiResolver.get('redflame') || fireEmoji;
    const pinkFlameEmoji = emojiResolver.get('pinkflame') || fireEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${fireEmoji} HOT GIVEAWAY!`)
        .setDescription(`**Blazing Prize:** ${redFlameEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${fireEmoji} Burning Time`, value: `${fireEmoji} ${duration}`, inline: true },
            { name: `${pinkFlameEmoji} Hot Winners`, value: `${fireEmoji} ${winners}`, inline: true },
            { name: `${redFlameEmoji} Heat Requirements`, value: `${fireEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${fireEmoji} *This Giveaway is LIT!* ${fireEmoji}`, inline: false }
        )
        .setFooter({ text: `${fireEmoji} Hot Giveaway • Don't get burned!` })
        .setTimestamp();
}

function createStarPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const starEmoji = emojiResolver.get('stars') || emojiResolver.getSparkles();
    const sparkleEmoji = emojiResolver.getSparkles();
    const aaStarBlueEmoji = emojiResolver.get('aastarblue99') || starEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${starEmoji} STELLAR GIVEAWAY`)
        .setDescription(`**Cosmic Prize:** ${aaStarBlueEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${sparkleEmoji} Stellar Time`, value: `${sparkleEmoji} ${duration}`, inline: true },
            { name: `${starEmoji} Star Winners`, value: `${starEmoji} ${winners}`, inline: true },
            { name: `${aaStarBlueEmoji} Cosmic Rules`, value: `${starEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${starEmoji} *Reach for the Stars!* ${starEmoji}`, inline: false }
        )
        .setFooter({ text: `${starEmoji} Stellar Giveaway • Shine Bright` })
        .setTimestamp();
}

function createMegaPanel(prize, duration, requirements, winners, color, emojiResolver) {
    const rocketEmoji = emojiResolver.get('rocket') || emojiResolver.get('rocket61') || '🚀';
    const crownEmoji = emojiResolver.getCrown();
    const fireEmoji = emojiResolver.getFire();
    const trophyEmoji = emojiResolver.getTrophy();
    const arrowEmoji = emojiResolver.getArrow();
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${rocketEmoji} MEGA GIVEAWAY!`)
        .setDescription(`**MASSIVE Prize:** ${crownEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${fireEmoji} MEGA Duration`, value: `${fireEmoji} ${duration}`, inline: true },
            { name: `${trophyEmoji} MEGA Winners`, value: `${trophyEmoji} ${winners}`, inline: true },
            { name: `${rocketEmoji} MEGA Requirements`, value: `${arrowEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${fireEmoji}${crownEmoji} *THE BIGGEST GIVEAWAY YET!* ${crownEmoji}${fireEmoji}`, inline: false }
        )
        .setFooter({ text: `${rocketEmoji} MEGA GIVEAWAY • GO BIG OR GO HOME!` })
        .setTimestamp();
}

function createCutePanel(prize, duration, requirements, winners, color, emojiResolver) {
    const heartEmoji = emojiResolver.getHeart();
    const pixelHeartEmoji = emojiResolver.get('pixelheart') || heartEmoji;
    const angelHeartEmoji = emojiResolver.get('angelwingheart') || heartEmoji;
    const dividerEmoji = emojiResolver.getDivider();
    
    return new EmbedBuilder()
        .setTitle(`${heartEmoji} CUTE GIVEAWAY`)
        .setDescription(`**Adorable Prize:** ${pixelHeartEmoji} ${prize}`)
        .setColor(color)
        .addFields(
            { name: `${angelHeartEmoji} Cute Duration`, value: `${heartEmoji} ${duration}`, inline: true },
            { name: `${pixelHeartEmoji} Sweet Winners`, value: `${heartEmoji} ${winners}`, inline: true },
            { name: `${heartEmoji} Cute Rules`, value: `${pixelHeartEmoji} ${requirements}`, inline: false },
            { name: `${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}${dividerEmoji}`, value: `${heartEmoji} *Made with Love & Cuteness* ${heartEmoji}`, inline: false }
        )
        .setFooter({ text: `${heartEmoji} Cute Giveaway • Kawaii Time!` })
        .setTimestamp();
}

function createMegaDecoration(emojiResolver) {
    const fireEmoji = emojiResolver.getFire();
    const crownEmoji = emojiResolver.getCrown();
    const partyEmoji = emojiResolver.getParty();
    const diamondEmoji = emojiResolver.getDiamond();
    const trophyEmoji = emojiResolver.getTrophy();
    const rocketEmoji = emojiResolver.get('rocket') || '🚀';
    
    return `${fireEmoji}${crownEmoji}${rocketEmoji}${diamondEmoji}${trophyEmoji}${diamondEmoji}${rocketEmoji}${crownEmoji}${fireEmoji}`;
}

function createHeartDecoration(emojiResolver) {
    const heartEmoji = emojiResolver.getHeart();
    const pixelHeartEmoji = emojiResolver.get('pixelheart') || heartEmoji;
    const angelHeartEmoji = emojiResolver.get('angelwingheart') || heartEmoji;
    
    return `${heartEmoji}${pixelHeartEmoji}${angelHeartEmoji}${pixelHeartEmoji}${heartEmoji}${pixelHeartEmoji}${angelHeartEmoji}${pixelHeartEmoji}${heartEmoji}`;
}