import Link from "next/link";
function Modal(){
    return (
        <header className="bg-gradient-to-r from-indigo-100 to-blue-50 shadow-lg rounded-b-3xl">
            <div className="w-11/12 mx-auto flex items-center justify-between py-6">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="text-indigo-700 font-bold text-lg px-4 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-200 shadow-sm">مدیریت محصولات</Link>
                    <Link href="/UserManagement" className="text-indigo-700 font-bold text-lg px-4 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-200 shadow-sm">مدیریت کاربران</Link>
                    <Link href="/Orders" className="text-indigo-700 font-bold text-lg px-4 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-200 shadow-sm">سفارشات</Link>
                    <Link href="/SettingSite/LogoPhoto" className="text-indigo-700 font-bold text-lg px-4 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-200 shadow-sm cursor-pointer">تنظیمات فروشگاه</Link>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <img src="/window.svg" alt="Logo" className="w-10 h-10" />
                    <span className="text-xl font-extrabold text-indigo-700">BookStore Admin</span>
                </div>
            </div>
            <hr className="border-indigo-200" />
        </header>
    );
}
export default Modal;