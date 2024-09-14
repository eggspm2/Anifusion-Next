'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Star } from 'lucide-react'

// Mock anime data
const animeData = [
  { id: 1, title: 'Naruto', rating: 4.5, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, title: 'One Piece', rating: 4.7, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, title: 'Attack on Titan', rating: 4.8, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, title: 'Death Note', rating: 4.6, image: '/placeholder.svg?height=100&width=100' },
  { id: 5, title: 'My Hero Academia', rating: 4.4, image: '/placeholder.svg?height=100&width=100' },
]

export function AnimeSearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(animeData)

  const handleSearch = () => {
    const results = animeData.filter(anime => 
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }

  return (
    (<div className="flex flex-col min-h-screen bg-background">
      <header
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Search className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">AnimeSearch</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/docs">Docs</a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/docs/components">Components</a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/themes">Themes</a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/examples">Examples</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Discover Your Next Anime Adventure
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Search through our vast collection of anime titles and find your next binge-worthy series.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                  className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search anime..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <AnimatePresence>
                {searchResults.map((anime) => (
                  <motion.div
                    key={anime.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}>
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar>
                          <AvatarImage src={anime.image} alt={anime.title} />
                          <AvatarFallback>{anime.title[0]}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <CardTitle>{anime.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400" />
                              {anime.rating}
                            </div>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Badge variant="secondary">Action</Badge>
                        <Badge variant="secondary" className="ml-2">Adventure</Badge>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 AnimeSearch Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</a>
          <a className="text-xs hover:underline underline-offset-4" href="#">Privacy</a>
        </nav>
      </footer>
    </div>)
  );
}