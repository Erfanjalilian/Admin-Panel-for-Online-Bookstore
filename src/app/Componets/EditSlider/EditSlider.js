"use client";
import { useState, useEffect } from "react";

function EditSlider({ idEditSlider, setIsOpenEditSlider }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [image_url, setImage_url] = useState("");
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    async function handelData(id) {
      const result = await fetch(
        `https://683dbdd7199a0039e9e6b54e.mockapi.io/Advertising/${id}`
      );
      const data = await result.json();
      setTitle(data.title || "");
      setSubtitle(data.subtitle || "");
      setLink(data.link || "");
      setImage_url(data.image_url || "");
    }
    handelData(idEditSlider);
  }, [idEditSlider]);

 
  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);

    const API_KEY = "dce76c91862741086d2ef22b13590f28";

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const url = data.data.url;
      setImage_url(url);
    } catch (error) {
      console.error("خطا در آپلود تصویر:", error);
    } finally {
      setIsUploading(false);
    }
  }


  async function handleSave() {
    try {
      const result = await fetch(
        `https://683dbdd7199a0039e9e6b54e.mockapi.io/Advertising/${idEditSlider}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            subtitle,
            link,
            image_url,
          }),
        }
      );

      const data = await result.json();
      console.log("ویرایش با موفقیت انجام شد:", data);
      setIsOpenEditSlider(false);
    } catch (error) {
      console.error("خطا در ذخیره اطلاعات:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
          ویرایش اسلایدر
        </h2>
        <form className="space-y-5 text-right">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              عنوان محصول
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              توضیحات محصول
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              آپلود تصویر
            </label>

            {image_url && (
              <img
                src={image_url}
                alt="preview"
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}

            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={handleFileChange}
            />
            {isUploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود تصویر...</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              لینک مقصد
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setIsOpenEditSlider(false)}
            className="text-red-600 hover:text-red-800 font-medium transition"
          >
            بستن
          </button>
          <button
            onClick={handleSave}
            disabled={isUploading}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSlider;
