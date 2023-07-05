import Footer from "../../components/common/footer";
import Navbar from "../../components/common/navbar";

import "./styles/home.page.sass";

export default function HomePage() {
    return (
        <div className="HomePage">
            <Navbar />
            <div className="HomePage_content">
                <h1>Home page</h1>
            </div>
            <Footer />
        </div>
    );
}
