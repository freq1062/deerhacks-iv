const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

async function compareImages(img1, img2) {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyAv2-pANo_3rsik3WZrneXK0bc_LtWPaV4");
    const model = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = [
        {
            inlineData: {
                data: img1,
                mimeType: "image/jpeg",
            },
        },
        {
            inlineData: {
                data: img2,
                mimeType: "image/jpeg",
            },
        },
        'Determine if the two images are taken from roughly the same spot and respond with only a boolean value.',
    ];

    const result = await model.generateContent(prompt);
    return result.response.text() === "True";
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Test
// const img1Path = path.join(__dirname, '../assets/CCT_Art.jpg');
// const img1Base64 = fs.readFileSync(img1Path, { encoding: 'base64' });
// const img2Path = path.join(__dirname, '../assets/CCT_Ice_cream.jpg');
// const img2Base64 = fs.readFileSync(img2Path, { encoding: 'base64' });
// compareImages(img1Base64, img2Base64).then(console.log);

module.exports = { compareImages };