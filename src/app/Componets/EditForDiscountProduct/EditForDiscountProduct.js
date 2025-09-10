"use client"

import { useEffect, useState } from "react";

function EditForDiscountProduct({ setShowModal, idData }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    discount_price: "",
    description: "",
    cover_image: "",
    publisher: "",
    publication_date: "",
    pages: "",
    language: "",
    categories: "",
    stock: ""
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const result = await fetch(`https://68938c84c49d24bce86b2434.mockapi.io/Discount/${idData}`);
      const data = await result.json();
      setFormData(data);
    }

    fetchProduct();
  }, [idData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
    }
  };

  const handleSubmit = async () => {
    let imageUrl = formData.cover_image;

   
    if (selectedImageFile) {
      const imageData = new FormData();
      imageData.append("image", selectedImageFile);

      const uploadResult = await fetch("https://api.imgbb.com/1/upload?key=dce76c91862741086d2ef22b13590f28", {
        method: "POST",
        body: imageData,
      });

      const uploadJson = await uploadResult.json();
      imageUrl = uploadJson.data.url;
    }

    const updatedData = { ...formData, cover_image: imageUrl };

    await fetch(`https://68938c84c49d24bce86b2434.mockapi.io/Discount/${idData}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-bold text-indigo-600 mb-4 text-center">ویرایش محصول</h2>
        <form className="space-y-3">
          {[
            { label: "نام محصول", name: "title" },
            { label: "نام نویسنده", name: "author" },
            { label: "شماره شناسه", name: "isbn" },
            { label: "قیمت محصول", name: "price" },
            { label: "قیمت بعد تخفیف", name: "discount_price" },
            { label: "توضیحات محصول", name: "description" },
            { label: "نام ناشر", name: "publisher" },
            { label: "تاریخ انتشار", name: "publication_date" },
            { label: "تعداد صفحات", name: "pages" },
            { label: "زبان", name: "language" },
            { label: "ژانر کتاب", name: "categories" },
            { label: "تعداد موجود", name: "stock" }
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize text-right">{label}</label>
              <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize text-right">عکس محصول</label>
            {formData.cover_image && (
              <img
                src={formData.cover_image}
                alt="preview"
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm"
            />
          </div>
        </form>

        <div className="flex justify-between gap-3 pt-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            بستن
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditForDiscountProduct;
