"use client";
import { useState } from "react";

function AddNewSlider({ setIsopen }) {
  const [nameSlider, setNameSlider] = useState("");
  const [discreaptionSlider, setDiscreaptionSlider] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [linkSlider, setLinkSlider] = useState("");

  const imgbbApiKey = "dce76c91862741086d2ef22b13590f28";

  async function uploadImage() {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        alert("خطا در آپلود تصویر");
        return "";
      }
    } catch (error) {
      alert("خطا در آپلود تصویر");
      return "";
    }
  }

  async function addSlider() {
    const uploadedImageUrl = await uploadImage();

    try {
      const response = await fetch(
        "https://683dbdd7199a0039e9e6b54e.mockapi.io/Advertising",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Math.floor(Math.random() * 1000) + 1,
            title: nameSlider,
            subtitle: discreaptionSlider,
            link: linkSlider,
            image_url: uploadedImageUrl,
          }),
        }
      );

      if (response.ok) {
        alert("محصول با موفقیت اضافه شد");
        setIsopen(false); 
      } else {
        alert("خطا در ثبت محصول");
      }
    } catch (error) {
      alert("خطا در ثبت محصول");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
          افزودن اسلایدر جدید
        </h2>

        <form className="space-y-5 text-right">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              عنوان محصول
            </label>
            <input
              value={nameSlider}
              onChange={(e) => setNameSlider(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              توضیحات محصول
            </label>
            <input
              value={discreaptionSlider}
              onChange={(e) => setDiscreaptionSlider(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              آپلود تصویر
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              لینک مقصد
            </label>
            <input
              value={linkSlider}
              onChange={(e) => setLinkSlider(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setIsopen(false)}
            className="text-red-600 hover:text-red-800 font-medium transition"
          >
            بستن
          </button>
          <button
            onClick={addSlider}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewSlider;
