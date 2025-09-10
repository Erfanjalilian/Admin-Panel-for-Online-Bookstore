"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

export default function ProductListClient({ products }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productList, setProductList] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = useMemo(() => {
    const unique = new Set(productList.map((item) => item.categories));
    return Array.from(unique);
  }, [productList]);

  const filteredProducts = productList.filter((item) => {
    const keyword = search.toLowerCase();
    const matchSearch =
      item.title?.toLowerCase().includes(keyword) ||
      item.author?.toLowerCase().includes(keyword) ||
      item.isbn?.toLowerCase().includes(keyword) ||
      item.publisher?.toLowerCase().includes(keyword);

    const matchCategory = selectedCategory
      ? item.categories === selectedCategory
      : true;

    return matchSearch && matchCategory;
  });

  async function handleDelete(id) {
    const res = await fetch(
      `https://683dbdd7199a0039e9e6b54e.mockapi.io/Products/${id}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      setProductList((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("خطا در حذف محصول");
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setShowModal(true);
  }

  async function handleUpdate() {
    const res = await fetch(
      `https://683dbdd7199a0039e9e6b54e.mockapi.io/Products/${editingProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      }
    );

    if (res.ok) {
      const updated = await res.json();
      setProductList((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setShowModal(false);
    } else {
      alert("خطا در به‌روزرسانی محصول");
    }
  }

  return (
    <>
    
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجو بر اساس عنوان، نویسنده، ISBN یا ناشر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border-2 border-indigo-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 text-indigo-800 placeholder-indigo-400 font-medium bg-white"
        />
      </div>

    
      <div className="mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border-2 border-indigo-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 text-indigo-800 bg-white font-medium"
        >
          <option value="">همه‌ی موضوعات</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center relative"
          >
            <Image
              src={item.cover_image}
              width={220}
              height={220}
              className="rounded-xl object-cover shadow-md mb-4"
              alt={item.title}
            />
            <h2 className="text-xl font-semibold text-indigo-700 mb-2 text-center">
              {item.title}
            </h2>
            <p className="text-gray-600 mb-4 text-center line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-500 font-medium">قیمت :</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold shadow">
                {item.price} تومان
              </span>
            </div>
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      
      {showModal && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 space-y-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-bold text-indigo-600 mb-4 text-center">ویرایش محصول</h2>

            
            {Object.entries(editingProduct).map(([key, value]) => {
              if (
                ["id", "sold_count", "average_rating", "reviews_count"].includes(
                  key
                )
              )
                return null;

              if (key === "cover_image") {
                return (
                  <div key={key} className="space-y-2">
                    <label className="block font-medium text-sm text-gray-600">
                      عکس محصول
                    </label>
                    <Image
                      src={editingProduct.cover_image}
                      width={150}
                      height={150}
                      className="rounded shadow"
                      alt="cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("image", file);

                        try {
                          const res = await fetch(
                            `https://api.imgbb.com/1/upload?key=dce76c91862741086d2ef22b13590f28`,
                            {
                              method: "POST",
                              body: formData,
                            }
                          );
                          const data = await res.json();
                          if (data.success) {
                            setEditingProduct((prev) => ({
                              ...prev,
                              cover_image: data.data.url,
                            }));
                          } else {
                            alert("آپلود عکس ناموفق بود.");
                          }
                        } catch (err) {
                          alert("خطا در آپلود تصویر");
                          console.error(err);
                        }
                      }}
                      className="mt-2"
                    />
                  </div>
                );
              }

              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setEditingProduct((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
              );
            })}

            
            <div className="flex justify-between gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                بستن
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
