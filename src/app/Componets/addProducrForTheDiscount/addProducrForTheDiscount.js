"use client"

function addProducrForTheDiscount({setIsOpenAddProduct}){
    return(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
           افزودن محصول جدید
        </h2>

        <form className="space-y-5 text-right">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              نام محصول محصول
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
               نام نویسنده
            </label>
            <input
              
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
             
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
               شماره شناسه
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
               قیمت  محصول
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
            <label className="block mb-1 font-medium text-gray-700">
                قیمت پس از تخفیف
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
                توضیحات محصول
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
                ناشر
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
                تاریخ انتشار
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
                نعداد صفحات کتاب
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
               زبان کتاب 
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
                دسته بندی محصول
            </label>
            <input
             
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>
          
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <button
          onClick={()=>setIsOpenAddProduct(false)}
            
            className="text-red-600 hover:text-red-800 font-medium transition"
          >
            بستن
          </button>
          <button
            
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
    )
}
export default addProducrForTheDiscount;