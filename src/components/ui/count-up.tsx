"use client";

import * as React from "react";
import { motion, useInView, animate } from "motion/react";
import { cn } from "@/lib/utils";

type DigitEffect = "none" | "fade" | "blur" | "slide";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  digitEffect?: DigitEffect;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  decimals?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

// 3 cycles of 0..9 (30 elements total) for smooth deceleration roll
const REEL_DIGITS = Array.from({ length: 30 }, (_, i) => i % 10);

interface DigitReelProps {
  key?: any;
  targetDigit: number;
  colIndex: number;
  duration: number;
  delay: number;
  isInView: boolean;
}

function DigitReel({
  targetDigit,
  colIndex,
  duration,
  delay,
  isInView,
}: DigitReelProps) {
  // Land on the second cycle: index 10 + targetDigit
  const targetIndex = 10 + targetDigit;
  const targetPercent = (targetIndex / 30) * 100;

  return (
    <span
      className="relative inline-block overflow-hidden select-none"
      style={{
        height: "1em",
        lineHeight: 1,
        verticalAlign: "baseline",
        fontVariantNumeric: "tabular-nums",
      }}
      aria-hidden="true"
    >
      {/* Invisible spacer giving the exact character dimensions synchronously */}
      <span className="invisible block select-none" aria-hidden="true">
        0
      </span>
      <motion.span
        initial={{ y: "0%" }}
        animate={isInView ? { y: `-${targetPercent}%` } : { y: "0%" }}
        transition={{
          duration: Math.max(1, duration),
          ease: [0.16, 1, 0.3, 1], // Smooth Apple/Linear easing
          delay: delay + colIndex * 0.06,
        }}
        className="absolute top-0 left-0 right-0 flex flex-col"
        style={{ willChange: "transform" }}
      >
        {REEL_DIGITS.map((num, i) => (
          <span
            key={i}
            className="flex items-center justify-center shrink-0"
            style={{ height: "1em", lineHeight: 1 }}
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  digitEffect = "slide",
  className,
  startWhen = true,
  separator = "",
  decimals,
  onStart,
  onEnd,
}: CountUpProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px" });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes(".")) {
      const parts = str.split(".");
      const dec = parts[1];
      if (dec && parseInt(dec) !== 0) return dec.length;
    }
    return 0;
  };

  const maxDecimals =
    decimals !== undefined
      ? decimals
      : Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = React.useCallback(
    (val: number) => {
      const hasDecimals = maxDecimals > 0;
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };
      const formatted = Intl.NumberFormat("en-US", options).format(val);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator],
  );

  const targetStr = formatValue(direction === "down" ? from : to);

  // Smooth direct number ticker for digitEffect === "none" | "fade" | "blur"
  React.useEffect(() => {
    if (digitEffect === "slide") return;

    if (isInView && startWhen) {
      onStart?.();
      const startVal = direction === "down" ? to : from;
      const endVal = direction === "down" ? from : to;

      const controls = animate(startVal, endVal, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (textRef.current) {
            textRef.current.textContent = formatValue(latest);
          }
        },
        onComplete: () => {
          onEnd?.();
        },
      });

      return () => controls.stop();
    }
  }, [
    isInView,
    startWhen,
    digitEffect,
    from,
    to,
    direction,
    duration,
    delay,
    formatValue,
    onStart,
    onEnd,
  ]);

  // If using non-slide mode:
  if (digitEffect !== "slide") {
    const initialDisplay = formatValue(direction === "down" ? to : from);
    return (
      <span
        ref={containerRef}
        className={cn("inline-flex items-center", className)}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span ref={textRef}>{initialDisplay}</span>
      </span>
    );
  }

  // Slide Odometer Reel Mode:
  const characters = targetStr.split("");
  let digitIndex = 0;

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex items-center", className)}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={targetStr}
    >
      {characters.map((char, i) => {
        const isDigit = /\d/.test(char);
        if (isDigit) {
          const colIdx = digitIndex++;
          return (
            <DigitReel
              key={i}
              targetDigit={parseInt(char, 10)}
              colIndex={colIdx}
              duration={duration}
              delay={delay}
              isInView={isInView && startWhen}
            />
          );
        }
        return (
          <span
            key={i}
            className="inline-block px-[0.03ch] select-none"
            style={{ lineHeight: 1, verticalAlign: "baseline" }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export { CountUp, type CountUpProps, type DigitEffect };
export default CountUp;
