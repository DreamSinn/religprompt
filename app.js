const generateButton = document.getElementById('generate-button');
const promptArea = document.getElementById('prompt-area');
const notification = document.getElementById('notification');
const negativePromptInput = document.getElementById('negative-prompt');
const generatedTitle = document.getElementById('generated-title'); // Nova textarea para o título

// Emojis relacionados ao tema bíblico católico
const emojis = ["🙏", "✝️", "⛪", "📖", "🕊️", "👼", "🌟", "🔥", "💒", "🕯️", "📿", "🕎"];

// Hashtags variadas
const hashtags = [
    "#catholicart", "#sacredart", "#biblicalart", "#faithart", "#divineart", "#holyart", 
    "#spiritualart", "#christianart", "#angelicart", "#saintlyart", "#heavenlyart", "#miracleart", 
    "#prayerart", "#bibleverse", "#godisgood", "#jesuschrist", "#holyspirit", "#faithful", 
    "#blessedart", "#religiousart", "#churchart", "#gospelart", "#divineinspiration", "#sacredheart", 
    "#holybible", "#faithinaction", "#godslove"
];

// Padrões de títulos dinâmicos
const titlePatterns = [
    "✨ {emoji} {adjective} {noun} in {environment} {emoji} ✨ {hashtags}",
    "🌟 {emoji} {verb} with {adjective} {noun} in {environment} {emoji} 🌟 {hashtags}",
    "🙏 {emoji} A {adjective} {noun} {verb} in {environment} {emoji} 🙏 {hashtags}",
    "📖 {emoji} The {adjective} {noun} of {environment} {emoji} 📖 {hashtags}",
    "🕊️ {emoji} {adjective} {noun} {verb} under {environment} {emoji} 🕊️ {hashtags}",
    "🔥 {emoji} {adjective} {noun} {verb} amidst {environment} {emoji} 🔥 {hashtags}",
    "⛪ {emoji} {adjective} {noun} {verb} within {environment} {emoji} ⛪ {hashtags}",
    "💒 {emoji} {adjective} {noun} {verb} surrounded by {environment} {emoji} 💒 {hashtags}"
];

// Palavras-chave para o prompt
const keywords = {
    environments: [
        "ancient church", "monastery", "Garden of Eden", "desert", "Sea of Galilee", "Mount Sinai", 
        "Valley of the Kings", "city of Jerusalem", "Tower of Babel", "Jordan River", "cave of Adullam", 
        "Mount of Olives", "Temple of Solomon", "Roman catacombs", "Sanctuary of Fatima", 
        "St. Peter's Basilica", "Sistine Chapel", "hermitage", "convent", "abbey", "Marian shrine", 
        "grotto of Lourdes", "Way of the Cross", "Calvary", "Holy Sepulchre", "Bethlehem", "Nazareth", 
        "Cana", "Jericho", "Mount Tabor", "Gethsemane", "Upper Room", "Via Dolorosa", "Heavenly Jerusalem"
    ],
    adjectives: [
        "holy", "divine", "celestial", "spiritual", "blessed", "miraculous", "saintly", "pure", 
        "glorious", "eternal", "mystical", "angelic", "prophetic", "redemptive", "salvific", 
        "consecrated", "reverent", "pious", "devout", "illuminated", "sacred", "heavenly", 
        "majestic", "radiant", "serene", "miraculous", "blessed", "gracious", "merciful", "humble"
    ],
    nouns: [
        "angel", "saint", "prophet", "apostle", "priest", "bishop", "pope", "martyr", "virgin", 
        "archangel", "sacrament", "Eucharist", "Bible", "Gospel", "prayer", "miracle", "pilgrimage", 
        "Mass", "rosary", "cross", "chalice", "altar", "cathedral", "chapel", "monastery", "nun", 
        "monk", "disciple", "shepherd", "lamb", "dove", "candle", "holy water", "incense", "relic", 
        "crown of thorns", "sacred heart", "holy spirit", "trinity", "resurrection", "ascension"
    ],
    verbs: [
        "pray", "bless", "heal", "preach", "convert", "save", "illuminate", "guide", "protect", 
        "intercede", "consecrate", "baptize", "confess", "celebrate", "adore", "meditate", "forgive", 
        "sacrifice", "witness", "evangelize", "anoint", "sanctify", "redeem", "resurrect", "ascend", 
        "rejoice", "worship", "sing", "chant", "proclaim", "teach", "serve", "comfort", "console"
    ]
};

