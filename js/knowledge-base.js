class KnowledgeBase {
    constructor() {
        this.topics = {
            period_basics: {
                keywords: ['period', 'menstruation', 'cycle', 'bleeding', 'menstrual'],
                response: `A menstrual period is a natural part of the reproductive cycle. Here's what you should know:

• It typically occurs every 21-35 days
• Bleeding usually lasts 3-7 days
• The first period (menarche) usually starts between ages 10-15
• Each person's cycle is unique and can vary
• Common symptoms include cramps, mood changes, and fatigue

Would you like to know more about any specific aspect of periods?`
            },
            products: {
                keywords: ['product', 'pad', 'tampon', 'cup', 'protection'],
                response: `There are several period products available, each with unique benefits:

Disposable Products:
• Pads: External protection, great for beginners
• Tampons: Internal protection, good for swimming

Reusable Products:
• Menstrual cups: Eco-friendly, up to 12 hours of protection
• Period underwear: Comfortable, good for light days
• Reusable pads: Environmentally conscious option

Would you like specific details about any of these products?`
            },
            pain_management: {
                keywords: ['pain', 'cramp', 'discomfort', 'hurt'],
                response: `Here are effective ways to manage period pain:

Natural Methods:
• Heat therapy (heating pad or warm bath)
• Gentle exercise or yoga
• Regular sleep schedule
• Staying hydrated
• Healthy diet

Medical Options:
• Over-the-counter pain relievers
• Prescribed medications (consult healthcare provider)

Important: If you experience severe pain, please consult a healthcare professional.`
            },
            hygiene: {
                keywords: ['hygiene', 'clean', 'wash', 'sanitary'],
                response: `Maintaining good menstrual hygiene is crucial:

Essential Practices:
• Change period products every 4-6 hours
• Wash hands before and after changing products
• Clean the genital area with plain water
• Wear breathable cotton underwear
• Use unscented products

Remember:
• Never use douches or intimate washes
• Pat dry instead of rubbing
• Change immediately if feeling wet or uncomfortable`
            },
            emotional_support: {
                keywords: ['emotional', 'mood', 'feel', 'anxiety', 'depression'],
                response: `It's normal to experience emotional changes during your period:

Common Experiences:
• Mood swings
• Anxiety or irritability
• Fatigue
• Food cravings
• Emotional sensitivity

Coping Strategies:
• Practice self-care
• Get regular exercise
• Maintain a support system
• Consider tracking your moods
• Rest when needed

Remember: Your feelings are valid, and it's okay to take extra care of yourself during this time.`
            }
        };
    }

    findBestMatch(input) {
        const words = input.toLowerCase().split(' ');
        let bestTopic = null;
        let highestScore = 0;

        for (const [topic, data] of Object.entries(this.topics)) {
            const score = this.calculateRelevance(words, data.keywords);
            if (score > highestScore) {
                highestScore = score;
                bestTopic = topic;
            }
        }

        return highestScore > 0.2 
            ? this.topics[bestTopic].response 
            : this.getGeneralResponse(words);
    }

    calculateRelevance(inputWords, keywords) {
        let matches = 0;
        for (const word of inputWords) {
            if (keywords.some(keyword => word.includes(keyword) || keyword.includes(word))) {
                matches++;
            }
        }
        return matches / inputWords.length;
    }

    getGeneralResponse(words) {
        return `I understand you're asking about ${words.slice(-3).join(' ')}. To provide the most helpful information, could you please:

• Be more specific about your question
• Ask about one of these topics:
  - Period basics and cycles
  - Period products and usage
  - Pain management
  - Hygiene practices
  - Emotional support

What would you like to know more about?`;
    }
}