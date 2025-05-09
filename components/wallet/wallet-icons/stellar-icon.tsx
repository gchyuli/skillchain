export default function StellarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M128 0C57.28 0 0 57.28 0 128s57.28 128 128 128 128-57.28 128-128S198.72 0 128 0zm54.4 161.28l-22.4 11.52-22.72 11.52-22.72-11.52-22.4-11.52 22.4-11.52v-23.04l-45.12 23.04v23.04l45.12 23.04 22.72 11.52 22.72-11.52 45.12-23.04v-23.04l-22.72-11.52v23.04zM128 71.68l-22.72 11.52-45.12 23.04v23.04l22.72 11.52v-23.04l45.12-23.04 45.12 23.04v23.04l22.72-11.52v-23.04l-45.12-23.04L128 71.68z"
        fill="#00BFFF"
      />
    </svg>
  )
}
