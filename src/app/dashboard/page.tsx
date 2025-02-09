"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import {
    BarChart2,
    Camera,
    Droplet,
    Globe,
    Leaf,
    MessageSquare,
    Plus,
    Rss,
    TreesIcon as Tree,
    User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getUserByEmail } from "./actions"

export default function FoodoBaggins() {



    return (
        <div className="relative min-h-screen overflow-hidden">
            <video className="absolute top-0 left-0 object-cover w-full h-full" autoPlay loop muted playsInline>
                <source src="https://videos.pexels.com/video-files/2878084/2878084-sd_640_360_24fps.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 bg-white bg-opacity-90">
                <header className="bg-white shadow-sm">
                    <nav className="container flex items-center justify-between px-4 py-3 mx-auto">
                        <motion.h1
                            className="text-2xl font-bold text-green-600"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Foodo-Baggins
                        </motion.h1>
                    </nav>
                </header>

                <main className="container p-4 mx-auto mt-8">
                    <Tabs defaultValue="profile">
                        <TabsList className="grid w-full grid-cols-5">
                            <AnimatedTabsTrigger value="profile">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </AnimatedTabsTrigger>
                            <AnimatedTabsTrigger value="tracker">
                                <BarChart2 className="w-4 h-4 mr-2" />
                                Tracker
                            </AnimatedTabsTrigger>
                            <AnimatedTabsTrigger value="ai-advisor">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                AI Advisor
                            </AnimatedTabsTrigger>
                            <AnimatedTabsTrigger value="feed">
                                <Rss className="w-4 h-4 mr-2" />
                                Feed
                            </AnimatedTabsTrigger>
                            <AnimatedTabsTrigger value="sustainability">
                                <Leaf className="w-4 h-4 mr-2" />
                                Sustainability
                            </AnimatedTabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <ProfilePage />
                        </TabsContent>
                        <TabsContent value="tracker">
                            <TrackerPage />
                        </TabsContent>
                        <TabsContent value="ai-advisor">
                            <AIAdvisorPage />
                        </TabsContent>
                        <TabsContent value="feed">
                            <FeedPage />
                        </TabsContent>
                        <TabsContent value="sustainability">
                            <SustainabilityPage />
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}

function AnimatedTabsTrigger({ children, ...props }) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <TabsTrigger {...props}>{children}</TabsTrigger>
        </motion.div>
    )
}

