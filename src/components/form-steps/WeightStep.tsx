import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"

interface WeightStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function WeightStep({ value, onChange, onNext, onPrev }: WeightStepProps) {
  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <Label htmlFor="weight" className="text-2xl font-semibold text-center">
          What is your weight? (in kg)
        </Label>
        <Input
          id="weight"
          type="number"
          placeholder="Enter your weight in kg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-xs text-center text-lg"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext} disabled={!value.trim()}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

