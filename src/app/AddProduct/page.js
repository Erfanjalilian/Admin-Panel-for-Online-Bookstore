"use client";
import { useState } from "react";

function AddProduct() {
  const [ProductName, setProductName] = useState("");
  const [AuthorName, setAuthorName] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [Description, setDescription] = useState("");
  const [ImageFile, setImageFile] = useState(null);
  const [ImageUrl, setImageUrl] = useState(""); 
  const [publisher, setPublisher] = useState("");
  const [PublicationDate, setPublicationDate] = useState("");
  const [page, setPage] = useState("");
  const [language, setLanguage] = useState("");
  const [Category, setCategory] = useState("");
  const [AvailableQuantity, setAvailableQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const imgbbApiKey = "dce76c91862741086d2ef22b13590f28"; 

  
  async function uploadImage() {
    if (!ImageFile) return "";

    const formData = new FormData();
    formData.append("image", ImageFile);

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

  async function addProduct() {
    setLoading(true);

 
    const uploadedImageUrl = await uploadImage();

    if (!uploadedImageUrl) {
      setLoading(false);
      return; 
    }

   
    try {
      const response = await fetch(
        "https://683dbdd7199a0039e9e6b54e.mockapi.io/Products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Math.floor(Math.random() * 1000) + 1,
            title: ProductName,
            author: AuthorName,
            isbn: IdNumber,
            price: price,
            discount_price: discount,
            description: Description,
            cover_image: uploadedImageUrl,
            publisher: publisher,
            publication_date: PublicationDate,
            pages: page,
            language: language,
            categories: Category,
            stock: AvailableQuantity,
          }),
        }
      );

      if (response.ok) {
        alert("محصول با موفقیت اضافه شد");
        
      } else {
        alert("خطا در ثبت محصول");
      }
    } catch (error) {
      alert("خطا در ثبت محصول");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 animate-fade-in">
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
            <span className="material-icons">library_add</span>
            افزودن محصول جدید
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">نام محصول</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">نام نویسنده</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={AuthorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">شماره شناسه</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={IdNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">قیمت</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">قیمت با تخفیف</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">توضیحات</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">
                تصویر جلد کتاب (آپلود عکس)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">ناشر</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">تاریخ انتشار</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={PublicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">تعداد صفحات</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">زبان</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">دسته‌بندی</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">تعداد موجودی</label>
              <input
                className="border border-indigo-200 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
                type="text"
                value={AvailableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={addProduct}
            disabled={loading}
            className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            {loading ? "در حال ذخیره..." : "ذخیره محصول"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
