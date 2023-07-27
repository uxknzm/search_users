
import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/ProfilePage.jsx/ProfilePage";
import { HOME, PROFILE } from "./CONST";

export const publicRoutes = [
    {
        path: HOME,
        Component: HomePage
    },
    {
        path: PROFILE,
        Component: ProfilePage
    }
]

export const privateRoutes = []