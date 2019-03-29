// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
async function detectText(fileName) {
    // Read a local image as a text document
    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
    // let fullText = fullTextAnnotation.text;
    let content = '';
    // let content = fullTextAnnotation.text + '\n';
    // let blockconfidence = 0;
    // console.log(`Full text: ${fullTextAnnotation.text}`);
    fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
            content += `Block confidence: ${block.confidence}\n`
            // console.log(`Block confidence: ${block.confidence}`);
            block.paragraphs.forEach(paragraph => {
                content += `Paragraph confidence: ${paragraph.confidence}\n`
                // console.log(`Paragraph confidence: ${paragraph.confidence}`);
                paragraph.words.forEach(word => {
                    const wordText = word.symbols.map(s => s.text).join('');
                    content += `Word text: ${wordText}\n`
                    content += `Word confidence: ${word.confidence}\n`
                    // console.log(`Word text: ${wordText}`);
                    // console.log(`Word confidence: ${word.confidence}`);
                    // word.symbols.forEach(symbol => {
                    //     content += `Symbol text: ${symbol.text}\n`
                    //     content += `Symbol confidence: ${symbol.confidence}\n`
                    //     // console.log(`Symbol text: ${symbol.text}`);
                    //     // console.log(`Symbol confidence: ${symbol.confidence}`);
                    // });
                });
            });
        });
    });
    // console.log('content:'+content);
    return {content, fullText: fullTextAnnotation.text, json: result}
}
module.exports.detectText = detectText;


// GOOGLE_APPLICATION_CREDENTIALS='./private/key.json' node documentTextDetection.js