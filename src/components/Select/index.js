import React, { useState, useEffect } from 'react';
import './index.scss';

export function Select(props) {
  const [selectValue, setSelectValue] = useState('');
  const [selectText, setSelectText] = useState('');
  const [optionShow, setOptionShow] = useState(false);
  const [cell, setCell] = useState('');

  const toggleOptionShow = () => {
    setOptionShow(!optionShow);
  };

  const selectOption = (val, text) => {
    props.onChange(val);
    setSelectValue(val);
    setSelectText(text);
    setOptionShow(false);
  };

  useEffect(() => {
    // set default option
    React.Children.map(props.children, (child) => {
      if (child.props.default) {
        setSelectValue(child.props.value);
        setSelectText(child.props.children);
      }
    });
  }, []);

  useEffect(() => {
    // hide options if click outside selection
    document.addEventListener(
      'click',
      (e) => {
        if (cell && cell !== e.target && !cell.contains(e.target)) {
          setOptionShow(false);
        }
      },
      true
    );
  }, []);

  return (
    <div className="app-select" ref={(node) => setCell(node)}>
      <div
        className={optionShow ? "select-value options-show" : "select-value"}
        data-val={selectValue}
        onClick={toggleOptionShow}
      >
        {selectText || (
          <span className="select-placeholder">{props.placeholder || ''}</span>
        )}
      </div>
      <div
        className="app-options"
        style={{ display: optionShow ? 'block' : 'none' }}
      >
        {React.Children.map(props.children, (child, index) => {
          return (
            <div
              key={index}
              className="app-option"
              onClick={() =>
                selectOption(child.props.value, child.props.children)
              }
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Option(props) {
  return <>{props.children}</>;
}
