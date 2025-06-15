import Layout from '../../layouts/MainLayout';
import TableCustomer from "./TableCustomer";

const Customer = () => {
    return (
        <Layout>
            <p className="text-2xl font-bold mb-4 text-center">Overview Customer</p>
            <TableCustomer />
        </Layout>
    )
}

export default Customer