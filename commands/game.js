const { SlashCommandBuilder } = require('discord.js');
const { emojis } = require('../config/emojis.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
        .setDescription('Create various game-themed layouts with emojis')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of game layout')
                .setRequired(true)
                .addChoices(
                    { name: 'Tic Tac Toe Board', value: 'tictactoe' },
                    { name: 'Casino Night', value: 'casino' },
                    { name: 'Tournament Bracket', value: 'tournament' },
                    { name: 'Game Night Banner', value: 'gamenight' },
                    { name: 'Dice Roll', value: 'dice' },
                    { name: 'Card Game', value: 'cards' },
                    { name: 'Leaderboard', value: 'leaderboard' }
                ))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title for the game layout')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('players')
                .setDescription('Player names separated by commas (for tournaments/leaderboards)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('details')
                .setDescription('Additional details or rules')
                .setRequired(false)),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const title = interaction.options.getString('title') || 'Game Time!';
        const players = interaction.options.getString('players');
        const details = interaction.options.getString('details') || '';

        let layout = '';

        switch (type) {
            case 'tictactoe':
                layout = createTicTacToe(title);
                break;
            case 'casino':
                layout = createCasino(title, details);
                break;
            case 'tournament':
                layout = createTournament(title, players);
                break;
            case 'gamenight':
                layout = createGameNight(title, details);
                break;
            case 'dice':
                layout = createDiceRoll(title);
                break;
            case 'cards':
                layout = createCardGame(title);
                break;
            case 'leaderboard':
                layout = createLeaderboard(title, players);
                break;
            default:
                layout = createGameNight(title, details);
        }

        await interaction.reply({ content: layout });
    }
};

function createTicTacToe(title) {
    const board = [
        `${emojis.one}${emojis.two}${emojis.three}`,
        `${emojis.four}${emojis.five}${emojis.six}`,
        `${emojis.seven}${emojis.eight}${emojis.nine}`
    ];
    
    return `${emojis.gameDie} **${title}** ${emojis.gameDie}\n\n${board.join('\n')}\n\n${emojis.space}Choose your square!`;
}

function createCasino(title, details) {
    const casinoLine = `${emojis.spadesSuit}${emojis.heartsSuit}${emojis.diamondsSuit}${emojis.clubsSuit}${emojis.dice}${emojis.joker}${emojis.dice}${emojis.clubsSuit}${emojis.diamondsSuit}${emojis.heartsSuit}${emojis.spadesSuit}`;
    const titleLine = `${emojis.crown} **${title}** ${emojis.crown}`;
    const diceRoll = `${emojis.dice}${emojis.dice} ROLL THE DICE! ${emojis.dice}${emojis.dice}`;
    const detailsLine = details ? `${emojis.joker} ${details} ${emojis.joker}` : '';
    
    return `${casinoLine}\n${titleLine}\n${diceRoll}\n${detailsLine ? detailsLine + '\n' : ''}${casinoLine}`;
}

function createTournament(title, players) {
    const tournamentHeader = `${emojis.trophy} **${title}** ${emojis.trophy}`;
    const playerList = players ? players.split(',').map((player, index) => 
        `${emojis.gameDie} **${index + 1}.** ${player.trim()}`
    ).join('\n') : `${emojis.gameDie} Player registration open!`;
    
    const bracket = `
${emojis.rightArrow} **BRACKET** ${emojis.leftArrow}
${emojis.square}${emojis.space}VS${emojis.space}${emojis.square}
${emojis.space}${emojis.downArrow}${emojis.space}${emojis.space}${emojis.space}${emojis.downArrow}
${emojis.space}${emojis.space}${emojis.trophy}${emojis.space}${emojis.space}`;
    
    return `${tournamentHeader}\n\n${playerList}\n${bracket}`;
}

function createGameNight(title, details) {
    const gameIcons = `${emojis.gameDie}${emojis.joker}${emojis.dice}${emojis.trophy}${emojis.party}${emojis.trophy}${emojis.dice}${emojis.joker}${emojis.gameDie}`;
    const titleLine = `${emojis.star} **${title}** ${emojis.star}`;
    const invitation = `${emojis.party} Join us for an epic game night! ${emojis.party}`;
    const detailsLine = details ? `${emojis.rightArrow} ${details}` : '';
    
    return `${gameIcons}\n${titleLine}\n${invitation}\n${detailsLine ? detailsLine + '\n' : ''}${gameIcons}`;
}

function createDiceRoll(title) {
    const diceHeader = `${emojis.dice} **${title}** ${emojis.dice}`;
    const rollResult = `
${emojis.dice}${emojis.dice}${emojis.dice}
**ROLLING...**
${emojis.fire} Good luck! ${emojis.fire}`;
    
    return `${diceHeader}\n${rollResult}`;
}

function createCardGame(title) {
    const cardLine = `${emojis.spadesSuit}${emojis.heartsSuit}${emojis.diamondsSuit}${emojis.clubsSuit}${emojis.joker}${emojis.clubsSuit}${emojis.diamondsSuit}${emojis.heartsSuit}${emojis.spadesSuit}`;
    const titleLine = `${emojis.joker} **${title}** ${emojis.joker}`;
    const hand = `
${emojis.spadesSuit} ${emojis.heartsSuit} ${emojis.diamondsSuit} ${emojis.clubsSuit}
**Your Hand**
${emojis.fire} Play your cards right! ${emojis.fire}`;
    
    return `${cardLine}\n${titleLine}${hand}\n${cardLine}`;
}

function createLeaderboard(title, players) {
    const leaderboardHeader = `${emojis.trophy} **${title}** ${emojis.trophy}`;
    const medals = [emojis.trophy, emojis.gem, emojis.star];
    
    let playerList = '';
    if (players) {
        const playerArray = players.split(',');
        playerList = playerArray.map((player, index) => {
            const medal = medals[index] || emojis.gameDie;
            return `${medal} **${index + 1}.** ${player.trim()}`;
        }).join('\n');
    } else {
        playerList = `${emojis.trophy} **1.** Champion\n${emojis.gem} **2.** Runner-up\n${emojis.star} **3.** Third Place`;
    }
    
    const separator = `${emojis.fire}${emojis.fire}${emojis.fire}${emojis.fire}${emojis.fire}${emojis.fire}${emojis.fire}${emojis.fire}${emojis.fire}`;
    
    return `${leaderboardHeader}\n${separator}\n${playerList}\n${separator}`;
}