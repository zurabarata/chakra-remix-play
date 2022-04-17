import { Avatar, Container, Button, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default function WithLargeQuote() {
    return (
        <Container maxW={'3xl'}>
        <Stack
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={16}
            px={8}
            spacing={{ base: 8, md: 10 }}
            align={'center'}
            direction={'column'}>
            <Text
                whiteSpace={'pre-wrap'}
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign={'center'}
                maxW={'3xl'}>
                Hey I'm trying out Chakra UI! <br/>I'm using it to build a new webapp with Remix.run.
            </Text>
            <Box textAlign={'center'}>
                <Avatar
                    src={'https://scontent.ftxl3-2.fna.fbcdn.net/v/t1.6435-9/80679191_10212511923913467_3015189078992748544_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=dBpRfDeJdj4AX8lGUMJ&_nc_ht=scontent.ftxl3-2.fna&oh=00_AT-PipysJh41aBY7VKqsDLJueTsbrxrL5keVLsqxrSAKcQ&oe=628129A3'}

                    // @ts-ignore
                    alt='Zurab Baratashvili'
                    mb={2}
                />

                <Text fontWeight={600}>Zurab Baratashvili</Text>
            </Box>
            <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                    bg: 'blue.500',
                }}
                onClick={
                    () => {
                        window.open('./notes', '_blank', 'noopener');
                    }
                }>
                Sign in
            </Button>
        </Stack>
    </Container>
    );
}
