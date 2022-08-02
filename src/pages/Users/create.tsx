import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreteUserFormData = {
	name: string;
   email: string;
	password: string;
   password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
   name: yup.string().required('Nome obrigatorio'),
	email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
	password: yup.string().required('Senha obrigatorio').min(6, 'No mínimo 6 caracteres'),
	password_confirmation: yup.string().oneOf([ 
      null, yup.ref('password') 
   ], 'As senhas precisam ser iguais'),
})

export default function CreateUser() {
   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
		resolver: yupResolver(CreateUserFormSchema)
	})

   const handleCreateUser: SubmitHandler<CreteUserFormData> = async (val) => {
		await new Promise(resolve => setTimeout(resolve, 2000));
		
	}

   return(
      <Box>
         <Header />

         <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
            <Sidebar/>

            <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(handleCreateUser)}>
               <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>

               <Divider my='6' borderColor='gray.700'/>

               <VStack spacing='8'>
                  <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
                     <Input name='name' label='Nome completo' error={errors.name} {...register('name')}></Input>
                     <Input name='E-mail' type='email' label='E-mail' error={errors.email} {...register('email')}></Input>
                  </SimpleGrid>

                  <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
                     <Input name='password' type='password' label='Senha' error={errors.password} {...register('password')}></Input>
                     <Input name='password_confirmation' type='password' label='Confirmação de senha' error={errors.password_confirmation} {...register('password_confirmation')}></Input>
                  </SimpleGrid>
               </VStack>

               <Flex mt='8' justify='flex-end'>
                  <HStack spacing='4'>
                     <Link href='/users' passHref>
                        <Button colorScheme='whiteAlpha'>Cancelar</Button>
                     </Link>
                     <Button type='submit' colorScheme='pink' isLoading={isSubmitting}>Salvar</Button>
                  </HStack>
               </Flex>
            </Box>
         </Flex>
      </Box>
   );
}