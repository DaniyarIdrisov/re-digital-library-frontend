import {Button, Flex} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useUploadFile} from "../../../QueryHooks/Publication/useUploadFile.ts";
import {toast} from "react-toastify";
import React from "react";
import {ICreatePublicationForm} from "../../../pages/Publication/CreatePublicationPage.tsx";

interface FormInputs {
    files: FileList
}

interface IUploadFileForm {
    setForm(value: React.SetStateAction<ICreatePublicationForm>): void,

    next(): void
}

const UploadFileForm: React.FC<IUploadFileForm> = ({setForm, next}) => {

    const {register, handleSubmit} = useForm<FormInputs>();

    const {mutate} = useUploadFile({
        onSuccess: (data) => {
            toast.success("Загрузка файла успешно завершена");

            setForm((prevState) => ({...prevState, filename: data.data}))

            next();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message ?? 'Ошибка загрузки файла')
        }
    });

    const onSubmitHandle = (data: FormInputs) => mutate(data.files[0]);

    return (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
            <Flex direction={'column'} gap={'2'}>
                <input type={'file'} {...register('files', {required: true})}
                       placeholder={'Файл публикации'}/>

                <Button>Загрузить публикацию</Button>
            </Flex>
        </form>
    );
}

export default UploadFileForm;