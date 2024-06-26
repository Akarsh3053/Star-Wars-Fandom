import { SimpleGrid } from '@chakra-ui/react';
import { CharacterCard } from './CharacterCard';

interface Character {
    name: string;
    url: string;
}

interface CharacterListProps {
    characters: Character[];
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {characters.map((character) => (
                <CharacterCard key={character.url} name={character.name} url={character.url} />
            ))}
        </SimpleGrid>
    );
};