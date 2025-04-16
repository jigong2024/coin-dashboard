// src/hooks/useThrottledRequest.ts

import { useRef, useCallback } from "react";
import axios, { AxiosError } from "axios";

/**
 * API 요청에 스로틀링을 적용하는 커스텀 훅
 * @param requestInterval 요청 간격 (밀리초)
 * @param retryDelay 429 에러 발생 시 재시도 전 대기 시간 (밀리초)
 */
export function useThrottledRequest(requestInterval = 2000, retryDelay = 5000) {
  // 마지막 요청 시간을 저장할 ref
  const lastRequestTimeRef = useRef<number>(0);

  /**
   * 스로틀링을 적용한 요청 함수
   * @param requestFn API 요청 함수
   * @param args 요청 함수에 전달할 인자들
   */
  const throttledRequest = useCallback(
    async <T, Args extends any[]>(
      requestFn: (...args: Args) => Promise<T>,
      ...args: Args
    ): Promise<T> => {
      // 요청 간격 조절
      const now = Date.now();
      const timeElapsed = now - lastRequestTimeRef.current;

      if (timeElapsed < requestInterval) {
        // 마지막 요청으로부터 필요한 시간이 지나지 않았으면 대기
        await new Promise((resolve) =>
          setTimeout(resolve, requestInterval - timeElapsed)
        );
      }

      // 요청 시간 업데이트
      lastRequestTimeRef.current = Date.now();

      try {
        // 실제 API 요청 실행
        return await requestFn(...args);
      } catch (error) {
        // 429 에러 (너무 많은 요청) 처리
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          console.warn(
            `Rate limit reached, waiting for ${
              retryDelay / 1000
            } seconds before retry...`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return throttledRequest(requestFn, ...args); // 재귀적 재시도
        }

        // 다른 에러는 그대로 throw
        throw error;
      }
    },
    [requestInterval, retryDelay]
  );

  return { throttledRequest };
}
