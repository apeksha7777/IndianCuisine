import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const SkillAutosuggest = ({ skills, onSkillSelected }:any) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue:any) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    return skills.filter((skill:any) =>
      skill.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const onSuggestionsFetchRequested = ({ value }:any) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion:any) => suggestion;

  const renderSuggestion = (suggestion:any) => <div>{suggestion}</div>;

  const onChange = (_:any, { newValue }:any) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (_:any, { suggestion }:any) => {
    onSkillSelected(suggestion);
    setValue('');
  };

  const inputProps = {
    placeholder: 'Type an ingredient...',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default SkillAutosuggest;
