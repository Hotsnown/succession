import React from 'react';
import { SearchBar } from './SearchBar';

export function DocumentationLanding({ rules }) {
    return (<>
        <h1>Documentation</h1>
        <p>Explorez toutes les règles de la documentation</p>
        <SearchBar rules={rules} showDefaultList={true} />
    </>);
}
