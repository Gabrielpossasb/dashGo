import React from "react";
import { Button, Flex, Stack } from '@chakra-ui/react';
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from "next/router";
import Link from "next/link";

type SignInFormData = {
	email: string;
	password: string;
}

const signInFormSchema = yup.object().shape({
	email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
	password: yup.string().required('Senha obrigatorio'),
})

export default function Home() {
	const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
		resolver: yupResolver(signInFormSchema)
	})


	const { push } = useRouter()

	const handleSignIn: SubmitHandler<SignInFormData> = async (val) => {
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		push('/dashboard')
	}

	return (
		<Flex
			w='100vw'
			h='100vh'
			align='center'
			justify='center'
		>
			<Flex
				as='form'
				width='100%'
				maxWidth={360}
				bg='gray.800'
				p='8'
				borderRadius={8}
				flexDirection='column'
				onSubmit={handleSubmit(handleSignIn)}
			>
				<Stack spacing='4'>
					<Input name="email" type='email' label="E-mail" errors={errors.email} {...register('email')}/>
					<Input name="password" type='password' label="Senha" errors={errors.password} {...register('password')}/>
				</Stack>

				<Link href={'/dashboard'}>
					<Button type="submit" mt='6' colorScheme='pink' size='lg' isLoading={isSubmitting}>ENTRAR</Button>
				</Link>
			</Flex>
		</Flex>
	)
}
