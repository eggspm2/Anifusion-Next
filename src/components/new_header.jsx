'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AniWatcSearch, MangaSearch } from './hooks/UseApiFetch'
import Toggle from './toggle'

export default function NewHeader() {
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isManga, setIsManga] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const Location = usePathname();
  const router = useRouter(); // Correct hook for navigation

  useEffect(() => {
    const Path = () => {
      if (Location.includes("Manga")) {
        setIsManga(true);
      } else {
        setIsManga(false);
        setIsShown(true);
      }

      if (Location.includes("Read") || Location.includes("Search")) {
        setIsShown(false);
      } else {
        setIsShown(true);
      }

    };
    Path();
  }, [Location]);

  const handleText = (e) => {
    setName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/Anime/Search/${encodeURIComponent(name)}`); 
    }
  };

   if (!isShown) return <div></div>;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?text=AF" alt="" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">AniFusion</span>
          </Link>
          <nav className={cn(
            "absolute left-0 right-0 top-full border-b border-muted md:static md:border-none",
            isMenuOpen ? "block" : "hidden md:block"
          )}>
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Anime</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Manga</Link></li>
            </ul>
          </nav>
          <div className="flex items-center justify-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center justify-center">
              <Input
                type="search"
                placeholder="Search..."
                className={cn(
                  "w-[200px] md:w-[300px] pl-8 transition-all duration-300 ease-in-out",
                  isSearchFocused ? "w-[250px] md:w-[350px]" : ""
                )}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                value={name}
                onChange={handleText}
              />
              <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground flex items-center transition-all duration-300 ease-in-out">
                <Search className={cn(
                  isSearchFocused ? "text-primary" : ""
                )}/>
              </button>
            </form>
            <Button variant="outline" className="hidden md:inline-flex">Sign In</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5"/>
            </Button>
            <Toggle/>
          </div>
        </div>
      </div>
    </header>
  )
}
