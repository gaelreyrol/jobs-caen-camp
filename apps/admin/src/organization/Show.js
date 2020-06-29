import React from 'react';
import { ShowGuesser } from '@api-platform/admin';
import {
    TextField,
    RichTextField,
    UrlField,
    EmailField,
    DateField,
} from 'react-admin';

export const OrganizationShow = (props) => (
    <ShowGuesser {...props}>
        <TextField source="name" />
        <RichTextField source="description" />
        <UrlField source="image" />
        <UrlField source="url" />
        <EmailField source="email" />
        <DateField source="foundingDate" />
    </ShowGuesser>
);
