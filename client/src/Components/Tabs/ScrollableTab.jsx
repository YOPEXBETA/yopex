import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../redux/global/globalSlice";

const getCategories = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/category/getCategories",
    {
      withCredentials: true,
    }
  );
  return data;
};

export default function ScrollableTabs() {
  const { category: selectedCategory } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleChange = (_, newValue) => dispatch(changeCategory(newValue));

  if (categories)
    return (
      <div className="w-full mx-auto">
        <div className="bg-white shadow-md p-4 rounded-lg border-green-500 border-b-2">
          <div className="border-b border-gray-200 mb-4">
            <nav
              className="-mb-px flex"
              aria-label="Scrollable force tabs example"
            >
              <button
                onClick={() => handleChange(null, "")}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedCategory === ""
                    ? "text-green-600 border-green-600"
                    : "text-gray-500"
                } border-b-2 focus:outline-none`}
              >
                All
              </button>

              {categories.map((tab) => (
                <button
                  key={tab._id}
                  onClick={() => handleChange(null, tab.name)}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedCategory === tab.name
                      ? "text-green-600 border-green-500"
                      : "text-gray-500"
                  } border-b-2 focus:outline-none`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
}
