'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, Info, Search, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Sample movie data - আপনি এটা আপনার Telegram চ্যানেলের ডেটা দিয়ে replace করবেন
const movies = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    poster: '/generic-superhero-team-poster.png',
    trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    telegramLink: 'https://t.me/your_channel/123',
    genre: 'Action',
    year: '2019',
    rating: '8.4',
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins...'
  },
  {
    id: 2,
    title: 'Spider-Man: No Way Home',
    poster: '/generic-superhero-multiverse-poster.png',
    trailer: 'https://www.youtube.com/embed/JfVOs4VSpmA',
    telegramLink: 'https://t.me/your_channel/124',
    genre: 'Action',
    year: '2021',
    rating: '8.2',
    description: 'Peter Parker seeks help from Doctor Strange to make everyone forget his identity...'
  },
  {
    id: 3,
    title: 'The Batman',
    poster: '/generic-dark-city-poster.png',
    trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    telegramLink: 'https://t.me/your_channel/125',
    genre: 'Action',
    year: '2022',
    rating: '7.8',
    description: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind...'
  },
  {
    id: 4,
    title: 'Dune',
    poster: '/inspired-by-dune-poster.png',
    trailer: 'https://www.youtube.com/embed/n9xhJrPXop4',
    telegramLink: 'https://t.me/your_channel/126',
    genre: 'Sci-Fi',
    year: '2021',
    rating: '8.0',
    description: 'Paul Atreides leads nomadic tribes in a revolt against the galactic emperor...'
  },
  {
    id: 5,
    title: 'Top Gun: Maverick',
    poster: '/top-gun-maverick-inspired-poster.png',
    trailer: 'https://www.youtube.com/embed/giXco2jaZ_4',
    telegramLink: 'https://t.me/your_channel/127',
    genre: 'Action',
    year: '2022',
    rating: '8.3',
    description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator...'
  },
  {
    id: 6,
    title: 'Black Panther',
    poster: '/black-panther-poster.png',
    trailer: 'https://www.youtube.com/embed/xjDjIWPwcPU',
    telegramLink: 'https://t.me/your_channel/128',
    genre: 'Action',
    year: '2018',
    rating: '7.3',
    description: 'T\'Challa returns home to the isolated, technologically advanced African nation of Wakanda...'
  }
]

const categories = [
  { name: 'সব মুভি', movies: movies },
  { name: 'অ্যাকশন', movies: movies.filter(m => m.genre === 'Action') },
  { name: 'সাই-ফাই', movies: movies.filter(m => m.genre === 'Sci-Fi') },
  { name: 'নতুন মুভি', movies: movies.slice(0, 3) }
]

export default function MovieApp() {
  const [selectedCategory, setSelectedCategory] = useState('সব মুভি')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)

  const filteredMovies = categories
    .find(cat => cat.name === selectedCategory)?.movies
    .filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  const featuredMovie = movies[0]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-600">Movies Verse BD</h1>
            <nav className="hidden md:flex space-x-6">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`hover:text-gray-300 transition-colors ${
                    selectedCategory === category.name ? 'text-white font-semibold' : 'text-gray-400'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="মুভি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/50 border-gray-600 text-white placeholder-gray-400 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Movie Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={featuredMovie.poster || "/placeholder.svg"}
            alt={featuredMovie.title}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold mb-4">{featuredMovie.title}</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="secondary">{featuredMovie.year}</Badge>
              <Badge variant="outline">⭐ {featuredMovie.rating}</Badge>
              <Badge>{featuredMovie.genre}</Badge>
            </div>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {featuredMovie.description}
            </p>
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => window.open(featuredMovie.telegramLink, '_blank')}
              >
                <Play className="w-5 h-5 mr-2" />
                এখনই দেখুন
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline">
                    <Info className="w-5 h-5 mr-2" />
                    ট্রেইলার
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black border-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">{featuredMovie.title} - ট্রেইলার</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video">
                    <iframe
                      src={featuredMovie.trailer}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">{selectedCategory}</h3>
            <div className="md:hidden">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-black border border-gray-600 text-white rounded px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            ট্রেইলার
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-black border-gray-800">
                          <DialogHeader>
                            <DialogTitle className="text-white">{movie.title} - ট্রেইলার</DialogTitle>
                          </DialogHeader>
                          <div className="aspect-video">
                            <iframe
                              src={movie.trailer}
                              className="w-full h-full rounded-lg"
                              allowFullScreen
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 w-full"
                        onClick={() => window.open(movie.telegramLink, '_blank')}
                      >
                        এখনই দেখুন
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                    <span>{movie.year}</span>
                    <span>⭐ {movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">কোন মুভি পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Movies Verse BD. সব মুভি আমাদের Telegram চ্যানেল থেকে দেখুন।
          </p>
        </div>
      </footer>
    </div>
  )
}
