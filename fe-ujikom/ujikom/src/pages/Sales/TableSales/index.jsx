import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TableSales = () => {
    const [sales, setSales] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        tgl_sales: "",
        id_customer: "",
        do_number: "",
        status: "",
    });

    useEffect(() => {
        getSales();
    }, []);

    // Fungsi untuk mengambil data sales
    const getSales = () => {
        axios.get("http://localhost:3000/api/sales")
            .then((res) => setSales(res.data))
            .catch((err) => console.log(err));
    };

    // Fungsi untuk mengubah data sales
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menyimpan data sales
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/sales/${editingId}`, form, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setSales(sales.map(c =>
                    c.id === editingId ? { ...form, id_sales: editingId } : c
                ));
                Swal.fire("Berhasil!", "Sales berhasil diubah", "success");
                location.reload();
            } else {
                const res = await axios.post("http://localhost:3000/api/sales", form);
                setSales([...sales, res.data]);
                Swal.fire("Berhasil!", "Sales berhasil ditambahkan", "success");
                location.reload();
            }
            setShowModal(false);
            setForm({
                tgl_sales: "",
                id_customer: "",
                do_number: "",
                status: "",
            });
        } catch (err) {
            console.error(err);
        }
    };

    // Fungsi untuk membuka modal
    const openModal = () => {
        setForm({
            tgl_sales: "",
            id_customer: "",
            do_number: "",
            status: "",
        });
        setIsEdit(false);
        setEditingId(null);
        setShowModal(true);
    };

    // Fungsi untuk membuka modal edit
    const openEditModal = (data) => {
        setForm({
            tgl_sales: data.tgl_sales,
            id_customer: data.id_customer,
            do_number: data.do_number,
            status: data.status
        });
        setIsEdit(true);
        setEditingId(data.id_sales);
        setShowModal(true);
    };

    // Fungsi untuk menghapus data sales
    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Apakah anda yakin?",
                text: "Anda tidak dapat mengembalikan data ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus!",
                cancelButtonText: "Batal"
            })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.delete(`http://localhost:3000/api/sales/${id}`);
                        setSales(sales.filter((c) => c.id_sales !== id));
                        Swal.fire("Berhasil!", "Sales berhasil dihapus", "success");
                        location.reload();
                    }
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            {/* Button Tambah */}
            <div className="mb-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    <span className="font-bold">+</span> Tambah Sales
                </button>
            </div>

            {/* Tabel */}
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="px-6 py-3">ID Sales</th>
                        <th className="px-6 py-3">Tgl Sales</th>
                        <th className="px-6 py-3">ID Customer</th>
                        <th className="px-6 py-3">DO Number</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((item) => (
                        <tr key={item.id_sales} className="bg-white border text-gray-500 hover:bg-gray-50">
                            <td className="px-6 py-4">{item.id_sales}</td>
                            <td className="px-6 py-4">{new Date(item.tgl_sales).toISOString().split('T')[0]}</td>
                            <td className="px-6 py-4">{item.id_customer}</td>
                            <td className="px-6 py-4">{item.do_number}</td>
                            <td className="px-6 py-4">{item.status}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button onClick={() => openEditModal(item)} className="text-blue-600 hover:underline">Ubah</button>
                                <button onClick={() => handleDelete(item.id_sales)} className="text-red-600 hover:underline">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Tambah */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Tambah Sales</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="text" name="tgl_sales" value={form.tgl_sales ? form.tgl_sales.split("T")[0] : ""} onChange={handleChange} placeholder="Tgl Sales" className="w-full p-2 border rounded" required />
                            <input type="text" name="id_customer" value={form.id_customer} onChange={handleChange} placeholder="ID Customer" className="w-full p-2 border rounded" required />
                            <input type="text" name="do_number" value={form.do_number} onChange={handleChange} placeholder="DO Number" className="w-full p-2 border rounded" required />
                            <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Status" className="w-full p-2 border rounded" required />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
                                <button type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableSales;