'use client'

import { Box } from '@chakra-ui/react';
import EmployeeView from '../components/EmployeeView';

import { ChakraProvider } from '@chakra-ui/react';

const Home = () => {
  return (
    <ChakraProvider>
      <Box p={5}>
        <EmployeeView employees={[]} />
      </Box>
    </ChakraProvider>
  );
};

export default Home;