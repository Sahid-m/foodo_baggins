import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DateOfBirthStepProps {
  value: {
    day: string
    month: string
    year: string
  }
  onChange: (value: { day: string; month: string; year: string }) => void
  onNext: () => void
  onPrev: () => void
}

export default function DateOfBirthStep({ value, onChange, onNext, onPrev }: DateOfBirthStepProps) {
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1)
    return {
      value: (i + 1).toString().padStart(2, "0"),
      label: date.toLocaleString("default", { month: "long" }),
    }
  })

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return 31
    const daysInMonth = new Date(Number.parseInt(year), Number.parseInt(month), 0).getDate()
    return daysInMonth
  }

  const days = Array.from({ length: getDaysInMonth(value.month, value.year) }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  )

  const handleChange = (type: "year" | "month" | "day", newValue: string) => {
    const newDate = { ...value, [type]: newValue }

    if (type === "month" || type === "year") {
      const daysInMonth = getDaysInMonth(newDate.month, newDate.year)
      if (Number.parseInt(newDate.day) > daysInMonth) {
        newDate.day = daysInMonth.toString()
      }
    }

    onChange(newDate)
  }

  const isComplete = value.year && value.month && value.day

  const commonSelectStyles =
    "bg-white/20 backdrop-blur-sm border-2 border-[#1a4a4f]/20 text-[#1a4a4f] placeholder:text-[#1a4a4f]/60"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-[400px]"
    >
      <div className="flex-grow flex flex-col items-center justify-center space-y-12">
        <Label className="text-5xl font-extralight text-center text-[#1a4a4f]">When were you born?</Label>
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          <Select value={value.month} onValueChange={(v) => handleChange("month", v)}>
            <SelectTrigger className={commonSelectStyles}>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-[#1a4a4f]/20">
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value} className="text-[#1a4a4f] hover:bg-[#1a4a4f]/10">
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={value.day} onValueChange={(v) => handleChange("day", v)}>
            <SelectTrigger className={commonSelectStyles}>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-[#1a4a4f]/20">
              {days.map((d) => (
                <SelectItem key={d} value={d} className="text-[#1a4a4f] hover:bg-[#1a4a4f]/10">
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={value.year} onValueChange={(v) => handleChange("year", v)}>
            <SelectTrigger className={commonSelectStyles}>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-[#1a4a4f]/20">
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()} className="text-[#1a4a4f] hover:bg-[#1a4a4f]/10">
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between mt-12">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-2 border-[#1a4a4f]/20 text-[#1a4a4f] hover:bg-[#1a4a4f]/10 transition-colors"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="bg-[#1a4a4f]/20 backdrop-blur-sm text-[#1a4a4f] border-2 border-[#1a4a4f]/20 hover:bg-[#1a4a4f]/30 transition-colors"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
