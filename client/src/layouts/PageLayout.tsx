import { Outlet } from "react-router-dom";

import CheckToken from "../components/functional/checkToken";
import { ThemeContext } from "../contexts/themeContext/themeContext";

import "./styles/layout.sass";

export default function PageLayout() {
    return (
        <ThemeContext.Consumer>
            {(themeContext) => (
                <div id={themeContext.theme} className="PageLayout">
                    <div className="PageLayout_main">
                        <CheckToken isNavbar={true} isFooter={true}>
                            <Outlet />
                        </CheckToken>
                    </div>
                </div>
            )}
        </ThemeContext.Consumer>
    );
}