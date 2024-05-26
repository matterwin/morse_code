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

export const checkCharacters = (text) => {
  const upperText = text.toUpperCase();
  for (let i = 0; i < upperText.length; i++) {
    const c = upperText[i];
    if (!allowedCharacters[c]) {
      return false;
    }
  }

  return true;
};

export const letterMorse = (text) => {
  if (text) {
    if (checkCharacters(text)) {
      const c = text.toUpperCase();
      return morseCodeMap[c] || c;
    } 
  }
  return null;
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

export const allowedCharacters = {
  'A': true,
  'B': true,
  'C': true,
  'D': true,
  'E': true,
  'F': true,
  'G': true,
  'H': true,
  'I': true,
  'J': true,
  'K': true,
  'L': true,
  'M': true,
  'N': true,
  'O': true,
  'P': true,
  'Q': true,
  'R': true,
  'S': true,
  'T': true,
  'U': true,
  'V': true,
  'W': true,
  'X': true,
  'Y': true,
  'Z': true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true,
  '7': true,
  '8': true,
  '9': true,
  '0': true,
  '?': true,
  '!': true,
  '.': true,
  ',': true,
  ';': true,
  ':': true,
  '+': true,
  '-': true,
  '/': true,
  '=': true,
  ' ': true,
};
