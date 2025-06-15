import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import SHA256 from "crypto-js/sha256"; // opsional kalau mau hash password

const TablePetugas = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        nama_user: "",
        username: "",
        password: "",
        level: "2",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fungsi untuk mengambil data user
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/petugas");
            setUsers(res.data);
        } catch (err) {
            console.error("Gagal fetch user:", err);
        }
    };

    // Fungsi untuk mengubah data user
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menyimpan data user
    const openAddModal = () => {
        setForm({ nama_user: "", username: "", password: "", level: "2" });
        setIsEdit(false);
        setEditingId(null);
        setShowModal(true);
    };

    // Fungsi untuk membuka modal edit
    const openEditModal = (user) => {
        setForm({
            nama_user: user.nama_user,
            username: user.username,
            password: user.password, // biasanya kamu tidak akan tampilkan password asli
            level: user.level,
        });
        setIsEdit(true);
        setEditingId(user.id_user);
        setShowModal(true);
    };

    // Fungsi untuk menghapus data user
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Yakin ingin hapus?",
            text: "Data akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/api/petugas/${id}`);
                    fetchUsers();
                    Swal.fire("Berhasil!", "Data dihapus.", "success");
                } catch (err) {
                    console.error("Gagal hapus:", err);
                }
            }
        });
    };

    // Fungsi untuk menyimpan data user
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            // password: SHA256(form.password).toString(), // kalau mau hash
        };

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/petugas/${editingId}`, payload);
                Swal.fire("Berhasil", "Data diperbarui", "success");
            } else {
                await axios.post("http://localhost:3000/api/petugas", payload);
                Swal.fire("Berhasil", "Data ditambahkan", "success");
            }

            setShowModal(false);
            fetchUsers();
        } catch (err) {
            console.error("Gagal simpan user:", err);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="mb-4">
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Tambah Petugas
                </button>
            </div>

            {/* Tabel */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="px-6 py-3">ID User</th>
                        <th className="px-6 py-3">Nama User</th>
                        <th className="px-6 py-3">Username</th>
                        <th className="px-6 py-3">Password</th>
                        <th className="px-6 py-3">Level</th>
                        <th className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id_user}
                            className="bg-white border hover:bg-gray-50 text-gray-500"
                        >
                            <td className="px-6 py-4">{user.id_user}</td>
                            <td className="px-6 py-4">{user.nama_user}</td>
                            <td className="px-6 py-4">{user.username}</td>
                            <td className="px-6 py-4">{user.password}</td>
                            <td className="px-6 py-4">{user.level}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button
                                    onClick={() => openEditModal(user)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ubah
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id_user)}
                                    className="text-red-600 hover:underline"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-bold mb-4">
                            {isEdit ? "Edit Petugas" : "Tambah Petugas"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="nama_user"
                                value={form.nama_user}
                                onChange={handleChange}
                                placeholder="Nama Petugas"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="1">Admin</option>
                                <option value="2">Petugas</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablePetugas;
