
"use client"
import { useState } from "react";
import { useEffect } from "react";
import EditForBestSellingProduct from "@/app/Componets/EditForBestSellingProduct/EditForBestSellingProduct"
import Link from "next/link";
import Image from "next/image";
import ModoleForSettingSite from "@/app/Componets/ModoleForSettingSite/ModoleForSettingSite"


function BestSellingProducts(){
    const[data,setData]=useState([])
     const [showModal, setShowModal] = useState(false);
     const[idData,setIdData]=useState()
   
    useEffect (()=>{

        async function handelData(){
            const result=await fetch("https://68938c84c49d24bce86b2434.mockapi.io/BestSelling")
            const data=await result.json()
            setData(data)
        }
        handelData()

    },[])
    async function handelDeletData(id){
        const result=await fetch(`https://68938c84c49d24bce86b2434.mockapi.io/BestSelling/${id}`,
            {
                method:"DELETE"
            }
            
        );
         if (result.ok) {
      setData((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("خطا در حذف محصول");
    }

  


    }
      function handelEditData(id){
        setShowModal(true)
        setIdData(id)
    }
    return(
        <div className="w-full bg-gray-50 py-8">
            <div className="flex gap-6 w-full px-4 md:px-8">
                  <div className="w-full max-w-xs">
                        <ModoleForSettingSite />
                  </div>
                  <div className="flex-1">
                    <div className="w-[90%] mx-auto space-y-6">
                        <div className="text-left">
                            <Link href={"/AddProductForDiscount"}>
                                <button className="text-white bg-blue-600 rounded py-2 px-6 hover:bg-blue-700 transition">
                                    افزودن محصول 
                             </button>
                            </Link>

                            {
                                showModal==true?
                                <EditForBestSellingProduct idData={idData} setShowModal={setShowModal}  />
                                :
                                null
                            }
                            
                           
                        </div>
                        {
                            data.map((item)=>(
                                <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
                                    <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
                                        <Image
                                         src={item.cover_image}
                                         alt={item.title}
                                         fill
                                          className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="font-semibold text-gray-600 mb-2">{item.author}</p>
                                    <p className="font-semibold text-gray-600 mb-2">{item.discount_price} تومان</p>
                                    <p className="font-semibold text-red-800 mb-2">{item.price} تومان</p>
                                     <button onClick={()=>handelEditData(item.id)} className="text-white bg-blue-600 rounded py-1.5 px-2.5 m-1">ویرایش</button>
                                     <button onClick={()=>handelDeletData(item.id)} className="text-white bg-red-600 rounded py-1.5 px-2.5 m-1">حذف</button>
                                    
                                </div>
                            ))
                        }

                    </div>
                  </div>
            </div>
        </div>
    )
}
export default BestSellingProducts;