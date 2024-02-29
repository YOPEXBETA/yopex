function Slider({ onChange, rating }) {
  return (
    <div className="relative mb-6">
      <label for="labels-range-input" className="sr-only">
        Labels range
      </label>
      <input
        onChange={(e) => {
          onChange(e);
        }}
        id="labels-range-input"
        type="range"
        value={rating}
        min="10"
        max="100"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        Min 1
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
        5.5
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
        Max 10
      </span>
    </div>
  );
}

export default Slider;
