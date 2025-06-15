import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TableCustomer = () => {
    const [customer, setCustomer] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        nama_customer: "",
        alamat: "",
        telp: "",
        fax: "",
        email: ""
    });

    useEffect(() => {
        getCustomers();
    }, []);

    // Fungsi untuk mengambil data customer
    const getCustomers = () => {
        axios.get("http://localhost:3000/api/customers")
            .then((res) => setCustomer(res.data))
            .catch((err) => console.log(err));
    };

    // Fungsi untuk mengubah data customer
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menyimpan data customer
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/customers/${editingId}`, form);
                setCustomer(customer.map(c =>
                    c.id === editingId ? { ...form, id: editingId } : c
                ));
                Swal.fire("Berhasil!", "Customer berhasil diubah", "success");
                location.reload();
            } else {
                const res = await axios.post("http://localhost:3000/api/customers", form);
                setCustomer([...customer, res.data]);
                Swal.fire("Berhasil!", "Customer berhasil ditambahkan", "success");
                location.reload();
            }
            setShowModal(false);
            setForm({ nama_customer: "", alamat: "", telp: "", fax: "", email: "" });
        } catch (err) {
            console.error(err);
        }
    };

    const openModal = () => {
        setForm({ nama_customer: "", alamat: "", telp: "", fax: "", email: "" });
        setIsEdit(false);
        setEditingId(null);
        setShowModal(true);
    };

    // fungsi untuk membuka modal edit
    const openEditModal = (data) => {
        setForm({
            nama_customer: data.nama_customer,
            alamat: data.alamat,
            telp: data.telp,
            fax: data.fax,
            email: data.email
        });
        setIsEdit(true);
        setEditingId(data.id_customer);
        setShowModal(true);
    };

    // fungsi untuk menghapus data customer
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
                        await axios.delete(`http://localhost:3000/api/customers/${id}`);
                        setCustomer(customer.filter((c) => c.id_customer !== id));
                        Swal.fire("Berhasil!", "Customer berhasil dihapus", "success");
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
                    <span className="font-bold">+</span> Tambah Customer
                </button>
            </div>

            {/* Tabel */}
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nama</th>
                        <th className="px-6 py-3">Alamat</th>
                        <th className="px-6 py-3">Telp</th>
                        <th className="px-6 py-3">Fax Email</th>
                        <th className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.map((item) => (
                        <tr key={item.id_customer} className="bg-white border text-gray-500 hover:bg-gray-50">
                            <td className="px-6 py-4">{item.id_customer}</td>
                            <td className="px-6 py-4">{item.nama_customer}</td>
                            <td className="px-6 py-4">{item.alamat}</td>
                            <td className="px-6 py-4">{item.telp}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button onClick={() => openEditModal(item)} className="text-blue-600 hover:underline">Ubah</button>
                                <button onClick={() => handleDelete(item.id_customer)} className="text-red-600 hover:underline">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Tambah */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Tambah Customer</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="text" name="nama_customer" placeholder="Nama Customer"
                                value={form.nama_customer} onChange={handleChange}
                                className="w-full px-3 py-2 border rounded" required />
                            <input type="text" name="alamat" placeholder="Alamat"
                                value={form.alamat} onChange={handleChange}
                                className="w-full px-3 py-2 border rounded" required />
                            <input type="text" name="telp" placeholder="Telepon"
                                value={form.telp} onChange={handleChange}
                                className="w-full px-3 py-2 border rounded" required />
                            <input type="text" name="fax" placeholder="Fax"
                                value={form.fax} onChange={handleChange}
                                className="w-full px-3 py-2 border rounded" />
                            <input type="email" name="email" placeholder="Email"
                                value={form.email} onChange={handleChange}
                                className="w-full px-3 py-2 border rounded" required />
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

export default TableCustomer;
