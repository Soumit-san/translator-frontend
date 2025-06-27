import React from 'react';
import { Globe, Languages } from 'lucide-react';
import TranslationContainer from './components/TranslationContainer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Languages className="text-indigo-600" style={{ width: '2.5rem', height: '2.5rem' }} />
              <h1 className="text-3xl font-bold text-gray-900">TranslateHub</h1>
            </div>
            <div className="flex items-center space-x-2 text-base text-gray-600">
              <Globe className="mr-2" style={{ width: '1.5rem', height: '1.5rem' }} />
              <span>Powered by AI Translation</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Translate Text & Speech
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Translate between multiple languages, or convert your translated text to speech.
            Experience seamless communication across languages.
          </p>
        </div>
        
        <TranslationContainer />
        
        <div className="mt-16 text-center text-base text-gray-500 max-w-2xl mx-auto">
          <p>
            Type your text in the input area and select your desired languages.
            Click "Translate" to see your text in the selected language.
          </p>
        </div>
      </main>
      
      <footer className="bg-white mt-24 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} TranslateHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;