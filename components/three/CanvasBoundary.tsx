'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

export default class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') console.error('WebGL scene fallback', error, info);
  }
  render() { return this.state.failed ? null : this.props.children; }
}
