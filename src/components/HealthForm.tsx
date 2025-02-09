"use client"

import { setUserInitialData } from "@/app/set-up/actions"
import { connectDB } from "@/lib/mongoDb"
import User from "@/schema/user"
import { useUser } from '@clerk/nextjs'
import { useState } from "react"
import DateOfBirthStep from "./form-steps/DateOfBirthStep"
import GenderStep from "./form-steps/GenderStep"
import GoalStep from "./form-steps/GoalStep"
import HeightStep from "./form-steps/HeightStep"
import NameStep from "./form-steps/NameStep"
import WeightStep from "./form-steps/WeightStep"

export default function HealthForm() {

  const { isSignedIn, user, isLoaded } = useUser();

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: {
      day: "",
      month: "",
      year: "",
    },
    height: "",
    weight: "",
    gender: "",
    goal: "",
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }



  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async () => {

    setUserInitialData(formData, user.emailAddresses[0].emailAddress);


  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <NameStep
            value={formData.name}
            onChange={(value) => updateFormData("name", value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 2:
        return (
          <DateOfBirthStep
            value={formData.dateOfBirth}
            onChange={(value) => updateFormData("dateOfBirth", value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <HeightStep
            value={formData.height}
            onChange={(value) => updateFormData("height", value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <WeightStep
            value={formData.weight}
            onChange={(value) => updateFormData("weight", value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <GenderStep
            value={formData.gender}
            onChange={(value) => updateFormData("gender", value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 6:
        return (
          <GoalStep
            value={formData.goal}
            onChange={(value) => updateFormData("goal", value)}
            onSubmit={() => onSubmit()}
            onPrev={prevStep}
          />
        )
      default:
        return null
    }
  }

  return <div className="relative w-full max-w-2xl px-8 mx-auto">{renderStep()}</div>
}

