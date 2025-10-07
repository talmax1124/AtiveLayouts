// Smart Emoji Manager - Efficiently uses limited emoji slots
const { PRIORITY_STATIC, PRIORITY_ANIMATED, UNICODE_FALLBACKS } = require('../config/priority-emojis.js');

class SmartEmojiManager {
    constructor(guild) {
        this.guild = guild;
        this.customEmojis = new Map();
        this.fallbacks = UNICODE_FALLBACKS;
        
        if (guild) {
            this.loadGuildEmojis();
        }
    }
    
    loadGuildEmojis() {
        // Load all emojis from the guild
        this.guild.emojis.cache.forEach(emoji => {
            const key = this.normalizeEmojiName(emoji.name);
            const value = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
            this.customEmojis.set(key, value);
            
            // Also store with original name
            this.customEmojis.set(emoji.name, value);
        });
        
        // Also check other guilds the bot is in for emoji repository
        if (this.guild.client) {
            this.guild.client.guilds.cache.forEach(g => {
                g.emojis.cache.forEach(emoji => {
                    const key = this.normalizeEmojiName(emoji.name);
                    const value = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
                    
                    // Don't override if we already have this emoji
                    if (!this.customEmojis.has(key)) {
                        this.customEmojis.set(key, value);
                        this.customEmojis.set(emoji.name, value);
                    }
                });
            });
        }
    }
    
    normalizeEmojiName(name) {
        // Remove numbers and special characters for better matching
        return name.toLowerCase().replace(/[0-9_-]/g, '');
    }
    
    get(name, fallbackEmoji = null) {
        // Try exact match first
        if (this.customEmojis.has(name)) {
            return this.customEmojis.get(name);
        }
        
        // Try normalized match
        const normalized = this.normalizeEmojiName(name);
        if (this.customEmojis.has(normalized)) {
            return this.customEmojis.get(normalized);
        }
        
        // Try partial match
        for (const [key, value] of this.customEmojis.entries()) {
            if (key.includes(normalized) || normalized.includes(key)) {
                return value;
            }
        }
        
        // Use provided fallback or Unicode fallback
        return fallbackEmoji || this.fallbacks[name] || this.fallbacks[normalized] || '•';
    }
    
    // Smart pattern creators that use available emojis efficiently
    createElegantLayout(title, message) {
        const sparkle = this.get('sparkles', '✨');
        const star = this.get('stars', this.get('star', '⭐'));
        const diamond = this.get('diamond', '💎');
        const divider = this.get('divider', this.get('line', '━'));
        
        let layout = '';
        
        // Header decoration
        layout += `${sparkle}${star}${diamond}${star}${sparkle}${star}${diamond}${star}${sparkle}\n\n`;
        
        // Title
        layout += `${sparkle} **${title}** ${sparkle}\n`;
        
        // Divider
        layout += `${divider}${divider}${divider}${divider}${divider}${divider}${divider}${divider}${divider}${divider}\n`;
        
        // Message
        if (message) {
            layout += `${star} ${message}\n`;
        }
        
        // Footer decoration
        layout += `${sparkle}${diamond}${sparkle}${diamond}${sparkle}${diamond}${sparkle}${diamond}${sparkle}`;
        
        return layout;
    }
    
    createGiveawayLayout(prize, duration, winners) {
        const gift = this.get('giveaway', this.get('gift', '🎁'));
        const party = this.get('party', this.get('celebrate', '🎉'));
        const balloon = this.get('balloons', this.get('balloon', '🎈'));
        const trophy = this.get('trophy', '🏆');
        const bell = this.get('bell', '🔔');
        const fire = this.get('fire', '🔥');
        const arrow = this.get('arrow', '➡️');
        
        let layout = '';
        
        // Animated header if available
        layout += `${gift}${party}${gift}${party}${gift}${party}${gift}${party}${gift}\n\n`;
        
        // Title with fire effect
        layout += `${fire} **MEGA GIVEAWAY** ${fire}\n\n`;
        
        // Prize section
        layout += `${gift} **Prize:** ${prize}\n`;
        layout += `${trophy} **Winners:** ${winners}\n`;
        layout += `${bell} **Duration:** ${duration}\n\n`;
        
        // Instructions
        layout += `${arrow} React with ${party} to enter!\n`;
        layout += `${arrow} Good luck everyone!\n\n`;
        
        // Footer celebration
        layout += `${balloon}${party}${balloon}${party}${balloon}${party}${balloon}${party}${balloon}`;
        
        return layout;
    }
    
    createRoyalLayout(title, message) {
        const crown = this.get('crown', '👑');
        const diamond = this.get('diamond', '💎');
        const trophy = this.get('trophy', '🏆');
        const sparkle = this.get('sparkles', '✨');
        
        let layout = '';
        
        // Royal header
        layout += `${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}\n\n`;
        
        // Title
        layout += `${crown} **${title}** ${crown}\n`;
        
        // Royal divider
        layout += `${diamond}━━━━━━━━━━${diamond}\n`;
        
        // Message
        if (message) {
            layout += `${trophy} ${message}\n`;
        }
        
        // Footer
        layout += `${sparkle} By Royal Decree ${sparkle}\n`;
        layout += `${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}${diamond}${crown}`;
        
        return layout;
    }
    
    createFireLayout(title, message) {
        const fire = this.get('fire', '🔥');
        const redFlame = this.get('redflame', fire);
        const pinkFlame = this.get('pinkflame', fire);
        const blueFlame = this.get('fireblue', fire);
        
        let layout = '';
        
        // Fire animation header
        layout += `${fire}${redFlame}${pinkFlame}${blueFlame}${fire}${redFlame}${pinkFlame}${blueFlame}${fire}\n\n`;
        
        // Title
        layout += `${fire} **${title}** ${fire}\n`;
        
        // Message
        if (message) {
            layout += `${redFlame} ${message}\n`;
        }
        
        // Footer
        layout += `\n${fire}${pinkFlame}${fire}${pinkFlame}${fire}${pinkFlame}${fire}${pinkFlame}${fire}`;
        
        return layout;
    }
    
    createGameLayout(title, players) {
        const dice = this.get('throwingdice', this.get('dice', '🎲'));
        const trophy = this.get('trophy', '🏆');
        const coin = this.get('coin', this.get('goldcoin', '🪙'));
        const cash = this.get('cash', '💰');
        const levelup = this.get('levelup', '⬆️');
        const arrow = this.get('arrow', '➡️');
        
        let layout = '';
        
        // Gaming header
        layout += `${dice}${trophy}${dice}${trophy}${dice}${trophy}${dice}${trophy}${dice}\n\n`;
        
        // Title
        layout += `${dice} **${title}** ${dice}\n\n`;
        
        // Players list
        if (players && players.length > 0) {
            layout += `**Players:**\n`;
            players.forEach((player, index) => {
                const medal = index === 0 ? trophy : index === 1 ? coin : cash;
                layout += `${arrow} ${medal} ${player}\n`;
            });
        }
        
        // Footer
        layout += `\n${levelup} Ready to play! ${levelup}`;
        
        return layout;
    }
    
    // Get stats about available emojis
    getEmojiStats() {
        const stats = {
            total: this.customEmojis.size,
            animated: 0,
            static: 0,
            available: Array.from(this.customEmojis.keys())
        };
        
        this.customEmojis.forEach(value => {
            if (value.startsWith('<a:')) {
                stats.animated++;
            } else if (value.startsWith('<:')) {
                stats.static++;
            }
        });
        
        return stats;
    }
}

module.exports = SmartEmojiManager;