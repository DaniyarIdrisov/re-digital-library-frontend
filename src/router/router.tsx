import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import PublicationsCatalogPage from "../pages/Publication/PublicationsCatalogPage.tsx";
import PublicationPage from "../pages/Publication/PublicationPage.tsx";
import Root from "../pages/Root.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import SignInPage from "../pages/SignInPage.tsx";
import CreateAuthorPage from "../pages/Author/CreateAuthorPage.tsx";
import CreatePublicationPage from "../pages/Publication/CreatePublicationPage.tsx";
import AuthorsPage from "../pages/Author/AuthorsPage.tsx";
import AuthorPage from "../pages/Author/AuthorPage.tsx";
import AccountPage from "../pages/AccountPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
                index: true,
            },
            {
                path: '/account/:accountId',
                element: <AccountPage/>
            },
            {
                path: "/publications",
                element: <PublicationsCatalogPage/>,
            },
            {
                path: "/publications/:publicationId",
                element: <PublicationPage/>,
            },
            {
                path: '/publications/create',
                element: <CreatePublicationPage/>
            },
            {
                path: "/sign-up",
                element: <SignUpPage/>
            },
            {
                path: '/sign-in',
                element: <SignInPage/>
            },
            {
                path: '/authors/create',
                element: <CreateAuthorPage/>
            },
            {
                path: '/authors',
                element: <AuthorsPage/>
            },
            {
                path: '/authors/:authorId',
                element: <AuthorPage/>
            }
        ],
    },
]);

export default router;