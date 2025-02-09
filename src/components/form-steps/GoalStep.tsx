import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight } from "lucide-react"

interface GoalStepProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onPrev: () => void
}

export default function GoalStep({ value, onChange, onSubmit, onPrev }: GoalStepProps) {
  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex flex-col items-center justify-center flex-grow space-y-6">
        <Label className="text-2xl font-semibold text-center">What would you like to do?</Label>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gain" id="gain" />
            <Label htmlFor="gain" className="text-lg">
              Gain
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lose" id="lose" />
            <Label htmlFor="lose" className="text-lg">
              Lose
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maintain" id="maintain" />
            <Label htmlFor="maintain" className="text-lg">
              Maintain
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onSubmit} disabled={!value}>
          Submit <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

