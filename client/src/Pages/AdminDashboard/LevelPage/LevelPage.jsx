import React from "react";
import { useCreateLevel , useGetLevels } from "../../../hooks/react-query/useLevels";
import { Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const LevelPage = () => {

  const { mutate } =useCreateLevel() 
  const {data } = useGetLevels()
  console.log(data);
  
  return (
    <div>
  <button onClick={mutate} className="bg-zinc-800 rounded-full text-white px-4 py-2 w-1/6" type="submit">
    Add skill
  </button>
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
    {data?.map(
      (badgeData) =>
        badgeData && (
          <div key={badgeData._id} className="hover:bg-slate-200 flex flex-col items-center pb-10 cursor-pointer ">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://png.pngtree.com/png-vector/20210207/ourmid/pngtree-simple-modern-level-up-game-interface-with-stars-and-arrow-png-image_2896899.jpg" alt="Bonnie image"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{badgeData.name}</h5>
          <input id="small-range" type="range" min={badgeData.minScore} max={badgeData.maxScore} value={badgeData.minScore} disabled className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
      </div>
        )
    )}
  </div>

  
</div>
 
  )
};

export default LevelPage;
