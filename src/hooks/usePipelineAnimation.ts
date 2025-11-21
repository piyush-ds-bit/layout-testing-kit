import { useState, useCallback, useEffect, useRef } from "react";
import { soundEffects } from "@/utils/soundEffects";

export type AnimationSpeed = 0.5 | 1 | 2 | 4;

export type PipelineStepStatus = "idle" | "receiving" | "processing" | "complete";

export interface PipelineMetrics {
  dataProcessed: number;
  timeElapsed: number;
  successRate: number;
  currentStep: number;
}

export interface UsePipelineAnimationReturn {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  progress: number;
  speed: AnimationSpeed;
  loop: boolean;
  metrics: PipelineMetrics;
  stepStatuses: PipelineStepStatus[];
  isTransitioning: boolean;
  soundEnabled: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSpeed: (speed: AnimationSpeed) => void;
  toggleLoop: () => void;
  toggleSound: () => void;
  reset: () => void;
}

const TOTAL_STEPS = 9;
const BASE_STEP_DURATION = 3000; // 3 seconds per step at 1x speed

export const usePipelineAnimation = (): UsePipelineAnimationReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeedState] = useState<AnimationSpeed>(1);
  const [loop, setLoop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stepStatuses, setStepStatuses] = useState<PipelineStepStatus[]>(
    Array(TOTAL_STEPS).fill("idle")
  );
  const [metrics, setMetrics] = useState<PipelineMetrics>({
    dataProcessed: 0,
    timeElapsed: 0,
    successRate: 100,
    currentStep: 0,
  });

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  // Sync sound effects with state
  useEffect(() => {
    soundEffects.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const updateStepStatus = useCallback((step: number, status: PipelineStepStatus) => {
    setStepStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[step] = status;
      return newStatuses;
    });
  }, []);

  const processStep = useCallback(
    async (step: number) => {
      // Receiving state
      updateStepStatus(step, "receiving");
      soundEffects.playReceive();
      await new Promise((resolve) => setTimeout(resolve, 400 / speed));

      // Processing state
      updateStepStatus(step, "processing");
      soundEffects.playProcess();
      await new Promise((resolve) => setTimeout(resolve, (BASE_STEP_DURATION * 0.6) / speed));

      // Complete state
      updateStepStatus(step, "complete");
      soundEffects.playComplete();
      
      // Update metrics
      setMetrics((prev) => ({
        ...prev,
        dataProcessed: prev.dataProcessed + Math.floor(Math.random() * 50) + 50,
        currentStep: step,
      }));

      await new Promise((resolve) => setTimeout(resolve, 400 / speed));

      // Transition to next step (data flowing)
      if (step < TOTAL_STEPS - 1) {
        setIsTransitioning(true);
        soundEffects.playFlow();
        await new Promise((resolve) => setTimeout(resolve, 800 / speed));
        setIsTransitioning(false);
        updateStepStatus(step, "idle");
      }
    },
    [speed, updateStepStatus]
  );

  const animate = useCallback(async () => {
    if (!isPlaying || isPaused) return;

    for (let step = 0; step < TOTAL_STEPS; step++) {
      if (!isPlaying || isPaused) break;

      setCurrentStep(step);
      await processStep(step);
      setProgress(((step + 1) / TOTAL_STEPS) * 100);
    }

    // Animation complete
    if (loop && isPlaying) {
      soundEffects.playSuccess();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      setTimeout(() => animate(), 500);
    } else {
      soundEffects.playSuccess();
      setIsPlaying(false);
      setProgress(100);
    }
  }, [isPlaying, isPaused, loop, processStep]);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      startTimeRef.current = Date.now();
      animate();
    }
  }, [isPlaying, isPaused, animate]);

  // Update elapsed time
  useEffect(() => {
    if (isPlaying && !isPaused) {
      const interval = setInterval(() => {
        setMetrics((prev) => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - startTimeRef.current) / 1000),
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isPaused]);

  const play = useCallback(() => {
    if (progress === 100) {
      reset();
    }
    setIsPlaying(true);
    setIsPaused(false);
  }, [progress]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    reset();
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setProgress(0);
    setStepStatuses(Array(TOTAL_STEPS).fill("idle"));
    setMetrics({
      dataProcessed: 0,
      timeElapsed: 0,
      successRate: 100,
      currentStep: 0,
    });
    startTimeRef.current = Date.now();
  }, []);

  const setSpeed = useCallback((newSpeed: AnimationSpeed) => {
    setSpeedState(newSpeed);
  }, []);

  const toggleLoop = useCallback(() => {
    setLoop((prev) => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    isPlaying,
    isPaused,
    currentStep,
    progress,
    speed,
    loop,
    metrics,
    stepStatuses,
    isTransitioning,
    soundEnabled,
    play,
    pause,
    stop,
    setSpeed,
    toggleLoop,
    toggleSound,
    reset,
  };
};
