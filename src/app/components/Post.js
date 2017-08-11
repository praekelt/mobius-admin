import React from 'react';
import {
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    DisabledInput,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
    Responsive,
    SimpleList
} from 'admin-on-rest';


export const PostList = (props) => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `${record.description} views`}
                    tertiaryText={record => record.service}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id"/>
                    <TextField source="name"/>
                    <TextField source="description"/>
                    <EditButton/>
                </Datagrid>
            }
        />
    </List>
);

const PostTitle = ({record}) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<DomainTitle/>} {...props}>
        <SimpleForm redirect="list">
            <DisabledInput source="id"/>
            <TextInput source="name"/>
            <LongTextInput source="description"/>
        </SimpleForm>
    </Edit>
);

export const DomainCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name"/>
            <LongTextInput source="description"/>
        </SimpleForm>
    </Create>
);
