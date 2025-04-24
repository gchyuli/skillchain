import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"

export function SuccessStep() {
  return (
    <div className="py-8 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-sky-blue/20 flex items-center justify-center mb-6">
        <CheckCircle2 className="h-10 w-10 text-sky-blue" />
      </div>

      <h2 className="text-2xl font-bold text-electric-blue mb-2">Contract Created Successfully!</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Your contract has been created and recorded on the Stellar blockchain. You can now share it with your client or
        provider.
      </p>

      <div className="p-4 bg-dark/70 rounded-md border border-sky-blue/20 mb-6 w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-1">Transaction ID:</p>
        <p className="font-mono text-sm text-stellar break-all">
          GDKIJJIKXLOM2NRMPNQZUUYK24ZPVFC6426GZAEP3KUK6KEJLACCWNMX
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button className="gradient-blue flex-1">View Contract Details</Button>
        <Button variant="outline" className="border-sky-blue/50 hover:bg-space flex-1">
          <Link href="/dashboard" className="flex items-center">
            Back to Dashboard
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
