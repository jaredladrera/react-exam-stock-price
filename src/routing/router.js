import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Loading from '../components/suspense/Loading';
import Home from '../pages/home/Home';

const SearchMultiple = lazy(() => import('../components/searchWithMultiple/SearchMultiple'));
const SearchByApi = lazy(() => import('../components/searchByApi/SearchByApi'));
const SearchByAll = lazy(() => import('../components/searchByAll/SearchByAll'));
const DefaultSearch = lazy(() => import('../components/defaultSearch/DefaultSearch'));


// router for handle path of every search feature i user lazy loading for loading only component i need for performance purposes
export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home />}>
        <Route
            path="/generic"
            element={
                <Suspense fallback={<Loading />}>
                    <DefaultSearch />
                </Suspense>
            }
        />
        <Route
            path="/multiple"
            element={
                <Suspense fallback={<Loading />}>
                    <SearchMultiple />
                </Suspense>
            }
        />
        <Route
            path="/fetchAll"
            element={
                <Suspense fallback={<Loading />}>
                    <SearchByAll />
                </Suspense>
            }
        />
        <Route
            path="/single-api"
            element={
                <Suspense fallback={<Loading />}>
                    <SearchByApi />
                </Suspense>
            }
        />
    </Route>
));
