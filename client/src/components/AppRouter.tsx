import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

const AppRouter: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route path={route.path} element={route.element()} key={route.path} />)}
                <Route path="*" element={<Navigate to={RouteNames.DRAGON_LIST} replace />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.element()} key={route.path} />)}
                <Route path="*" element={<Navigate to={RouteNames.AUTH} replace />} />
            </Routes>
    );
};

export default AppRouter;