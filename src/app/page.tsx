'use client'

import { useState, useEffect } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { CharacterList } from '../components/CharacterList'
import { Pagination } from '../components/Pagination'
import { getCharacters } from '../utils/api'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCharacters(currentPage)
  }, [currentPage])

  const fetchCharacters = async (page: number) => {
    const data = await getCharacters(page)
    setCharacters(data.results)
    setTotalPages(Math.ceil(data.count / 10))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8}>
        Star Wars Characters
      </Heading>
      <CharacterList characters={characters} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  )
}