import { Link } from "react-router-dom";
import Footer from "../../components/common/footer";
import Navbar from "../../components/common/navbar";

import "./styles/404.page.sass";

export default function PageNotFound() {
    return (
        <>
            <Navbar />
            <div className="PageNotFound">
                <h1>Page not found</h1>
                <div>
                    <span>Link: </span>
                    <Link className="PageNotFound_Link" to="/">
                        Home page
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
