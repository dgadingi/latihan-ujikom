import { useNavigate, Link } from "react-router-dom";

const Header = () => {

    // const Navigate = Navigate;
    const navigate = useNavigate(); // gunakan hook ini

    // Fungsi untuk logout
    const handleLogout = () => {
        // Hapus data user dari localStorage
        localStorage.removeItem('user');

        // Redirect ke halaman login
        navigate('/login');
    }

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                <Link to={'/'}>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Customer</a>
                                </Link>
                                <Link to={'/sales'}>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Sales</a>
                                </Link>
                                <Link to={'/Item'}>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Item</a>
                                </Link>
                                <Link to={'/transaction'}>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Transaction</a>
                                </Link>
                                <Link to={'/petugas'}>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Petugas</a>
                                </Link>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header