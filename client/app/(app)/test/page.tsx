/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import useSpeechToText from "@/hooks/voice-to-text";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function Test() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [textInput, setTextInput] = useState<any>("");
  const { isListening, startListening, stopListening, transcript } =
    useSpeechToText({ continues: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setTextInput(
      (prev: any) => prev + (transcript.length ? ` ${transcript}` : "")
    );
    stopListening();
  };

  return (
    <div>
      <Button onClick={() => startStopListening()}>
        {isListening ? "Stop" : "Speak"}
      </Button>
      <TextArea
        className="text-black p-3"
        disabled={isListening}
        value={
          isListening
            ? textInput +
              (transcript.length
                ? (textInput.length ? " " : "") + transcript
                : "")
            : textInput
        }
      />
    </div>
  );
}

export default Test;
