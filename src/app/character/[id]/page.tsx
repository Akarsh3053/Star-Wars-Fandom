'use client'

import { useState, useEffect } from 'react'
import { Box, Text, VStack, Heading, Container } from '@chakra-ui/react'
import { getCharacterDetails, getMovieDetails } from '../../../utils/api'

export default function CharacterDetail({ params }: { params: { id: string } }) {
    const [character, setCharacter] = useState<any>(null)
    const [movies, setMovies] = useState<string[]>([])

    useEffect(() => {
        if (params.id) {
            fetchCharacterDetails()
        }
    }, [params.id])

    const fetchCharacterDetails = async () => {
        const data = await getCharacterDetails(params.id)
        setCharacter(data)
        fetchMovies(data.films)
    }

    const fetchMovies = async (filmUrls: string[]) => {
        const movieTitles = await Promise.all(
            filmUrls.map(async (url) => {
                const movie = await getMovieDetails(url)
                return movie.title
            })
        )
        setMovies(movieTitles)
    }

    if (!character) {
        return <Container maxW="container.xl" py={8}>Loading...</Container>
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Heading as="h1" mb={8}>
                {character.name}
            </Heading>
            <VStack align="start" spacing={4}>
                <Text>Height: {character.height}</Text>
                <Text>Mass: {character.mass}</Text>
                <Text>Hair Color: {character.hair_color}</Text>
                <Text>Skin Color: {character.skin_color}</Text>
                <Text>Eye Color: {character.eye_color}</Text>
                <Text>Birth Year: {character.birth_year}</Text>
                <Text>Gender: {character.gender}</Text>
                <Box mt={8}>
                    <Heading as="h2" size="lg" mb={4}>
                        Movies
                    </Heading>
                    <VStack align="start">
                        {movies.map((movie, index) => (
                            <Text key={index}>{movie}</Text>
                        ))}
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}