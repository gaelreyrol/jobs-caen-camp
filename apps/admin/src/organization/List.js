import React from 'react';
import { ListGuesser } from '@api-platform/admin';
import { TextField, UrlField, EmailField, DateField } from 'react-admin';

export const OrganizationList = (props) => (
    <ListGuesser {...props}>
        <TextField source="name" />
        <UrlField source="url" />
        <EmailField source="email" />
        <DateField source="foundingDate" />
    </ListGuesser>
);
