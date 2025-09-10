"use client";

import { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://683dc48d199a0039e9e6ce6e.mockapi.io/users");
      const data = await result.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    await fetch(`https://683dc48d199a0039e9e6ce6e.mockapi.io/users/${id}`, {
      method: "DELETE",
    });
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setIsEditing(true);
  }

  async function handleSave() {
    await fetch(`https://683dc48d199a0039e9e6ce6e.mockapi.io/users/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    });

    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))
    );
    setIsEditing(false);
    setSelectedUser(null);
  }

  // فیلتر کاربران بر اساس سرچ
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-16 relative">
      {/* تار کردن صفحه هنگام باز بودن پاپاپ */}
      <div className={`w-full max-w-5xl mx-auto p-10 rounded-3xl shadow-2xl bg-white transition-all duration-300 ${isEditing ? "blur-sm pointer-events-none" : ""}`}>
        <h2 className="text-2xl font-bold text-indigo-700 mb-8 flex items-center gap-2">
          <span className="material-icons">group</span>
          مدیریت کاربران
        </h2>

        {/* قسمت جستجو */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی کاربر بر اساس نام، نام خانوادگی یا ایمیل..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-indigo-100">
                <th className="py-3 px-4 text-center font-semibold">نام</th>
                <th className="py-3 px-4 text-center font-semibold">نام خانوادگی</th>
                <th className="py-3 px-4 text-center font-semibold">ایمیل</th>
                <th className="py-3 px-4 text-center font-semibold">پسورد</th>
                <th className="py-3 px-4 text-center font-semibold">شماره تلفن</th>
                <th className="py-3 px-4 text-center font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"}
                >
                  <td className="text-center py-3 px-4 border-b border-indigo-100">{item.name}</td>
                  <td className="text-center py-3 px-4 border-b border-indigo-100">{item.lastName}</td>
                  <td className="text-center py-3 px-4 border-b border-indigo-100">{item.email}</td>
                  <td className="text-center py-3 px-4 border-b border-indigo-100">{item.password}</td>
                  <td className="text-center py-3 px-4 border-b border-indigo-100">{item.phone}</td>
                  <td className="text-center py-3 px-4 border-b border-indigo-100 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    هیچ کاربری با این مشخصات یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* پاپاپ ویرایش */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
          <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl z-10 relative">
            <h3 className="text-lg font-bold mb-4 text-indigo-700">ویرایش اطلاعات کاربر</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="نام"
              />
              <input
                type="text"
                value={selectedUser.lastName}
                onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="نام خانوادگی"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="ایمیل"
              />
              <input
                type="text"
                value={selectedUser.password}
                onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="رمز عبور"
              />
              <input
                type="text"
                value={selectedUser.phone}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="شماره تماس"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                انصراف
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
