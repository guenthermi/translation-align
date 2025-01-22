'use client'; // Add this at the top to mark the component as a client component

import { useState } from 'react';
import { diffWords, Change } from 'diff';
import TranslationComparison from './translationComparison';
import { translatePromptTemplate, comparePromptTemplate } from './templateLoaders';

type TextDiff = {
  difference_id?: number;
  text1?: string;
  text2?: string;
};

export default function Home() {
  const [originalText, setOriginalText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const [translation1, setTranslation1] = useState('');
  const [translation2, setTranslation2] = useState('');

  const [diffOutput, setDiffOutput] = useState<string | null>(null);
  const [wordCountDiff, setWordCountDiff] = useState<number | null>(null);

  const [formalityScore, setFormalityScore] = useState<number>(0);
  const [positiveConnotationScore, setPositiveConnotationScore] = useState<number>(0);
  const [simplicityScore, setSimplicityScore] = useState<number>(0);

  const [formalitySlider, setFormalitySlider] = useState<number>(5);
  const [positiveConnotationSlider, setPositiveConnotationSlider] = useState<number>(5);
  const [simplicitySlider, setSimplicitySlider] = useState<number>(5);

  const [customInstructions, setCustomInstructions] = useState<string>('');

  const handleTranslate = async () => {
    try {
      const response = await fetch(
        `/api/gemini?prompt=${encodeURIComponent(
          await translatePromptTemplate(
            originalText,
            targetLanguage,
            formalitySlider,
            positiveConnotationSlider,
            simplicitySlider,
            customInstructions,
          ),
        )}`,
      );

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data: string = await response.text(); // Assuming the API returns plain text
      const responseData = JSON.parse(data);

      if (responseData.error) {
        console.error('Error while translating:', responseData.error);
      }

      // parse Gemini response
      const startIndex: number = responseData.data.indexOf('{');
      const endIndex: number = responseData.data.lastIndexOf('}');
      const parsedData = JSON.parse(responseData.data.substring(startIndex, endIndex + 1));

      // set text area
      setTranslation1(parsedData?.translated_text ?? '');
    } catch (error) {
      console.error('Error while translating:', error);
      alert('Failed to fetch translation. Please try again.');
    }
  };

  const handleCompare = async () => {
    const diff: Change[] = diffWords(translation1, translation2);

    const addedCount = diff
      .filter((obj: Change) => obj.added)
      .map((obj: Change) => obj.count)
      .reduce((sum: number, count: number | undefined) => sum + (count ?? 0), 0);

    const removedCount = diff
      .filter((obj: Change) => obj.removed)
      .map((obj: Change) => obj.count)
      .reduce((sum: number, count: number | undefined) => sum + (count ?? 0), 0);

    const wordDifference: number = addedCount - removedCount;

    const formattedDiff = diff
      .map((part: Change) => {
        if (part.added) {
          return `<span class="bg-green-100 text-green-800">${part.value}</span>`;
        } else if (part.removed) {
          return `<span class="bg-red-100 text-red-800">${part.value}</span>`;
        } else {
          return `<span>${part.value}</span>`;
        }
      })
      .join('');
    setDiffOutput(formattedDiff);
    setWordCountDiff(wordDifference);

    const differences: TextDiff[] = [];
    let last_entry: Change = diff[0];

    for (let i: number = 1; i < diff.length; i++) {
      if (last_entry.removed && diff[i].added) {
        differences.push({ difference_id: i, text1: last_entry.value, text2: diff[i].value });
      }
      last_entry = diff[i];
    }

    const differencesJson: string = JSON.stringify(differences);
    console.log(differencesJson);
    try {
      const response = await fetch(
        `/api/gemini?prompt=${encodeURIComponent(
          await comparePromptTemplate(translation1, translation2, differencesJson),
        )}`,
      );

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data: string = await response.text(); // Assuming the API returns plain text
      const responseData = JSON.parse(data);

      if (responseData.error) {
        console.error('Error while comparing with Gemini:', responseData.error);
      }

      // parse Gemini response
      const startIndex: number = responseData.data.indexOf('{');
      const endIndex: number = responseData.data.lastIndexOf('}');
      const parsedData = JSON.parse(responseData.data.substring(startIndex, endIndex + 1));

      // TODO set chart values
      console.log(parsedData);
      setFormalityScore(parsedData.overall_scores['formality'] - 5);
      setSimplicityScore(parsedData.overall_scores['simplicity'] - 5);
      setPositiveConnotationScore(parsedData.overall_scores['positive_connotation'] - 5);
    } catch (error) {
      console.error('Error while comparing:', error);
      alert('Failed to fetch translation. Please try again.');
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        {/* Container 1: Controls */}
        <div className="flex flex-col gap-4 w-full p-6 bg-gray-900 rounded-lg shadow-md border border-sky-800">
          {/* Collapsables for languages and buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-start">
            {/* Collapsable 2: Target Language */}
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-semibold mb-2">Target Language</label>
              <select
                className="w-full p-2 border rounded-md border border-slate-700 bg-slate-800 py-2 px-3 text-gray-200 shadow-sm"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Buttons */}
            <div className="w-full sm:w-auto flex gap-4">
              <button
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition mt-7"
                onClick={handleTranslate}
              >
                Translate
              </button>
              <button
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition mt-7"
                onClick={handleCompare}
              >
                Compare
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {[
              ['Simplicity', simplicitySlider, setSimplicitySlider],
              ['Formality', formalitySlider, setFormalitySlider],
              ['Positive Connotation', positiveConnotationSlider, setPositiveConnotationSlider],
            ].map((sliderConfig) => (
              <div key={(sliderConfig as [string, number, (_: number) => void])[0]}>
                <label className="block text-sm font-semibold mb-2">
                  {(sliderConfig as [string, number, (_: number) => void])[0]}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={(sliderConfig as [string, number, (_: number) => void])[1]}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                  onChange={(e) =>
                    (sliderConfig as [string, number, (_: number) => void])[2](
                      parseInt(e.target.value),
                    )
                  }
                />
              </div>
            ))}
          </div>

          {/* Custom Instructions */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Custom Instructions</label>
            <textarea
              className="w-full h-24 p-4 border rounded-md resize-none text-gray-200 border-slate-700 bg-slate-800"
              placeholder="Here you can enter custom instructions for the the translation process..."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
            />
          </div>
        </div>

        {/* Container 2: Original Text */}
        <div className="w-full p-6 bg-gray-900 rounded-lg shadow-md border border-sky-800">
          <label className="block text-sm font-semibold mb-4">Original Text</label>
          <textarea
            className="w-full h-32 p-4 border-slate-700 bg-slate-800   rounded-md resize-none text-gray-300 bg-slate-700"
            placeholder="Enter text to translate here..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
        </div>

        {/* Container 3: Translations */}
        <div className="w-full p-6 bg-gray-900 rounded-lg shadow-md flex gap-6 border border-sky-800">
          {/* Translated Text 1 */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-4">Translated Text 1</label>
            <textarea
              className="w-full h-32 p-4 border rounded-md resize-none text-gray-200 border-slate-700 bg-slate-800"
              value={translation1}
              onChange={(e) => setTranslation1(e.target.value)}
            />
          </div>

          {/* Translated Text 2 (Placeholder) */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-4">Translated Text 2</label>
            <textarea
              className="w-full h-32 p-4 border rounded-md resize-none text-gray-200 border-slate-700 bg-slate-800"
              value={translation2}
              onChange={(e) => setTranslation2(e.target.value)}
            />
          </div>
        </div>
        {/* Container 3: Diff Output */}
        <div className="w-full p-6 bg-gray-900 rounded-lg shadow-md flex gap-6 border border-sky-800">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-4">
              Difference Between the Translations
            </label>
            {diffOutput && (
              <div
                className="w-full p-6 bg-gray-50 rounded-lg shadow-md text-gray-200 border-slate-700 bg-slate-800"
                dangerouslySetInnerHTML={{ __html: diffOutput }}
              ></div>
            )}
            {wordCountDiff !== null && (
              <label className="block text-sm font-semibold my-2">
                Word Difference: {wordCountDiff}
              </label>
            )}
            {wordCountDiff !== null && (
              <TranslationComparison
                labels={['Formality', 'Positive Connotation', 'Simplicity']}
                values={[formalityScore, positiveConnotationScore, simplicityScore]}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Footer with some content
        </a>
      </footer>
    </div>
  );
}
