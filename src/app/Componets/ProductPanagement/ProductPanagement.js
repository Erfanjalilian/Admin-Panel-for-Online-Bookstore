import ProductListClient from "@/app/Componets/ProductListClient/ProductListClient";
import Link from "next/link"
async function ProductPanagement() {
  const result = await fetch("https://683dbdd7199a0039e9e6b54e.mockapi.io/Products");
  const data = await result.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="w-11/12 mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">مدیریت محصولات</h1>
          <Link href={"/AddProduct"}>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-indigo-300 transition-transform duration-300 flex items-center gap-2">
              <span className="material-icons">add_circle</span>
              افزودن محصول جدید
            </button>
          </Link>
        </div>

        
        <ProductListClient products={data} />
      </div>
    </div>
  );
}
export default ProductPanagement;
