import React, { useState, useEffect } from 'react';

import { Text, Flex, Center, Stack, Button, Image, Box, Tooltip, Code} from '@chakra-ui/react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';


function playAudio() {
  // Get the audio element
  var audioPlayer = document.getElementById('audioPlayer');

  // Set the source of the audio file (replace 'your_audio.mp3' with the actual filename)
  var audioSource = document.getElementById('audioSource');
  audioSource.src = 'https://tarunthatavarthi.pythonanywhere.com/static/output.mp3?v=' + new Date().getTime(); // Adjust the path based on your project structure

  // Load and play the audio
  audioPlayer.load();
  audioPlayer.play();
}


function SpeechToText({ title, question, user_code }) {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [lastChat, setChat] = useState("");


  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start();
        
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('What they said:', note);
        var dataToSend = {
          

          key1: user_code,
          key2: note+"",
          key3: question,
          key4: title,
        };
        fetch('https://tarunthatavarthi.pythonanywhere.com/fetchOpenAI', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Response from API:', data);
            setChat(data[""])
            var send_response = {
              key1: data,
            };

            fetch('https://tarunthatavarthi.pythonanywhere.com/fetchAudio', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(send_response),
            })
              .then((audioResponse) => audioResponse.json())
              .then((audio_data) => {
                //console.log('Audio API Audiourl:', audio_data.audio_url);
                playAudio()
                //setAudioUrl('http://127.0.0.1:8080' +audio_data.audio_url ); // Update the audioUrl state with the new URL
              })
              .catch((audioError) =>
                console.error('Audio API Error:', audioError)
              );
          });
      };
    }
    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  return (
    <>
      
      <Button
        _hover={{ bg: isListening ? 'red.300' : 'blue.300', textColor: 'white' }}
        my="10px"
        mx="5px"
        colorScheme={isListening ? 'red' : 'blue'}
        variant="solid"
        onClick={() => setIsListening(prevState => !prevState)}
        >
        {isListening ? 'Stop Chatting' : 'Start Chatting'}
      </Button>
            &nbsp;&nbsp; {/* Non-breaking spaces for extra spacing */}

            <Tooltip
      label={
        <>
        
      <p style={{ margin: '0', marginBottom: '8px' }}>
      User: {note}
    </p>
    <p style={{ margin: '0', marginBottom: '8px' }}>
      Chatty: {lastChat}
    </p>
    </>
    }
      aria-label={`User: ${note} Chatty: ${lastChat}`}
    >
      <Button
        _hover={{ bg: 'blue.300', textColor: 'white' }}
        my="10px"
        mx="5px"
        colorScheme="blue"
        variant="solid"
      >
        Last Chat
      </Button>
    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip
      label={
        <div style={{ maxWidth: '300px', textAlign: 'left' }}>
          <p style={{ margin: '0', marginBottom: '8px' }}>
            Talk to Chatty like a real interviewer.
          </p>
          <p style={{ margin: '0', marginBottom: '8px' }}>
            When you are ready to speak, click <Code>Start Chatting</Code>
          </p>
          <p style={{ margin: '0', marginBottom: '8px' }}>
            When the button is red, Chatty is listening. Click the button again when you are done talking.
          </p>
          <p style={{ margin: '0' }}>
            Feel free to start by asking clarifying questions or explaining your thought process!
          </p>
        </div>
      }
      aria-label="Talk to Chatty like a real interviewer. When you are ready to speak, click Start Chatting. When the button is red, Chatty is listening. Click the button again when you are done talking. Feel free to start by asking clarifying questions or explaining your thought process!"
    >
      <Button
        _hover={{ bg: 'blue.300', textColor: 'white' }}
        my="10px"
        mx="5px"
        colorScheme="blue"
        variant="solid"
      >
        How to use Chatty
      </Button>
    </Tooltip>




          {/* Conditionally render the audio element when audioUrl is available */}
          <audio style={{ display: 'none' }} id="audioPlayer" controls>
        <source id="audioSource" src="" type="audio/mp3"></source>
        Your browser does not support the audio element.
    </audio>

    </>
  );
}

export default SpeechToText;
