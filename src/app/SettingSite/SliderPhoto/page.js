"use client"
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import AddNewSlider from "@/app/Componets/AddNewSlider/AddNewSlider";
import ModoleForSettingSite from "@/app/Componets/ModoleForSettingSite/ModoleForSettingSite";
import EditSlider from "@/app/Componets/EditSlider/EditSlider";

function SliderPhoto() {
  const[data,seData]=useState([])
  const[isOpen,setIsopen]=useState(false)
  const[isOpenEditSlider,setIsOpenEditSlider]=useState(false)
  const[idEditSlider,setIdEditSlider]=useState(null)

  useEffect(()=>{

     async function handelData(){
      const result=await fetch("https://683dbdd7199a0039e9e6b54e.mockapi.io/Advertising");
      const data=await result.json();
      seData(data)

     }
     handelData()

  },[])

  async function handelDelete(id){
    const result=await fetch(`https://683dbdd7199a0039e9e6b54e.mockapi.io/Advertising/${id}`,
      {
        method:"DELETE"
      }
    );
     if (result.ok) {
      seData((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("خطا در حذف محصول");
    }

  }

  function handelEditSlider(id){
    setIsOpenEditSlider(true)
    setIdEditSlider(id)
  }



  return (
    <div className="w-full bg-gray-50 py-8">
      {/* ردیف افقی شامل مدال و لیست تصاویر */}
      <div className="flex gap-6 w-full px-4 md:px-8">
        
        {/* 🔹 مدال - خارج از کانتینر اما در کنار لیست */}
        <div className="w-full max-w-xs">
          <ModoleForSettingSite />
        </div>

        {/* 🔹 لیست تصاویر و توضیحات داخل کانتینر ۹۰٪ */}
        <div className="flex-1">
          <div className="w-[90%] mx-auto space-y-6">
            
            {/* دکمه افزودن */}
            <div className="text-left">
              <button onClick={()=>setIsopen(true)} className="text-white bg-blue-600 rounded py-2 px-6 hover:bg-blue-700 transition">
                افزودن به اسلایدر
              </button>
              {
                isOpen==true?
                <AddNewSlider setIsopen={setIsopen} />:null
              }
              {
                isOpenEditSlider==true?
                <EditSlider idEditSlider={idEditSlider} setIsOpenEditSlider={setIsOpenEditSlider} />:null

              }
              
            </div>

            {/* لیست آیتم‌ها */}
            {data.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1">{item.subtitle}</p>
                <p className="text-blue-600 underline">{item.link}</p>
                <button onClick={()=>handelEditSlider(item.id)} className="text-white bg-blue-600 rounded py-1.5 px-2.5 m-1">ویرایش</button>
                <button onClick={()=>handelDelete(item.id)} className="text-white bg-red-600 rounded py-1.5 px-2.5 m-1">حذف</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SliderPhoto;
