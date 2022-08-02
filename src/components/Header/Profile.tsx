import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
   showProfileData?: boolean;
}

export function Profile({ showProfileData = true}: ProfileProps) {
   return (
      <Flex align='center'>
         {showProfileData && (
            <Box mr='4' textAlign='right'>
               <Text>Gabriel Borges</Text>
               <Text color='gray.300' fontSize='small' >
                  gabriel.borges@gmail.com
               </Text>
            </Box>
         )}

         <Avatar size='md' name='Gabriel Borges' />
      </Flex>
   )
}