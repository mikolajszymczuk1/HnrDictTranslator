// Core DeepL API function for calling translations requests
import * as deepl from 'deepl-node';

/**
 * Create and return translator object that can be used to translate texts
 * @param {string} apiKey Auth key that can be generated on DeepL account page
 */
export const translator = (apiKey: string) => {
  return new deepl.Translator(apiKey);
};
