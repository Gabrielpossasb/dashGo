import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
   totalCountOfRegisters: number;
   registersPerPage ?: number;
   currentPage ?: number;
   onPageChange ?: (page: number) => void;
}

const siblingsCount = 2;

function generatPagesArray(from: number, to: number) {
   return [...new Array(to - from)]
      .map( (data, index) => {
         return from + index + 1;
      })
      .filter( page => page > 0)
}

export function Pagination({
   totalCountOfRegisters,
   registersPerPage = 10,
   currentPage = 1,
   onPageChange
}: PaginationProps) {
   const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

   const previusPages = currentPage > 1
      ? generatPagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      :[]

   const nextPages = currentPage < lastPage
      ? generatPagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : []

   return(
      <Stack
         direction={['column','row']}
         spacing='6'
         mt='8'
         justify='space-between'
         align='center'
      >
         <Box>
            <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
         </Box>
         <Stack direction='row' spacing='2'>

            { currentPage > (1 + siblingsCount) && (
               <>
                  <PaginationItem onPageChange={onPageChange} number={1} />
                  { currentPage > (2 + siblingsCount) && (
                     <Text color={'gray.300'} width={'8'} textAlign={'center'} >...</Text>
                  )}
               </>
            )}

            { previusPages.length > 0 && previusPages.map( page => {
               return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
            })}

            <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent/>

            { nextPages.length > 0 && nextPages.map( page => {
               return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
            })}

            { (currentPage + siblingsCount) < lastPage && (
               <>
                  { (currentPage + 1 + siblingsCount) < lastPage && (
                     <Text color={'gray.300'} width={'8'} textAlign={'center'} >...</Text>
                  )}
                  <PaginationItem onPageChange={onPageChange} number={lastPage}/>
               </>
            )}
            
            
         </Stack>
      </Stack>
   );
}