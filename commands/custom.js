const { SlashCommandBuilder } = require('discord.js');
const { emojis } = require('../config/emojis.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom')
        .setDescription('Create custom layouts and patterns with emojis')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of custom layout')
                .setRequired(true)
                .addChoices(
                    { name: 'Text Banner', value: 'text_banner' },
                    { name: 'Progress Bar', value: 'progress' },
                    { name: 'Countdown Timer', value: 'countdown' },
                    { name: 'Mood Board', value: 'mood' },
                    { name: 'Weather Display', value: 'weather' },
                    { name: 'Music Player', value: 'music' },
                    { name: 'Status Board', value: 'status' },
                    { name: 'Decorative Border', value: 'border' }
                ))
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Main text content')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('style')
                .setDescription('Style variation')
                .setRequired(false)
                .addChoices(
                    { name: 'Minimal', value: 'minimal' },
                    { name: 'Bold', value: 'bold' },
                    { name: 'Fancy', value: 'fancy' },
                    { name: 'Elegant', value: 'elegant' }
                ))
        .addIntegerOption(option =>
            option.setName('percentage')
                .setDescription('Percentage for progress bars (0-100)')
                .setRequired(false)
                .setMinValue(0)
                .setMaxValue(100)),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const text = interaction.options.getString('text');
        const style = interaction.options.getString('style') || 'minimal';
        const percentage = interaction.options.getInteger('percentage') || 50;

        let layout = '';

        switch (type) {
            case 'text_banner':
                layout = createTextBanner(text, style);
                break;
            case 'progress':
                layout = createProgressBar(text, percentage, style);
                break;
            case 'countdown':
                layout = createCountdown(text, style);
                break;
            case 'mood':
                layout = createMoodBoard(text, style);
                break;
            case 'weather':
                layout = createWeatherDisplay(text, style);
                break;
            case 'music':
                layout = createMusicPlayer(text, style);
                break;
            case 'status':
                layout = createStatusBoard(text, style);
                break;
            case 'border':
                layout = createDecorativeBorder(text, style);
                break;
            default:
                layout = createTextBanner(text, style);
        }

        await interaction.reply({ content: layout });
    }
};

function createTextBanner(text, style) {
    switch (style) {
        case 'minimal':
            return `${emojis.whiteSquare} **${text}** ${emojis.whiteSquare}`;
        case 'bold':
            const boldLine = emojis.largeBlueSquare.repeat(Math.min(text.length + 4, 12));
            return `${boldLine}\n${emojis.largeBlueSquare} **${text}** ${emojis.largeBlueSquare}\n${boldLine}`;
        case 'fancy':
            return `${emojis.sparkles}${emojis.star}${emojis.sparkles} **${text}** ${emojis.sparkles}${emojis.star}${emojis.sparkles}`;
        case 'elegant':
            return `${emojis.gem}━━━ **${text}** ━━━${emojis.gem}`;
        default:
            return `${emojis.whiteSquare} **${text}** ${emojis.whiteSquare}`;
    }
}

function createProgressBar(text, percentage, style) {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percentage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    
    let filledEmoji = emojis.largeBlueSquare;
    let emptyEmoji = emojis.whiteSquare;
    
    switch (style) {
        case 'fancy':
            filledEmoji = emojis.star;
            emptyEmoji = emojis.whiteSquare;
            break;
        case 'bold':
            filledEmoji = emojis.fire;
            emptyEmoji = emojis.square;
            break;
        case 'elegant':
            filledEmoji = emojis.gem;
            emptyEmoji = emojis.whiteCircle;
            break;
    }
    
    const progressBar = filledEmoji.repeat(filledBlocks) + emptyEmoji.repeat(emptyBlocks);
    return `**${text}**\n${progressBar}\n${emojis.rightArrow} ${percentage}% Complete`;
}

