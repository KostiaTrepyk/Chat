import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { privatePages, publicPages } from "./utils/consts/pages";

import PageLayout from "./layouts/PageLayout";
import PageNotFound from "./pages/404.page/404.page";

function AppRouter() {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    return (
        <Routes>
            <Route element={<PageLayout />}>
                {isAuth
                    ? privatePages.map((page) => (
                          <Route key={page.id} path={page.path} element={page.element} />
                      ))
                    : publicPages.map((page) => (
                          <Route key={page.id} path={page.path} element={page.element} />
                      ))}
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
