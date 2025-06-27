import React from 'react';
import { Language } from '../types';
import { languages } from '../utils/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  excludeLanguage?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label,
  id,
  excludeLanguage,
}) => {
  const filteredLanguages = excludeLanguage
    ? languages.filter((lang) => lang.code !== excludeLanguage)
    : languages;

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-base font-semibold text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-[180px] px-4 py-3 bg-white border rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      >
        {filteredLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;