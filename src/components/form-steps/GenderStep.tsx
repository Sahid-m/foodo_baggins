import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight } from "lucide-react"

interface GenderStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function GenderStep({ value, onChange, onNext, onPrev }: GenderStepProps) {
  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <Label className="text-2xl font-semibold text-center">What is your gender?</Label>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="text-lg">
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="text-lg">
              Female
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="text-lg">
              Other
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext} disabled={!value}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