const beginnings = [
    "In the heart of the ", "Under the protection of the ", "In the shadow of the ", "Within the walls of the ", "In the midst of the ",
    "On the path to the ", "At the top of the ", "In the depths of the ", "Beside the ", "In front of the "
];

const endings = [
    "where faith is reborn.", "where miracles happen.", "where peace reigns.", "where divine light shines.",
    "where angels sing.", "where saints intercede.", "where grace flows.", "where hope prevails.",
    "where the love of God manifests.", "where salvation is found."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Função para selecionar hashtags aleatórias
function selectHashtags(count) {
    const selectedHashtags = ["#aiart", "#midjourney"]; // Hashtags obrigatórias
    while (selectedHashtags.length < count) {
        const randomHashtag = hashtags[Math.floor(Math.random() * hashtags.length)];
        if (!selectedHashtags.includes(randomHashtag)) {
            selectedHashtags.push(randomHashtag);
        }
    }
    return selectedHashtags;
}

// Função para gerar um título dinâmico
function generateTitle() {
    // Escolhe um padrão de título aleatório
    const pattern = titlePatterns[Math.floor(Math.random() * titlePatterns.length)];

    // Seleciona palavras-chave aleatórias
    const adjective = getRandomElement(keywords.adjectives);
    const noun = getRandomElement(keywords.nouns);
    const verb = getRandomElement(keywords.verbs);
    const environment = getRandomElement(keywords.environments);
    const emoji = getRandomElement(emojis);

    // Seleciona 8 hashtags (2 obrigatórias + 6 aleatórias)
    const selectedHashtags = selectHashtags(8);

    // Substitui os espaços reservados no padrão
    const title = pattern
        .replace(/{emoji}/g, emoji) // Substitui todos os {emoji}
        .replace("{adjective}", adjective)
        .replace("{noun}", noun)
        .replace("{verb}", verb)
        .replace("{environment}", environment)
        .replace("{hashtags}", selectedHashtags.join(" "));

    return title;
}

// Função para gerar o prompt
function generatePrompt() {
    let prompt = `/imagine prompt: ${getRandomElement(beginnings)}${getRandomElement(keywords.adjectives)} ${getRandomElement(keywords.nouns)} and ${getRandomElement(keywords.verbs)} in a ${getRandomElement(keywords.environments)}.${getRandomElement(endings)}`;
    
    // Adiciona mais conteúdo para atingir 400 caracteres
    while (prompt.length < 400) {
        prompt += ` ${getRandomElement(keywords.adjectives)} ${getRandomElement(keywords.nouns)} and ${getRandomElement(keywords.verbs)} in a ${getRandomElement(keywords.environments)}.${getRandomElement(endings)}`;
    }

    // Adiciona negative prompt se fornecido
    const negativePrompt = negativePromptInput.value.trim();
    if (negativePrompt) {
        prompt += ` --no ${negativePrompt}`;
    }

    // Adiciona 8 hashtags ao prompt
    const promptHashtags = selectHashtags(8);
    prompt += ` ${promptHashtags.join(" ")}`;

    // Exibe o prompt na área de prompt
    promptArea.textContent = prompt;

    // Gera e exibe o título
    const title = generateTitle();
    generatedTitle.value = title;
}

// Copiar o título ao clicar na área do título
generatedTitle.addEventListener('click', () => {
    if (generatedTitle.value) {
        navigator.clipboard.writeText(generatedTitle.value).then(() => {
            notification.style.display = 'block';
            notification.textContent = "Title copied to clipboard!";
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    }
});

// Copiar o prompt ao clicar na área do prompt
promptArea.addEventListener('click', () => {
    const promptText = promptArea.textContent;
    if (promptText) {
        navigator.clipboard.writeText(promptText).then(() => {
            notification.style.display = 'block';
            notification.textContent = "Prompt copied to clipboard!";
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    }
});

generateButton.addEventListener('click', generatePrompt);