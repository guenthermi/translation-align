import path from 'path';

let templateCache: { [key: string]: string } = {};

const translationTemplatePath: string = 'prompts/translation.txt';
const compareTemplatePath: string = 'prompts/comparison.txt';

export async function loadTemplate(templateName: string): Promise<string> {
  if (templateCache[templateName]) {
    return templateCache[templateName];
  }

  try {
    const response = await fetch(templateName);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.status}`);
    }
    const template = await response.text();
    templateCache[templateName] = template;
    return template;
  } catch (error) {
    console.error('Error loading template:', error);
    throw error;
  }
}

export const translatePromptTemplate = async (
  inputText: string,
  language: string
): Promise<string> => {
  const template = await loadTemplate(translationTemplatePath);
  return template
    .replace('{language}', language)
    .replace('{inputText}', inputText);
};

export const comparePromptTemplate = async (
  inputText1: string,
  inputText2: string,
  differences: string
): Promise<string> => {
  const template = await loadTemplate(compareTemplatePath);
  return template
    .replace('{differences}', differences)
    .replace('{inputText1}', inputText1)
    .replace('{inputText2}', inputText2);
};
