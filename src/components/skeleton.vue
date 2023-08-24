<template>
  <svg
    role="img"
    width="280"
    height="470"
    aria-labelledby="loading-aria"
    viewBox="0 0 280 470"
    preserveAspectRatio="none"
  >
    <title id="loading-aria">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clip-path="url(#clip-path)"
      style="fill: url('#fill')"
    ></rect>
    <defs>
      <clipPath id="clip-path">
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="265" rx="10" ry="10" width="250" height="15" />
        <rect x="0" y="290" rx="10" ry="10" width="250" height="95" />
        <rect x="0" y="400" rx="0" ry="0" width="65" height="40" />
        <rect x="115" y="399" rx="30" ry="30" width="135" height="40" />
      </clipPath>
      <linearGradient id="fill">
        <stop offset="0.599964" stop-color="#ededed" stop-opacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stop-color="#c4c4c4" stop-opacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stop-color="#ededed" stop-opacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
</template>
