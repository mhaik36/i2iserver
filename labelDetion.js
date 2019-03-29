// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

async function detectLabel(fileName) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */

    // Performs label detection on the local file
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    let list_label = [];
    console.log('Labels:');
    labels.forEach(label => list_label.push({ description: label.description, score: label.score }));
    // console.log( "labels: "+ JSON.stringify(list_label))
    return {labels: list_label, json: result}
}
module.exports.detectLabel = detectLabel;
// const fileName = './demo/cmndNam.jpg';
// dectLabel(fileName);