import React, { useState } from 'react';

function RangeSlider({ min, max, value1, value2, onChange }) {
  const [rangeValue, setRangeValue] = useState([value1, value2]);

  const handleChange = (event) => {
    const newValue = event.target.valueAsNumber;
    const updatedRangeValue = [...rangeValue];
    const thumbIndex = event.target.dataset.thumbIndex;

    updatedRangeValue[thumbIndex] = newValue;
    setRangeValue(updatedRangeValue);

    // Notify the parent component of the change
    onChange(updatedRangeValue);
  };

  return (
    <div className="range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={rangeValue[0]}
        onChange={handleChange}
        data-thumb-index="0"
      />
      
      <div className="range-values">
        <span className='mr-12'>{rangeValue[0]}</span >  <span>{rangeValue[1]}</span>
      </div>
    </div>
  );
}

export default RangeSlider;