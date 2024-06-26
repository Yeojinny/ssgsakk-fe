import React from "react";
import SelectedOptionCardUnit from "./SelectedOptionCardUnit";
import { SelectedOptionAndQuantity } from "@/types/optionType";

const SelectedOptionCardList = ({
  depthLevel,
  selectOption,
  sellingPrice,
  deleteOption,
  onQuantityChange,
}: {
  depthLevel: number;
  selectOption: SelectedOptionAndQuantity[];
  sellingPrice: number;
  deleteOption: (optionAndStockSeq: number) => void;
  onQuantityChange: (optionAndStockSeq: number, newQuantity: number) => void;
}) => {
  return (
    <div className="overflow-hidden  pt-[12px] px-[15px]">
      {selectOption
        .slice()
        .reverse()
        .map((option, index) => (
          <SelectedOptionCardUnit
            key={index}
            seq={index}
            depthLevel={depthLevel}
            option={option}
            sellingPrice={sellingPrice}
            deleteOption={deleteOption}
            onQuantityChange={onQuantityChange}
          />
        ))}
    </div>
  );
};

export default SelectedOptionCardList;
