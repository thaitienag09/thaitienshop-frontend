import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import {
    Search,
    User,
    Mail,
    Calendar,
    Shield,
    MoreHorizontal,
    ExternalLink
} from 'lucide-react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredUsers = users.filter(u =>
        u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                <p className="text-gray-500 font-medium text-sm">Xem và quản lý danh sách tài khoản đã đăng ký trên hệ thống.</p>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên hoặc email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                    />
                </div>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-blue-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="font-bold">Không tìm thấy người dùng nào</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Tên người dùng</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Ngày tham gia</th>
                                    <th className="px-6 py-4">Vai trò</th>
                                    <th className="px-6 py-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                                    {u.photoURL ? (
                                                        <img src={u.photoURL} alt="" className="h-full w-full rounded-lg object-cover" />
                                                    ) : (
                                                        u.displayName?.charAt(0) || 'U'
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{u.displayName || 'Anonymous'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <span>{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span>{u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString('vi-VN') : 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border flex items-center w-fit space-x-1 ${u.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700 border-purple-200'
                                                    : 'bg-blue-100 text-blue-700 border-blue-200'
                                                }`}>
                                                {u.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                                                {u.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                    <ExternalLink className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
