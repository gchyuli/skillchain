export default function XBullIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="256" fill="#0E1935" />
      <path d="M256 128l-96 128 96 128 96-128-96-128zm0 80l48 48-48 48-48-48 48-48z" fill="#00BFFF" />
    </svg>
  )
}
