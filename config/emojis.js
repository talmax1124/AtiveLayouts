const emojis = {
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
    
    // Numbers (using custom emojis - these should be replaced with your server's custom emoji IDs)
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
    
    // Letters (A-Z) - these should be replaced with your server's custom emoji IDs
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
    
    // Panel decorations (using Unicode for fallback)
    panelTop: '◣◥◤◢',
    panelCorner: '◥',
    panelSide: '▌',
    panelBottom: '▔',
    dot: '•',
    bullet: '▸',
};

const customEmojiPatterns = {
    // AUTO-POPULATED: Use /setup-emojis action:auto to configure
    // This will be automatically filled with your server's custom emojis
};

// Helper function to get emoji (tries custom first, falls back to standard)
function getEmoji(name) {
    return customEmojiPatterns[name] || emojis[name] || `❓`;
}

module.exports = { emojis, customEmojiPatterns, getEmoji };