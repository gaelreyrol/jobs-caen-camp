import React from 'react';
import { ShowGuesser } from '@api-platform/admin';
import { TextField, UrlField, DateField } from 'react-admin';

export const JobPostingShow = (props) => (
    <ShowGuesser {...props}>
        <TextField source="title" />
        <UrlField source="url" />
        <TextField source="employerOverview" />
        <TextField source="employmentType" />
        <TextField source="experienceRequirement" />
        <TextField source="skill" />
        <DateField source="datePosted" />
        <DateField source="jobStartDate" />
        <DateField source="validThrough" />
    </ShowGuesser>
);
