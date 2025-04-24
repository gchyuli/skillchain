export default function LobstrIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="128" fill="#0E1935" />
      <path
        d="M256 128c-70.69 0-128 57.31-128 128s57.31 128 128 128c26.5 0 51.13-8.04 71.63-21.84l-35.82-35.82C280.19 332.7 268.4 336 256 336c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80c0 12.4-3.3 24.19-8.66 34.81l35.82 35.82C377.96 307.13 386 282.5 386 256c0-70.69-57.31-128-128-128z"
        fill="#FF4B4B"
      />
    </svg>
  )
}
