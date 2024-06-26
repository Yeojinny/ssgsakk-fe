"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShippingInfoBox from "./ShippingInfoBox";
import { ShippingInfoType } from "@/types/memberInfoType";

const ManageShippingList = ({
  shippingData,
  SetDefaultShippingAddress,
}: {
  shippingData: ShippingInfoType[];
  SetDefaultShippingAddress: (checkedAddressId: number) => void;
}) => {
  const [checkedAddressId, setCheckedAddressId] = useState<number | null>(null);
  const router = useRouter();

  const defaultAddressHandler = async () => {
    if (checkedAddressId === null) {
      alert("기본 배송지로 설정할 배송지를 선택해주세요.");
      return;
    }
    SetDefaultShippingAddress(checkedAddressId);
    alert("기본 배송지로 설정되었습니다.");
  };

  const addHandler = () => {
    if (shippingData.length >= 5) {
      return alert(
        "배송지는 최대 5개까지 등록 가능합니다. 기존 배송지를 삭제 후 등록해주세요."
      );
    }
    router.push(`/mypage/shippingForm?shippingAddressId=`);
  };

  return (
    <div className="font-Pretendard px-[16px] pb-[30px]">
      {/* 배송지 목록 */}
      <section className="pt-[15px]">
        <ul>
          {shippingData &&
            shippingData.map((item: ShippingInfoType) => (
              <li
                key={item.shippingAddressSeq}
                className="relative block py-[20px] pl-[40px] border-b border-b-[#f1f1f1] h-min-[19px]"
              >
                <ShippingInfoBox
                  type="manage"
                  shippingData={item}
                  setCheckedAddressId={setCheckedAddressId}
                  checkedAddressId={checkedAddressId}
                />
              </li>
            ))}
        </ul>
      </section>

      {/* 새 배송지 추가 */}
      <section className="mt-[40px]">
        <button
          onClick={addHandler}
          className="border border-[#e0e0e0] bg-[#f5f5f5] h-[40px] w-full text-[14px] text-[#222] text-center"
        >
          + 새 배송지 추가
        </button>
      </section>

      {/* 기본배송지 설정 */}
      <section className="bg-blue-200 mt-[30px] w-full h-[50px] flex">
        <button className="bg-[#666] text-[#fff] text-[16px] w-full h-full">
          이번만배송지 설정
        </button>
        <button
          onClick={defaultAddressHandler}
          className="bg-primary-red text-[#fff] text-[16px] w-full h-ull"
        >
          기본배송지 설정
        </button>
      </section>

      <section className="mt-[20px]">
        <p className="text-[13px] text-[#222]">
          · 선택한 배송지에 따라 이마트, 트레이더스 상품 재고가 달라질 수
          있습니다.
        </p>
      </section>
    </div>
  );
};

export default ManageShippingList;
