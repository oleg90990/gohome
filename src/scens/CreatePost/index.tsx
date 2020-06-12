import React, { useEffect } from 'react';
import { StyleSheet } from "react-native";
import { ICreatePostProps } from "./types";
import { Text, Content } from 'native-base';
import CreatePostForm from '../../components/forms/CreatePost';

const CreatePost: React.FC<ICreatePostProps> = props => {
    return (
      <Content padder>
        <CreatePostForm />
      </Content>
    );
};

// styles
const styles = StyleSheet.create({
});

export default CreatePost;