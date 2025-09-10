"use client"
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import ModoleForSettingSite from "@/app/Componets/ModoleForSettingSite/ModoleForSettingSite";

function LogoPhoto() {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/4">
          <ModoleForSettingSite />
        </div>

        <div className="w-full md:w-1/2">
          <form className="w-full">
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 transition-all bg-white shadow-sm"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">آپلود عکس لوگو</span> یا فایل را بکشید و رها کنید
                </p>
                <p className="text-xs text-gray-400">فرمت‌های مجاز: PNG, JPG, JPEG</p>
              </div>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">پیش‌نمایش:</p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogoPhoto;
