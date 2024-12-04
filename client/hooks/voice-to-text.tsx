/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

function useSpeechToText(options: any) {
  const ref = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const cloneWindow = window as any;
    if(!('webkitSpeechRecognition' in cloneWindow as any)) {
      console.log('Web speech api is not support!');
      return;
    }

    ref.current = new cloneWindow.webkitSpeechRecognition()
    const recognition = ref.current as any;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || 'en-US';
    recognition.continuos = options.continuos || false;

    if('webkitSpeechGrammarList' in cloneWindow) {
      const grammar = '#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;'
      const speechRecognitionList = new cloneWindow.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    };

    recognition.onresult = (event: any) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript
      }
      setTranscript(text);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    return () => {
      recognition.stop();
    }
  }, []);

  const startListening = () => {
    if (ref.current && !isListening) {
      ref.current.start();
      setIsListening(true);
    }
  }

  const stopListening = () => {
    if (ref.current && !isListening) {
      ref.current.stop();
      setIsListening(false);
    }
  }

  return {
    isListening,
    transcript,
    startListening,
    stopListening
  }
}

export default useSpeechToText;