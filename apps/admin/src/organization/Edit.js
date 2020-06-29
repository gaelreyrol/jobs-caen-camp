import React from 'react';
import { EditGuesser } from '@api-platform/admin';
import { TextInput, DateInput } from 'react-admin';

export const OrganizationEdit = (props) => (
    <EditGuesser {...props}>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="image" />
        <TextInput source="url" />
        <TextInput source="email" />
        <DateInput source="foundingDate" />
    </EditGuesser>
);
