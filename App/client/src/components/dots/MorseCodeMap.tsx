export const generateMorseCode = (text, setCodeSequence) => {
  const sanitizedText = text.toUpperCase();
  let morseCodeSequence = '';
  for (let i = 0; i < sanitizedText.length; i++) {
    const char = sanitizedText[i];
    if (morseCodeMap[char]) {
      if(i+1 < sanitizedText.length && sanitizedText[i+1] == ' ') {
        morseCodeSequence += morseCodeMap[char];
      } else {
        morseCodeSequence += morseCodeMap[char] + ' ';
      }
    } else if (char === ' ') {
      morseCodeSequence += '/';
    }
  }
  setCodeSequence(morseCodeSequence.trim());
};

export const morseCodeMap = {
  'A': '.-', 
  'B': '-...', 
  'C': '-.-.', 
  'D': '-..', 
  'E': '.', 
  'F': '..-.', 
  'G': '--.', 
  'H': '....', 
  'I': '..', 
  'J': '.---',
  'K': '-.-', 
  'L': '.-..', 
  'M': '--', 
  'N': '-.', 
  'O': '---', 
  'P': '.--.', 
  'Q': '--.-', 
  'R': '.-.', 
  'S': '...', 
  'T': '-',
  'U': '..-', 
  'V': '...-', 
  'W': '.--', 
  'X': '-..-', 
  'Y': '-.--', 
  'Z': '--..',
  '1': '.----', 
  '2': '..---', 
  '3': '...--', 
  '4': '....-', 
  '5': '.....', 
  '6': '-....', 
  '7': '--...', 
  '8': '---..', 
  '9': '----.', 
  '0': '-----',
  '?': '..--..',
  '!': '-.-.--',
  '.': '.-.-.-',
  ',': '--..--',
  ';': '-.-.-.',
  ':': '---...',
  '+': '.-.-.',
  '-': '-....-',
  '/': '-..-.',
  '=': '-...-',
};

