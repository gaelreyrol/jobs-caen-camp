import React from 'react';
import { ListGuesser } from '@api-platform/admin';
import { TextField, UrlField, DateField } from 'react-admin';

export const JobPostingList = (props) => (
    <ListGuesser {...props}>
        <TextField source="title" />
        <UrlField source="url" />
        <TextField source="employerOverview" />
        <TextField source="employmentType" />
        <TextField source="experienceRequirement" />
        <TextField source="skill" />
        <DateField source="datePosted" />
        <DateField source="jobStartDate" />
        <DateField source="validThrough" />
    </ListGuesser>
);
