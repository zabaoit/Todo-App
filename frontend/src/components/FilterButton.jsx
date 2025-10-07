const FilterButton = ({ filter, setFilter }) => {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="flex justify-center mb-6 space-x-2">
      {/* //i will uselogic */}
      {filters.map((item, index) => (
        <div key={index}>
          <button
            className={`p-4 rounded-lg font-medium transition duration-200 cursor-pointer ${
              filter == item
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600r"
            }  `}
            onClick={() => setFilter(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterButton;
