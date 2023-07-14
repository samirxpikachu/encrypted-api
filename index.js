const JavaScriptObfuscator = require('javascript-obfuscator');
const helmet = require('helmet');
const express = require('express');

const app = express();
app.use(helmet());

app.get('/encrypt', (req, res) => {
  const textToObfuscate = req.query.text;

  let obfuscatedText;
  try {
    const obfuscationResult = JavaScriptObfuscator.obfuscate(textToObfuscate, {
      compact: true
    });

    obfuscatedText = obfuscationResult.getObfuscatedCode();
  } catch (error) {
    obfuscatedText = `Obfuscation failed: ${error.message}`;
  }

  const responseObj = {
    obfuscatedText,
    author: {
      name: "Samir",
      contact: "https://www.facebook.com/profile.php?id=100060340563670"
    }
  };

  const responseString = JSON.stringify(responseObj, null, 2);
  res.setHeader('Content-Type', 'application/json');
  res.send(responseString);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
