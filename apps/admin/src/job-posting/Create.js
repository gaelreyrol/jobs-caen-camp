import React from 'react';
import { CreateGuesser } from '@api-platform/admin';
import { TextInput, DateInput } from 'react-admin';

export const JobPostingCreate = (props) => (
    <CreateGuesser {...props}>
        <TextInput source="title" />
        <TextInput source="url" />
        <TextInput source="employerOverview" />
        <TextInput source="employmentType" />
        <TextInput source="experienceRequirement" />
        <TextInput source="skill" />
        <DateInput source="datePosted" />
        <DateInput source="jobStartDate" />
        <DateInput source="validThrough" />
    </CreateGuesser>
);
