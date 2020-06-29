import React from 'react';
import { CreateGuesser } from '@api-platform/admin';
import { TextInput, DateInput } from 'react-admin';

export const OrganizationCreate = (props) => (
    <CreateGuesser {...props}>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="image" />
        <TextInput source="url" />
        <TextInput source="email" />
        <DateInput source="foundingDate" />
    </CreateGuesser>
);
