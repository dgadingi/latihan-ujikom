import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TableTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        id_item: "",
        quantity: "",
        price: "",
    });

    useEffect(() => {
        fetchTransactions();
        fetchItems();
    }, []);

    // Fungsi untuk mengambil data transaksi
    const fetchTransactions = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/transactions");
            setTransactions(res.data);
        } catch (err) {
            console.error("Gagal ambil transaksi:", err);
        }
    };

    // Fungsi untuk mengambil data item
    const fetchItems = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/items");
            setItems(res.data);
        } catch (err) {
            console.error("Gagal ambil item:", err);
        }
    };

    // Fungsi untuk mengubah data transaksi
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menghitung jumlah
    const getAmount = () => {
        const qty = parseFloat(form.quantity) || 0;
        const price = parseFloat(form.price) || 0;
        return qty * price;
    };

    // Fungsi untuk menyimpan data transaksi
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hitung jumlah
        const payload = {
            ...form,
            amount: getAmount(),
        };

        // Simpan transaksi
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/transactions/${editingId}`, payload);
                Swal.fire("Berhasil", "Transaksi diperbarui", "success");
            } else {
                await axios.post("http://localhost:3000/api/transactions", payload);
                Swal.fire("Berhasil", "Transaksi ditambahkan", "success");
            }
            setShowModal(false);
            setForm({ id_item: "", quantity: "", price: "" });
            fetchTransactions();
        } catch (err) {
            console.error("Gagal simpan transaksi:", err);
        }
    };

    // Fungsi untuk menghapus data transaksi
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/api/transactions/${id}`);
                    fetchTransactions();
                    Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
                } catch (err) {
                    console.error("Gagal hapus transaksi:", err);
                }
            }
        });
    };

    // Fungsi untuk membuka modal edit
    const openEditModal = (trx) => {
        setForm({
            id_item: trx.id_item,
            quantity: trx.quantity,
            price: trx.price,
        });
        setEditingId(trx.id_transaction);
        setIsEdit(true);
        setShowModal(true);
    };

    // Fungsi untuk membuka modal tambah
    const openAddModal = () => {
        setForm({ id_item: "", quantity: "", price: "" });
        setEditingId(null);
        setIsEdit(false);
        setShowModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="mb-4">
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Tambah Transaksi
                </button>
            </div>

            {/* Tabel */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="px-6 py-3">ID Transaction</th>
                        <th className="px-6 py-3">ID Item</th>
                        <th className="px-6 py-3">Quantity</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((trx) => (
                        <tr
                            key={trx.id_transaction}
                            className="bg-white border hover:bg-gray-50 text-gray-500"
                        >
                            <td className="px-6 py-4">{trx.id_transaction}</td>
                            <td className="px-6 py-4">{trx.id_item}</td>
                            <td className="px-6 py-4">{trx.quantity}</td>
                            <td className="px-6 py-4">{`Rp ${Number(trx.price).toLocaleString("id-ID")}`}</td>
                            <td className="px-6 py-4">{`Rp ${Number(trx.amount).toLocaleString("id-ID")}`}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button
                                    onClick={() => openEditModal(trx)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ubah
                                </button>
                                <button
                                    onClick={() => handleDelete(trx.id_transaction)}
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
                            {isEdit ? "Edit Transaksi" : "Tambah Transaksi"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <select
                                name="id_item"
                                value={form.id_item}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">-- Pilih Item --</option>
                                {items.map((item) => (
                                    <option key={item.id_item} value={item.id_item}>
                                        {item.nama_item}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                placeholder="Quantity"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <div>
                                <label className="block text-sm text-gray-600">
                                    Total Amount:{" "}
                                    <span className="font-semibold">{getAmount()}</span>
                                </label>
                            </div>
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

export default TableTransaction;
