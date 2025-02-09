import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CaloriesStepProps {
  value: string
  onChange: (value: string) => void
  onPrev: () => void
  onSubmit: () => void
}

export default function CaloriesStep({ value, onChange, onPrev, onSubmit }: CaloriesStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="calories">What's your daily calorie intake limit?</Label>
        <Input
          id="calories"
          type="number"
          placeholder="Enter your daily calorie limit"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onSubmit} disabled={!value.trim()}>
          Submit
        </Button>
      </div>
    </div>
  )
}

