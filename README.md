# TranslationAlign

TranslationAlign is a small tool for comparing translations and LLM-based guided translation. The main idea was:
- You can either two translations of a text or one translations and construct an LLM-based reference translation
- You can compare those two translations by:
	- creating diffs
	- give the diffs + the complete texts to the LLM to judge each of the differences and the overall difference with respect to different criteria like "Simplicity", "Formality", "Positive Connotation" (to be extended).

![UI of TranslationAlign](misc/screenshot.png)

## Setup

For running TranslationAlign you need to get a [Gemini API key](https://aistudio.google.com/apikey) and set it as an environment variable:

```sh
export GEMINI_API_TOKEN=<your-api-token>
```

Then you can run the Web application by running `npm install`, `npm run build`, `npm run start` (or `npm run dev`).

## Future plans

- Support more criteria
- Support more modification without custom instructions (e.g., instruct the LLM to use specific terminology, date formats, ect.)
- Alternatives to Gemini for the translation