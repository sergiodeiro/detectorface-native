import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Camera, FaceDetectionResult } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export const DetectorFace = () => {
  const [step, setStep] = useState({
    number: 1,
    name: "Centralize o rosto no quadrado \n e olhe para a direita.",
  });

  const handleFacesDetected = async ({ faces }: FaceDetectionResult) => {
    if (faces.length) {
      const { yawAngle } = await faces[0];

      if (step.number === 1 && yawAngle > 30) {
        setStep({
          number: 2,
          name: "Olhe para esquerda",
        });
      }
      if (step.number === 2 && yawAngle < -30) {
        setStep({
          number: 3,
          name: "Reconhecimento concluido",
        });
      }
    }
  };

  return (
    <Fragment>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications:
            FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 600,
          tracking: true,
        }}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  camera: {
    marginTop: 40,
    width: 300,
    height: 350,
  },
});
