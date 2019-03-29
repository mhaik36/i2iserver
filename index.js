const express = require("express");
const app = express();
const cors =  require('cors');
const path = require("path");
const multer = require("multer");

const faceDetection = require('./faceDetection');
const labelDetion = require('./labelDetion');
const webDetection = require('./webDetection');
const documentTextDetection = require('./documentTextDetection');
const vision = require('@google-cloud/vision');
const {json} = require("body-parser");
app.use(cors());
app.use(express.static('public'));
const imagePath = '';
const client = new vision.ImageAnnotatorClient();

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("myImage");

app.post('/upload' ,  (req,res) =>{
     upload(  req, res, async (err) =>  {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        const filename = './public/uploads/'+req.file.filename;
        const Detectface = await faceDetection.detectFaces(filename);
        // const result = await demoapi.proccess(filename);
        const textDetection =  await documentTextDetection.detectText(filename);
        const labelResult =  await labelDetion.detectLabel(filename);
        const webResult =  await webDetection.detectWeb(filename);
        return res.send({
            filename: req.file.filename,
            textDetection,
            Detectface,
            labelResult,
            webResult
        })

        /*Now do where ever you want to do*/
        if(!err)
           return res.send(200).end();
     });
})

app.listen( process.env.PORT || 3000 , ()=> console.log("Server start"));
// async function proccess(req, res){
//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file);//Here you get file.
//     const filename = './public/uploads/'+req.file.filename;
//     let text = '';
//     const [result] = await client.textDetection(fileName);
//     const detections = result.textAnnotations;
//     console.log('Text:');
//     // console.log('detections:'+ detections[Object.keys(detections)[0]]);
//     detections.forEach((text, index) => {
//         if(index === 0){
//             return res.send({
//                 filename: 'http://localhost:4000/uploads/'+req.file.filename,
//                 text: text.description
//             })
//         }
            
//         return false
//     });
// }
async function proccess(fileName) {
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach((text, index) => {
        if(index !== 0)
            console.log('text:'+ text.description);
        return false
            
        // return text.description
    });
}
