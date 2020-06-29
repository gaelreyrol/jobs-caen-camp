import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    HydraAdmin,
    hydraDataProvider as baseHydraDataProvider,
    fetchHydra as baseFetchHydra,
    ResourceGuesser,
} from '@api-platform/admin';
import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import authProvider from './authProvider';

import Organization from './organization';
import JobPosting from './job-posting';

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;

const fetchHeaders = {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
};

const fetchHydra = (url, options = {}) =>
    baseFetchHydra(url, {
        ...options,
        headers: new Headers(fetchHeaders),
    });

const apiDocumentationParser = (entrypoint) =>
    parseHydraDocumentation(entrypoint, {
        headers: new Headers(fetchHeaders),
    }).then(
        ({ api }) => ({ api }),
        (result) => {
            switch (result.status) {
                case 401:
                    return Promise.resolve({
                        api: result.api,
                        customRoutes: [
                            <Route
                                key={0}
                                path="/"
                                render={() => {
                                    return window.localStorage.getItem(
                                        'token'
                                    ) ? (
                                        window.location.reload()
                                    ) : (
                                        <Redirect to="/login" />
                                    );
                                }}
                            />,
                        ],
                    });

                default:
                    return Promise.reject(result);
            }
        }
    );

const dataProvider = baseHydraDataProvider(
    entrypoint,
    fetchHydra,
    apiDocumentationParser,
    true
);

const App = () => (
    <HydraAdmin
        dataProvider={dataProvider}
        authProvider={authProvider}
        entrypoint={process.env.REACT_APP_API_ENTRYPOINT}
    >
        <ResourceGuesser
            name="organizations"
            icon={Organization.icon}
            options={Organization.options}
            list={Organization.list}
            show={Organization.show}
            create={Organization.create}
            edit={Organization.edit}
        />
        <ResourceGuesser
            name="job-postings"
            icon={JobPosting.icon}
            options={JobPosting.options}
            list={JobPosting.list}
            show={JobPosting.show}
            create={JobPosting.create}
            edit={JobPosting.edit}
        />
    </HydraAdmin>
);

export default App;
