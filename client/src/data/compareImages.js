import { GoogleGenerativeAI } from "@google/generative-ai";

async function compareImages(img1, img2) {
  console.log("Comparing images...");
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyAv2-pANo_3rsik3WZrneXK0bc_LtWPaV4");
    const model = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = [
        {
            inlineData: {
                data: img1,
                mimeType: "image/png",
            },
        },
        {
            inlineData: {
                data: img2,
                mimeType: "image/png",
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

export default compareImages

// Test
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const img1Path = path.resolve(__dirname, '../assets/CCT_Art.jpg');
// const img2Path = path.resolve(__dirname, '../assets/CCT_Ice_cream.jpg');
// const img1Base64 = fs.readFileSync(img1Path, { encoding: 'base64' });
// const img2Base64 = fs.readFileSync(img2Path, { encoding: 'base64' });

// compareImages(img1Base64, img2Base64).then(result => {
//   console.log("Comparison result:", result);
// }).catch(error => {
//   console.error("Error during comparison:", error);
// });
