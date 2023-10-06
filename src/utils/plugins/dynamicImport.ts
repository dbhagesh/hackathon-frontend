/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from "react";
export const chunkLoadConst: {
  timeout: number;
  attempts: number;
} = {
  timeout: 1500,
  attempts: 3,
};
export function componentLoader(lazyComponent: any, attemptsLeft: number): any {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error: any) => {
        // let us retry after 1500 ms
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }
          componentLoader(lazyComponent, attemptsLeft - 1).then(
            resolve,
            reject
          );
        }, chunkLoadConst.timeout);
      });
  });
}

export function lazyComponentLoader(lazyComponent: any, attemptsLeft?: number) {
  return lazy(() =>
    componentLoader(lazyComponent, attemptsLeft ?? chunkLoadConst.attempts)
  );
}
