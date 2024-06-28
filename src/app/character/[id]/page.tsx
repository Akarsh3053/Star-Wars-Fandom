'use client'

import { useState, useEffect } from 'react'
import {
    Box,
    Text,
    VStack,
    Heading,
    Container,
    SimpleGrid,
    Image,
    Flex,
    Divider,
    Card,
    CardBody,
    Stack,
    Button
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCharacterDetails, getMovieDetails } from '../../../utils/api'

export default function CharacterDetail({ params }: { params: { id: string } }) {
    const [character, setCharacter] = useState<any>(null)
    const [movies, setMovies] = useState<string[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const backPage = searchParams.get('back') || '1'

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

    const handleBackClick = () => {
        router.push(`/?page=${backPage}`)
    }

    if (!character) {
        return <Container maxW="container.xl" py={8}>Loading...</Container>
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Button onClick={handleBackClick} mb={4}>Back to List</Button>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                bg="transparent"
                border="darkgoldenrod"
                borderStyle="groove"
                color="wheat"
                mb={8}
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={`/characters/${params.id}.webp`}
                    alt={character.name}
                />

                <Stack>
                    <CardBody>
                        <Heading size='xl' mb={4}>{character.name}</Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Text><strong>Height:</strong> {character.height}</Text>
                            <Text><strong>Mass:</strong> {character.mass}</Text>
                            <Text><strong>Hair Color:</strong> {character.hair_color}</Text>
                            <Text><strong>Skin Color:</strong> {character.skin_color}</Text>
                            <Text><strong>Eye Color:</strong> {character.eye_color}</Text>
                            <Text><strong>Birth Year:</strong> {character.birth_year}</Text>
                            <Text><strong>Gender:</strong> {character.gender}</Text>
                        </SimpleGrid>
                    </CardBody>
                </Stack>
            </Card>

            <Divider my={8} />

            <Box>
                <Heading as="h2" size="xl" mb={6}>
                    Movie Appearances
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {movies.map((movie, index) => (
                        <Card bg="transparent" border="azure" borderStyle="dashed" color="fuchsia" key={index} >
                            <CardBody>
                                <Text fontSize="lg">{movie}</Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </Container>
    )
}