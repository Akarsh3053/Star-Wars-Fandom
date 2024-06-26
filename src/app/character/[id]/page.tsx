'use client'

import { useState, useEffect } from 'react'
import {
    Box,
    Text,
    VStack,
    Heading,
    Container,
    Grid,
    GridItem,
    Stat,
    StatLabel,
    StatNumber,
    Divider,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Skeleton,
} from '@chakra-ui/react'
import { getCharacterDetails, getMovieDetails } from '../../../utils/api'

export default function CharacterDetail({ params }: { params: { id: string } }) {
    const [character, setCharacter] = useState<any>(null)
    const [movies, setMovies] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchCharacterDetails()
        }
    }, [params.id])

    const fetchCharacterDetails = async () => {
        setIsLoading(true)
        try {
            const data = await getCharacterDetails(params.id)
            setCharacter(data)
            await fetchMovies(data.films)
        } catch (error) {
            console.error("Failed to fetch character details:", error)
        } finally {
            setIsLoading(false)
        }
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

    if (isLoading) {
        return (
            <Container maxW="container.xl" pt={2} pb={8}>
                <VStack spacing={4} align="stretch">
                    <Skeleton height="40px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </VStack>
            </Container>
        )
    }

    if (!character) {
        return (
            <Container maxW="container.xl" pt={2} pb={8}>
                <Text>Character not found</Text>
            </Container>
        )
    }

    return (
        <Container maxW="container.xl" pt={2} pb={8}>
            <VStack spacing={8} align="stretch">
                <Heading as="h1" size="2xl" textAlign="center">
                    {character.name}
                </Heading>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <GridItem>
                        <Card bg="transparent" border="darkgoldenrod" borderStyle="groove" color="wheat">
                            <CardHeader>
                                <Heading size="md">Physical Characteristics</Heading>
                            </CardHeader>
                            <CardBody>
                                <SimpleGrid columns={2} spacing={4}>
                                    <Stat>
                                        <StatLabel>Height</StatLabel>
                                        <StatNumber>{character.height} cm</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Mass</StatLabel>
                                        <StatNumber>{character.mass} kg</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Hair Color</StatLabel>
                                        <StatNumber>{character.hair_color}</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Skin Color</StatLabel>
                                        <StatNumber>{character.skin_color}</StatNumber>
                                    </Stat>
                                </SimpleGrid>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem>
                        <Card bg="transparent" border="darkgoldenrod" borderStyle="groove" color="wheat">
                            <CardHeader>
                                <Heading size="md">Personal Information</Heading>
                            </CardHeader>
                            <CardBody>
                                <SimpleGrid columns={2} spacing={4}>
                                    <Stat>
                                        <StatLabel>Eye Color</StatLabel>
                                        <StatNumber>{character.eye_color}</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Birth Year</StatLabel>
                                        <StatNumber>{character.birth_year}</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Gender</StatLabel>
                                        <StatNumber>{character.gender}</StatNumber>
                                    </Stat>
                                </SimpleGrid>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>

                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Movie Appearances
                    </Heading>
                    <Divider mb={4} />
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {movies.map((movie, index) => (
                            <Card bg="transparent" border="azure" borderStyle="dashed" color="fuchsia" key={index}>
                                <CardBody>
                                    <Text>{movie}</Text>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Box>
            </VStack>
        </Container>
    )
}