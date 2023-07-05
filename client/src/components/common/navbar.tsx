import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../contexts/themeContext/themeContext";
import { useAppSelector } from "../../hooks/hooks";
import { privatePages, publicPages } from "../../utils/consts/pages";

import "./styles/navbar.sass";

export default function Navbar(): JSX.Element {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    return (
        <div className="Navbar">
            <div className="Navbar_nav">
                <div className="Navbar_logo">
                    <img
                        src="https://www.yiiframework.com/image/design/logo/yii3_sign.png"
                        alt="img"
                    />
                </div>
                <div className="Navbar_divider"></div>
                {isAuth
                    ? privatePages.map((page) => (
                          <NavLink key={page.id} to={page.path}>
                              {page.name}
                          </NavLink>
                      ))
                    : publicPages.map((page) => (
                          <NavLink key={page.id} to={page.path}>
                              {page.name}
                          </NavLink>
                      ))}
            </div>
            <div className="Navbar_control">
                <ThemeContext.Consumer>
                    {(themeContext) => (
                        <svg
                            className="Navbar_themeBtn"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={themeContext.switchTheme}
                        >
                            <path
                                d="M3 12H5M5.00006 19L7.00006 17M12 19V21M17 17L19 19M5 5L7 7M19 12H21M16.9999 7L18.9999 5M12 3V5M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </ThemeContext.Consumer>
                <div className="Navbar_user">
                    <svg
                        className="Navbar_avatar"
                        id="_x32_"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path d="M159.131,169.721c5.635,58.338,43.367,96.867,96.871,96.867c53.502,0,91.23-38.53,96.867-96.867l7.988-63.029 C365.812,44.768,315.281,0,256.002,0c-59.281,0-109.812,44.768-104.86,106.692L159.131,169.721z"></path>
                                <path d="M463.213,422.569l-3.824-24.35c-3.203-20.417-16.035-38.042-34.475-47.361l-80.473-40.693 c-2.519-1.274-4.57-3.194-6.289-5.338c-23.297,24.632-51.6,39.12-82.15,39.12c-30.549,0-58.856-14.488-82.152-39.12 c-1.719,2.144-3.77,4.064-6.289,5.338l-80.472,40.693c-18.442,9.319-31.272,26.944-34.475,47.361l-3.826,24.35 c-1.363,8.692,0.436,21.448,8.222,27.825C67.42,458.907,105.875,512,256.002,512c150.125,0,188.578-53.093,198.988-61.606 C462.779,444.017,464.576,431.261,463.213,422.569z"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
