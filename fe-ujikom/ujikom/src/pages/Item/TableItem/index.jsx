import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TableItem = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        nama_item: "",
        uom: "",
        harga_beli: "",
        harga_jual: "",
    });

    useEffect(() => {
        fetchItems();
    }, []);

    // Fungsi untuk mengambil data items
    const fetchItems = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/items");
            setItems(res.data);
        } catch (error) {
            console.error("Gagal ambil data items:", error);
        }
    };

    // Fungsi untuk mengubah data item
    // const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    // };

    const handleChange = (e) => {
    const { name, value } = e.target;
    // Jika field harga, ubah ke number
    if (name === "harga_beli" || name === "harga_jual") {
        setForm({ ...form, [name]: Number(value) });
    } else {
        setForm({ ...form, [name]: value });
    }
};

    // Fungsi untuk menyimpan data item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/items/${editingId}`, form);
                Swal.fire("Berhasil!", "Item berhasil diperbarui", "success");
            } else {
                await axios.post("http://localhost:3000/api/items", form);
                Swal.fire("Berhasil!", "Item berhasil ditambahkan", "success");
            }
            setShowModal(false);
            setForm({ nama_item: "", uom: "", harga_beli: "", harga_jual: "" });
            fetchItems();
        } catch (err) {
            console.error("Gagal simpan item:", err);
        }
    };

    // Fungsi untuk menghapus data item
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Yakin hapus item ini?",
            text: "Data akan hilang permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/api/items/${id}`);
                    fetchItems();
                    Swal.fire("Berhasil!", "Item berhasil dihapus", "success");
                } catch (err) {
                    console.error("Gagal hapus item:", err);
                }
            }
        });
    };

    // Fungsi untuk membuka modal edit
    const openEditModal = (item) => {
        setForm({
            nama_item: item.nama_item,
            uom: item.uom,
            harga_beli: item.harga_beli,
            harga_jual: item.harga_jual,
        });
        setEditingId(item.id_item);
        setIsEdit(true);
        setShowModal(true);
    };

    // Fungsi untuk membuka modal tambah
    const openAddModal = () => {
        setForm({ nama_item: "", uom: "", harga_beli: "", harga_jual: "" });
        setIsEdit(false);
        setEditingId(null);
        setShowModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="mb-4">
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    <span className="font-bold">+</span> Tambah Item
                </button>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="px-6 py-3">ID Item</th>
                        <th className="px-6 py-3">Nama Item</th>
                        <th className="px-6 py-3">UOM</th>
                        <th className="px-6 py-3">Harga Beli</th>
                        <th className="px-6 py-3">Harga Jual</th>
                        <th className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id_item} className="bg-white border text-gray-500 hover:bg-gray-50">
                            <td className="px-6 py-4">{item.id_item}</td>
                            <td className="px-6 py-4">{item.nama_item}</td>
                            <td className="px-6 py-4">{item.uom}</td>
                            <td className="px-6 py-4">{`Rp ${Number(item.harga_beli).toLocaleString("id-ID")}` }</td>
                            <td className="px-6 py-4">{`Rp ${Number(item.harga_jual).toLocaleString("id-ID")}`}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button
                                    onClick={() => openEditModal(item)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ubah
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id_item)}
                                    className="text-red-600 hover:underline"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">
                            {isEdit ? "Edit Item" : "Tambah Item"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="nama_item"
                                value={form.nama_item}
                                onChange={handleChange}
                                placeholder="Nama Item"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="uom"
                                value={form.uom}
                                onChange={handleChange}
                                placeholder="UOM (Unit of Measure)"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="harga_beli"
                                value={form.harga_beli}
                                onChange={handleChange}
                                placeholder="Harga Beli"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="harga_jual"
                                value={form.harga_jual}
                                onChange={handleChange}
                                placeholder="Harga Jual"
                                className="w-full p-2 border rounded"
                                required
                            />
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

export default TableItem;
