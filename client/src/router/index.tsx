import { ReactNode } from "react";
import DragonList from "../pages/DragonList";
import DragonPage from "../pages/DragonPage";
import AuthPage from "../pages/AuthPage";
import Favourites from "../pages/Favourites";
import ProfilePage from "../pages/ProfilePage";

export interface IRoute {
    path: string
    element: () => ReactNode
}

export enum RouteNames {
    AUTH = '/auth',
    PROFILE = '/profile',
    DRAGON = '/dragon/:id',
    DRAGON_LIST = '/dragons',
    FAVOURITES = '/favourites'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.AUTH, element: () => <AuthPage /> }
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.PROFILE, element: () => <ProfilePage /> },
    { path: RouteNames.DRAGON, element: () => <DragonPage /> },
    { path: RouteNames.DRAGON_LIST, element: () => <DragonList /> },
    { path: RouteNames.FAVOURITES, element: () => <Favourites /> }
]