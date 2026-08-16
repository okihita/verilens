'use client';

/**
 * VeriLens Audio Engine (Silent Mode)
 * Safe no-op audio handlers to preserve API compatibility while guaranteeing complete silence.
 */

export function isAudioMuted(): boolean {
  return true;
}

export function setAudioMuted(_muted: boolean): void {}

export function toggleAudioMute(): boolean {
  return true;
}

export function playClick(..._args: any[]): void {}
export function playCorrect(..._args: any[]): void {}
export function playIncorrect(..._args: any[]): void {}
export function playSuccess(..._args: any[]): void {}
export function playError(..._args: any[]): void {}
export function playStreak(..._args: any[]): void {}
export function playStart(..._args: any[]): void {}
export function playComplete(..._args: any[]): void {}
export function playSwoosh(..._args: any[]): void {}
export function playCombo(..._args: any[]): void {}
export function playLevelUp(..._args: any[]): void {}
export function playCardFlip(..._args: any[]): void {}
export function playBadgeUnlock(..._args: any[]): void {}
export function playCountdownTick(..._args: any[]): void {}
export function playCriticalAlarm(..._args: any[]): void {}
export function playTerminalBeep(..._args: any[]): void {}
export function playDuelImpact(..._args: any[]): void {}
