
async function Orders(){
    const result=await fetch("https://68837bb721fa24876a9e4132.mockapi.io/order");
    const data=await result.json();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-16">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 animate-fade-in">
                <h2 className="text-2xl font-bold text-indigo-700 mb-8 flex items-center gap-2">
                    <span className="material-icons">shopping_cart</span>
                    مدیریت سفارش‌ها
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-indigo-100">
                                <th className="py-3 px-4 text-center font-semibold">شناسه محصول</th>
                                 

                                <th className="py-3 px-4 text-center font-semibold">تاریخ ثبت سفارش</th>
                                <th className="py-3 px-4 text-center font-semibold">نام مشتری</th>
                                <th className="py-3 px-4 text-center font-semibold">شماره تماس</th>
                                 <th className="py-3 px-4 text-center font-semibold">آدرس ایمیل</th>
                                  <th className="py-3 px-4 text-center font-semibold">کد پستی</th>
                                 <th className="py-3 px-4 text-center font-semibold">آدرس منزل</th>
                                  <th className="py-3 px-4 text-center font-semibold">تعداد</th>
                                   <th className="py-3 px-4 text-center font-semibold">مبلغ کل</th>

                                <th className="py-3 px-4 text-center font-semibold">وضعیت پرداخت</th>
                                <th className="py-3 px-4 text-center font-semibold">وضعیت ارسال</th>
                                 <th className="py-3 px-4 text-center font-semibold">عملیات</th>




                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                
                                    <tr key={item.productId || idx} className={(idx % 2 === 0 ? "bg-white" : "bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200") + " border-b border-indigo-100"}>
                                        <td className="text-center py-3 px-5 max-w-xs truncate">{item.orderNumber}</td>
                                        <td className="text-center py-3 px-5 max-w-xs truncate">{item.createdAt}</td>
                                        <td className="text-center py-3 px-5 max-w-xs truncate">{item.customer.fullName}</td>
                                        <td className="text-center py-3 px-5 max-w-xs truncate">{item.customer.phone}</td>
                                         <td className="text-center py-3 px-5 max-w-xs truncate">{item.customer.email}</td>
                                        <td className="text-center py-3 px-5 max-w-xs truncate">{item.customer.PostalCode}</td>

                                         <td className="text-center py-3 px-5 max-w-xs truncate">{item.customer.address}</td>

                                          <td className="text-center py-3 px-5 max-w-xs truncate">{item.itemsCount}</td>
                                           <td className="text-center py-3 px-5 max-w-xs truncate">{item.totalAmount}</td>
                                            <td className="text-center py-3 px-5 max-w-xs truncate">{item.payment.status}</td>
                                             <td className="text-center py-3 px-5 max-w-xs truncate">{item.shippingStatus}</td>
                                               <td className="text-center py-3 px-5 max-w-xs truncate">
                                                <button className="text-white bg-green-700 rounded-2xl py-2 px-4">test</button>
                                               </td>
                                         
                                        
                                    </tr>
                               
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Orders;