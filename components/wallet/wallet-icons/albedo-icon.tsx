export default function AlbedoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="256" fill="#0E1935" />
      <path
        d="M256 120c-74.99 0-136 61.01-136 136s61.01 136 136 136 136-61.01 136-136-61.01-136-136-136zm0 212c-41.97 0-76-34.03-76-76s34.03-76 76-76 76 34.03 76 76-34.03 76-76 76z"
        fill="#00BFFF"
      />
    </svg>
  )
}
