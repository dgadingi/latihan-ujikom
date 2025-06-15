import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', form); // ganti sesuai URL backend-mu

            // Simpan data user ke localStorage
            localStorage.setItem('user', JSON.stringify(res.data));

            Swal.fire({
                icon: 'success',
                title: 'Login berhasil',
                text: `Selamat datang, ${res.data.nama_user}`
            });

            // Redirect ke halaman dashboard, contoh:
            window.location.href = '/';
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login gagal',
                text: err.response?.data?.error || 'Terjadi kesalahan saat login'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Selamat Datang</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={form.username}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
