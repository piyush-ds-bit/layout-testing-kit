import { useState, useCallback, useRef } from 'react';

interface SwipeState {
  isSwipingFromLeft: boolean;
  swipeProgress: number;
}

interface UseSwipeDetectionProps {
  onSwipeFromLeftComplete: () => void;
  onSwipeRightToLeftComplete?: () => void;
  threshold?: number;
}

export const useSwipeDetection = ({
  onSwipeFromLeftComplete,
  onSwipeRightToLeftComplete,
  threshold = 100
}: UseSwipeDetectionProps) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwipingFromLeft: false,
    swipeProgress: 0
  });

  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isTracking = useRef<boolean>(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    isTracking.current = true;

    // Only start tracking if the touch starts from the left edge (within 50px)
    if (startX.current <= 50) {
      setSwipeState(prev => ({ ...prev, isSwipingFromLeft: true }));
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTracking.current) return;

    const touch = e.touches[0];
    currentX.current = touch.clientX;
    const deltaX = currentX.current - startX.current;
    const deltaY = Math.abs(touch.clientY - startY.current);

    // Only track horizontal swipes (not vertical scrolling)
    if (deltaY > 50) {
      isTracking.current = false;
      setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
      return;
    }

    // Swipe from left to right
    if (swipeState.isSwipingFromLeft && deltaX > 0) {
      const progress = Math.min(deltaX / threshold, 1);
      setSwipeState(prev => ({ ...prev, swipeProgress: progress }));
      
      if (progress >= 1) {
        onSwipeFromLeftComplete();
        setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
        isTracking.current = false;
      }
    }
    // Swipe from right to left (to close)
    else if (!swipeState.isSwipingFromLeft && deltaX < -50 && onSwipeRightToLeftComplete) {
      onSwipeRightToLeftComplete();
      setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
      isTracking.current = false;
    }
  }, [swipeState.isSwipingFromLeft, threshold, onSwipeFromLeftComplete, onSwipeRightToLeftComplete]);

  const handleTouchEnd = useCallback(() => {
    isTracking.current = false;
    setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    isTracking.current = true;

    // Only start tracking if the mouse starts from the left edge
    if (startX.current <= 50) {
      setSwipeState(prev => ({ ...prev, isSwipingFromLeft: true }));
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isTracking.current) return;

    currentX.current = e.clientX;
    const deltaX = currentX.current - startX.current;
    const deltaY = Math.abs(e.clientY - startY.current);

    // Only track horizontal movements
    if (deltaY > 50) {
      isTracking.current = false;
      setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
      return;
    }

    // Drag from left to right
    if (swipeState.isSwipingFromLeft && deltaX > 0) {
      const progress = Math.min(deltaX / threshold, 1);
      setSwipeState(prev => ({ ...prev, swipeProgress: progress }));
      
      if (progress >= 1) {
        onSwipeFromLeftComplete();
        setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
        isTracking.current = false;
      }
    }
  }, [swipeState.isSwipingFromLeft, threshold, onSwipeFromLeftComplete]);

  const handleMouseUp = useCallback(() => {
    isTracking.current = false;
    setSwipeState({ isSwipingFromLeft: false, swipeProgress: 0 });
  }, []);

  return {
    swipeState,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp
    }
  };
};