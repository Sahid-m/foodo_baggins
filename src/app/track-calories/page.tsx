"use client"

import { estimateCalories } from "@/app/track-calories/actions"
import { Button } from "@/components/ui/button"
import { Camera, Leaf, RotateCcw, Send } from "lucide-react"
import { useCallback, useRef, useState } from "react"

export default function EcoFoodCalorieEstimator() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [estimation, setEstimation] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            console.error("Error accessing the camera", err)
        }
    }, [])

    const captureImage = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d")
            if (context) {
                context.drawImage(videoRef.current, 0, 0, 640, 480)
                const imageDataUrl = canvasRef.current.toDataURL("image/jpeg")
                setCapturedImage(imageDataUrl)
            }
        }
    }, [])

    const sendToAPI = useCallback(async () => {
        if (capturedImage) {
            setIsLoading(true)
            const result = await estimateCalories(capturedImage)
            setEstimation(result)
            setIsLoading(false)
        }
    }, [capturedImage])

    const retake = useCallback(() => {
        setCapturedImage(null)
        setEstimation(null)
    }, [])

    return (
        <div className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-green-100">
            <div className="max-w-2xl mx-auto overflow-hidden bg-white shadow-xl rounded-3xl">
                <div className="p-8 bg-gradient-to-r from-green-400 to-green-600">
                    <h1 className="flex items-center justify-center text-3xl font-bold text-white">
                        <Leaf className="mr-2" /> Eco Food Calorie Estimator
                    </h1>
                </div>
                <div className="p-8">
                    {!capturedImage ? (
                        <div className="space-y-6">
                            <Button
                                onClick={startCamera}
                                className="w-full text-white transition-all duration-300 ease-in-out transform bg-green-500 hover:bg-green-600 hover:scale-105"
                            >
                                <Camera className="mr-2" /> Start Camera
                            </Button>
                            <div className="relative overflow-hidden bg-gray-100 rounded-2xl aspect-video">
                                <video ref={videoRef} autoPlay className="absolute inset-0 object-cover w-full h-full" />
                            </div>
                            <Button
                                onClick={captureImage}
                                className="w-full text-white transition-all duration-300 ease-in-out transform bg-green-500 hover:bg-green-600 hover:scale-105"
                            >
                                <Camera className="mr-2" /> Capture Image
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="relative overflow-hidden bg-gray-100 rounded-2xl aspect-video">
                                <img
                                    src={capturedImage || "/placeholder.svg"}
                                    alt="Captured food"
                                    className="absolute inset-0 object-cover w-full h-full"
                                />
                            </div>
                            {!estimation ? (
                                <div className="flex justify-center gap-4">
                                    <Button
                                        onClick={sendToAPI}
                                        className="text-white transition-all duration-300 ease-in-out transform bg-green-500 hover:bg-green-600 hover:scale-105"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Send className="mr-2" /> Estimate Calories
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={retake}
                                        variant="outline"
                                        className="text-green-500 transition-all duration-300 ease-in-out transform border-green-500 hover:bg-green-50 hover:scale-105"
                                    >
                                        <RotateCcw className="mr-2" /> Retake Picture
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4 text-center">
                                    <p className="p-4 text-lg text-gray-700 bg-green-50 rounded-xl">{estimation}</p>
                                    <Button
                                        onClick={retake}
                                        className="text-white transition-all duration-300 ease-in-out transform bg-green-500 hover:bg-green-600 hover:scale-105"
                                    >
                                        <Camera className="mr-2" /> Take Another Picture
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480} />
        </div>
    )
}

