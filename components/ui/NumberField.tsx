"use client";

import { useEffect, useState } from "react";

const BASE_CLASS =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  integer?: boolean;
  /** Applied on blur when the field is empty */
  emptyValue?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  /** Shown when not focused (e.g. 50,000,000) */
  formatBlurred?: (value: number) => string;
}

function sanitize(raw: string, integer: boolean): string {
  if (integer) return raw.replace(/[^\d]/g, "");
  const next = raw.replace(/[^\d.]/g, "");
  const firstDot = next.indexOf(".");
  if (firstDot === -1) return next;
  return next.slice(0, firstDot + 1) + next.slice(firstDot + 1).replace(/\./g, "");
}

function toNumber(raw: string): number | null {
  if (raw === "" || raw === ".") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function clamp(n: number, min?: number, max?: number): number {
  let next = n;
  if (min !== undefined) next = Math.max(min, next);
  if (max !== undefined) next = Math.min(max, next);
  return next;
}

function defaultDisplay(value: number, integer: boolean): string {
  if (!Number.isFinite(value)) return "";
  return integer ? String(Math.trunc(value)) : String(value);
}

/**
 * Mobile-safe numeric field: text + numeric keypad.
 * Keeps an empty draft while typing so iOS/Android can delete and retype.
 */
export default function NumberField({
  value,
  onChange,
  min,
  max,
  integer = true,
  emptyValue,
  placeholder,
  className,
  disabled,
  formatBlurred,
  ...rest
}: NumberFieldProps) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!focused) {
      setDraft(defaultDisplay(value, integer));
    }
  }, [value, focused, integer]);

  const emit = (raw: string, shouldClampMin: boolean) => {
    const parsed = toNumber(raw);
    if (parsed === null) {
      onChange(emptyValue ?? 0);
      return;
    }
    onChange(shouldClampMin ? clamp(parsed, min, max) : clamp(parsed, undefined, max));
  };

  const blurredText = formatBlurred
    ? formatBlurred(value)
    : defaultDisplay(value, integer);

  return (
    <input
      type="text"
      inputMode={integer ? "numeric" : "decimal"}
      enterKeyHint="done"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      disabled={disabled}
      placeholder={placeholder}
      value={focused ? draft : blurredText}
      onFocus={(e) => {
        setFocused(true);
        setDraft(defaultDisplay(value, integer));
        requestAnimationFrame(() => e.currentTarget.select());
      }}
      onBlur={() => {
        setFocused(false);
        emit(draft, true);
      }}
      onChange={(e) => {
        const next = sanitize(e.target.value, integer);
        setDraft(next);
        emit(next, false);
      }}
      className={className ?? `${BASE_CLASS} focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600`}
      {...rest}
    />
  );
}
