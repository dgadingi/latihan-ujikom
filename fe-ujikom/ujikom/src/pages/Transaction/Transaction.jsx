import Layout from '../../layouts/MainLayout';
import TableTransaction from './TableTransaction';

const Transaction = () => {
    return (
        <Layout>
            {/* <HeroSection /> */}
            <p className="text-2xl font-bold mb-4 text-center">Overview Transaction</p>
            <TableTransaction />
        </Layout>
    );
};

export default Transaction;