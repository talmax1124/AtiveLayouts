// Map of all emojis from your /emojis folder
// These should match the names you uploaded to Discord Developer Portal
// Format: emojiKey: 'emoji_filename_without_extension'

const APP_EMOJI_MAP = {
    // Crowns & Royalty
    crown: 'crown',
    crownlightblue: 'crownlightblue',
    accorona: 'accorona',
    
    // Giveaways & Gifts
    giveaway: 'giveaway',
    regalo: 'regalo',
    sgiveaway34: 'sgiveaway34',
    
    // Arrows & Directions
    arrow: 'arrow',
    arrow1: 'arrow1',
    arrowblue: 'arrowblue',
    right: 'right',
    arrows31: 'arrows31',
    bluearrowright30: 'bluearrowright30',
    greenarrowright: 'greenarrowright',
    colorarrow36: 'colorarrow36',
    colorfularrow: 'colorfularrow',
    hallowarrow55: 'hallowarrow55',
    
    // Fire & Effects
    fire: 'fire',
    fireblue: 'fireblue',
    redflame: 'red flame',
    pinkflame: 'pinkflame',
    goldenfire: 'goldenfire',
    
    // Sparkles & Stars
    sparkles: 'sparkles',
    stars: 'stars',
    aastarblue99: 'aastarblue99',
    redstar: 'redstar',
    
    // Diamonds & Gems
    diamond: 'diamond',
    diamond18: 'diamond18',
    diamonds59: 'diamonds59',
    elmas93: 'elmas93',
    cypherelmas18: 'cypherelmas18',
    
    // Hearts
    heart: 'heart',
    pixelheart: 'pixelheart',
    angelwingheart: 'angelwingheart',
    beatingpixelhear: 'beatingpixelhear',
    
    // Money & Rewards
    cash: 'cash',
    coin: 'coin',
    goldcoin69: 'goldcoin69',
    cashstack: 'cashstack',
    
    // Gaming & Dice
    throwingdice94: 'throwingdice94',
    
    // Trophies & Rewards
    silvertrophy81: 'silvertrophy81',
    
    // Party & Celebration
    celebrate: 'celebrate',
    balloons5: 'balloons5',
    balloons28: 'balloons28',
    hbd: 'hbd',
    party: 'party',
    
    // Dividers & Lines
    divider8: 'divider8',
    divider65: 'divider65',
    divider94: 'divider94',
    line: 'line',
    rainbowlines: 'Rainbow lines',
    
    // Boost & Effects
    boost: 'boost',
    rocket: 'rocket',
    rocket61: 'rocket61',
    levelup: 'levelup',
    
    // Bells & Alerts
    bell: '1417bell84',
    eebell28: 'eebell28',
    ringingbell: 'ringingbell',
    
    // Megaphones & Announcements
    megaphone: 'megaphone',
    megaphone13: 'megaphone13',
    greenmegaphone: 'greenmegaphone',
    
    // Music & Entertainment
    music: 'music',
    amusicalnotes59: 'amusicalnotes59',
    
    // Alert & Info
    alert: 'alert',
    question: 'question',
    
    // Clapping & Reactions
    clapping: 'clapping',
    clap: 'clap',
    
    // Dancing & Movement
    dancingblob: 'dancingblob',
    
    // Special Effects
    gethype93: 'gethype93',
    nice: 'nice',
    respect: 'respect'
};

// Function to get emoji string for Discord
// This assumes emojis are uploaded with matching names
function getAppEmoji(name) {
    const emojiName = APP_EMOJI_MAP[name];
    if (!emojiName) return null;
    
    // Check common animated extensions
    const animatedExtensions = ['.gif', '.GIF'];
    const staticExtensions = ['.png', '.PNG', '.jpg', '.JPG'];
    
    // Try to determine if it's animated based on filename patterns
    const isAnimated = animatedExtensions.some(ext => 
        emojiName.includes(ext) || 
        // Common animated emoji patterns in your folder
        ['fire', 'sparkles', 'giveaway', 'boost', 'rocket', 'levelup', 'celebrate', 
         'party', 'dancing', 'clapping', 'nice', 'respect'].includes(name)
    );
    
    // Clean the name for Discord (remove special characters, spaces)
    const cleanName = emojiName
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
        .substring(0, 32); // Discord emoji name limit
    
    // Return in Discord emoji format
    // Note: We can't get the actual ID without server access
    // So we'll create a placeholder that the bot needs to resolve
    return isAnimated ? `<a:${cleanName}:RESOLVE>` : `<:${cleanName}:RESOLVE>`;
}

// Get all emoji names for bulk operations
function getAllEmojiNames() {
    return Object.keys(APP_EMOJI_MAP);
}

// Check if an emoji exists in our map
function hasEmoji(name) {
    return APP_EMOJI_MAP.hasOwnProperty(name);
}

module.exports = {
    APP_EMOJI_MAP,
    getAppEmoji,
    getAllEmojiNames,
    hasEmoji
};