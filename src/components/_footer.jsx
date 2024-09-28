import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Sparkles, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
              <span className="font-bold text-2xl">AniFusion</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your ultimate destination for anime streaming and manga reading. Dive into a world of endless stories and adventures.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Anime</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Manga</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AniFusion. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}