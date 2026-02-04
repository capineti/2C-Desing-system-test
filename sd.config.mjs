
import StyleDictionary from 'style-dictionary';

// Registramos un formato custom si lo necesitamos, o usamos los default.
// Por ahora usaremos los estándar de Style Dictionary.

export default {
  source: ['tokens/tokens_cleaned.json'], // Leeremos el JSON "limpio" (procesado por token-transformer)
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true // Mantiene las referencias var(--color-primary)
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    }
  }
};
