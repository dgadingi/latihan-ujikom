import Layout from '../../layouts/MainLayout';
import TableSales from "./TableSales";

const Sales = () => {
    return (
        <Layout>
            {/* <HeroSection /> */}
            <p className="text-2xl font-bold mb-4 text-center">Overview Sales</p>
            <TableSales />
        </Layout>
    )
}

export default Sales