'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, Sparkles, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Toggle from './toggle'

export default function NewHeader() {
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isManga, setIsManga] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const location = usePathname();
  const router = useRouter();

  useEffect(() => {
    const path = () => {
      setIsManga(location.includes("Manga"));
      setIsShown(!location.includes("Read") && !location.includes("Search"));
    };
    path();
  }, [location]);

  const handleText = (e) => {
    setName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/${isManga ? 'Manga' : 'Anime'}/Search/${name}`);
      setIsSearchOpen(false);
    }
  };

  if (!isShown) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between w-full px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">SZ - ANIME</span>
          </Link>
          <nav className={cn(
            "md:mt-[0px]  fixed right-0 top-0  z-50 bg-background md:bg-transparent md:static rounded-lg",
            isMenuOpen ? "flex" : "hidden md:block"
          )}>
            <ul className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0 w-full h-full md:w-auto md:h-auto">
              <li><Button variant='ghost' className='bg-transparent'><Link href="/Anime" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>Anime</Link></Button></li>
              <li><Button variant='ghost' className='bg-transparent'><Link href="/Manga" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>Manga</Link></Button></li>
              <li className="md:hidden"><Toggle /></li>
              <li className="md:hidden">
                <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                  Close
                </Button>
              </li>
            </ul>
          </nav>
          <div className="flex items-center justify-center space-x-2 md:space-x-4">
            <form onSubmit={handleSearchSubmit} className={cn(
              "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur",
              isSearchOpen ? "flex" : "hidden md:relative md:inset-auto md:flex md:bg-transparent"
            )}>
              <Input
                type="search"
                placeholder="Search..."
                className="w-[80%] md:w-[200px] lg:w-[300px] pl-9"
                value={name}
                onChange={handleText}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute left-[10%] md:left-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-9 top-3.5 md:hidden"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <Toggle />
            </div>
          </div>
        </div>
      
    </header>
  )
}