function createCountdown(text, style) {
    const numbers = [emojis.three, emojis.two, emojis.one];
    const countdown = numbers.join(' ');
    
    switch (style) {
        case 'fancy':
            return `${emojis.sparkles} **${text}** ${emojis.sparkles}\n${countdown}\n${emojis.fire} GO! ${emojis.fire}`;
        case 'bold':
            return `${emojis.fire} **${text}** ${emojis.fire}\n${countdown}\n${emojis.trophy} START! ${emojis.trophy}`;
        case 'elegant':
            return `${emojis.gem} **${text}** ${emojis.gem}\n${countdown}\n${emojis.star} Begin ${emojis.star}`;
        default:
            return `**${text}**\n${countdown}\n${emojis.rightArrow} Go!`;
    }
}

function createMoodBoard(text, style) {
    const moodEmojis = {
        happy: [emojis.party, emojis.sparkles, emojis.star],
        excited: [emojis.fire, emojis.party, emojis.trophy],
        calm: [emojis.whiteCircle, emojis.largeBlueSquare, emojis.gem],
        energetic: [emojis.fire, emojis.rightArrow, emojis.crown]
    };
    
    const selectedMood = moodEmojis.happy;
    const moodLine = selectedMood.join('');
    
    switch (style) {
        case 'fancy':
            return `${moodLine}\n${emojis.sparkles} **${text}** ${emojis.sparkles}\n${moodLine}`;
        case 'bold':
            return `${moodLine}${moodLine}\n${emojis.crown} **${text}** ${emojis.crown}\n${moodLine}${moodLine}`;
        default:
            return `${moodLine}\n**${text}**\n${moodLine}`;
    }
}

function createWeatherDisplay(text, style) {
    const weatherIcon = emojis.star;
    
    switch (style) {
        case 'fancy':
            return `${emojis.sparkles}${weatherIcon}${emojis.sparkles} **Weather Update** ${emojis.sparkles}${weatherIcon}${emojis.sparkles}\n${emojis.rightArrow} ${text}`;
        case 'bold':
            return `${weatherIcon.repeat(5)}\n${emojis.fire} **${text}** ${emojis.fire}\n${weatherIcon.repeat(5)}`;
        default:
            return `${weatherIcon} **Weather:** ${text}`;
    }
}

function createMusicPlayer(text, style) {
    const controls = `${emojis.leftArrow}${emojis.rightArrow}`;
    
    switch (style) {
        case 'fancy':
            return `${emojis.sparkles} **Now Playing** ${emojis.sparkles}\n${emojis.rightArrow} ${text}\n${controls} ${emojis.party}`;
        case 'bold':
            return `${emojis.fire} **♪ NOW PLAYING ♪** ${emojis.fire}\n${text}\n${controls} ${emojis.fire}`;
        default:
            return `**♪ ${text} ♪**\n${controls}`;
    }
}

function createStatusBoard(text, style) {
    const statusIcon = emojis.greenCircle;
    
    switch (style) {
        case 'fancy':
            return `${emojis.sparkles} **System Status** ${emojis.sparkles}\n${statusIcon} ${text}`;
        case 'bold':
            return `${emojis.fire} **STATUS BOARD** ${emojis.fire}\n${statusIcon} **${text}**`;
        case 'elegant':
            return `${emojis.gem} Status Update ${emojis.gem}\n${statusIcon} ${text}`;
        default:
            return `${statusIcon} **Status:** ${text}`;
    }
}

function createDecorativeBorder(text, style) {
    switch (style) {
        case 'fancy':
            const fancyBorder = `${emojis.sparkles}${emojis.star}${emojis.gem}${emojis.star}${emojis.sparkles}`;
            return `${fancyBorder}\n${emojis.star} ${text} ${emojis.star}\n${fancyBorder}`;
        case 'bold':
            const boldBorder = emojis.fire.repeat(8);
            return `${boldBorder}\n${emojis.fire} ${text} ${emojis.fire}\n${boldBorder}`;
        case 'elegant':
            return `${emojis.gem}━━━━━━━━━${emojis.gem}\n${emojis.space}${text}${emojis.space}\n${emojis.gem}━━━━━━━━━${emojis.gem}`;
        default:
            const simpleBorder = emojis.whiteSquare.repeat(6);
            return `${simpleBorder}\n${text}\n${simpleBorder}`;
    }
}