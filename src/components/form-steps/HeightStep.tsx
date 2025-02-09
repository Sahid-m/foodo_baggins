import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface HeightStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function HeightStep({ value, onChange, onNext, onPrev }: HeightStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[400px]"
    >
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <Label htmlFor="height" className="text-3xl font-bold text-center text-green-800">
          What is your height? (in cm)
        </Label>
        <Input
          id="height"
          type="number"
          placeholder="Enter your height in cm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-xs text-center text-lg bg-transparent border-b-2 border-green-800 focus:border-green-600 transition-colors duration-300"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="outline" className="text-green-800 border-green-800 hover:bg-green-100">
          Previous
        </Button>
        <Button onClick={onNext} disabled={!value.trim()} className="bg-green-800 text-white hover:bg-green-700">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

