'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Play } from 'lucide-react'
import { useParams } from 'next/navigation'
import { AniWatcSearch } from '@/components/hooks/UseApiFetch'
import Link from 'next/link'

export default function Page() {
  const [searchResults, setSearchResults] = useState([])
  const { name } = useParams()
  const [searchTerm, setSearchTerm] = useState(name || '')

  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        const response = await AniWatcSearch(name)
        if (response) {
          setSearchResults(response.animes || [])
        }
        setSearchTerm(name)
      }
    }
    fetchData()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const response = await AniWatcSearch(searchTerm)
      if (response) {
        setSearchResults(response.animes || [])
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <main className="flex-1">
        <section className="w-full py-5 md:py-5 lg:py-5 xl:py-10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Telusuri anime favoritmu
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Temukan lebih banyak anime yang menarik
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Mencari anime..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit">Telusuri</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-2">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {searchResults.length > 0 ? (
                  searchResults.map((anime) => (
                    <motion.div
                      key={anime.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-lg spotlight-effect"
                    >
                      <Link href={`/Anime/home/${anime.id}`}>
                      <Card className="h-full overflow-hidden border-0 bg-black/40 backdrop-blur-sm">
                        <CardHeader className="relative p-0">
                          <div className="aspect-[3/3] overflow-hidden">
                            <img 
                              src={anime.poster || "/placeholder.svg?height=300&width=200"} 
                              alt={anime.name} 
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3">
                          <CardTitle className="text-sm font-bold text-white line-clamp-1">{anime.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs font-medium text-white/80">{anime.rating || 'N/A'}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <div className="flex flex-wrap gap-1">
                            {(anime.genres || ['Action', 'Adventure']).slice(0, 2).map((genre, index) => (
                              <Badge key={index} variant="secondary" className="bg-white/10 text-white text-xs px-1.5 py-0.5">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </CardFooter>
                      </Card>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-lg text-muted-foreground">Tidak Menemukan Hasil</p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <style jsx global>{`
        .spotlight-effect {
          position: relative;
          overflow: hidden;
        }
        .spotlight-effect::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0) 80%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .spotlight-effect:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
