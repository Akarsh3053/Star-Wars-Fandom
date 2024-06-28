'use client'

import { useState, useEffect } from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import { CharacterList } from '../components/CharacterList'
import { Pagination } from '../components/Pagination'
import { getCharacters } from '../utils/api'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = searchParams.get('page')
    if (page) {
      setCurrentPage(parseInt(page))
    } else {
      // If no page in URL, check the cookie
      const lastPage = document.cookie.replace(/(?:(?:^|.*;\s*)lastVisitedPage\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (lastPage) {
        router.push(`/?page=${lastPage}`, undefined)
      }
    }
  }, [searchParams, router])

  useEffect(() => {
    fetchCharacters(currentPage)
  }, [currentPage])

  const fetchCharacters = async (page: number) => {
    const data = await getCharacters(page)
    setCharacters(data.results)
    setTotalPages(Math.ceil(data.count / 10))
  }

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`, undefined)
    setCurrentPage(page)
    window.scrollTo(0, 0)  // Scroll to top when changing pages
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading as="h1">Star Wars Characters</Heading>
        <CharacterList characters={characters} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </VStack>
    </Container>
  )
}