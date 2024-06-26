import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";

import { GetOption } from "@/actions/product";
import HeartIcon from "@/components/UI/HeartIcon";
import DeliveryLabel from "@/components/UI/DeliveryLabel";
import ProductCartIcon from "@/components/UI/ProductCartIcon";

interface ProductData {
    productName: string;
    vendor: string;
    productPrice: number;
    averageRating: number;
    reviewCount: number;
    discountPercent: number;
    deliveryType: string;
    contentsUrl: {
        priority: number;
        contentUrl: string;
        contentDescription: string;
    };
}

async function fetchProductList(productId: number) {
    const response = await fetch(`${process.env.BASE_URL}/products/productsListCard/${productId}`);
    const data = await response.json();
    return data.result;
}

const ProductListCard = async ({ productSeq, best }: { productSeq: number; best?: number }) => {
    const minimumStock = 5;
    const productData: ProductData = await fetchProductList(productSeq);
    const optionData = await GetOption(productSeq);

    const isSoldOut = !optionData?.depthLevel && optionData?.options?.[0].stock <= minimumStock;

    return (
        <>
            <div className="h-[310px] my-3 flex justify-start flex-col">
                <div className="w-auto h-auto relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${productData.contentsUrl.contentUrl})`,
                            filter: "blur(30px)", // 배경 이미지에 흐림 효과 적용
                            zIndex: -1, // 배경 이미지를 뒤로 보냅니다.
                        }}
                    />
                    <Link href={`/products/${productSeq}`} className="flex justify-center ">
                        <div className="relative">
                            <Image src={productData.contentsUrl.contentUrl} alt="productImage" width={200} height={200} />
                            {isSoldOut && (
                                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                                    <p className="text-white text-[16px] font-semibold font-Pretendard">품절</p>
                                </div>
                            )}
                        </div>
                    </Link>
                    {best && (
                        <div className="bg-[#222222] bg-opacity-70 absolute top-0 right-0 w-[20px] h-[20px] flex justify-center items-center">
                            <p className="font-Pretendard text-center text-[11px] text-white">{best.toString().padStart(2, "0")}</p>
                        </div>
                    )}
                </div>
                <div className=" flex flex-row gap-2 justify-between py-2 items-center">
                    <DeliveryLabel deliveryType={productData.deliveryType} />
                    <div className="flex flex-row gap-2 items-center">
                        <Suspense fallback={<div>Loading...</div>}>
                            <HeartIcon productSeq={productSeq} />
                        </Suspense>
                        <ProductCartIcon productSeq={productSeq} optionData={optionData} />
                    </div>
                </div>
                <div className="flex flex-row text-pretty">
                    <span className="font-Pretendard text-[13px] line-clamp-2">
                        <b>{productData.vendor} </b>
                        {productData.productName}
                    </span>
                </div>
                {productData.discountPercent === 0 ? (
                    <p className="font-Pretendard text-[16px] font-bold">{productData.productPrice.toLocaleString()}원</p>
                ) : (
                    <div className="flex flex-col">
                        <p className="font-Pretendard text-[12px] text-[#969696] line-through	">{productData.productPrice.toLocaleString()}원</p>
                        <div className="flex flex-row gap-1">
                            <p className="font-Pretendard text-[16px] font-bold text-primary-red">{productData.discountPercent}%</p>
                            <p className="font-Pretendard text-[16px] font-bold">
                                {Math.round(productData.productPrice * (1 - productData.discountPercent / 100)).toLocaleString()}원
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductListCard;
