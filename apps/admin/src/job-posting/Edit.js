import React from 'react';
import { EditGuesser } from '@api-platform/admin';
import { TextInput, DateInput } from 'react-admin';

export const JobPostingEdit = (props) => (
    <EditGuesser {...props}>
        <TextInput source="title" />
        <TextInput source="url" />
        <TextInput source="employerOverview" />
        <TextInput source="employmentType" />
        <TextInput source="experienceRequirement" />
        <TextInput source="skill" />
        <DateInput source="datePosted" />
        <DateInput source="jobStartDate" />
        <DateInput source="validThrough" />
    </EditGuesser>
);
