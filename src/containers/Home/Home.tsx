import SideBar from "../../components/SideBar/SideBar.tsx";

const Home = () => {
    return (
        <div className="container d-flex gap-5">
            <SideBar />
            <div className="flex-grow-1">home</div>
        </div>
    );
};

export default Home;