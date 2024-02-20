import React, { useState, useEffect, Fragment } from 'react';
import { Text, Flex, Center, Stack, Button, Image, Box } from '@chakra-ui/react';
import MonacoEditor from 'react-monaco-editor';
import logo from '../Images/logo.png';
import { Card, CardBody } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import SpeechToText from './SpeechToText';
import Dashboard from './Dashboard';

function Question() {
  const { problemId } = useParams(); // Extract the dynamic parameter from the URL

  const [text, setText] = useState(null);
  const [editorContent, setEditorContent] = useState(''); // State to store the content of the editor

  // Event handler to capture changes in the editor content
  const handleEditorChange = (newValue, event) => {
    setEditorContent(newValue); // Update the state with the new editor content
  };

  useEffect(() => {
    const url = 'http://127.0.0.1:8080/' + problemId;
    fetch(url)
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        setText(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [problemId]);

  return (
    <Fragment>

      <Box h={'100vh'} bg="black">
        <Dashboard />
        
        <Flex width="100vw" height="90vh" alignContent="center" justifyContent="center">
          <Center>
          {text && (
    <Card bg="#1a1a1a" color="white">
      <CardBody whiteSpace="pre-wrap" overflowY="auto" maxHeight="80vh">
        <Text fontSize="xl" bg="#1a1a1a" color="white" p={2} mb={2} position="sticky" top={0} marginTop={0}>
          {text.title_slug}
          &nbsp;&nbsp;
          <SpeechToText title={text.title_slug} question={text.result} user_code={editorContent} />
        </Text>
        <Text fontSize="md" dangerouslySetInnerHTML={{ __html: text.result }} />
      </CardBody>
    </Card>
  )}
            <MonacoEditor
              width="50vw"
              height="80vh"
              language="python"
              theme="vs-dark"
              defaultValue="lol"
              value={text?.snippet_code || ''}
              options={{ fontSize: 14 }} 
              onChange={handleEditorChange}// Adjust the font size as needed
            />
          </Center>
        </Flex>
      </Box>
    </Fragment>
  );
}

export default Question;
