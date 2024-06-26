import { Button, Flex } from '@chakra-ui/react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <Flex justifyContent="center" mt={4}>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                mr={2}
            >
                Previous
            </Button>
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
            >
                Next
            </Button>
        </Flex>
    );
};