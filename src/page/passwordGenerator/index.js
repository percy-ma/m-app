import { useState } from 'react';
import Slider from 'rc-slider';
import './index.scss';
import { Copy } from '@icon-park/react';

export default function PasswordGenerator() {
  let range = '';
  const DEFAULT_VALUE = 10;
  const NUMBER_RANGE = '0123456789';
  const UPPER_RANGE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER_RANGE = 'abcdefghijklmnopqrstuvwxyz';
  const SYMBOLS_RANGE = '!@#$%^&*_+-?~';

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(DEFAULT_VALUE);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const setNumberRange = () => {
    setIncludeNumber(!includeNumber);
  };
  const setUpperRange = () => {
    setIncludeUpper(!includeUpper);
  };
  const setLowerRange = () => {
    setIncludeLower(!includeLower);
  };
  const setSymbolsRange = () => {
    setIncludeSymbols(!includeSymbols);
  };
  const setRange = () => {
    includeNumber ? (range += NUMBER_RANGE) : range.replace(NUMBER_RANGE, '');
    includeUpper ? (range += UPPER_RANGE) : range.replace(UPPER_RANGE, '');
    includeLower ? (range += LOWER_RANGE) : range.replace(LOWER_RANGE, '');
    includeSymbols
      ? (range += SYMBOLS_RANGE)
      : range.replace(SYMBOLS_RANGE, '');
  };
  const includeRange = () => {
    return includeNumber || includeUpper || includeLower || includeSymbols;
  };

  const generatePwd = () => {
    if (includeRange()) {
      setRange();
      let result = '';
      for (let i = 0; i < length; i++) {
        let one = range.split('')[Math.floor(Math.random() * range.length)];
        result += one;
      }
      setPassword(result);
    }
  };

  const copyPassword = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const lengthChange = (value) => {
    setLength(value);
  };

  return (
    <div className="password-generator content-middle">
      <div className='container'>
        <h3 className="title">Password Generator</h3>
        <div id="pwd-box" className='card'>
          <span className="pwd-text">{password}</span>
          <div className="copy-icon" title="Copy" onClick={copyPassword}>
            <Copy size="16" />
          </div>
        </div>
        <div id="selector-box" className='card'>
        <div className="length-selector">
          <div className='text'>
            <span className='label'>Character Length</span>
            <span className='number'>{length}</span>
          </div>
          <Slider
            min={4}
            max={16}
            defaultValue={DEFAULT_VALUE}
            onChange={lengthChange}
          />
        </div>
        <div className="include-field">
          <span
            className={
              includeUpper
                ? 'include-checkbox include-checkbox-checked'
                : 'include-checkbox'
            }
            onClick={setUpperRange}
          ></span>
          <span>Include Uppercase Letters</span>
        </div>
        <div className="include-field">
          <span
            className={
              includeLower
                ? 'include-checkbox include-checkbox-checked'
                : 'include-checkbox'
            }
            onClick={setLowerRange}
          ></span>
          <span>Include Lowercase Letters</span>
        </div>
        <div className="include-field">
          <span
            className={
              includeNumber
                ? 'include-checkbox include-checkbox-checked'
                : 'include-checkbox'
            }
            onClick={setNumberRange}
          ></span>
          <span>Include Numbers</span>
        </div>
        <div className="include-field">
          <span
            className={
              includeSymbols
                ? 'include-checkbox include-checkbox-checked'
                : 'include-checkbox'
            }
            onClick={setSymbolsRange}
          ></span>
          <span>Include Symbols</span>
        </div>
        <button id="generate-btn" onClick={generatePwd}>
          Generate
        </button>
        </div>
      </div>
    </div>
  );
}
