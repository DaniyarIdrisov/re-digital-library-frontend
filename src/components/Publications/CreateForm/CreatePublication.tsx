import React, {useEffect, useState} from "react";
import {Button, Flex, TextArea, TextField} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useCreatePublication} from "../../../QueryHooks/Publication/useCreatePublication.ts";
import Select from "react-select";
import {useGetAllAuthors} from "../../../QueryHooks/Author/useGetAllAuthors.ts";
import {toast} from "react-toastify";
import {ICreatePublicationForm} from "../../../pages/Publication/CreatePublicationPage.tsx";

interface Inputs {
    topic: string
    resume: string
    literaryReferences: string
    filename: string
    organization: string
    authorIds: string
}

interface ISelectOption {
    label: string
    value: string
}

interface ICreatePublication {
    form: ICreatePublicationForm,

    setForm(value: React.SetStateAction<ICreatePublicationForm>): void,

    next(): void
}

const AuthorSelector: React.FC = ({setValue}) => {
    const [authors, setAuthors] = useState<ISelectOption[]>([])

    const {mutate, isPending} = useGetAllAuthors({
        onSuccess: (data) => {
            setAuthors(data.data.map((author: IAuthor) => ({
                label: author.fullName,
                value: author.id
            })))
        },
        onError: (error) => toast.error(error?.response?.data?.message)
    });

    const [selected, setSelected] = useState<ISelectOption[]>([])

    useEffect(() => {
        setValue('authorIds', selected.map((item) => item.value).join(';'))
    }, [selected, setValue]);

    useEffect(() => {
        mutate({state: 'CREATED'});
    }, [mutate])

    return (
        <Select
            options={authors}
            onChange={setSelected}
            isMulti={true}
            isDisabled={isPending}
        />
    )
}

const CreatePublication: React.FC<ICreatePublication> = ({form, setForm, next}) => {
    const {register, handleSubmit, setValue} = useForm<Inputs>();

    const {mutate} = useCreatePublication({
        onSuccess: data => {
            toast.success('Публикация успешно создана!')

            setForm((prev) => ({...prev, publicationId: data.data.id}))

            next();
        }
    });

    const onSubmitHandle = (data: Inputs) => mutate({
        resume: data.resume,
        authorIds: data.authorIds.split(';'),
        organization: data.organization,
        topic: data.topic,
        literaryReferences: data.literaryReferences,
        filename: form?.filename ?? null,
    });

    return (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
            <Flex direction={'column'} gap={'2'}>
                <TextField.Root
                    placeholder={"Тема"} {...register('topic', {required: true})} />

                <TextArea resize="vertical" size={'2'}
                          placeholder={"Аннотации"} {...register('resume', {required: true})} />

                <TextField.Root
                    placeholder={"Литературные ссылки"} {...register('literaryReferences', {required: true})} />

                <TextField.Root
                    placeholder={"Учреждение"} {...register('organization', {required: true})} />

                <AuthorSelector setValue={setValue}/>

                <Button type={'submit'}>Создать публикацию</Button>
            </Flex>
        </form>
    )
}

export default CreatePublication;