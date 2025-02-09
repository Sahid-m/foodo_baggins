import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface NameStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function NameStep({ value, onChange, onNext, onPrev }: NameStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-[400px]"
    >
      <div className="flex-grow flex flex-col items-center justify-center space-y-12">
        <Label htmlFor="name" className="text-5xl font-extralight text-center text-[#1a4a4f]">
          What is your name?
        </Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-md text-center text-xl bg-white/20 backdrop-blur-sm border-2 border-[#1a4a4f]/20 text-[#1a4a4f] placeholder:text-[#1a4a4f]/60 focus:border-[#1a4a4f]/40 focus:ring-0"
        />
      </div>
      <div className="flex justify-between mt-12">
        <Button
          onClick={onPrev}
          variant="outline"
          disabled
          className="border-2 border-[#1a4a4f]/20 text-[#1a4a4f] hover:bg-[#1a4a4f]/10 transition-colors"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!value.trim()}
          className="bg-[#1a4a4f]/20 backdrop-blur-sm text-[#1a4a4f] border-2 border-[#1a4a4f]/20 hover:bg-[#1a4a4f]/30 transition-colors"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}