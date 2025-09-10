function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-100 to-blue-50 shadow-inner rounded-t-3xl mt-16">
      <div className="w-11/12 mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/window.svg" alt="BookStore Logo" className="w-10 h-10" />
          <span className="text-xl font-extrabold text-indigo-700">BookStore Admin Panel</span>
        </div>
        <div className="flex gap-6 text-indigo-700 font-medium">
          <a href="/" className="hover:text-indigo-900 transition-colors duration-200">خانه</a>
          <a href="/UserManagement" className="hover:text-indigo-900 transition-colors duration-200">مدیریت کاربران</a>
          <a href="/Orders" className="hover:text-indigo-900 transition-colors duration-200">سفارشات</a>
          <a href="#" className="hover:text-indigo-900 transition-colors duration-200">تماس با ما</a>
        </div>
        <div className="text-gray-500 text-sm text-center md:text-right">
          © {new Date().getFullYear()} BookStore Admin. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
