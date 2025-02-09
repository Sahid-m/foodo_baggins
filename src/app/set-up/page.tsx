import HealthForm from "@/components/HealthForm"

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-codioful-6985185.jpg-XLNMRFdykUzXb2tBIa7va6nbteypGR.jpeg')] bg-cover bg-center"
        style={{ backgroundPosition: "50% 50%" }}
      />
      <h1 className="relative mb-16 text-7xl font-extralight text-center text-[#1a4a4f] drop-shadow-sm">
        Foodo Baggins
      </h1>
      <HealthForm />
    </main>
  )
}