// Priority emoji list - the most important 50 static + 50 animated emojis
// These are the ones you should upload to your Discord server

const PRIORITY_STATIC = [
    // Essential decorative (15)
    'crown.png',
    'diamond.png',
    'diamond18.PNG',
    'diamonds59.PNG',
    'trophy.png', // silvertrophy81.PNG
    'star.png', // redstar.png
    'pixelheart.png',
    'heart.png',
    'cash.png',
    'coin.png', // goldcoin69.PNG
    'bell.png', // 1417bell84.GIF as static
    'megaphone.PNG', // megaphone13.PNG
    'arrow.png', // arrowblue.png
    'line.png',
    'borders.PNG',
    
    // Letters for custom text (26) - Choose most used
    'lettera.PNG', // letterb17.PNG
    'letterb.PNG',
    'letterc.PNG',
    'letterd.PNG',
    'lettere.PNG',
    'letterf.PNG',
    'letterg.PNG',
    'letterh.PNG',
    'letteri.PNG',
    'letterj.PNG',
    'letterk.PNG',
    'letterl.PNG',
    'letterm.PNG',
    'lettern.PNG',
    'lettero.PNG',
    'letterp.PNG',
    'letterq.PNG',
    'letterr.PNG',
    'letters.PNG', // LetterS.PNG
    'lettert.PNG',
    'letteru.PNG',
    'letterv.PNG',
    'letterw.PNG',
    'letterx.PNG',
    'lettery.PNG',
    'letterz.PNG',
    
    // Numbers (9) - for countdowns
    'one.PNG',
    'two.PNG',
    'three.PNG',
    'four.PNG',
    'five.PNG',
    'six.PNG',
    'seven.PNG',
    'eight.PNG',
    'nine.PNG'
];

const PRIORITY_ANIMATED = [
    // Essential animated effects (20)
    'giveaway.gif',
    'fire.gif',
    'fireblue.gif',
    'goldenfire.gif',
    'redflame.gif', // red flame.gif
    'pinkflame.gif',
    'sparkles.gif',
    'stars.gif',
    'boost.gif',
    'rocket.gif',
    'levelup.gif',
    'cash.gif',
    'coin.GIF',
    'celebrate.GIF',
    'party.gif', // or balloons
    'balloons5.GIF',
    'balloons28.GIF',
    'hbd.gif',
    'clapping.GIF',
    'nice.GIF',
    
    // Decorative dividers (10)
    'divider8.GIF',
    'divider65.GIF',
    'divider94.GIF',
    'rainbowlines.gif', // Rainbow lines.gif
    'loading.gif', // loadinglove.GIF
    'infinity.GIF', // infinitycounter.GIF
    'rotate.GIF', // rotatingqm.GIF
    'alert.gif',
    'arrow.gif',
    'arrow1.gif',
    
    // Hearts & cute (10)
    'pixelheart.gif', // if animated version exists
    'angelwingheart.gif',
    'beatingpixelhear.GIF',
    'spinheartgreen.gif',
    'mochipurpleheart.GIF',
    'dpheartbreak88.GIF',
    'dpinkneonheart71.GIF',
    'crush.GIF',
    'loadinglove.GIF',
    'aaloveletters.GIF',
    
    // Gaming & fun (10)
    'throwingdice94.GIF',
    'dancingblob.gif',
    'rickroll85.GIF',
    'respect.GIF',
    'gethype93.GIF',
    'music.gif',
    'spotify8.GIF',
    'discord.GIF', // discordleave49.GIF
    'nitro.gif', // nitroboosterrmz1.gif
    'looking98.GIF'
];

// Smart emoji usage patterns to maximize impact
const LAYOUT_PATTERNS = {
    elegant: {
        required: ['sparkles', 'stars', 'diamond'],
        optional: ['crown', 'gem']
    },
    royal: {
        required: ['crown', 'diamond', 'trophy'],
        optional: ['sparkles', 'gem']
    },
    fire: {
        required: ['fire', 'redflame', 'pinkflame'],
        optional: ['fireblue', 'goldenfire']
    },
    giveaway: {
        required: ['giveaway', 'gift', 'party'],
        optional: ['balloons', 'celebrate', 'hbd']
    },
    gaming: {
        required: ['throwingdice', 'trophy', 'coin'],
        optional: ['cash', 'levelup']
    },
    cute: {
        required: ['pixelheart', 'angelwingheart', 'heart'],
        optional: ['crush', 'loadinglove']
    }
};

// Fallback Unicode emojis for when custom ones aren't available
const UNICODE_FALLBACKS = {
    crown: '👑',
    fire: '🔥',
    sparkles: '✨',
    diamond: '💎',
    heart: '❤️',
    gift: '🎁',
    party: '🎉',
    trophy: '🏆',
    star: '⭐',
    arrow: '➡️',
    bell: '🔔',
    megaphone: '📢',
    rocket: '🚀',
    cash: '💰',
    dice: '🎲',
    music: '🎵',
    divider: '━━━'
};

module.exports = {
    PRIORITY_STATIC,
    PRIORITY_ANIMATED,
    LAYOUT_PATTERNS,
    UNICODE_FALLBACKS
};