// Emoji Resolver - Gets actual custom emojis from the server
class EmojiResolver {
    constructor(guild) {
        this.guild = guild;
        this.cache = new Map();
        this.buildCache();
    }

    buildCache() {
        if (!this.guild) return;
        
        const emojis = this.guild.emojis.cache;
        
        // Map emoji names to their actual Discord representations
        emojis.forEach(emoji => {
            const name = emoji.name.toLowerCase();
            const emojiString = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
            
            // Store multiple variations of the name
            this.cache.set(name, emojiString);
            this.cache.set(emoji.name, emojiString);
            
            // Remove numbers and store clean name
            const cleanName = name.replace(/\d+/g, '');
            if (cleanName !== name) {
                this.cache.set(cleanName, emojiString);
            }
        });
    }

    // Get emoji by name with fallbacks
    get(name, fallback = '❓') {
        if (!name) return fallback;
        
        const searchName = name.toLowerCase();
        
        // Direct match
        if (this.cache.has(searchName)) {
            return this.cache.get(searchName);
        }
        
        // Partial match
        for (const [key, value] of this.cache.entries()) {
            if (key.includes(searchName) || searchName.includes(key)) {
                return value;
            }
        }
        
        return fallback;
    }

    // Get multiple emojis for patterns
    getPattern(names, separator = '') {
        return names.map(name => this.get(name)).join(separator);
    }

    // Get emoji for specific categories
    getCrown() {
        return this.get('crown') || this.get('crownlightblue') || this.get('accorona') || '👑';
    }

    getFire() {
        return this.get('fire') || this.get('redflame') || this.get('pinkflame') || '🔥';
    }

    getSparkles() {
        return this.get('sparkles') || this.get('stars') || this.get('aastarblue') || '✨';
    }

    getDiamond() {
        return this.get('diamond') || this.get('diamond18') || this.get('elmas') || '💎';
    }

    getHeart() {
        return this.get('pixelheart') || this.get('heart') || this.get('angelwingheart') || '💖';
    }

    getArrow() {
        return this.get('arrow') || this.get('arrowblue') || this.get('right') || '➡️';
    }

    getGift() {
        return this.get('giveaway') || this.get('regalo') || this.get('sgiveaway') || '🎁';
    }

    getCash() {
        return this.get('cash') || this.get('coin') || this.get('goldcoin') || '💰';
    }

    getTrophy() {
        return this.get('silvertrophy') || this.get('trophy') || '🏆';
    }

    getParty() {
        return this.get('celebrate') || this.get('balloons') || this.get('hbd') || '🎉';
    }

    getBell() {
        return this.get('bell') || this.get('eebell') || this.get('ringingbell') || '🔔';
    }

    getMegaphone() {
        return this.get('megaphone') || this.get('greenmegaphone') || '📢';
    }

    getDivider() {
        return this.get('divider8') || this.get('divider65') || this.get('line') || this.get('rainbowlines') || '━';
    }

    // Create decorative lines using your custom emojis
    createLine(length = 8) {
        const divider = this.getDivider();
        const sparkle = this.getSparkles();
        
        let line = '';
        for (let i = 0; i < length; i++) {
            if (i % 3 === 0) {
                line += sparkle;
            } else {
                line += divider;
            }
        }
        return line;
    }

    // Create themed decorations
    createRoyalDecoration() {
        const crown = this.getCrown();
        const diamond = this.getDiamond();
        return `${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}`;
    }

    createFireDecoration() {
        const fire = this.getFire();
        const redFlame = this.get('redflame') || fire;
        return `${fire}${redFlame}${fire}${redFlame}${fire}${redFlame}${fire}${redFlame}${fire}`;
    }

    createSparkleDecoration() {
        const sparkles = this.getSparkles();
        const stars = this.get('stars') || sparkles;
        return `${sparkles}${stars}${sparkles}${stars}${sparkles}${stars}${sparkles}${stars}${sparkles}`;
    }

    createPartyDecoration() {
        const party = this.getParty();
        const balloons = this.get('balloons') || party;
        return `${party}${balloons}${party}${balloons}${party}${balloons}${party}${balloons}${party}`;
    }

    createGiveawayDecoration() {
        const gift = this.getGift();
        const giveaway = this.get('giveaway') || gift;
        return `${gift}${giveaway}${gift}${giveaway}${gift}${giveaway}${gift}${giveaway}${gift}`;
    }

    createDiamondDecoration() {
        const diamond = this.getDiamond();
        const sparkles = this.getSparkles();
        return `${diamond}${sparkles}${diamond}${sparkles}${diamond}${sparkles}${diamond}${sparkles}${diamond}`;
    }

    // Get all available emojis for debugging
    getAllEmojis() {
        return Array.from(this.cache.entries());
    }
}

module.exports = EmojiResolver;