"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Play, BookOpen, Menu, Star, ChevronRight, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { mostPopularAnimes } from '@/app/OfflineData/_offline_data'
import aot from "../assets/Character Development(1).jpg";
import manga from "../assets/manga.jpg";

export default function LandingPage() {
 
  return (
      <div className="min-h-screen bg-background text-foreground">
        <main>
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Nonton Gratis Tanpa Batas<span className="text-primary">Anime</span> & <span className="text-primary">Manga</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                 Telusuri lebih banyak anime , manga dan jangan lupa untuk join kekomunitas
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/Anime">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Play className="mr-2 h-5 w-5" /> Mulai Nonton
                  </Button>
                  </Link>
                  <Link href="/Manga">
                  <Button size="lg" variant="outline">
                    <BookOpen className="mr-2 h-5 w-5" /> Baca Manga
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2" />
                  Manga Reading
                </CardTitle>
                <CardDescription>Baca Manga Populer Disini</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={manga}
                  alt="Manga Collage"
                  width={400}
                  height={200}
                  className="w-full h-68 object-cover rounded-md mb-4"
                />
                <p className="text-muted-foreground">
                  Telusuri lebih banyak manga populer sesuai dengan genre yang kamu suka
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/Manga">Mulai Membaca</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlayCircle className="mr-2" />
                  Nonton Anime
                </CardTitle>
                <CardDescription>Tonton Anime , Series , Dan Movie Favoritmu</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={aot}
                  alt="Anime Collage"
                  width={400}
                  height={200}
                  className="w-full h-68 object-cover rounded-md mb-4"
                />
                <p className="text-muted-foreground">
                  Tonton anime klasik dan terbaru , populer disini
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/Anime">Mulai Menonton</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        </div>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                Paling Populer
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {mostPopularAnimes ?  mostPopularAnimes.map((item, index) => (
                  <Card key={index} className="overflow-hidden group">
                    <CardHeader className="p-0">
                      <div className="relative aspect-[2/3]">
                        <img
                          src={item.image}
                          alt=""
                          fill = "true"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <Link href={`/Anime/home/${item.id}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <Button variant="secondary" size="sm" className="w-full">
                            Tonton Sekarang <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                    <CardTitle className="text-lg truncate">{item.title.english ?? item.title.romaji }</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                        {item.rating/20} • Aksi , Petualang
                      </p>
                    </CardContent>
                  </Card>
                )) : null}
              </div>
              <div className="mt-12 text-center">
                <Button size="lg">Telusuri Semua</Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                Keunggulan SZ - ANIME 
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Banyak Pilihan", description: "Akses gratis ribuan manga dan anime populer gratis", icon: "📚" },
                  { title: "Nonton HD", description: "Film dengan kualitas bagus", icon: "🎥" },
                  { title: "Akses Free", description: "Gratis tanpa iklan", icon: "🌟" }
                ].map((feature, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <span className="mr-2 text-3xl" aria-hidden="true">{feature.icon}</span>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Siap memulai petualangan ini ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Bergabung dengan ribuan fans anime dan manga
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-sm"
                    required
                  />
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                    Mulai
                  </Button>
                </form>
                <p className="mt-4 text-sm text-muted-foreground">
                  Tanpa bayar dan tanpa iklan
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
  )
}
