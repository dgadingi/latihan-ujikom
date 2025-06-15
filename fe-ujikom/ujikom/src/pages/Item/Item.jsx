import Layout from '../../layouts/MainLayout';
import TableItem from './TableItem';

const Item = () => {
    return (
        <Layout>
            {/* <HeroSection /> */}
            <p className="text-2xl font-bold mb-4 text-center">Overview Item</p>
            <TableItem />
        </Layout>
    );
};

export default Item;