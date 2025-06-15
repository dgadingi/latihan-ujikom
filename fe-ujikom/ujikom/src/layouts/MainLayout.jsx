import Header from '../components/Header';

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="p-4">{children}</main>
        </>
    );
};

export default MainLayout;