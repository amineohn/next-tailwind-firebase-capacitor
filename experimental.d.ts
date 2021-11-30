import React = require("react");
import ReactDOM = require("./next");

export {};

declare module "." {
  function unstable_flushControlled(callback: () => void): void;

  // enableSelectiveHydration feature

  /**
   * @see https://github.com/facebook/react/commit/3a2b5f148d450c69aab67f055fc441d294c23518
   */
  function unstable_scheduleHydration(
    target: Element | Document | DocumentFragment | Comment
  ): void;
}