function ProfilePage() {

    const [height, setHeight] = useState(170)
    const [weight, setWeight] = useState(70)
    const [goal, setGoal] = useState("maintain")

    const progressData = [
        { date: "2023-01-01", weight: 72 },
        { date: "2023-02-01", weight: 71 },
        { date: "2023-03-01", weight: 70 },
        { date: "2023-04-01", weight: 69 },
        { date: "2023-05-01", weight: 70 },
    ]
    const { isSignedIn, user, isLoaded } = useUser();

    useEffect(() => {
        async function fetchUserData() {
            if (user?.primaryEmailAddress) {
                const userData = await getUserByEmail(user.emailAddresses[0].emailAddress);
                if (userData) {
                    setHeight(userData.userHeight || 170);
                    setWeight(userData.userWeight || 70);
                    setGoal(userData.userGoal || "maintain");
                }
            }
        }
        fetchUserData();
    }, [user]);



    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (!isSignedIn) {
        return <div>Sign in to view this page</div>
    }



    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Input value={user.fullName} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                            <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
                            <select
                                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            >
                                <option value="gain">Gain</option>
                                <option value="lose">Lose</option>
                                <option value="maintain">Maintain</option>
                            </select>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="w-full">Save Changes</Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Friends List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <AnimatedFriend name="Sarah J." avatar="/avatars/01.png" />
                        <AnimatedFriend name="Mike T." avatar="/avatars/02.png" />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Friend
                            </Button>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Weight & Progress Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

function AnimatedFriend({ name, avatar }) {
    return (
        <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>FB</AvatarFallback>
                </Avatar>
                <span className="ml-2">{name}</span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm">
                    Remove
                </Button>
            </motion.div>
        </motion.div>
    )
}

function TrackerPage() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [showCamera, setShowCamera] = useState(false)
    const [cameraError, setCameraError] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const nutrientData = [
        { date: "2023-05-01", calories: 2000, protein: 100, carbs: 250, fat: 65 },
        { date: "2023-05-02", calories: 2200, protein: 110, carbs: 270, fat: 70 },
        { date: "2023-05-03", calories: 1900, protein: 95, carbs: 240, fat: 60 },
        { date: "2023-05-04", calories: 2100, protein: 105, carbs: 260, fat: 68 },
        { date: "2023-05-05", calories: 2050, protein: 102, carbs: 255, fat: 67 },
    ]

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(URL.createObjectURL(file))
            setShowCamera(false)
        }
    }

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                streamRef.current = stream
            }
            setShowCamera(true)
            setCameraError(null)
        } catch (err) {
            console.error("Error accessing camera:", err)
            setCameraError("Unable to access camera. Please check your permissions.")
        }
    }

    const takePhoto = () => {
        if (videoRef.current && streamRef.current) {
            const canvas = document.createElement("canvas")
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0)
            setSelectedFile(canvas.toDataURL("image/jpeg"))
            setShowCamera(false)
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        } else {
            setCameraError("Camera not initialized. Please try again.")
        }
    }

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop())
            }
        }
    }, [])

    let router = useRouter();

    return (
        <div className="p-6 space-y-6 bg-white rounded-lg bg-opacity-90">
            <Card>
                <CardHeader>
                    <CardTitle>Food Image Upload</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="w-full md:w-1/3">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-32 transition-colors duration-300 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera className="w-6 h-6 mb-2 text-gray-400" />
                                    <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                            <div className="flex justify-center mt-2" onClick={router.push('/track-calories')}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button onClick={showCamera ? takePhoto : startCamera}>
                                        <Camera className="w-4 h-4 mr-2" />
                                        {showCamera ? "Take Photo" : "Start Camera"}
                                    </Button>
                                </motion.div>
                            </div>
                            {cameraError && <p className="mt-2 text-sm text-red-500">{cameraError}</p>}
                        </div>
                        <div className="flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-lg md:w-2/3">
                            {selectedFile ? (
                                <img
                                    src={selectedFile || "/placeholder.svg"}
                                    alt="Uploaded food"
                                    className="object-contain max-w-full max-h-64"
                                />
                            ) : showCamera ? (
                                <video ref={videoRef} autoPlay playsInline muted className="object-contain max-w-full max-h-64" />
                            ) : (
                                <p className="text-gray-400">No image selected</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Nutrient Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={nutrientData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                            <Line type="monotone" dataKey="protein" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="carbs" stroke="#ffc658" />
                            <Line type="monotone" dataKey="fat" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

function AIAdvisorPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Chat Advisor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <p className="font-semibold">User:</p>
                        <p>What should I eat for dinner tonight?</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                        <p className="font-semibold">AI Advisor:</p>
                        <p>
                            Based on your recent food intake and fitness goals, Id recommend a balanced meal of grilled chicken
                            breast, quinoa, and roasted vegetables. This combination provides a good mix of protein, complex carbs,
                            and nutrients to support your health and fitness objectives.
                        </p>
                    </div>
                    <div className="flex">
                        <Input placeholder="Ask AI Advisor..." className="flex-grow" />
                        <Button className="ml-2">Send</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function FeedPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI Roast of the Day</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold">
                        🔥 Oops! Looks like someones been hitting the snack drawer a bit too hard! Remember, abs are made in the
                        kitchen, not in the chipnasium! 😂🏋️‍♂️
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                        <Button variant="outline" size="sm">
                            😂 Laugh
                        </Button>
                        <Button variant="outline" size="sm">
                            👏 Applaud
                        </Button>
                        <Button variant="outline" size="sm">
                            💪 Motivate
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Friends Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="font-semibold">Sarah J.</p>
                            <p>Just completed a 5k run! Feeling great! 🏃‍♀️💨</p>
                            <div className="flex items-center mt-2 space-x-2">
                                <Button variant="outline" size="sm">
                                    👍 Like
                                </Button>
                                <Button variant="outline" size="sm">
                                    💬 Comment
                                </Button>
                            </div>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="font-semibold">Mike T.</p>
                            <p>New personal best in deadlifts today! 💪🏋️‍♂️</p>
                            <div className="flex items-center mt-2 space-x-2">
                                <Button variant="outline" size="sm">
                                    👍 Like
                                </Button>
                                <Button variant="outline" size="sm">
                                    💬 Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function SustainabilityPage() {
    return (
        <div className="relative min-h-screen">
            <video className="absolute top-0 left-0 object-cover w-full h-full" autoPlay loop muted playsInline>
                <source src="https://videos.pexels.com/video-files/8544141/8544141-sd_640_360_25fps.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 p-6 space-y-6 bg-white rounded-lg bg-opacity-90">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Green Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-green-600">1,250 🌿</p>
                        <p className="mt-2 text-sm text-gray-500">Earn more by meeting your fitness goals!</p>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Plant Trees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tree className="w-12 h-12 mb-4 text-green-600" />
                            <p className="mb-4">100 points = 1 tree planted</p>
                            <Button className="w-full">Plant a Tree (100 pts)</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Clean Oceans</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Droplet className="w-12 h-12 mb-4 text-blue-600" />
                            <p className="mb-4">200 points = 1kg plastic removed</p>
                            <Button className="w-full">Clean Ocean (200 pts)</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Support Initiatives</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Globe className="w-12 h-12 mb-4 text-purple-600" />
                            <p className="mb-4">500 points = Support a project</p>
                            <Button className="w-full">Support Project (500 pts)</Button>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Environmental Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>🌳 Trees Planted: 5</p>
                            <p>🌊 Ocean Plastic Removed: 2kg</p>
                            <p>🌍 Projects Supported: 1</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

